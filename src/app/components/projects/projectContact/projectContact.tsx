
import styles from "./projectContact.module.css";
import { User, Mail, Phone } from "lucide-react";

interface ContactInfo{
    email: string;
    phone: string;
}

export function ProjectContact({email, phone} : ContactInfo) {
  return (
    <section className={styles.card}>
        <div className={styles.sectionTitle}>
        <User size={18} />
        <h2>Información de contacto</h2>
        </div>

        <div className={styles.contactList}>
        <div className={styles.contactItem}>
            <Mail size={16} />
            <div>
            <p className={styles.contactLabel}>Correo electrónico</p>
            <a
                href={`mailto:${email}`}
                className={styles.contactValue}
            >
                {email}
            </a>
            </div>
        </div>

        <div className={styles.contactItem}>
            <Phone size={16} />
            <div>
            <p className={styles.contactLabel}>Teléfono</p>
            <a
                href={`tel:${phone}`}
                className={styles.contactValue}
            >
                {phone}
            </a>
            </div>
        </div>
        </div>
    </section>
  )
}
