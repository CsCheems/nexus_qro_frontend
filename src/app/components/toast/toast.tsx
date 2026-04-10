"use client"

import { createContext, useContext,  useRef, useState, ReactNode } from "react";
import styles from "./toast.module.css";

type ToastType = "success" | "error" | "info";

type ToastState = {
    message: string;
    type: ToastType;
} | null;

type ToastContextType = {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({children}: ToastProviderProps){
    const [toast, setToast] = useState<ToastState>(null);
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = (
        message: string,
        type: ToastType = "info",
        duration: number = 6000
    ) => {
        if(timeRef.current){
            clearTimeout(timeRef.current);
            timeRef.current = null;
        }

        setToast({message, type});

        timeRef.current = setTimeout(() => {
            setToast(null);
            timeRef.current = null;
        }, duration);
    };

    const api: ToastContextType = {
        success: (message, duration) => showToast(message, "success", duration),
        error: (msessage, duration) => showToast(msessage, "error", duration),
        info: (message, duration) => showToast(message, "info", duration),
    };

    return(
        <ToastContext.Provider value={api}>
            {children}
            {toast && (
                <div className={`${styles.toast} ${styles[toast.type]}`}>
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    )
}

export function useToast(): ToastContextType{
    const context = useContext(ToastContext);
    if(!context){
        throw new Error("useToast debe usarse dentro de ToastProvider");
    }
    return context;
}