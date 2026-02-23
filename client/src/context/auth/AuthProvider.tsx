import { type ReactNode, useEffect, useState } from "react";
import { AuthAPI } from "../../services/auth/AuthAPI.ts";
import { AuthContext } from "./AuthContext.tsx";

export interface User {
  name: string;
  email: string;
  joined?: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProfile = async () => {
      const user = await AuthAPI.getProfile() as unknown as User;
      console.log("AuthProvider useEffect user", { user });
      setUser(user);
    };

    getProfile();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log("From AuthProvider login", { email, password });
    setLoading(true);
    const { data } = await AuthAPI.login({ email, password });

    if (data) {
      setUser({ email: data.email, name: data.name });
      setLoading(false);
    }
  };

  const logout = async () => {
    await AuthAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
