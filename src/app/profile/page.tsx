"use client";

import { useState, useEffect } from "react";
import { User, Mail, Building2, Edit, Save, X, Phone } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { profileFieldsByRole, UserRole } from "@/constants/profiles";
import { AdditionalInfo } from "../components/profiles/additionalInfo/additionalInfo";
import { EditableAdditionalInfo } from "../components/profiles/editableAdditionalInfo/editableAdditionalInfo";
import { ConsultorProfile, FormDataType, UpdateProfilePayload } from "@/types/profiles";
import { getServices } from "../../services/consultantService";
import {  useToast } from "../components/toast/toast";
import { updateProfile } from "@/services/usersService";

import styles from "./profile.module.css";

import { getMe } from "@/services/authService";
import Navbar from "../components/navbar/navbar";

export default function Profile() {
    const toast = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [services, setServices] = useState<{id: number, nombre: string}[]>();
    const [profile, setProfile] = useState<FormDataType | null>(null);
    const [user, setUser] = useState<any>(null);
    const [editForm, setEditForm] = useState<any>(null);
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
            });
        }
        setIsEditingPassword(!isEditingPassword);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!user || !formData) return;

        try{
            const payload: UpdateProfilePayload = {
                usuario: {
                    nombres: user.nombres,
                    apellido_paterno: user.apellido_paterno,
                    apellido_materno: user.apellido_materno,
                    email: user.email,
                    telefono: user.telefono,
                },
                perfil: 
                    user.rol === "consultor"
                        ?{
                            ...(formData as ConsultorProfile),
                            servicios: (formData as ConsultorProfile).serviciosIds || [],
                        }
                        : formData,
            };

            await updateProfile(payload);

            const data = await getMe();

            const userData = data.usuario.usuario;

            if(userData){
                setUser(userData);
                setProfile(userData.perfil);
            }
            toast.success("Información actualizada");
            setIsEditing(false);
        }catch(error: any){
            toast.error("Error al actualiza tu información");
        }

        
    };   

    const handlePasswordSave = (e: React.FormEvent) => {
        e.preventDefault();
        //Pa luego mejor
        setIsEditingPassword(false);
    };

    useEffect(() => {
        const obtenerUsuario = async () => {
            const data = await getMe();
            if (data?.usuario?.usuario) {
                const userData = data.usuario.usuario;
                setUser(userData);
                setProfile(userData.perfil ?? null);
                setEditForm({
                    usuario: userData,
                    perfil: userData.perfil ?? null
                });
                
            } else {
                setUser(null);
                setProfile(null);
                setEditForm(null);
            }
        };
        obtenerUsuario();
    }, []);

    useEffect(() => {
        if (!profile || !user) return;

        if (user.rol === "consultor"  && "servicios" in profile) {
            const consultor = profile as ConsultorProfile;
            setFormData({
            ...consultor,
            serviciosIds: consultor.servicios?.map((s) => s.id) || [],
            });
        } else {
            setFormData(profile);
        }
    }, [profile, user]);

    useEffect(() => {
        if (!user || user.rol !== "consultor") return;
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (err) {
                console.error("Error cargando servicios", err);
            }
        };

        fetchServices();
    }, [user]);

    const getInitials = () => {
        if(!user) return "";
        return `${user.nombres?.[0] || ""}${user.apellido_paterno?.[0] || ""}`;
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

    const role = user?.rol as UserRole;

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
                                    {user.nombres} {user.apellido_paterno} {user.apellido_materno}
                                </h2>
                                <p className={styles.role}>{user.rol}</p>

                                <div className={styles.meta}>
                                    <div>
                                        <span>Miembro desde</span>
                                        <strong>{formatMonthYear(user.fecha_registro)}</strong>
                                    </div>
                                    <div>
                                        <span>Estado</span>
                                        <strong className={styles.active}>{user.estado}</strong>
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
                                                    {user.nombres}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Apellido Paterno</label>
                                                <div>
                                                    <User size={18} />
                                                    {user.apellido_paterno}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Apellido Materno</label>
                                                <div>
                                                    <User size={18} />
                                                    {user.apellido_materno}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Email</label>
                                                <div>
                                                    <Mail size={18} />
                                                    {user.email}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Teléfono</label>
                                                <div>
                                                    <Phone size={18} />
                                                    {user.telefono}
                                                </div>
                                            </div>

                                            <div className={styles.field}>
                                                <label>Tipo</label>
                                                <div>
                                                    <Building2 size={18} />
                                                    {user.rol}
                                                </div>
                                            </div>
                                        </div>

                                        <hr className={styles.sectionDivider} />

                                        <h3 className={styles.sectionTitle}>Información Adicional</h3>

                                        <AdditionalInfo role={user.rol} data={user.perfil} />
                                    </>
                                ) : (
                                    <form onSubmit={handleSave} className={styles.form}>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.field}>
                                                <label>Nombre</label>
                                                <input
                                                    className={styles.input}
                                                    value={editForm.nombres || ""}
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
                                                    value={editForm.apellido_paterno || ""}
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
                                                    value={editForm.apellido_materno || ""}
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
                                                    value={editForm.email || ""}
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
                                                    value={editForm.telefono || ""}
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

                                        {isEditing ? (
                                            <EditableAdditionalInfo
                                                role={user.rol}
                                                formData={formData}
                                                setFormData={setFormData}
                                                servicesCatalog={services}
                                            />
                                            ) : (
                                            <AdditionalInfo role={user.rol} data={user.perfil} />
                                        )}

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
