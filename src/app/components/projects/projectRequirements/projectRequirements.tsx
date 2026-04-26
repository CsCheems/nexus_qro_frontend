import styles from "./projectRequirementes.module.css";
import { ClipboardList } from 'lucide-react';

interface Requirements{
    requirements: string;
}

export function ProjectRequirements({requirements}: Requirements) {
  return (
    <section className={styles.card}>
        <div className={styles.sectionTitle}>
            <ClipboardList size={18} />
            <h2>Requisitos</h2>
        </div>

        {requirements ? (
            <p className={styles.paragraph}>{requirements}</p>
            ) : (
            <p className={styles.emptyText}>
                Este proyecto no tiene requisitos registrados por el momento.
            </p>
        )}
    </section>
  );
}
