"use client"
import { useState } from "react";
import styles from "./consultingRequestDialog.module.css";
import { ConsultantServiceCard } from "../consultantServiceCard/consultantServiceCard";
import { ConsultantService } from "@/types/consultant";
import { getConsultantsByServiceCode } from "@/services/consultantService";

interface ConsultingRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { 
    service_id: number; 
    consultant_id: number; 
    description: string 
  }) => void;
}

const consultingTypes = [
  { value: "", label: "Selecciona un servicio"},
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
  const [consultants, setConsultants] = useState<ConsultantService[]>([]);
  const [loadingConsultants, setLoadingConsultants] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);

  if (!open) return null;

  const handleServiceChange = async (value: string) => {
    setSelectedType(value);
    setSelectedConsultant(null);
    setConsultants([]);

    if(!value) return;

    try{
      setLoadingConsultants(true);

      const res = await getConsultantsByServiceCode(value);

      setConsultants(res.consultants || []);
      setServiceId(res.service?.id || null);
    }catch(error: any){
      console.error("Error al cargar consultores", error);
    }finally{
      setLoadingConsultants(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || !selectedConsultant || !description.trim()) {
      alert("Completa todos los campos y selecciona un consultor");
      return;
    }

    onSubmit({
      service_id: serviceId,
      consultant_id: selectedConsultant,
      description: description.trim(),
    });

    setDescription("");
    setSelectedType("");
    setSelectedConsultant(null);
    setConsultants([]);
    setServiceId(null);

    onOpenChange(false);
  };

  return (
    <div className={styles.overlay} onClick={() => onOpenChange(false)}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >

        <div className={styles.header}>
          <h2 className={styles.title}>Nueva solicitud de asesoría</h2>
          <p className={styles.description}>
            Describe el tipo de ayuda que necesitas y un mentor especializado se pondrá en contacto contigo.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="type" className={styles.label}>
                Tipo de asesoría
              </label>
              <select
                id="type"
                value={selectedType}
                onChange={(e) => handleServiceChange(e.target.value)}
                className={styles.select}
              >
                {consultingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedType && (
              <div className={styles.consultantsSection}>

                <h3 className={styles.sectionTitle}>
                  Consultores disponibles
                </h3>

                {loadingConsultants ? (
                  <p className={styles.loading}>Cargando consultores...</p>
                ) : consultants.length === 0 ? (
                  <p className={styles.empty}>
                    No hay consultores disponibles para este servicio
                  </p>
                ) : (
                  <div className={styles.consultantsGrid}>
                    {consultants.map((consultant) => (
                      <ConsultantServiceCard
                        key={consultant.consultant_id}
                        consultant={consultant}
                        selected={selectedConsultant === consultant.consultant_id}
                        onSelect={() =>
                          setSelectedConsultant(consultant.consultant_id)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

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