import { useState } from "react";
import styles from "./consultingRequestDialog.module.css";

interface ConsultingRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { type: string; description: string }) => void;
}

const consultingTypes = [
  { value: "tech", label: "Asesoría técnica" },
  { value: "business", label: "Estrategia de negocio" },
  { value: "legal", label: "Legal y regulatorio" },
  { value: "finance", label: "Finanzas y contabilidad" },
  { value: "marketing", label: "Marketing y ventas" },
  { value: "product", label: "Desarrollo de producto" },
];

export function ConsultingRequestDialog({
  open,
  onOpenChange,
  onSubmit,
}: ConsultingRequestDialogProps) {

  const [selectedType, setSelectedType] = useState(consultingTypes[0].value);
  const [description, setDescription] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) return;

    onSubmit({
      type: selectedType,
      description: description.trim(),
    });

    setDescription("");
    setSelectedType(consultingTypes[0].value);
    onOpenChange(false);
  };

  return (
    <div className={styles.overlay} onClick={() => onOpenChange(false)}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>Nueva solicitud de asesoría</h2>
          <p className={styles.description}>
            Describe el tipo de ayuda que necesitas y un mentor especializado se pondrá en contacto contigo.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            {/* Tipo */}
            <div className={styles.field}>
              <label htmlFor="type" className={styles.label}>
                Tipo de asesoría
              </label>

              <select
                id="type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={styles.select}
              >
                {consultingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Descripción */}
            <div className={styles.field}>
              <label htmlFor="description" className={styles.label}>
                Descripción
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe en detalle qué tipo de ayuda necesitas..."
                className={styles.textarea}
                required
              />

              <p className={styles.helper}>
                Proporciona el mayor detalle posible para que el mentor pueda prepararse adecuadamente.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className={styles.footer}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}