import styles from "./consultingRequestList.module.css";

import { Plus } from "lucide-react";
import { ConsultingRequestCard } from "../consultingRequestCard/consultingRequestCard";
import { ConsultingRequestStatus } from "@/types/ventures";

interface ConsultingRequest {
  id: string;
  type: string;
  description: string;
  status: ConsultingRequestStatus;
  date: string;
  consultant?: string;
}

interface ConsultingRequestListProps {
  requests: ConsultingRequest[];
  onNewRequest: () => void;
}

export function ConsultingRequestList({
  requests,
  onNewRequest,
}: ConsultingRequestListProps) {
  const isEmpty = requests.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Solicitudes de asesoría</h2>

        {!isEmpty && (
          <button onClick={onNewRequest} className={styles.primaryButton}>
            <Plus className={styles.icon} />
            Nueva solicitud
          </button>
        )}
      </div>

      {/* Content */}
      {isEmpty ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            No tienes solicitudes de asesoría
          </p>

          <button
            onClick={onNewRequest}
            className={styles.emptyButton}
          >
            Crear primera solicitud
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {requests.map((request) => (
            <ConsultingRequestCard
              key={request.id}
              request={request}
            />
          ))}
        </div>
      )}
    </div>
  );
}