import { ProjectStatus, VentureProjectSummary } from "@/types/projects";
import { RoadmapResponse } from "@/types/roadmap";
import type { VentureDetailResponse, VentureDiagnosticResponse, VentureStage, VentureStageStatus } from "@/types/ventures";
import { formatDate } from "@/utils/projectFormat";

export function mapVentureFromApi(venture: VentureDetailResponse, diagnostic?: VentureDiagnosticResponse | null, roadmap? : RoadmapResponse | null ) {

  const teamSize = diagnostic?.tamano_equipo ?? 0;

  const stage: VentureStage = (roadmap?.stage as VentureStage) || "Idea";

  const total = roadmap?.tasks?.length ?? 0;

  const completed = roadmap?.tasks?.filter((t: any) => t.status === "completa").length || 0;

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const STAGES_ORDER: VentureStage[] = [
    "Idea",
    "Validación",
    "Modelo de Negocio",
    "Formalización",
    "Comercialización",
    "Operación",
    "Escalamiento",
    "Internacionalización",
  ];

  const STAGE_DESCRIPTIONS: Record<VentureStage, string> = {
    "Idea": "Ideación y validación inicial del concepto",
    "Validación": "Validar interés real del mercado",
    "Modelo de Negocio": "Definir cómo genera valor",
    "Formalización": "Estructura legal y fiscal",
    "Comercialización": "Estrategia de ventas",
    "Operación": "Optimizar ejecución",
    "Escalamiento": "Crecimiento del negocio",
    "Internacionalización": "Expansión a nuevos mercados",
  };

  const currentIndex = STAGES_ORDER.indexOf(stage as VentureStage);

  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const stages = STAGES_ORDER.map((stage, index) => {
    let status: VentureStageStatus;

    if (index < safeIndex) status = "completada";
    else if (index === safeIndex) status = "actual";
    else status = "bloqueada";

    return {
      id: stage,
      name: stage,
      description: STAGE_DESCRIPTIONS[stage],
      status,
    };
  });

  return {
    header: {
      name: venture.nombre,
      description: venture.descripcion,
      stage,
      sector: venture.sector || "No definido",
      foundedDate: venture.fecha_inicio ? formatDate(venture.fecha_inicio) : "No definida",
      teamSize
    },

    currentStage: {
      stageName: stage,
      progress,
      objective: roadmap?.objective || "",
      tasks:
        roadmap?.tasks?.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: task.description || "",
          status: task.status,
          hasEvidence: !!task.hasEvidence,
          autoCompleted: task.autoCompleted,
        })) ?? [],
    },

    stages,

    consultingRequests:
      venture.solicitudes_asesoria?.map((r) => ({
        id: String(r.id),
        type: r.tipo,
        description: r.descripcion,
        status: r.estado,
        date: r.fecha,
        consultant: r.consultor,
      })) ?? [],

    ventureInfo: {
      problem: venture.problema_que_resuelve || "",
      solution: venture.propuesta_valor || "",
      businessModel: diagnostic?.tipo_cliente_objetivo || "",
      targetMarket: diagnostic?.alcance_geografico || "",
    },

    activities:
      venture.actividades?.map((a) => ({
        id: String(a.id),
        type: a.tipo,
        title: a.titulo,
        description: a.descripcion,
        timestamp: a.fecha_relativa,
        author: a.autor,
      })) ?? [],

    projects:
      venture.proyectos?.map((p): VentureProjectSummary => ({
        id: Number(p.id),
        nombre_proyecto: p.nombre_proyecto ?? "Sin nombre",
        descripcion: p.descripcion ?? "",
        estado: p.estado as ProjectStatus,
        fecha_inicio: p.fecha_inicio ?? "",
      })) ?? [],

    summary: {
      industry: venture.industria || "No definida",
      country: venture.pais || "No definido",
      startDate: venture.fecha_inicio ? formatDate(venture.fecha_inicio) : "No definida",
      stage,
      teamSize
    },
  };
}