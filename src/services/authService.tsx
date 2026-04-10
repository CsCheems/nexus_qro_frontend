import api from "./api";

interface LoginUserData{
    email: string;
    password: string;
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
        return response.data;
    }catch(error: any){
        if (error.response) {
            console.error("Backend error:", error.response.data);
        } else if (error.request) {
            console.error("No hubo respuesta del servidor:", error.request);
        } else {
            console.error("Error general:", error.message);
        }
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