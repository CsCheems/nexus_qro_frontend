import { useState, useEffect } from "react";
import styles from "./ventureInfoEditDialog.module.css";

interface VentureInfo {
  problem: string;
  solution: string;
  businessModel: string;
  targetMarket: string;
}

interface VentureInfoEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: VentureInfo;
  onSave: (data: VentureInfo) => void;
}

export function VentureInfoEditDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
}: VentureInfoEditDialogProps) {
  const [formData, setFormData] = useState<VentureInfo>(initialData);

  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.problem.trim() ||
      !formData.solution.trim() ||
      !formData.businessModel.trim() ||
      !formData.targetMarket.trim()
    ) {
      return;
    }

    onSave({
      problem: formData.problem.trim(),
      solution: formData.solution.trim(),
      businessModel: formData.businessModel.trim(),
      targetMarket: formData.targetMarket.trim(),
    });

    onOpenChange(false);
  };

  const updateField = (field: keyof VentureInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.overlay} onClick={() => onOpenChange(false)}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Editar información del venture
          </h2>
          <p className={styles.description}>
            Actualiza los detalles clave de tu emprendimiento.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="problem" className={styles.label}>
                Problema
              </label>
              <textarea
                id="problem"
                value={formData.problem}
                onChange={(e) =>
                  updateField("problem", e.target.value)
                }
                className={styles.textarea}
                placeholder="Describe el problema..."
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="solution" className={styles.label}>
                Solución
              </label>
              <textarea
                id="solution"
                value={formData.solution}
                onChange={(e) =>
                  updateField("solution", e.target.value)
                }
                className={styles.textarea}
                required
              />
            </div>

            <div className={styles.field}>
              <label
                htmlFor="businessModel"
                className={styles.label}
              >
                Modelo de negocio
              </label>
              <textarea
                id="businessModel"
                value={formData.businessModel}
                onChange={(e) =>
                  updateField("businessModel", e.target.value)
                }
                className={styles.textarea}
                required
              />
            </div>

            <div className={styles.field}>
              <label
                htmlFor="targetMarket"
                className={styles.label}
              >
                Mercado objetivo
              </label>
              <textarea
                id="targetMarket"
                value={formData.targetMarket}
                onChange={(e) =>
                  updateField("targetMarket", e.target.value)
                }
                className={styles.textarea}
                required
              />
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
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}