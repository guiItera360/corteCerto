import axios from "axios";

export const IAClient = axios.create({
  baseURL: "http://localhost:8000", // ou onde seu script Python estiver rodando
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Content-Type": "application/json; charset-UTF-8",
  },
});
