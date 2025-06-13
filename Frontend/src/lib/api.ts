// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const apiformdata = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  // 🚫 Don't hardcode "Content-Type" here — Axios handles it per request type
});
