export type UserRole =
  | "estudiante"
  | "consultor"
  | "empresa"
  | "emprendedor"
  | "institucion"
  | "administrador";

export const profileFieldsByRole = {
    estudiante: [
        { key: "universidad", label: "Universidad" },
        { key: "division", label: "Division" },
        { key: "programa", label: "Programa" }
    ],
    consultor: [
        { key: "empresa", label: "Empresa" },
        { key: "puesto", label: "Puesto" }
    ],
    empresa: [
        { key: "nombre_empresa", label: "Nombre de la empresa" },
        { key: "sector", label: "Sector" },
        { key: "sition_web", label: "Sitio Web" }
    ],
    emprendedor: [
        { key: "nomre_emprendimiento", label: "Emprendimiento" },
        { key: "sector", label: "Sector" },
        { key: "etapa", label: "Etapa" }
    ],
    institucion: [
        { key: "nombre_institucion", label: "Institución" },
        { key: "tipo_institucion", label: "Tipo" }
    ],
    administrador: [],
}