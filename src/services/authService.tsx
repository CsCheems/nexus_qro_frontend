import api from "./api";

interface RegisterUserData {
  name: string;
  lastName: string;
  secondLastName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

interface LoginUserData{
    email: string;
    password: string;
}

export const register = async(userData: RegisterUserData) => {
    try{
        const response = await api.post("/auth/register", userData);
        return response.data;
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