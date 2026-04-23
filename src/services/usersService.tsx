import api from "./api";
import { UpdateProfilePayload } from "@/types/profiles";

interface RegisterUserData {
    name: string;
    lastName: string;
    secondLastName: string;
    email: string;
    phone: string;
    role: string;
    password: string;
}

export const register = async(userData: RegisterUserData) => {
    try{
        const response = await api.post("/users/register", userData);
        return response;
    }catch(error: any){
        if(error.response){
            throw new Error(error.response.data.message || "Error en el registro");
        }else if(error.request){
            throw new Error("Error, no se recibió respuesta.");
        }else{
            throw new Error("Error en el servidor");
        }
    }
}

export const updateProfile = async(payload: UpdateProfilePayload) => {
    try{
        const response = await api.patch("/users/update", payload);
        return response;
    }catch(error: any){
        if(error.response){
            throw new Error(error.response.data.message || "Error al actualizar perfil");
        }else if(error.request){
            throw new Error("Error, no se recibió respuesta.");
        }else{
            throw new Error("Error en el servidor");
        }
    }
}