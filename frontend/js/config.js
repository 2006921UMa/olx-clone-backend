// js/config.js

// Caminho base da API para fetch (backend Express)
const API_BASE =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://olx-clone-backend-rosy.vercel.app"; // Ajusta para o teu backend principal

// Caminho base para servir ficheiros estáticos (imagens de uploads)
const BACKEND_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://olx-clone-backend-rosy.vercel.app";

