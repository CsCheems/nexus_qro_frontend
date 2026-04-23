import styles from "./stageProgress.module.css";

import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { VentureTaskStatus,VentureTask } from "@/types/ventures";
import { completeTask } from "@/services/taskService";
import { useParams } from "next/navigation";

interface Task {
  id: string;
  title: string;
  status: VentureTaskStatus;
}

interface StageProgressProps {
  stageName: string;
  progress: number;
  objective?: string;
  tasks: VentureTask[];
  onTaskClick?: (task: VentureTask) => void;
}

const statusConfig = {
  completa: {
    icon: CheckCircle2,
    className: styles.completed,
    text: styles.textCompleted,
    iconColor: styles.iconCompleted,
  },
  "en progreso": {
    icon: AlertCircle,
    className: styles.inProgress,
    text: styles.textDefault,
    iconColor: styles.iconInProgress,
  },
  pendiente: {
    icon: Circle,
    className: styles.pending,
    text: styles.textDefault,
    iconColor: styles.iconPending,
  },
};

export function StageProgress({
  stageName,
  progress,
  tasks,
  onTaskClick,
}: StageProgressProps) {
  console.log(tasks);
  const params = useParams();
  const ventureId = params.id as string;

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(ventureId, taskId);
      // refrescar datos
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={styles.container}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{stageName}</h2>
        <span className={styles.percentage}>{progress}%</span>
      </div>

      <div className={styles.progressBar}>
        <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => {
          const config = statusConfig[task.status];
          const Icon = config.icon;

          return (
            <div
              key={task.id}
              className={`${styles.taskItem} ${config.className}`}
            >
              <Icon
                className={`${styles.icon} ${config.iconColor}`}
              />

              <span
                className={`${styles.taskText} ${config.text}`}
              >
                {task.title}
              </span>

               {task.status !== "completa" && (task.hasEvidence || task.status === "en progreso") && (
                <button
                  className={styles.completeButton}
                  onClick={() => handleCompleteTask(task.id)}
                >
                  Completar
                </button>
              )}

              <button
                type="button"
                className={styles.detailButton}
                onClick={() => onTaskClick?.(task)}
              >
                Ver detalle
              </button>
             
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}