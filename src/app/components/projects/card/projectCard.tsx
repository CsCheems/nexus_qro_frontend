"use client";

import Link from "next/link";
import {
  Calendar,
  Mail,
  Phone,
  HandCoins,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";


import styles from "./projectCard.module.css";

import type { Project, ProjectStatus, WorkModel } from "@/types/projects";
import { formatDate, truncateText } from "@/utils/projectFormat";

interface ProjectCardProps {
  project: Project;
  isStudent: boolean;
  showFullCardInfo: boolean;
}

export function ProjectCard({
  project,
  isStudent,
  showFullCardInfo,
}: ProjectCardProps) {
  const getStatusClass = (status: ProjectStatus) => {
    switch (status) {
      case "Iniciado":
        return styles.statusActive;
      case "Finalizado":
        return styles.statusCompleted;
      case "En Planeación":
        return styles.statusPlanning;
      default:
        return styles.statusDefault;
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "Iniciado":
        return <TrendingUp size={16} />;
      case "Finalizado":
        return <CheckCircle2 size={16} />;
      case "En Planeación":
        return <Clock size={16} />;
      default:
        return <Briefcase size={16} />;
    }
  };

  const getWorkModelLabel = (modalidad: WorkModel) => {
    const labels: Record<WorkModel, string> = {
      remoto: "Remoto",
      presencial: "Presencial",
      hibrido: "Híbrido",
    };
    return labels[modalidad];
  };

  return (
    <article className={styles.projectCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderTop}>
          <div className={styles.cardHeaderLeft}>
            <span
              className={`${styles.statusBadge} ${getStatusClass(
                project.estado
              )}`}
            >
              {getStatusIcon(project.estado)}
              <span>{project.estado}</span>
            </span>

            <span className={styles.modalityBadge}>
              {getWorkModelLabel(project.modalidad)}
            </span>
          </div>
        </div>

        <h3 className={styles.cardTitle}>
          <Link href={`/projects/${project.id}`}>
            {project.nombre_proyecto}
          </Link>
        </h3>

        <p className={styles.cardDescription}>
          {truncateText(project.descripcion, isStudent ? 120 : 180)}
        </p>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <Calendar size={16} />
            <span>
              {formatDate(project.fecha_inicio)}
              {project.fecha_fin
                ? ` - ${formatDate(project.fecha_fin)}`
                : " - Sin fecha de cierre"}
            </span>
          </div>

          <div className={styles.metaItem}>
            <HandCoins size={16} />
            <span>
              {project.apoyo_economico
                ? "Con apoyo económico"
                : "Sin apoyo económico"}
            </span>
          </div>

          {!isStudent && (
            <>
              <div className={styles.metaItem}>
                <Mail size={16} />
                <span>{project.contacto_email}</span>
              </div>

              <div className={styles.metaItem}>
                <Phone size={16} />
                <span>{project.contacto_telefono}</span>
              </div>
            </>
          )}
        </div>

        {showFullCardInfo && (
          <>
            {project.requisitos && (
              <div className={styles.infoBlock}>
                <h4 className={styles.infoTitle}>Requisitos</h4>
                <p className={styles.infoText}>
                  {truncateText(project.requisitos, 100)}
                </p>
              </div>
            )}

            {project.beneficios && (
              <div className={styles.infoBlock}>
                <h4 className={styles.infoTitle}>Beneficios</h4>
                <p className={styles.infoText}>
                  {truncateText(project.beneficios, 100)}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.cardFooter}>
        <Link
          href={`/projects/${project.id}`}
          className={styles.detailsButton}
        >
          Ver detalles →
        </Link>
      </div>
    </article>
  );
}