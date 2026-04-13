import { VentureStage } from "@/types/ventures";

export const VENTURE_STAGES_OPTIONS:{
    value: VentureStage;
    label: string;
}[] = [
    { value: "Idea", label: "Idea"},
    { value: "Validación", label: "Validación"},
    { value: "Modelo de Negocio", label: "Modelo de Negocio"},
    { value: "Formalización", label: "Formalización"},
    { value: "Comercialización", label: "Comercialización"},
    { value: "Operación", label: "Operación"},
    { value: "Escalamiento", label: "Escalamiento"},
    { value: "Internacionalización", label: "Internacionalización"},
]    

export const VENTURE_STAGE_FILTERS = [
    {value: "todos", label: "Todos los estados"},
    ...VENTURE_STAGES_OPTIONS
]