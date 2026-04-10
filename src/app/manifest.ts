import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest{
    return{
        name: "IngeniCCa",
        short_name: "ingenicca",
        description: "Aplicacion web para consultorias y emprendimientos",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#111827",
        lang: "es-MX",
        icons: [
            {
                src:"",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}