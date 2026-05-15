import axios from "axios";

/** Celular físico: definir `EXPO_PUBLIC_API_URL` no `.env` com IP LAN do Mac (ex.: http://192.168.1.4:3333). Simulador / web: omitir → `http://localhost:3333`. */
const rawBase = process.env.EXPO_PUBLIC_API_URL?.trim();
const baseURL = (rawBase || "http://localhost:3333").replace(/\/$/, "");

const api = axios.create({
  baseURL,
  timeout: 7000,
});

export { api };
