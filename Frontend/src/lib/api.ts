// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://studysync-backend-7iry.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const apiformdata = axios.create({
  baseURL: "https://studysync-backend-7iry.onrender.com/api",
  withCredentials: true,
  // 🚫 Don't hardcode "Content-Type" here — Axios handles it per request type
});
