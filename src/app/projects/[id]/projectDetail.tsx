"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, BadgeDollarSign, Briefcase, Mail, Phone, ClipboardList, Gift, Activity, Loader2, AlertCircle, User } from "lucide-react";
import Link from "next/link";
import styles from "./projectDetail.module.css";

import { ProjectStatus, WorkModel } from "@/types/projects";

export interface Project {
  id: number;
  perfil_consultor_id: number;
  nombre_proyecto: string;
  descripcion: string;
  apoyo_economico: boolean;
  fecha_inicio: string;
  fecha_fin?: string | null;
  estado: ProjectStatus;
  modalidad: WorkModel;
  requisitos?: string | null;
  beneficios?: string | null;
  contacto_email: string;
  contacto_telefono: string;
}

function formatDate(date?: string | null) {
  if (!date) return "No definida";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getStatusClass(status: ProjectStatus) {
  switch (status) {
    case "Iniciado":
      return styles.statusIniciado;
    case "En Planeación":
      return styles.statusPlaneacion;
    case "En Ejecución":
      return styles.statusEjecucion;
    case "En Seguimiento":
      return styles.statusSeguimiento;
    case "Suspendido":
      return styles.statusSuspendido;
    case "Cancelado":
      return styles.statusCancelado;
    case "Finalizado":
      return styles.statusFinalizado;
    default:
      return styles.statusDefault;
  }
}

function getWorkModelLabel(modalidad: WorkModel) {
  switch (modalidad) {
    case "remoto":
      return "Remoto";
    case "presencial":
      return "Presencial";
    case "hibrido":
      return "Híbrido";
    default:
      return modalidad;
  }
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.message || "No se pudo obtener el proyecto");
        }

        const data = await response.json();

        setProject(data.project ?? data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Ocurrió un error inesperado";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const statusClassName = useMemo(() => {
    if (!project) return styles.statusDefault;
    return getStatusClass(project.estado);
  }, [project]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.centerBox}>
          <Loader2 className={styles.spinner} />
          <p>Cargando detalle del proyecto...</p>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className={styles.page}>
        <div className={styles.centerBox}>
          <AlertCircle className={styles.errorIcon} />
          <h2>No se pudo cargar el proyecto</h2>
          <p>{error || "El proyecto no existe o no está disponible."}</p>

          <Link href="/projects" className={styles.backButton}>
            <ArrowLeft size={18} />
            Volver a proyectos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link href="/projects" className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Volver a proyectos</span>
          </Link>
        </div>

        <section className={styles.heroCard}>
          <div className={styles.heroHeader}>
            <div className={styles.titleBlock}>
              <span className={`${styles.statusBadge} ${statusClassName}`}>
                <Activity size={14} />
                {project.estado}
              </span>

              <h1 className={styles.title}>{project.nombre_proyecto}</h1>
              <p className={styles.description}>{project.descripcion}</p>
            </div>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <div className={styles.metaIcon}>
                <Calendar size={18} />
              </div>
              <div>
                <p className={styles.metaLabel}>Fecha de inicio</p>
                <p className={styles.metaValue}>
                  {formatDate(project.fecha_inicio)}
                </p>
              </div>
            </div>

            <div className={styles.metaItem}>
              <div className={styles.metaIcon}>
                <Calendar size={18} />
              </div>
              <div>
                <p className={styles.metaLabel}>Fecha de fin</p>
                <p className={styles.metaValue}>
                  {formatDate(project.fecha_fin)}
                </p>
              </div>
            </div>

            <div className={styles.metaItem}>
              <div className={styles.metaIcon}>
                <Briefcase size={18} />
              </div>
              <div>
                <p className={styles.metaLabel}>Modalidad</p>
                <p className={styles.metaValue}>
                  {getWorkModelLabel(project.modalidad)}
                </p>
              </div>
            </div>

            <div className={styles.metaItem}>
              <div className={styles.metaIcon}>
                <BadgeDollarSign size={18} />
              </div>
              <div>
                <p className={styles.metaLabel}>Apoyo económico</p>
                <p className={styles.metaValue}>
                  {project.apoyo_economico ? "Sí disponible" : "No disponible"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <section className={styles.card}>
              <div className={styles.sectionTitle}>
                <ClipboardList size={18} />
                <h2>Requisitos</h2>
              </div>

              {project.requisitos ? (
                <p className={styles.paragraph}>{project.requisitos}</p>
              ) : (
                <p className={styles.emptyText}>
                  Este proyecto no tiene requisitos registrados por el momento.
                </p>
              )}
            </section>

            <section className={styles.card}>
              <div className={styles.sectionTitle}>
                <Gift size={18} />
                <h2>Beneficios</h2>
              </div>

              {project.beneficios ? (
                <p className={styles.paragraph}>{project.beneficios}</p>
              ) : (
                <p className={styles.emptyText}>
                  Este proyecto no tiene beneficios registrados por el momento.
                </p>
              )}
            </section>
          </div>

          <aside className={styles.sidebar}>
            <section className={styles.card}>
              <div className={styles.sectionTitle}>
                <User size={18} />
                <h2>Información de contacto</h2>
              </div>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <Mail size={16} />
                  <div>
                    <p className={styles.contactLabel}>Correo electrónico</p>
                    <a
                      href={`mailto:${project.contacto_email}`}
                      className={styles.contactValue}
                    >
                      {project.contacto_email}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Phone size={16} />
                  <div>
                    <p className={styles.contactLabel}>Teléfono</p>
                    <a
                      href={`tel:${project.contacto_telefono}`}
                      className={styles.contactValue}
                    >
                      {project.contacto_telefono}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}