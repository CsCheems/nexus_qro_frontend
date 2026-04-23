import styles from "./progressTimeLine.module.css";

import { CheckCircle2, Circle, Lock } from "lucide-react";

import type { VentureStageStatus, VentureStage } from "@/types/ventures";



interface Stage {
  id: string;
  name: string;
  status: VentureStageStatus;
  description: string;
}

interface ProgressTimelineProps {
  stages: Stage[];
}

const statusConfig = {
  completada: {
    container: styles.completed,
    iconColor: styles.iconCompleted,
    text: styles.textActive,
    line: styles.lineCompleted,
    icon: CheckCircle2,
  },
  actual: {
    container: styles.current,
    iconColor: styles.iconCurrent,
    text: styles.textActive,
    line: styles.lineDefault,
    icon: Circle,
  },
  bloqueada: {
    container: styles.locked,
    iconColor: styles.iconLocked,
    text: styles.textLocked,
    line: styles.lineDefault,
    icon: Lock,
  },
};

export function ProgressTimeline({ stages }: ProgressTimelineProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recorrido del Venture</h2>

      <div className={styles.timeline}>
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          const config = statusConfig[stage.status];
          const Icon = config.icon;

          return (
            <div key={stage.id} className={styles.item}>
              <div className={styles.row}>
                {/* Icon */}
                <div className={`${styles.iconWrapper} ${config.container}`}>
                  <Icon className={`${styles.icon} ${config.iconColor}`} />
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <h3 className={`${styles.stageName} ${config.text}`}>
                    {stage.name}
                  </h3>

                  <p className={`${styles.description} ${config.text}`}>
                    {stage.description}
                  </p>
                </div>
              </div>

              {/* Line */}
              {!isLast && (
                <div
                  className={`${styles.line} ${
                    stage.status === "completada"
                      ? styles.lineCompleted
                      : styles.lineDefault
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}