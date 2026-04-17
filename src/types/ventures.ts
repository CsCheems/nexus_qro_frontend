export type VentureStage = "Idea" | "Validación" | "Modelo de Negocio" | "Formalización" | "Comercialización" | "Operación" | "Escalamiento" | "Internacionalización";
export type MercadoObjetivo = "nacional" | "internacional";
export type ValidacionClientes = "nula" | "baja" | "media" | "alta";


export interface Venture {
    id: number;
    perfil_emprendedor_id: number;
    nombre: string;
    descripcion: string;
    problema_que_resuelve: string;
    propuesta_valor: string;
    sector: string;
    industria: string;
    pais: string;
    stage: VentureStage;
    fecha_inicio: string;
    fecha_fin?: string;
}

export interface VenturePayload {
    nombre: string;
    descripcion: string;
    problema_que_resuelve: string;
    propuesta_valor: string;
    sector: string;
    industria: string;
    pais: string;
    fecha_inicio: string | null;
    fecha_fin?: string | null;
}

export interface VentureDiagnosticoGeneral {
    venture_id: number;
    tamano_equipo: number;
    tiene_ventas: boolean;
    tiene_mvp: boolean;
    formalizado: boolean;
    tipo_cliente_objetivo: string;
    alcance_geografico: string;
    validacion_clientes: ValidacionClientes;
    sitio_web_url?: string;
    requiere_financiamiento: boolean;
    monto_estimado_financiamiento?: number;
    created_at?: string;
    updated_at?: string;
}

export interface VentureDiagnosticoPayload {
    tamano_equipo?: number;
    tiene_ventas: boolean;
    tiene_mvp: boolean;
    formalizado: boolean;
    tipo_cliente_objetivo: string;
    alcance_geografico: string;
    validacion_clientes: "" | ValidacionClientes;
    sitio_web_url?: string;
    requiere_financiamiento: boolean;
    monto_estimado_financiamiento?: number;
}

export interface VentureFilters {
    search: string;
    stage: VentureStage | "todos";
    requiere_financiamiento: boolean;
}

export interface ApiVentureFilters {
    search?: string;
    stage?: VentureStage;
    requiere_financiamiento?: boolean;
}

export interface Objective {
  id: number;
  nombre: string;
  completado: boolean;
}

export interface RoadmapStage {
  nombre: VentureStage;
  orden: number;
  esActual: boolean;
  objetivos: Objective[];
}

export interface VentureDetail {
  id: number;
  nombre: string;
  descripcion: string;
  etapa_actual: VentureStage;
  roadmap: RoadmapStage[];
}