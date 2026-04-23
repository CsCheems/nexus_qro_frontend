"use client";

import { useState, useEffect } from "react";
import styles from "./taskDetalleModal.module.css";
import type { VentureTask } from "@/types/ventures";
import { getEvidencesByTask, createEvidence, uploadEvidenceFile } from "@/services/taskService";
import { useToast } from "../../toast/toast";
import { VentureTaskStatus } from "@/types/ventures";

interface Props {
  open: boolean;
  task: VentureTask | null;
  ventureId: string;
  onClose: () => void;
  onTaskStatusChange?: (taskId: string, status: VentureTaskStatus) => void;
  onTaskUpdate: () => void;
}

export function TaskDetalleModal({
  open,
  task,
  ventureId,
  onClose,
  onTaskStatusChange, 
  onTaskUpdate
}: Props) {
  
  const toast = useToast();
  const [tipo, setTipo] = useState("texto");
  const [file, setFile] = useState<File | null>(null);
  const [descripcion, setDescripcion] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [evidences, setEvidences] = useState<any[]>([]);
  const [loadingEvidences, setLoadingEvidences] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
      if (!task) return;

      const load = async () => {
        try {
            setLoadingEvidences(true);

            const data = await getEvidencesByTask(
              ventureId,
              task.id
            );
             onTaskUpdate();
            setEvidences(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingEvidences(false);
        }
      };

      load();
  }, [task, ventureId]);

  if (!open || !task) return null;

  const isCompleted = task?.autoCompleted || task?.status === "completa";

  const handleSubmit = async () => {
    try {
        await createEvidence({
          venture_id: ventureId,
          task_key: task.id,
          tipo,
          descripcion,
          url,
        });

        
        onTaskUpdate();
        setDescripcion("");
        setUrl("");
        toast.success("Evidencia cargada con exito");
        onClose();
    } catch (err: any) {
        toast.error(err.message)
    }
  };

  const handleUpload = async () => {
    if (!file || !task) return;

    try {
        setLoadingUpload(true);
        await uploadEvidenceFile({
          venture_id: ventureId,
          task_key: task.id,
          descripcion,
          file,
        });

        onTaskUpdate();
        setFile(null);
        setDescripcion("");
        onClose();

    } catch (err) {
        console.error(err);
    } finally {
        setLoadingUpload(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{task.title}</h2>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>
            {task.description || "Sin descripción disponible"}
          </p>

          {isCompleted ? (
            <div className={styles.completedMessage}>
              Esta tarea ya ha sido completada.
            </div>
          ) : (
            <div className={styles.uploadSection}>

             <div className={styles.evidenceSection}>
  
                <h4>Evidencias</h4>

                {loadingEvidences && <p>Cargando...</p>}

                {!loadingEvidences && evidences.length === 0 && (
                  <p>No hay evidencias aún</p>
                )}

                {evidences.map((ev) => (
                  <div key={ev.id} className={styles.evidenceItem}>
                    <span>{ev.tipo}</span>

                    {ev.descripcion && <p>{ev.descripcion}</p>}

                    {ev.archivo_url && (
                      <a href={ev.archivo_url} target="_blank">
                        Ver archivo
                      </a>
                    )}
                  </div>
                ))}

                {!isCompleted && (
                    <div className={styles.uploadSection}>
                      
                      <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <option value="texto">Texto</option>
                        <option value="url">URL</option>
                        <option value="archivo">Archivo</option>
                      </select>

                      {tipo === "texto" && (
                        <textarea
                          placeholder="Describe tu avance..."
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                        />
                      )}

                      {tipo === "url" && (
                        <input
                          type="text"
                          placeholder="https://..."
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      )}

                      {tipo === "archivo" && (
                        <>
                          <input
                            type="file"
                            onChange={handleFileChange} 
                          />

                          {file && (
                            <p>Archivo seleccionado: {file.name}</p>
                          )}
                        </>
                      )}

                      <button
                        onClick={
                          tipo === "archivo" ? handleUpload : handleSubmit
                        }
                        disabled={loadingUpload}
                      >
                        {loadingUpload ? "Subiendo..." : "Subir evidencia"}
                      </button>
                    </div>
                  )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.secondary}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}