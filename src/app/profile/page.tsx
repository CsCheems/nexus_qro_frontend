"use client";

import { useState, useEffect } from "react";
import { User, Mail, Building2, Edit, Save, X, Phone } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { profileFieldsByRole, UserRole } from "@/constants/profiles";

import styles from "./profile.module.css";

import { getMe } from "@/services/authService";
import Navbar from "../components/navbar/navbar";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [user, setUser] = useState<any>(null);
    const [editForm, setEditForm] = useState({...user});
    const [passwordFields, setPasswordFields] = useState({
        passwordActual: "",
        nuevaPassword: "",
        confirmarPassword: "",
    });

    const handleEditToggle = () => {
        if (isEditing) setEditForm({ ...user });
        setIsEditing(!isEditing);
    };

    const handleEditPassToggle = () => {
        if (isEditingPassword) {
            setPasswordFields({
                passwordActual: "",
                nuevaPassword: "",
                confirmarPassword: "",
            }); // Reset password fields if cancelling
        }
        setIsEditingPassword(!isEditingPassword);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Guardar cambios:", editForm);
        setIsEditing(false);
    };   

    const handlePasswordSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement password save logic here
        console.log("Saving password changes:", passwordFields);
        setIsEditingPassword(false);
    };

    useEffect(() => {
        const obtenerUsuario = async () => {
            const data = await getMe();
            if(data?.usuario){
                setUser(data.usuario);
                setEditForm(data);
            }else{
                setUser(null);
            }
        };
        obtenerUsuario();
    }, []);

    const getInitials = () => {
        if(!user) return "";
        return `${user.usuario.nombres?.[0] || ""}${user.usuario.apellido_paterno?.[0] || ""}`;
    };

    const formatMonthYear = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long"
        });
    };
            

    if (!user || !editForm) {
        return <p>Cargando...</p>;
    }

    const role = user?.usuario?.rol as UserRole;
    const camposAdicionales = profileFieldsByRole[role] || [];

    return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headerContent}>
                        <Navbar variant="internal" />
                        <div className={styles.logo}>N</div>
                    </div>
                </header>

                <div className={styles.main}>
                    <div className={styles.pageHeader}>
                        <h1>Mi Perfil</h1>
                        <p>Gestiona tu información personal</p>
                    </div>

                    <div className={styles.grid}>
                        {/* Seccion Izquierda */}
                        <div className={styles.leftColumn}>
                            <div className={styles.card}>
                                <div className={styles.avatarWrapper}>
                                    <div className={styles.avatar}>{getInitials()}</div>
                                </div>

                                <h2 className={styles.userName}>
                                    {user.usuario.nombres} {user.usuario.apellido_paterno} {user.usuario.apellido_materno}
                                </h2>
                                <p className={styles.role}>{user.usuario.rol}</p>

                                <div className={styles.meta}>
                                    <div>
                                        <span>Miembro desde</span>
                                        <strong>{formatMonthYear(user.usuario.fecha_registro)}</strong>
                                    </div>
                                    <div>
                                        <span>Estado</span>
                                        <strong className={styles.active}>{user.usuario.estado}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seccion Derecha */}
                        <div className={styles.rightColumn}>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h3>Información Personal</h3>

                                    <button
                                        onClick={handleEditToggle}
                                        className={styles.editBtn}
                                    >
                                        {isEditing ? (
                                            <>
                                                <X size={16} /> Cancelar
                                            </>
                                        ) : (
                                            <>
                                                <Edit size={16} /> Editar
                                            </>
                                        )}
                                    </button>
                                </div>

                                {!isEditing ? (
                                    <>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.field}>
                                                <label>Nombre</label>
                                                <div>
                                                    <User size={18} />
                                                    {user.usuario.nombres}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Apellido Paterno</label>
                                                <div>
                                                    <User size={18} />
                                                    {user.usuario.apellido_paterno}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Apellido Materno</label>
                                                <div>
                                                    <User size={18} />
                                                    {user.usuario.apellido_materno}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Email</label>
                                                <div>
                                                    <Mail size={18} />
                                                    {user.usuario.email}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Teléfono</label>
                                                <div>
                                                    <Phone size={18} />
                                                    {user.usuario.telefono}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Tipo</label>
                                                <div>
                                                    <Building2 size={18} />
                                                    {user.usuario.rol}
                                                </div>
                                            </div>
                                        </div>

                                        <hr className={styles.sectionDivider} />

                                        <h3 className={styles.sectionTitle}>Información Adicional</h3>

                                        <div className={styles.infoGrid}>
                                            {camposAdicionales.length > 0 && user.perfil ? (
                                                camposAdicionales.map((campo: any) => (
                                                    <div key={campo.key} className={styles.field}>
                                                        <label>{campo.label}</label>
                                                        <div>{user.perfil[campo.key] || "No especificado"}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No hay informacion adicional para este perfil</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <form onSubmit={handleSave} className={styles.form}>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.field}>
                                                <label>Nombre</label>
                                                <input
                                                    className={styles.input}
                                                    value={editForm.usuario?.nombres || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            usuario: {
                                                                ...editForm.usuario,
                                                                nombres: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>Apellido Paterno</label>
                                                <input
                                                    className={styles.input}
                                                    value={editForm.usuario?.apellido_paterno || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            usuario: {
                                                                ...editForm.usuario,
                                                                apellido_paterno: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>Apellido Materno</label>
                                                <input
                                                    className={styles.input}
                                                    value={editForm.usuario?.apellido_materno || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            usuario: {
                                                                ...editForm.usuario,
                                                                apellido_materno: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>Email</label>
                                                <input
                                                    className={styles.input}
                                                    value={editForm.usuario?.email || ""}
                                                    onChange={(e) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            usuario: {
                                                                ...editForm.usuario,
                                                                email: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>Teléfono</label>
                                                <PhoneInput
                                                    className={styles.input}
                                                    value={editForm.usuario?.telefono || ""}
                                                    onChange={(value) =>
                                                        setEditForm({
                                                            ...editForm,
                                                            usuario: {
                                                                ...editForm.usuario,
                                                                telefono: value || "",
                                                            },
                                                        })
                                                    }
                                                    defaultCountry="MX"
                                                />
                                            </div>
                                        </div>

                                        <hr className={styles.sectionDivider} />

                                        <h3 className={styles.sectionTitle}>Información Adicional</h3>

                                        <div className={styles.infoGrid}>
                                            {editForm.usuario?.rol === "estudiante" && (
                                                <>
                                                    <div className={styles.field}>
                                                        <label>Universidad</label>
                                                        <input
                                                            className={styles.input}
                                                            value={editForm.perfil?.universidad || ""}
                                                            onChange={(e) =>
                                                                setEditForm({
                                                                    ...editForm,
                                                                    perfil: {
                                                                        ...editForm.perfil,
                                                                        universidad: e.target.value,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                    </div>

                                                    <div className={styles.field}>
                                                        <label>División</label>
                                                        <input
                                                            className={styles.input}
                                                            value={editForm.perfil?.division || ""}
                                                            onChange={(e) =>
                                                                setEditForm({
                                                                    ...editForm,
                                                                    perfil: {
                                                                        ...editForm.perfil,
                                                                        division: e.target.value,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                    </div>

                                                    <div className={styles.field}>
                                                        <label>Programa</label>
                                                        <input
                                                            className={styles.input}
                                                            value={editForm.perfil?.programa || ""}
                                                            onChange={(e) =>
                                                                setEditForm({
                                                                    ...editForm,
                                                                    perfil: {
                                                                        ...editForm.perfil,
                                                                        programa: e.target.value,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            {editForm.usuario?.rol === "consultor" && (
                                                <>
                                                    <div className={styles.field}>
                                                        <label>Empresa</label>
                                                        <input
                                                            className={styles.input}
                                                            value={editForm.perfil?.empresa || ""}
                                                            onChange={(e) =>
                                                                setEditForm({
                                                                    ...editForm,
                                                                    perfil: {
                                                                        ...editForm.perfil,
                                                                        empresa: e.target.value,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                    </div>

                                                    <div className={styles.field}>
                                                        <label>Puesto</label>
                                                        <input
                                                            className={styles.input}
                                                            value={editForm.perfil?.puesto || ""}
                                                            onChange={(e) =>
                                                                setEditForm({
                                                                    ...editForm,
                                                                    perfil: {
                                                                        ...editForm.perfil,
                                                                        puesto: e.target.value,
                                                                    },
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className={styles.actions}>
                                            <button type="button" onClick={handleEditToggle}>
                                                Cancelar
                                            </button>
                                            <button type="submit">
                                                <Save size={16} /> Guardar
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>

                            {/* Sección de Seguridad (Contraseña) */}
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h3>Seguridad</h3>
                                    {!isEditingPassword && (
                                        <button
                                            onClick={handleEditPassToggle}
                                            className={styles.editBtn}
                                        >
                                            <Edit size={16} /> Editar Contraseña
                                        </button>
                                    )}
                                </div>

                                {isEditingPassword ? (
                                    <form onSubmit={handlePasswordSave} className={styles.form}>
                                        <div className={styles.fieldFull}>
                                            <label>Contraseña Actual</label>
                                            <input
                                                type="password"
                                                className={styles.input}
                                                placeholder="Ingresa tu contraseña actual"
                                                value={passwordFields.passwordActual}
                                                onChange={(e) =>
                                                    setPasswordFields({
                                                        ...passwordFields,
                                                        passwordActual: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className={styles.row}>
                                            <div className={styles.field}>
                                                <label>Nueva Contraseña</label>
                                                <input
                                                    type="password"
                                                    className={styles.input}
                                                    placeholder="Mínimo 8 caracteres"
                                                    value={passwordFields.nuevaPassword}
                                                    onChange={(e) =>
                                                        setPasswordFields({
                                                            ...passwordFields,
                                                            nuevaPassword: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className={styles.field}>
                                                <label>Confirmar Nueva Contraseña</label>
                                                <input
                                                    type="password"
                                                    className={styles.input}
                                                    placeholder="Confirma la nueva contraseña"
                                                    value={passwordFields.confirmarPassword}
                                                    onChange={(e) =>
                                                        setPasswordFields({
                                                            ...passwordFields,
                                                            confirmarPassword: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.actions}>
                                            <button type="button" onClick={handleEditPassToggle} className={styles.cancelBtn}>
                                                Cancelar
                                            </button>
                                            <button type="submit" className={styles.saveBtn}>
                                                Guardar Cambios
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className={styles.infoGrid}>
                                        <div className={styles.field}>
                                            <label><strong>Contraseña</strong></label>
                                            <div>********</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
