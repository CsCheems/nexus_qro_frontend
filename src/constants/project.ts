import { ProjectStatus, WorkModel } from "@/types/projects";

export const PROJECT_STATUS_OPTIONS: {
    value: ProjectStatus;
    label: string;
    }[] = [
    { value: "Iniciado", label: "Iniciado" },
    { value: "En Planeación", label: "En Planeación" },
    { value: "En Ejecución", label: "En Ejecución" },
    { value: "En Seguimiento", label: "En Seguimiento" },
    { value: "Suspendido", label: "Suspendido" },
    { value: "Cancelado", label: "Cancelado" },
    { value: "Finalizado", label: "Finalizado" }
];

export const WORK_MODEL_OPTIONS: {
    value: WorkModel;
    label: string;
    }[] = [
    { value: "Remoto", label: "Remoto" },
    { value: "Presencial", label: "Presencial" },
    { value: "Hibrido", label: "Híbrido" }
];

export const PROJECT_STATUS_FILTERS = [
    { value: "todos", label: "Todos los estados" },
    ...PROJECT_STATUS_OPTIONS
];

export const WORK_MODEL_FILTERS = [
    { value: "todos", label: "Todas las modalidades" },
    ...WORK_MODEL_OPTIONS
];

export const APOYO_FILTERS = [
    { value: "todos", label: "Todos" },
    { value: true, label: "Con apoyo económico" },
    { value: false, label: "Sin apoyo económico" }
];