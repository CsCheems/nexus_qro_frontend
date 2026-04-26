// src/mocks/projects.ts

import { Project } from "@/types/projects";

export const mockProjects: Project[] = [
     {
        id: 1,
        perfil_consultor_id: 1,
        nombre_proyecto: "Sistema IoT para Agricultura",
        descripcion: "Monitoreo de cultivos usando sensores inteligentes.",
        apoyo_economico: true,
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-08-01",
        estado: "Iniciado",
        modalidad: "Hibrido",
        requisitos: "Conocimientos básicos de IoT",
        beneficios: "Experiencia práctica",
        contacto_email: "consultor@test.com",
        contacto_telefono: "4421234567",
    }
];