import  api  from "@/services/api";

export async function getServices() {
  try{
        const res = await api.get("/services", {
            withCredentials: true
        });
        return res.data;
    }catch(error: any){
        if (error.response) {
            throw new Error(error.response.data.message || "Error al obtener servicios");
        } else if (error.request) {
            throw new Error("Error, no se recibió respuesta del servidor");
        } else {
            throw new Error("Error en el servidor");
        }
    }
}