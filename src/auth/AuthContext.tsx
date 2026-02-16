import { createContext, useContext, useState, useEffect } from "react";
import { type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { setAuthToken, setUnauthorizedHandler } from "../services/httpClient";

type User = {
  sub: string;
  email: string;
  role: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    setAuthToken(token);

    const decoded: any = jwtDecode(token);

    const mappedUser: User = {
      sub: decoded.sub,
      email: decoded.email,
      role: decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
    };

    setUser(mappedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
