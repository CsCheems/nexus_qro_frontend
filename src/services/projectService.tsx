import api from "./api";

import type { CreateProjectPayload, Project, ProjectFilters } from "@/types/projects";

export const getProjects = async (filters?: ProjectFilters): Promise<Project[]> => {
    try {
        const response = await api.get("/projects", {
            params: filters,
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || "Error al obtener proyectos");
        } else if (error.request) {
            throw new Error("Error, no se recibió respuesta del servidor");
        } else {
            throw new Error("Error en el servidor");
        }
    }
};

export const createProject = async (
    projectData: CreateProjectPayload
): Promise<Project> => {
    try {
        const response = await api.post(
            "/projects/register",
            projectData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }catch(error: any){
        if(error.response){
            throw new Error(
                error.response.data.message || "Error al crear proyecto"
            );
        }else if(error.request){
            throw new Error("Error, no se recibió respuesta del servidor");
        }else{
            throw new Error("Error en el servidor");
        }
    }
}

export const updateProject = async (
    id: number,
    projectData: Partial<CreateProjectPayload>
): Promise<Project> => {
    try {
        const response = await api.put(
            `/projects/update/${id}`,
            projectData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(
                error.response.data.message || "Error al actualizar el proyecto"
            );
        } else if (error.request) {
            throw new Error("Error, no se recibió respuesta del servidor");
        } else {
            throw new Error("Error en el servidor");
        }
    }
};