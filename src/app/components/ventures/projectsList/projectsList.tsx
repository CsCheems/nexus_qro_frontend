"use client"

import { VentureProjectSummary } from "@/types/projects";
import styles from "./projectsList.module.css";
import { formatDate } from "@/utils/projectFormat";
import { useRouter } from "next/navigation";


interface Props {
  projects: VentureProjectSummary[];
}

export function ProjectList({ projects }: Props) {
  const router = useRouter();
  if (!projects || projects.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay proyectos asociados a este emprendimiento</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
        <h3 className={styles.title}>Proyectos</h3>

        <div className={styles.list}>
            {projects.map((project) => (
            <div key={project.id} className={styles.card}>
                
                <h4 className={styles.name}>
                {project.nombre_proyecto}
                </h4>

                {project.fecha_inicio && (
                <span className={styles.dateTag}>
                📅 {formatDate(project.fecha_inicio)}
                </span>
                )}

                {project.descripcion && (
                <p className={styles.description}>
                    {project.descripcion}
                </p>
                )}

                {project.estado && (
                <span className={styles.status}>
                    {project.estado}
                </span>
                )}

                <div className={styles.actions}>
                  <button
                    className={styles.detailButton}
                    onClick={() => router.push(`/projects/${project.id}`)}
                  >
                    Ver detalle
                  </button>
                </div>
            </div>
            ))}
        </div>
    </section>
  );
}