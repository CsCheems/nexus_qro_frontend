import styles from "./ventureInfoCard.module.css";

import { Edit, Target, Lightbulb, Globe, Users } from "lucide-react";

interface VentureInfo {
  problem: string;
  solution: string;
  businessModel: string;
  targetMarket: string;
}

interface VentureInfoCardProps {
  info: VentureInfo;
  onEdit: () => void;
}

const sections = [
  {
    key: "problem" as const,
    label: "Problema",
    icon: Target,
    className: styles.problem,
  },
  {
    key: "solution" as const,
    label: "Solución",
    icon: Lightbulb,
    className: styles.solution,
  },
  {
    key: "businessModel" as const,
    label: "Tipo de cliente objetivo",
    icon: Users,
    className: styles.business,
  },
  {
    key: "targetMarket" as const,
    label: "Mercado objetivo",
    icon: Globe,
    className: styles.market,
  },
];

export function VentureInfoCard({ info, onEdit }: VentureInfoCardProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Información del Venture</h2>

        <button
          onClick={onEdit}
          className={styles.editButton}
        >
          <Edit className={styles.icon} />
          Editar
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {sections.map(({ key, label, icon: Icon, className }) => (
          <div key={key} className={styles.section}>
            <div className={styles.sectionHeader}>
              <Icon className={`${styles.sectionIcon} ${className}`} />
              <h3 className={styles.sectionTitle}>{label}</h3>
            </div>

            <p className={styles.sectionText}>
              {info[key] || "No disponible"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}