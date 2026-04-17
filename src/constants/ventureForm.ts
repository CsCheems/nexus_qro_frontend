import { VenturePayload, VentureDiagnosticoPayload } from "@/types/ventures";

export const initialVentureForm: VenturePayload = {
  nombre: "",
  descripcion: "",
  problema_que_resuelve: "",
  propuesta_valor: "",
  sector: "",
  industria: "",
  pais: "",
  fecha_inicio: "",
  fecha_fin: "",
};

export const initialDiagnosticoForm: VentureDiagnosticoPayload = {
  tamano_equipo: undefined,
  tiene_ventas: false,
  tiene_mvp: false,
  formalizado: false,
  tipo_cliente_objetivo: "",
  alcance_geografico: "",
  validacion_clientes: "",
  sitio_web_url: "",
  requiere_financiamiento: false,
  monto_estimado_financiamiento: undefined,
};