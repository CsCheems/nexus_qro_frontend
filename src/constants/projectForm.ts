// src/constants/projectForm.ts

import { CreateProjectPayload } from "@/types/projects";

export const initialProjectForm: CreateProjectPayload = {
    nombre_proyecto: "",
    descripcion: "",
    apoyo_economico: false,
    fecha_inicio: "",
    fecha_fin: "",
    estado: "En Planeación",
    modalidad: "Remoto",
    requisitos: "",
    beneficios: "",
    contacto_email: "",
    contacto_telefono: "", 
    venture_id: 0
};