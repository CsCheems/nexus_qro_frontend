"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, logout } from "@/services/authService";
import type { User } from "@/types/profiles";


interface AuthContextType {
  user: User;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const refreshUser = async () => {
    try{
      setLoading(true);
      const data = await getMe();
      console.log("GET ME:", data);
      setUser(data.usuario?.usuario ?? null);
    }catch(error: any){
      setUser(null);
    }finally{
      setLoading(false);
    }
  }

  const logout = async () => {
    try {
      await logout();
    } catch (error: any) {
      setUser(null);
      console.log(error);
    }finally{
      setUser(null);
      router.push("/login");
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    console.log("AuthProvider mounted");
  }, []);
 
  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout, setUser }}>
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