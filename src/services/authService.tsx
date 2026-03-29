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

export const login = async(userData: LoginUserData) =>{
    try{
        const response = await api.post("/auth/login", userData, {
            withCredentials: true
        });
        console.log(response.data);
        return response;
    }catch(error: any){
        if(error.response){
            throw new Error(error.response.data.message);
        }else if(error.request){
            throw new Error("Error, no se recibió respuesta");
        }else{
            throw new Error("Error en el servidor");
        }
    }
}

export const getMe = async () => {
    try{
        const response = await api.get("/auth/me", {
            withCredentials: true,
        });
        console.log("response:", response);
        return response.data;
    }catch(error: any){
        console.error("Error en getMe:", error.response?.data || error.message);
        throw error;
    }
}

export const logout = async () => {
    try{
        await api.post("/auth/logout", {},
            {
                withCredentials: true,
            }
        );
    }catch(error: any){
        console.error("Error al cerrar sesión");
    }
}