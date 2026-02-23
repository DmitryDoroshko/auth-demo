import { createContext } from "react";
import type { User } from "./AuthProvider";

export interface AuthContext {
  user: User | null;
  logout: () => Promise<void>;
  login: (data: { email: string; password: string; name: string; }) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: false,
});

