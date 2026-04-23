export type ProjectStatus = "Iniciado" | "En Planeación" | "En Ejecución" | "En Seguimiento" | "Suspendido" | "Cancelado" | "Finalizado";
export type WorkModel = "remoto" | "presencial" | "hibrido";

export interface Project {
    id: number;
    perfil_consultor_id: number;
    nombre_proyecto: string;
    descripcion: string;
    apoyo_economico: boolean;
    fecha_inicio: string;
    fecha_fin?: string | null;
    estado: ProjectStatus;
    modalidad: WorkModel;
    requisitos?: string;
    beneficios?: string;
    contacto_email: string;
    contacto_telefono: string;
}

export interface CreateProjectPayload {
    nombre_proyecto: string;
    descripcion: string;
    apoyo_economico: boolean;
    fecha_inicio: string;
    fecha_fin?: string;
    estado: ProjectStatus;
    modalidad: WorkModel;
    requisitos?: string;
    beneficios?: string;
    contacto_email: string;
    contacto_telefono: string;
    venture_id: number;
}

export interface ProjectFilters {
    search: string;
    estado: ProjectStatus | "todos";
    modalidad: WorkModel | "todos";
}

export interface ApiProjectFilters {
  search?: string;
  estado?: ProjectStatus;
  modalidad?: WorkModel;
}

export interface VentureProjectSummary {
  id: number;
  nombre_proyecto: string;
  descripcion?: string;
  estado?: ProjectStatus;
  fecha_inicio?: string;
}