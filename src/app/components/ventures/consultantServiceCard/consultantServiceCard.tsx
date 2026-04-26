import styles from "./consultantServiceCard.module.css";
import { ConsultantService } from "@/types/consultant";

interface Props{
    consultant: ConsultantService;
    selected?: boolean;
    onSelect: () => void;
}

export function ConsultantServiceCard({
    consultant,
    selected = false,
    onSelect
}: Props){
    return(
        <div className={`${styles.card} ${selected ? styles.select : ""}`} onClick={onSelect}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    {consultant.nombre?.charAt(0).toUpperCase()}
                </div>
                <div className={styles.info}>
                    <h4 className={styles.name}>{consultant.nombre}</h4>
                    {(consultant.puesto || consultant.empresa) && (
                        <p className={styles.meta}>
                            {consultant.puesto} {consultant.empresa && `· ${consultant.empresa}`}
                        </p>
                    )}
                </div>
            </div>
            <div className={styles.body}>
                {consultant.servicio && (
                <span className={styles.badge}>{consultant.servicio}</span>
                )}

                <div className={styles.details}>
                {consultant.anios_experiencia !== undefined && (
                    <span className={styles.detail}>
                        {consultant.anios_experiencia} años de experiencia
                    </span>
                )}

                {consultant.tarifa_hora !== undefined && (
                    <span className={styles.detail}>
                        ${consultant.tarifa_hora}/hr
                    </span>
                )}
                </div>
            </div>

            <div className={styles.footer}>
                <button
                    type="button"
                    className={styles.selectButton}
                >
                    {selected ? "Seleccionado" : "Seleccionar"}
                </button>
            </div>                

        </div>
    )
}