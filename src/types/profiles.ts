
export type UserRole =
  | "estudiante"
  | "consultor"
  | "emprendedor"
  | "administrador"
  | "empresa"
  | "institucion";

export interface User {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string | null;
  email: string;
  telefono?: string | null;
  rol: UserRole;
  estado: "activo" | "inactivo" | "bloqueado";
  fecha_registro?: string;
  ultimo_acceso?: string;
  perfil?: FormDataType;
}

export interface BaseProfile {
  id?: number;
  usuario_id?: number;
}

export interface ConsultorProfile extends BaseProfile {
  empresa: string | null;
  puesto: string | null;
  disponibilidad: "Disponible" | "No Disponible" | "En Proyecto";
  servicios: {
    id: number;
    nombre: string;
  }[];
  serviciosIds: number[]; 
}

export interface EstudianteProfile extends BaseProfile {
  universidad: string;
  division: string;
  programa: string;
}

export interface EmprendedorProfile extends BaseProfile {
  sector: string | null;
  descripcion: string | null;
}

export interface EmpresaProfile extends BaseProfile {
  nombre_empresa: string;
  pais: string;
  ciudad: string;
  sector: string;
}

export interface InstitucionProfile extends BaseProfile {
  nombre_institucion: string;
  pais: string;
  ciudad: string;
}

export interface AdministradorProfile extends BaseProfile {
  cargo: string;
  area: string;
}

export type ProfilePayload =
  | { perfil: ConsultorProfile }
  | { perfil: EstudianteProfile }
  | { perfil: EmprendedorProfile }
  | { perfil: EmpresaProfile }
  | { perfil: InstitucionProfile }
  | { perfil: AdministradorProfile };

export type FormDataType =
  | ConsultorProfile
  | EstudianteProfile
  | EmprendedorProfile
  | EmpresaProfile
  | InstitucionProfile
  | AdministradorProfile;

export interface GetMeResponse {
  usuario: User;
  perfilCompleto: boolean;
  mensaje: string | null;
}

export interface UpdateProfilePayload {
  usuario?: {
    nombres?: string;
    apellido_paterno?: string;
    apellido_materno?: string | null;
    email?: string | null;
    telefono?: string | null;
  };

  perfil: FormDataType;
}