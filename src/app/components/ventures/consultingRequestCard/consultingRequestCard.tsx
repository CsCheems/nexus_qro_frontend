import styles from "./consultingRequestCard.module.css";

import { MessageSquare, Calendar, Clock } from "lucide-react";
import { ConsultingRequestStatus } from "@/types/ventures";

interface ConsultingRequest {
  id: string;
  type: string;
  description: string;
  status: ConsultingRequestStatus;
  date: string;
  consultant?: string;
}

interface ConsultingRequestCardProps {
  request: ConsultingRequest;
}

const statusConfig = {
  pendiente: {
    label: "Pendiente",
    className: styles.pending,
  },
  agendada: {
    label: "Agendada",
    className: styles.scheduled,
  },
  completada: {
    label: "Completada",
    className: styles.completed,
  },
};

export function ConsultingRequestCard({
  request,
}: ConsultingRequestCardProps) {
  const status = statusConfig[request.status];

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.iconWrapper}>
            <MessageSquare className={styles.icon} />
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{request.type}</h3>
            <p className={styles.description}>
              {request.description}
            </p>
          </div>
        </div>

        {/* Badge reemplazado */}
        <span className={`${styles.badge} ${status.className}`}>
          {status.label}
        </span>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.metaItem}>
          <Calendar className={styles.smallIcon} />
          <span>{request.date}</span>
        </div>

        {request.consultant && (
          <div className={styles.metaItem}>
            <Clock className={styles.smallIcon} />
            <span>{request.consultant}</span>
          </div>
        )}
      </div>
    </div>
  );
}