"use client";

import { useEffect, useState } from "react";
import styles from "./VentureDetalle.module.css";
import { getVentureById } from "@/services/ventureService";

import type { VentureDetail, RoadmapStage } from "@/types/ventures";

interface Props {
  id: string;
}

export default function VentureDetalle({ id }: Props) {
  const [venture, setVenture] = useState<VentureDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchVenture = async () => {
        try {
            const data = await getVentureById(id);
            setVenture(data);
        } catch (err) {
            console.error(err);
        }finally{
            setLoading(false);
        }
  };

  fetchVenture();
}, [id]);

  const calculateProgress = (stage: RoadmapStage) => {
    const total = stage.objetivos.length;
    const completed = stage.objetivos.filter(o => o.completado).length;

    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  if (loading) return <p>Cargando...</p>;
  if (!venture) return <p>No encontrado</p>;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1>{venture.nombre}</h1>
        <p>{venture.descripcion}</p>
      </div>

      {/* ROADMAP */}
      <div className={styles.roadmap}>
        {venture.roadmap?.map((stage) => {
          const progress = calculateProgress(stage);

          return (
            <div
              key={stage.orden}
              className={`${styles.stage} ${
                stage.esActual ? styles.active : ""
              }`}
            >
              <h3>{stage.nombre}</h3>

              {/* PROGRESS SOLO SI ES ACTUAL */}
              {stage.esActual && (
                <>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className={styles.progressText}>
                    {progress}% completado
                  </span>

                  {/* OBJETIVOS */}
                  <ul className={styles.objectives}>
                    {stage.objetivos.map((obj) => (
                      <li
                        key={obj.id}
                        className={
                          obj.completado
                            ? styles.completed
                            : styles.pending
                        }
                      >
                        {obj.nombre}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}