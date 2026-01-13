import { createContext, type ReactNode, use, useState } from "react";

interface IUser {
  name: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  logout: () => void;
  login: (email: string, password: string) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: () => {
  },
  logout: () => {
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (email: string, password: string) => {
    console.log("From AuthProvider login", { email, password });
    setUser({ name: "Dima", email: email });
  };

  const logout = () => {
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};