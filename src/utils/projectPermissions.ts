export type UserRole = "estudiante" | "consultor" | "administrador";

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
    }
};

export function getProjectPermissions(role: UserRole): ProjectPermissions {
    return projectPermissions[role];
}