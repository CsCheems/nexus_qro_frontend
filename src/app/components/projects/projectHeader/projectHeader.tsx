
import styles from "./projectHeader.module.css";
import { Calendar, Activity, Briefcase, BadgeDollarSign } from "lucide-react";
import { ProjectStatus, WorkModel } from "@/types/projects";

interface ProjectHeaderProps{
    status: ProjectStatus;
    name: string; 
    description: string;
    foundedDate: string;
    endDate: string;
    workModel: WorkModel;
    monetaryHelp: boolean;
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

export function ProjectHeader({
    status,
    name, 
    description,
    foundedDate,
    endDate,
    workModel,
    monetaryHelp
}: ProjectHeaderProps){
    return(
        <section className={styles.heroCard}>
          <div className={styles.heroHeader}>
            <div className={styles.titleBlock}>
              <span className={`${styles.statusBadge} ${getStatusClass(status)}`}>
                <Activity size={14} />
                {status}
              </span>

              <h1 className={styles.title}>{name}</h1>
              <p className={styles.description}>{description}</p>
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
                  {foundedDate}
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
                  {endDate}
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
                  {workModel}
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
                  {monetaryHelp ? "Sí disponible" : "No disponible"}
                </p>
              </div>
            </div>
          </div>
        </section>
    );

}