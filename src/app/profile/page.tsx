"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Building2,
  Edit,
  Save,
  X,
  Phone,
} from "lucide-react";

import PhoneInput from "react-phone-number-input";
import type { E164Number } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import styles from "./profile.module.css";

import { getMe } from "@/services/authService";

export default function ProfilePage() {
const [isEditing, setIsEditing] = useState(false);
const [isEditingPassword, setIsEditingPassword] = useState(false);

const [user, setUser] = useState<any>(null);
const [editForm, setEditForm] = useState({...user});
const [editPassword, setEditPassword] = useState(false);

const handleEditToggle = () => {
    if (isEditing) setEditForm({ ...user });
    setIsEditing(!isEditing);
};

const handleEditPassToggle = () => {
    if(isEditingPassword) setEditPassword(true);
    setIsEditingPassword(!isEditingPassword);
}

const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...editForm });
    setIsEditing(false);
};

useEffect(() => {
    const obtenerUsuario = async () => {
        const data = await getMe();
        if(data?.usuario){
            setUser(data.usuario);
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

  return date
    .toLocaleDateString("es-MX", {
      month: "long",
      year: "numeric",
    })
    .replace(" de ", " ")
    .replace(/^./, (c) => c.toUpperCase());
};

if (!user || !editForm) {
  return <p>Cargando...</p>;
}

return (
    <div className={styles.container}>
        <header className={styles.header}>
        <div className={styles.headerContent}>
            <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
            </Link>

            <div className={styles.brand}>
            <div className={styles.logo}>N</div>
            <span>Nexus-Qro</span>
            </div>
        </div>
        </header>

        <div className={styles.main}>
        <div className={styles.pageHeader}>
            <h1>Mi Perfil</h1>
            <p>Gestiona tu información personal</p>
        </div>

        <div className={styles.grid}>
            {/* LEFT */}
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

            {/* RIGHT */}
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

                    {user.usuario.rol === "estudiante" && user.perfil && (
                        <>
                            <div className={styles.field}>
                                <label>Universidad</label>
                                <div>{user.perfil.universidad}</div>
                            </div>

                            <div className={styles.field}>
                                <label>División</label>
                                <div>{user.perfil.division}</div>
                            </div>

                            <div className={styles.field}>
                                <label>Programa</label>
                                <div>{user.perfil.programa}</div>
                            </div>
                        </>
                    )}

                    {user.usuario.rol === "consultor" && user.perfil && (
                        <>
                        <div className={styles.field}>
                            <label>Empresa</label>
                            <div>{user.perfil.empresa} </div>
                        </div>

                        <div className={styles.field}>
                            <label>Puesto</label>
                            <div>{user.perfil.puesto} </div>
                        </div>
                        </>
                    )}

                    </div>

                    <hr className={styles.sectionDivider} />

                    <h3 className={styles.sectionTitle}>Seguridad</h3>

                     {!isEditingPassword ? (
                        <>
                            <div className={styles.infoGrid}>
                                <div className={styles.field}>
                                    <label><strong>Contraseña</strong></label>
                                </div>
                                <button
                                    onClick={handleEditPassToggle}
                                    className={styles.editBtn}
                                >
                                        <Edit size={16} /> Editar Contraseña
                                </button>
                            </div>
                        </>
                     ):(
                        <div className={styles.passwordContainer}>

                            <div className={styles.fieldFull}>
                            <label>Contraseña Actual</label>
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="Ingresa tu contraseña actual"
                                onChange={(e) =>
                                setEditForm({
                                    ...editForm,
                                    passwordActual: e.target.value
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
                                    onChange={(e) =>
                                        setEditForm({
                                        ...editForm,
                                        nuevaPassword: e.target.value
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
                                    onChange={(e) =>
                                        setEditForm({
                                        ...editForm,
                                        confirmarPassword: e.target.value
                                        })
                                    }
                                    />
                                </div>
                            </div>

                            <div className={styles.actions}>
                            <button
                                onClick={handleEditPassToggle}
                                className={styles.cancelBtn}
                            >
                                Cancelar
                            </button>

                            <button className={styles.saveBtn}>
                                Guardar Cambios
                            </button>
                            </div>

                        </div>
                     )}
                </>
                ) : (
                <form onSubmit={handleSave} className={styles.form}>

                    <div className={styles.infoGrid}>
                        
                        {/* NOMBRE */}
                        <div className={styles.field}>
                            <label>Nombre</label>
                            <input
                                className={styles.input}
                                value={editForm.usuario?.nombres}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        usuario: {
                                            ...editForm.usuario,
                                            nombres: e.target.value
                                        }
                                    })
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Apellido Paterno</label>
                            <input
                                className={styles.input}
                                value={editForm.usuario?.apellido_paterno}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        usuario: {
                                            ...editForm.usuario,
                                            apellido_paterno: e.target.value
                                        }
                                    })
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Apellido Materno</label>
                            <input
                                className={styles.input}
                                value={editForm.usuario?.apellido_materno}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        usuario: {
                                            ...editForm.usuario,
                                            apellido_materno: e.target.value
                                        }
                                    })
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Email</label>
                            <input
                                className={styles.input}
                                value={editForm.usuario?.email}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        usuario: {
                                            ...editForm.usuario,
                                            email: e.target.value
                                        }
                                    })
                                }
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Teléfono</label>
                            <PhoneInput
                                className={styles.input}
                                value={editForm.usuario?.telefono as E164Number}
                                onChange={(value) =>
                                    setEditForm({
                                        ...editForm,
                                        usuario: {
                                            ...editForm.usuario,
                                            telefono: value || ""
                                        }
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
                                                    universidad: e.target.value
                                                }
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
                                                    division: e.target.value
                                                }
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
                                                    programa: e.target.value
                                                }
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
                                                    empresa: e.target.value
                                                }
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
                                                    puesto: e.target.value
                                                }
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
            </div>
        </div>
        </div>
    </div>
    );
}