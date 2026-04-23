import styles from "./ventureHeader.module.css";
import { Building2, Calendar, Users } from "lucide-react";

import type { VentureStage } from "@/types/ventures";

interface VentureHeaderProps {
  name: string;
  description: string;
  stage: VentureStage;
  sector: string;
  foundedDate: string;
  teamSize: number;
  onRequestConsulting: () => void;
  onCreateProject: () => void;
}

const stageConfig: Record<
  VentureStage,
  { label: string; className: string }
> = {
  Idea: {
    label: "Idea",
    className: styles.stageIdea,
  },
  "Validación": {
    label: "Validación",
    className: styles.stageValidacion,
  },
  "Modelo de Negocio": {
    label: "Modelo de Negocio",
    className: styles.stageModelo,
  },
  "Formalización": {
    label: "Formalización",
    className: styles.stageFormalizacion,
  },
  "Comercialización": {
    label: "Comercialización",
    className: styles.stageComercializacion,
  },
  "Operación": {
    label: "Operación",
    className: styles.stageOperacion,
  },
  "Escalamiento": {
    label: "Escalamiento",
    className: styles.stageEscalamiento,
  },
  "Internacionalización": {
    label: "Internacionalización",
    className: styles.stageInternacionalizacion,
  },
};

export function VentureHeader({
  name,
  description,
  stage,
  sector,
  foundedDate,
  teamSize,
  onRequestConsulting,
  onCreateProject,
}: VentureHeaderProps) {
  const stageInfo = stageConfig[stage];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topSection}>
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{name}</h1>

              <span className={`${styles.badge} ${stageInfo.className}`}>
                {stageInfo.label}
              </span>

              <span className={`${styles.badge} ${styles.sector}`}>
                {sector}
              </span>
            </div>

            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.actions}>
            <button
              onClick={onRequestConsulting}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Solicitar asesoría
            </button>

            <button
              onClick={onCreateProject}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              Crear proyecto
            </button>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Calendar className={styles.icon} />
            <span>Fundado: {foundedDate}</span>
          </div>

          <div className={styles.metaItem}>
            <Users className={styles.icon} />
            <span>{teamSize} miembros</span>
          </div>

          <div className={styles.metaItem}>
            <Building2 className={styles.icon} />
            <span>{sector}</span>
          </div>
        </div>
      </div>
    </div>
  );
}