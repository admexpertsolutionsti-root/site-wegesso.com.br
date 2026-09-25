// src/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./estilos/globais.css";

/** Ponto de entrada da aplicação. */
const elementoRaiz = document.getElementById("raiz");

if (!elementoRaiz) {
  throw new Error("Elemento #raiz não encontrado no index.html");
}

createRoot(elementoRaiz).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
