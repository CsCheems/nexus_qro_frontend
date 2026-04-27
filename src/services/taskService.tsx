import api from "@/services/api";

export const getEvidencesByTask = async (ventureId: string, taskKey: string) => {
    try{
        const { data } = await api.get(`/tasks/evidences/${ventureId}/${taskKey}`);
        return data;
    }catch(error: any){
        if(error.response){
            throw new Error(error.response.data.message || "Error al obtener evidencias");
        }else if(error.request){
            throw new Error("Error, no se recibió respuesta.");
        }else{
            throw new Error("Error en el servidor");
        }
    }
} 

export const createEvidence = async (payload: {
    venture_id: string;
    task_key: string;
    tipo: string;
    descripcion?: string;
    url?: string;
}) => {
    try{
        const { data } = await api.post(
            "/tasks/evidences",
            payload,
        );
        return data;
    }catch(error: any){
        if(error.response){
            throw new Error(error.response.data.message || "Error al cargar la evidencia");
        }else if(error.request){
            throw new Error("Error, no se recibió respuesta.");
        }else{
            throw new Error("Error en el servidor");
        }
    }
}

export const uploadEvidenceFile = async (payload: {
    venture_id: string;
    task_key: string;
    descripcion?: string;
    file: File;
}) => {
    try {
        const formData = new FormData();

        formData.append("venture_id", payload.venture_id);
        formData.append("task_key", payload.task_key);

        if (payload.descripcion) {
            formData.append("descripcion", payload.descripcion);
        }

        formData.append("file", payload.file);

        const { data } = await api.post(
            "/tasks/evidences/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
            
        );

        return data;
    } catch (error: any) {
        console.error("Error upload file:", error);
        throw new Error(
            error.response?.data?.message ||
            "No se pudo subir la evidencia"
        );
    }
};

export const completeTask = async (ventureId: string, taskKey: string) => {
    try{
        const { data } = await api.patch(`/tasks/${taskKey}/complete`, 
            {
                ventureId,
            }
        );
        return data;
    }catch(error: any){
        if(error.response){
            throw new Error(error.response.data.message || "Error al actualizar estado de la tarea");
        }else if(error.request){
            throw new Error("Error, no se recibió respuesta.");
        }else{
            throw new Error("Error en el servidor");
        }
    }
}