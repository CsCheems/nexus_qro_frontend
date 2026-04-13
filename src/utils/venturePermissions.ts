export type UserRole = "emprendedor" | "consultor" | "administrador";

export interface VenturePermissions {
    canCreateVenture: boolean;
    canEditVenture: boolean;
    canDeleteVenture: boolean;
    showFullCardInfo: boolean;
    showContactInfo: boolean;
}

export const venturePermissions: Record<UserRole, VenturePermissions> = {
    emprendedor: {
        canCreateVenture: true,
        canEditVenture: true,
        showFullCardInfo: false,
        showContactInfo: false,
        canDeleteVenture: false,
    },
    consultor: {
        canCreateVenture: false,
        canEditVenture: true,
        showFullCardInfo: true,
        showContactInfo: true,
        canDeleteVenture: false,
    },
    administrador: {
        canCreateVenture: true,
        canEditVenture: true,
        showFullCardInfo: true,
        showContactInfo: true,
        canDeleteVenture: true
    }
};

export function getVenturePermissions(role: UserRole): VenturePermissions {
    return venturePermissions[role];
}