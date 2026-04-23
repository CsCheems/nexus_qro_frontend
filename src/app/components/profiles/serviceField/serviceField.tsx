import styles from "../additionalInfo/additionalInfo.module.css";

interface ServicesFieldProps {
  services?: {
    id: number;
    nombre: string;
  }[];
}



export function ServiceField({ services }: ServicesFieldProps) {
  return (
    <div className={styles.field}>
      <label>Servicios</label>

      <div className={styles.servicesContainer}>
        {services && services.length > 0 ? (
          services.map((s) => (
            <span key={s.id} className={styles.serviceTag}>
              {s.nombre}
            </span>
          ))
        ) : (
          <span className={styles.empty}>No definidos</span>
        )}
      </div>
    </div>
  );
}