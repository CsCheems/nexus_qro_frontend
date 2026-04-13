import { VenturePayload } from "@/types/ventures";

export const initialVentureForm: VenturePayload = {
    nombre: "",
    descripcion: "",
    problema_que_resuelve: "",
    propuesta_valor: "",
    sector: "",
    industria: "",
    mercado_objetivo: "",
    venture_stage: "Idea",
    requiere_financiammiento: false,
    monto_estamidado: 0,
    tiene_mvp: false,
    tiene_ventas: false,
    formalizado: false,
    fecha_inicio: "",
    fecha_fin: ""
}