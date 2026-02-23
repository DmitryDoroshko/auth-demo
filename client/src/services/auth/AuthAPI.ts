import type { RegisterPayload, RegisterResponse, LoginPayload, LoginResponse } from "./auth.types.ts";
import { api } from "../axios.ts";

export class AuthAPI {
  public static register = async ({ name, email, password }: RegisterPayload) => {
    return await api.post<RegisterResponse>("/auth/register", { name, email, password });
  };

  public static login = async ({ email, password }: LoginPayload) => {
    return await api.post<LoginResponse>("/auth/login", { email, password });
  };

  public static logout = async () => {
    return await api.post<void>("/auth/logout");
  };

  public static getProfile = async () => {
    return await api.get<void>("/auth/profile");
  };
};

