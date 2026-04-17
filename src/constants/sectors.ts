export const SECTORES = [
  { value: "tecnologia", label: "Tecnología" },
  { value: "financiero", label: "Financiero" },
  { value: "educacion", label: "Educación" },
  { value: "salud", label: "Salud" },
  { value: "comercio", label: "Comercio" },
  { value: "agroindustria", label: "Agroindustria" },
  { value: "manufactura", label: "Manufactura" },
  { value: "logistica", label: "Logística" },
  { value: "energia", label: "Energía" },
  { value: "turismo", label: "Turismo" },
  { value: "otro", label: "Otro" },
] as const;

export type Sector = typeof SECTORES[number]["value"];