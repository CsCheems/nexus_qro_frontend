import { Project, ProjectStatus } from "@/types/projects";
import { formatDate } from "@/utils/projectFormat";

export function mapProjectFromApi(project: Project){
    return {
        header:{
            status: project.estado,
            name: project.nombre_proyecto,
            description: project.descripcion,
            foundedDate: project.fecha_inicio ? formatDate(project.fecha_inicio) : "No definida",
            endDate: project.fecha_fin ? formatDate(project.fecha_fin) : "No definida",
            workModel: project.modalidad,
            monetaryHelp: project.apoyo_economico
        },

        requirementsList: {
            requirements: project.requisitos ?? ""
        },

        benefitsList:{
            benefits: project.beneficios ?? ""
        },

        contactInfo:{
            email: project.contacto_email ?? "",
            phone: project.contacto_telefono ?? ""
        }

    }
}