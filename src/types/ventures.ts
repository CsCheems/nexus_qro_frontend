export type VentureStage = "Idea" | "Validación" | "Modelo de Negocio" | "Formalización" | "Comercialización" | "Operación" | "Escalamiento" | "Internacionalización";

export interface Venture {
    id: number;
    perfil_emprendedor_id: number;
    nombre: string;
    descripcion: string;
    problema_que_resuelve: string;
    propuesta_valor: string;
    sector: string;
    industria: string;
    mercado_objetivo: string;
    venture_stage: VentureStage;
    requiere_financiammiento: boolean;
    monto_estamidado: number;
    tiene_mvp: boolean;
    tiene_ventas: boolean;
    formalizado: boolean;
    fecha_inicio: string;
    fecha_fin?: string | null;
}

export interface VenturePayload {
    nombre: string;
    descripcion: string;
    problema_que_resuelve: string;
    propuesta_valor: string;
    sector: string;
    industria: string;
    mercado_objetivo: string;
    venture_stage: VentureStage;
    requiere_financiammiento: boolean;
    monto_estamidado: number;
    tiene_mvp: boolean;
    tiene_ventas: boolean;
    formalizado: boolean;
    fecha_inicio: string;
    fecha_fin?: string | null;
}

export interface VentureFilters {
    search: string;
    venture_stage: VentureStage | "todos";
    requiere_financiamiento: boolean;
}

export interface ApiVentureFilters {
    search?: string;
    venture_stage?: VentureStage;
    requiere_financiamiento?: boolean;
}