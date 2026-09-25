/**
 * Script utilitário (uso único): recorta o PNG do logo removendo as
 * margens transparentes e gera as versões usadas pelo site.
 *
 * Rode com:  node ferramentas/preparar-logo.mjs
 */
import fs from 'node:fs'
import zlib from 'node:zlib'
import path from 'node:path'

const origem = process.argv[2]
const pastaDestino = process.argv[3] ?? 'public/imagens'

/** Decodifica um PNG RGBA (8 bits, sem entrelaçamento). */
function lerPng(caminho) {
  const arquivo = fs.readFileSync(caminho)
  let posicao = 8
  const pedacos = []
  let largura = 0
  let altura = 0

  while (posicao < arquivo.length) {
    const tamanho = arquivo.readUInt32BE(posicao)
    const tipo = arquivo.slice(posicao + 4, posicao + 8).toString()

    if (tipo === 'IHDR') {
      largura = arquivo.readUInt32BE(posicao + 8)
      altura = arquivo.readUInt32BE(posicao + 12)
    }
    if (tipo === 'IDAT') pedacos.push(arquivo.slice(posicao + 8, posicao + 8 + tamanho))
    if (tipo === 'IEND') break

    posicao += 12 + tamanho
  }

  const bruto = zlib.inflateSync(Buffer.concat(pedacos))
  const canais = 4
  const passo = largura * canais + 1
  const pixels = Buffer.alloc(largura * altura * canais)
  const linhaAnterior = Buffer.alloc(largura * canais)

  for (let y = 0; y < altura; y++) {
    const filtro = bruto[y * passo]
    const linha = Buffer.from(bruto.slice(y * passo + 1, y * passo + 1 + largura * canais))

    for (let i = 0; i < linha.length; i++) {
      const a = i >= canais ? linha[i - canais] : 0
      const b = linhaAnterior[i]
      const c = i >= canais ? linhaAnterior[i - canais] : 0
      let v = linha[i]

      if (filtro === 1) v = (v + a) & 255
      else if (filtro === 2) v = (v + b) & 255
      else if (filtro === 3) v = (v + ((a + b) >> 1)) & 255
      else if (filtro === 4) {
        const pa = Math.abs(b - c)
        const pb = Math.abs(a - c)
        const pc = Math.abs(a + b - 2 * c)
        const previsto = pa <= pb && pa <= pc ? a : pb <= pc ? b : c
        v = (v + previsto) & 255
      }
      linha[i] = v
    }

    linha.copy(pixels, y * largura * canais)
    linha.copy(linhaAnterior)
  }

  return { largura, altura, pixels }
}

/** Escreve um PNG RGBA sem filtro. */
function escreverPng(caminho, largura, altura, pixels) {
  const canais = 4
  const bruto = Buffer.alloc((largura * canais + 1) * altura)

  for (let y = 0; y < altura; y++) {
    bruto[y * (largura * canais + 1)] = 0
    pixels.copy(
      bruto,
      y * (largura * canais + 1) + 1,
      y * largura * canais,
      (y + 1) * largura * canais,
    )
  }

  const criarPedaco = (tipo, dados) => {
    const tamanho = Buffer.alloc(4)
    tamanho.writeUInt32BE(dados.length)
    const corpo = Buffer.concat([Buffer.from(tipo), dados])
    const crc = Buffer.alloc(4)
    crc.writeUInt32BE(calcularCrc(corpo) >>> 0)
    return Buffer.concat([tamanho, corpo, crc])
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(largura, 0)
  ihdr.writeUInt32BE(altura, 4)
  ihdr[8] = 8
  ihdr[9] = 6

  fs.writeFileSync(
    caminho,
    Buffer.concat([
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      criarPedaco('IHDR', ihdr),
      criarPedaco('IDAT', zlib.deflateSync(bruto, { level: 9 })),
      criarPedaco('IEND', Buffer.alloc(0)),
    ]),
  )
}

const tabelaCrc = (() => {
  const tabela = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    tabela[n] = c
  }
  return tabela
})()

function calcularCrc(buffer) {
  let c = -1
  for (let i = 0; i < buffer.length; i++) c = tabelaCrc[(c ^ buffer[i]) & 0xff] ^ (c >>> 8)
  return c ^ -1
}

/** Recorta uma região da imagem. */
function recortar(imagem, x0, y0, x1, y1) {
  const largura = x1 - x0 + 1
  const altura = y1 - y0 + 1
  const saida = Buffer.alloc(largura * altura * 4)

  for (let y = 0; y < altura; y++) {
    imagem.pixels.copy(
      saida,
      y * largura * 4,
      ((y + y0) * imagem.largura + x0) * 4,
      ((y + y0) * imagem.largura + x1 + 1) * 4,
    )
  }

  return { largura, altura, pixels: saida }
}

/** Encontra a caixa que contém os pixels visíveis. */
function calcularCaixa(imagem, deY = 0, ateY = imagem.altura - 1) {
  let minX = imagem.largura
  let minY = imagem.altura
  let maxX = -1
  let maxY = -1

  for (let y = deY; y <= ateY; y++) {
    for (let x = 0; x < imagem.largura; x++) {
      if (imagem.pixels[(y * imagem.largura + x) * 4 + 3] > 10) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  return { minX, minY, maxX, maxY }
}

// ----------------------------------------------------------------

const imagem = lerPng(origem)
fs.mkdirSync(pastaDestino, { recursive: true })

// 1) Logo completo, sem margens
const caixaTotal = calcularCaixa(imagem)
const completo = recortar(
  imagem,
  caixaTotal.minX,
  caixaTotal.minY,
  caixaTotal.maxX,
  caixaTotal.maxY,
)
escreverPng(
  path.join(pastaDestino, 'logo.png'),
  completo.largura,
  completo.altura,
  completo.pixels,
)
console.log('logo.png', completo.largura + 'x' + completo.altura)

// 2) Descobre onde termina o símbolo (linha vazia entre o desenho e a palavra GESSO)
let separacao = -1
for (let y = Math.floor(imagem.altura * 0.45); y < Math.floor(imagem.altura * 0.7); y++) {
  let vazia = true
  for (let x = 0; x < imagem.largura; x++) {
    if (imagem.pixels[(y * imagem.largura + x) * 4 + 3] > 10) {
      vazia = false
      break
    }
  }
  if (vazia) {
    separacao = y
    break
  }
}
console.log('linha de separação:', separacao)

// 3) Só o símbolo (casa + W), usado no cabeçalho e no favicon
if (separacao > 0) {
  const caixaSimbolo = calcularCaixa(imagem, 0, separacao)
  const simbolo = recortar(
    imagem,
    caixaSimbolo.minX,
    caixaSimbolo.minY,
    caixaSimbolo.maxX,
    caixaSimbolo.maxY,
  )
  escreverPng(
    path.join(pastaDestino, 'logo-simbolo.png'),
    simbolo.largura,
    simbolo.altura,
    simbolo.pixels,
  )
  console.log('logo-simbolo.png', simbolo.largura + 'x' + simbolo.altura)
}
