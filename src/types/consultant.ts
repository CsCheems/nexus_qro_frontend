export interface ConsultantService{
    consultant_id: number;
    nombre: string;
    empresa?: string;
    puesto?: string;
    anios_experiencia?: number;
    tarifa_hora?: number;
    servicio?: string;
}

export interface ConsultantByServiceResponse{
    service: {
        id: number;
        nombre: string;
    };
    consultants: ConsultantService[];
}