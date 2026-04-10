"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "@/services/authService";

interface AuthContextType {
  user: any;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data.usuario ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}