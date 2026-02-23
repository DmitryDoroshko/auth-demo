import axios from "axios";
import { API_URL } from "../constants/api.ts";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
