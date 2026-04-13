import api from "./api";

import type { VenturePayload, Venture, ApiVentureFilters } from "@/types/ventures";

export const getVentures = async (filters?: ApiVentureFilters): Promise<Venture[]> => {
    try{
        const response = await api.get("/ventures", {
            params: filters,
            withCredentials: true,
        });
        return response.data;
    }catch(error: any){
        if (error.response) {
            throw new Error(error.response.data.message || "Error al obtener emprendimientos");
        } else if (error.request) {
            throw new Error("Error, no se recibió respuesta del servidor");
        } else {
            throw new Error("Error en el servidor");
        }
    }
}

export const registerVenture = async (
    ventureData: VenturePayload ) : Promise<Venture> => {
        try{
            const response = await api.post(
                "/ventures/register",
                ventureData,{
                    withCredentials: true,
                }
            );
            return response.data;
        }catch(error: any){
             if(error.response){
                throw new Error(
                    error.response.data.message || "Error al registrar emprendimiento"
                );
            }else if(error.request){
                throw new Error("Error, no se recibió respuesta del servidor");
            }else{
                throw new Error("Error en el servidor");
            }
        }
    }