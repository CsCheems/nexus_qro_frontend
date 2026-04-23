export type UserRole = "estudiante" | "consultor" | "administrador" | "emprendedor";

export interface ProjectPermissions {
    canCreateProject: boolean;
    canApplyToProject: boolean;
    showFullCardInfo: boolean;
    showContactInfo: boolean;
}

export const projectPermissions: Record<UserRole, ProjectPermissions> = {
    estudiante: {
        canCreateProject: false,
        canApplyToProject: true,
        showFullCardInfo: false,
        showContactInfo: false,
    },
    consultor: {
        canCreateProject: true,
        canApplyToProject: false,
        showFullCardInfo: true,
        showContactInfo: true,
    },
    administrador: {
        canCreateProject: true,
        canApplyToProject: false,
        showFullCardInfo: true,
        showContactInfo: true,
    },
    emprendedor: {
        canCreateProject: true,
        canApplyToProject: false,
        showFullCardInfo: true,
        showContactInfo: true,
    },
};

export function getProjectPermissions(role: UserRole): ProjectPermissions {
    return projectPermissions[role];
}