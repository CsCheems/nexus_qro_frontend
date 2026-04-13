"use client";

import { X } from "lucide-react";
import styles from "./projectModal.module.css";

import type { CreateProjectPayload, ProjectStatus, WorkModel } from "@/types/projects";

import { PROJECT_STATUS_OPTIONS, WORK_MODEL_OPTIONS } from "@/constants/project";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  newProject: CreateProjectPayload;
  setNewProject: React.Dispatch<
    React.SetStateAction<CreateProjectPayload>
  >;
}

export function ProjectModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  newProject,
  setNewProject,
}: Props) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Crear Nuevo Proyecto</h2>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className={styles.modalForm}>
          <div className={styles.formGrid}>
            {/* Nombre */}
            <div className={styles.field}>
                <label className={styles.label}>Nombre</label>
                <input
                type="text"
                value={newProject.nombre_proyecto}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    nombre_proyecto: e.target.value,
                    }))
                }
                className={styles.input}
                required
                />
            </div>

            {/* Estado */}
            <div className={styles.field}>
                <label className={styles.label}>Estado</label>
                <select
                value={newProject.estado}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    estado: e.target.value as ProjectStatus,
                    }))
                }
                className={styles.select}
                required
                >
                {PROJECT_STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                    {o.label}
                    </option>
                ))}
                </select>
            </div>

            {/* Descripción */}
            <div className={styles.fieldFull}>
                <label className={styles.label}>Descripción</label>
                <textarea
                value={newProject.descripcion}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    descripcion: e.target.value,
                    }))
                }
                className={styles.textarea}
                rows={4}
                required
                />
            </div>

            {/* Modalidad */}
            <div className={styles.field}>
                <label className={styles.label}>Modalidad</label>
                <select
                value={newProject.modalidad}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    modalidad: e.target.value as WorkModel,
                    }))
                }
                className={styles.select}
                required
                >
                {WORK_MODEL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                    {o.label}
                    </option>
                ))}
                </select>
            </div>

            {/* Apoyo económico */}
            <div className={styles.field}>
                <label className={styles.label}>Apoyo económico</label>
                <select
                value={String(newProject.apoyo_economico)}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    apoyo_economico: e.target.value === "true",
                    }))
                }
                className={styles.select}
                >
                <option value="false">No</option>
                <option value="true">Sí</option>
                </select>
            </div>

            {/* Fecha inicio */}
            <div className={styles.field}>
                <label className={styles.label}>Fecha inicio</label>
                <input
                type="date"
                value={newProject.fecha_inicio}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    fecha_inicio: e.target.value,
                    }))
                }
                className={styles.input}
                required
                />
            </div>

            {/* Fecha fin */}
            <div className={styles.field}>
                <label className={styles.label}>Fecha fin</label>
                <input
                type="date"
                value={newProject.fecha_fin ?? ""}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    fecha_fin: e.target.value,
                    }))
                }
                className={styles.input}
                />
            </div>

            {/* Requisitos */}
            <div className={styles.fieldFull}>
                <label className={styles.label}>Requisitos</label>
                <textarea
                value={newProject.requisitos ?? ""}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    requisitos: e.target.value,
                    }))
                }
                className={styles.textarea}
                rows={3}
                />
            </div>

            {/* Beneficios */}
            <div className={styles.fieldFull}>
                <label className={styles.label}>Beneficios</label>
                <textarea
                value={newProject.beneficios ?? ""}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    beneficios: e.target.value,
                    }))
                }
                className={styles.textarea}
                rows={3}
                />
            </div>

            {/* Email */}
            <div className={styles.field}>
                <label className={styles.label}>Correo de contacto</label>
                <input
                type="email"
                value={newProject.contacto_email}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    contacto_email: e.target.value,
                    }))
                }
                className={styles.input}
                required
                />
            </div>

            {/* Teléfono */}
            <div className={styles.field}>
                <label className={styles.label}>Teléfono</label>
                <input
                type="tel"
                value={newProject.contacto_telefono}
                onChange={(e) =>
                    setNewProject((prev) => ({
                    ...prev,
                    contacto_telefono: e.target.value,
                    }))
                }
                className={styles.input}
                required
                />
            </div>

            </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creando..." : "Crear Proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}