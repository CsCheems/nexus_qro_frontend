"use client";

import { useState } from "react";
import { X } from "lucide-react";
import styles from "./ventureModal.module.css";

import type { MercadoObjetivo, ValidacionClientes, VenturePayload, VentureDiagnosticoPayload } from "@/types/ventures";
import { SECTORES } from "@/constants/sectors";
import type { Sector } from "@/constants/sectors";
import { useToast } from "../../toast/toast";
import { getNames } from "country-list";
const countries = getNames().sort();

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  newVenture: VenturePayload;
  setNewVenture: React.Dispatch<React.SetStateAction<VenturePayload>>;
  newVentureDiagnostic: VentureDiagnosticoPayload;
  setNewVentureDiagnostic: React.Dispatch<React.SetStateAction<VentureDiagnosticoPayload>>;
}

export function VentureModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  newVenture,
  setNewVenture,
  newVentureDiagnostic,
  setNewVentureDiagnostic
}: Props) {
  const toast = useToast();
  const [step, setStep] = useState(1);

  if (!open) return null;

  const validateStep = () => {
    switch (step) {
      case 1:
        if (
          !newVenture.nombre.trim() ||
          !newVenture.descripcion.trim() ||
          !newVenture.sector.trim() ||
          !newVenture.industria.trim() ||
          !newVenture.pais.trim() ||
          !newVenture.fecha_inicio
        ) {
          toast.error("Completa todos los campos del paso 1");
          return false;
        }
        return true;

      case 2:
        if (
          !newVenture.problema_que_resuelve.trim() ||
          !newVenture.propuesta_valor.trim()
        ) {
          toast.error("Completa todos los campos del paso 2");
          return false;
        }
        return true;

      case 3:
        if (
          newVentureDiagnostic.tamano_equipo === undefined ||
          newVentureDiagnostic.tamano_equipo < 1 ||
          !newVentureDiagnostic.tipo_cliente_objetivo.trim() ||
          !newVentureDiagnostic.alcance_geografico ||
          !newVentureDiagnostic.validacion_clientes
        ) {
          toast.error("Completa todos los campos del paso 3");
          return false;
        }
        return true;

      case 4:
        if (
          newVentureDiagnostic.tiene_ventas &&
          !newVentureDiagnostic.tiene_mvp
        ) {
          toast.error("No puedes tener ventas sin MVP");
          return false;
        }

        return true;

      case 5:
        if (
          newVentureDiagnostic.requiere_financiamiento &&
          (
            newVentureDiagnostic.monto_estimado_financiamiento === undefined ||
            newVentureDiagnostic.monto_estimado_financiamiento === null ||
            newVentureDiagnostic.monto_estimado_financiamiento <= 0
          )
        ) {
          toast.error("Ingresa un monto válido");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Diagnóstico de Emprendimiento</h2>

          <button type="button" onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (!validateStep()) return;
          onSubmit(e);
        }} className={styles.modalForm}>
          <div className={styles.formGrid}>

            {step === 1 && (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Nombre</label>
                  <input
                    type="text"
                    value={newVenture.nombre}
                    onChange={(e) =>
                      setNewVenture((prev) => ({
                        ...prev,
                        nombre: e.target.value,
                      }))
                    }
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Descripción</label>
                  <textarea
                    value={newVenture.descripcion}
                    onChange={(e) =>
                      setNewVenture((prev) => ({
                        ...prev,
                        descripcion: e.target.value,
                      }))
                    }
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Sector</label>
                 <select
                    value={newVenture.sector}
                    onChange={(e) =>
                      setNewVenture((prev) => ({
                        ...prev,
                        sector: e.target.value as Sector,
                      }))
                    }
                    className={styles.select}
                  >
                    <option value="">Selecciona</option>
                    {SECTORES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Industria</label>
                  <input
                    type="text"
                    value={newVenture.industria}
                    onChange={(e) =>
                      setNewVenture((prev) => ({
                        ...prev,
                        industria: e.target.value,
                      }))
                    }
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Pais</label>
                  <select
                    value={newVenture.pais || "México"}
                    onChange={(e) =>
                      setNewVenture((prev) => ({
                        ...prev,
                        pais: e.target.value,
                      }))
                    }
                    className={styles.select}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Fecha inicio</label>
                    <input
                    type="date"
                    value={newVenture.fecha_inicio ?? ""}
                    onChange={(e) =>
                        setNewVenture((prev) => ({
                        ...prev,
                        fecha_inicio: e.target.value,
                        }))
                    }
                    className={styles.input}
                    required
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Fecha fin</label>
                    <input
                    type="date"
                    value={newVenture.fecha_fin ?? ""}
                    onChange={(e) =>
                        setNewVenture((prev) => ({
                        ...prev,
                        fecha_fin: e.target.value,
                        }))
                    }
                    className={styles.input}
                    />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Problema que resuelve</label>
                  <textarea
                    value={newVenture.problema_que_resuelve}
                    onChange={(e) =>
                      setNewVenture((prev) => ({
                        ...prev,
                        problema_que_resuelve: e.target.value,
                      }))
                    }
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Propuesta de valor</label>
                  <textarea
                    value={newVenture.propuesta_valor}
                    onChange={(e) =>
                      setNewVenture((prev) => ({
                        ...prev,
                        propuesta_valor: e.target.value,
                      }))
                    }
                    className={styles.textarea}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.field}>
                  <label>Tamaño del equipo</label>
                  <input
                    type="number"
                    min={1}
                    value={newVentureDiagnostic.tamano_equipo ?? ""}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        tamano_equipo: e.target.value === "" ? undefined : Number(e.target.value),
                      }))
                    }
                  />
                </div>

                 <div className={styles.field}>
                  <label>Tipo de cliente objetivo</label>
                  <input
                    value={newVentureDiagnostic.tipo_cliente_objetivo}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        tipo_cliente_objetivo: e.target.value
                      }))
                    }
                  />
                </div>

                <div className={styles.field}>
                  <label>Alcance geográfico</label>
                  <select
                    value={newVentureDiagnostic.alcance_geografico}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        alcance_geografico: e.target.value as MercadoObjetivo
                      }))
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="nacional">Nacional</option>
                    <option value="internacional">Internacional</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>Validación de clientes</label>
                  <select
                    value={newVentureDiagnostic.validacion_clientes}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        validacion_clientes: e.target.value as ValidacionClientes
                      }))
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="nula">Nula</option>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className={styles.field}>
                  <label>¿Tienes MVP?</label>
                  <select
                    value={String(newVentureDiagnostic.tiene_mvp)}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        tiene_mvp: e.target.value === ""
                      }))
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>¿Tienes ventas?</label>
                  <select
                    value={String(newVentureDiagnostic.tiene_ventas)}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        tiene_ventas: e.target.value === ""
                      }))
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label>¿Está formalizado?</label>
                  <select
                    value={String(newVentureDiagnostic.formalizado)}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        formalizado: e.target.value === ""
                      }))
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                <div className={styles.fieldFull}>
                  <label>Sitio web</label>
                  <input
                    value={newVentureDiagnostic.sitio_web_url || ""}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        sitio_web_url: e.target.value
                      }))
                    }
                  />
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className={styles.field}>
                  <label>¿Requiere financiamiento?</label>
                  <select
                    value={String(newVentureDiagnostic.requiere_financiamiento)}
                    onChange={(e) =>
                      setNewVentureDiagnostic(prev => ({
                        ...prev,
                        requiere_financiamiento: e.target.value === ""
                      }))
                    }
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                {newVentureDiagnostic.requiere_financiamiento && (
                  <div className={styles.field}>
                    <label>Monto estimado</label>
                    <input
                      type="number"
                      value={newVentureDiagnostic.monto_estimado_financiamiento ?? ""}
                      onChange={(e) =>
                        setNewVentureDiagnostic(prev => ({
                          ...prev,
                          monto_estimado_financiamiento:
                            e.target.value === "" ? undefined : Number(e.target.value)
                        }))
                      }
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <div className={styles.modalActions}>
            {step > 1 && (
              <button type="button" onClick={prevStep} className={styles.submitButton}>
                Anterior
              </button>
            )}

            {step < 5 ? (
              <button type="button" onClick={nextStep} className={styles.submitButton}>
                Siguiente
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting}  className={styles.submitButton}>
                {isSubmitting ? "Creando..." : "Registrar Emprendimiento"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}