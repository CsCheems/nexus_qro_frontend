import styles from "./projectBenefits.module.css";
import { ClipboardList } from 'lucide-react';

interface Benefits{
    benefits: string;
}

export function ProjectBenefits({benefits}: Benefits) {
  return (
    <section className={styles.card}>
        <div className={styles.sectionTitle}>
            <ClipboardList size={18} />
            <h2>Beneficios</h2>
        </div>

        {benefits ? (
            <p className={styles.paragraph}>{benefits}</p>
            ) : (
            <p className={styles.emptyText}>
                Este proyecto no tiene requisitos registrados por el momento.
            </p>
        )}
    </section>
  );
}
