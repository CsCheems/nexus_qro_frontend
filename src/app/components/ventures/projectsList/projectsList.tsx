import { VentureProjectSummary } from "@/types/projects";
import styles from "./projectsList.module.css";
import { formatDate } from "@/utils/projectFormat";


interface Props {
  projects: VentureProjectSummary[];
}

export function ProjectList({ projects }: Props) {
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
            </div>
            ))}
        </div>
    </section>
  );
}