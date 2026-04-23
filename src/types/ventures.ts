import { RoadmapResponse } from "./roadmap";

export type VentureStage = "Idea" | "Validación" | "Modelo de Negocio" | "Formalización" | "Comercialización" | "Operación" | "Escalamiento" | "Internacionalización";
export type MercadoObjetivo = "nacional" | "internacional";
export type ValidacionClientes = "nula" | "baja" | "media" | "alta";
export type VentureStageStatus = "completada" | "actual" | "bloqueada";
export type VentureTaskStatus = "completa" | "en progreso" | "pendiente";
export type ConsultingRequestStatus = "agendada" | "pendiente" | "completada";
export type ActivityType = "actualizar" | "comentar" | "cambiar etapa" | "documentar";


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
    tamano_equipo: number | null;
    tiene_ventas: boolean;
    tiene_mvp: boolean;
    formalizado: boolean;
    tipo_cliente_objetivo: string;
    alcance_geografico: string;
    validacion_clientes: ValidacionClientes;
    sitio_web_url?: string;
    requiere_financiamiento: boolean;
    monto_estimado_financiamiento: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface VentureDiagnosticoPayload {
    tamano_equipo: number | null;
    tiene_ventas: boolean;
    tiene_mvp: boolean;
    formalizado: boolean;
    tipo_cliente_objetivo: string;
    alcance_geografico: string;
    validacion_clientes: ValidacionClientes | null;
    sitio_web_url?: string;
    requiere_financiamiento: boolean;
    monto_estimado_financiamiento: number | null;
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

export interface VentureProject {
  id: number | string;
  nombre_proyecto: string;
  descripcion?: string | null;
  estado?: string | null;
  modalidad?: string | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
}

export interface VentureDetailResponse {
  id: number | string;
  nombre: string;
  descripcion: string;

  sector?: string | null;
  industria?: string | null;
  pais?: string | null;

  fecha_inicio?: string | null;
  etapa_actual?: VentureStage | null;
  progreso_etapa?: number | null;

  problema_que_resuelve?: string | null;
  propuesta_valor?: string | null;
  modelo_negocio?: string | null;
  mercado_objetivo?: string | null;

  etapas?: Array<{
    id: string | number;
    nombre: string;
    descripcion?: string;
    estado: VentureStageStatus;
  }>;

  tareas_etapa_actual?: Array<{
    id: string | number;
    titulo: string;
    estado: VentureTaskStatus;
  }>;

  solicitudes_asesoria?: Array<{
    id: string | number;
    tipo: string;
    descripcion: string;
    estado: ConsultingRequestStatus;
    fecha: string;
    consultor?: string;
  }>;

  actividades?: Array<{
    id: string | number;
    tipo: ActivityType;
    titulo: string;
    descripcion: string;
    fecha_relativa: string;
    autor: string;
  }>;

  proyectos?: VentureProject[];
}

export interface VentureDetalleApiResponse{
  venture: VentureDetailResponse;
  roadmap: RoadmapResponse;
}

export interface VentureDiagnosticResponse {
  id: number | string;
  venture_id: number | string;
  perfil_emprendedor_id: number | string;

  tamano_equipo?: number | null;
  tiene_ventas?: boolean | null;
  tiene_mvp?: boolean | null;
  formalizado?: boolean | null;

  tipo_cliente_objetivo?: string | null;
  alcance_geografico?: string | null;
  validacion_clientes?: string | null;
  sitio_web_url?: string | null;

  requiere_financiamiento?: boolean | null;
  monto_estimado_financiamiento?: number | null;
}

export interface VentureTask {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  status: VentureTaskStatus;
  autoCompleted?: boolean;
  hasEvidence? :boolean;
}


