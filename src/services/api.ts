import axios from "axios";

// Para dispositivo físico, trocar localhost pelo IP da máquina (ex: http://192.168.1.24:3333)
const api = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 7000,
});

export { api };
