"use client";

import { useEffect } from "react";

export default function ServiceWorker(){
    useEffect(() => {
        if(typeof window === "undefined") return;

        if("serviceWorker" in navigator){
            window.addEventListener("load", async () => {
                try{
                    const registration = await navigator.serviceWorker.register("/sw.js");
                }catch(error){
                    console.error("Error al registrar el service worker: ", error);
                }
            });
        }
    }, []);
    return null;
}