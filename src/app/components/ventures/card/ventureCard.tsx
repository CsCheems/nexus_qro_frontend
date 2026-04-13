"use client"

import React from 'react';
import Link from 'next/link';

import {
  Calendar,
  Mail,
  Phone,
  HandCoins,
  Briefcase,
  Clock,
  CheckCircle2,
  Lightbulb
} from "lucide-react";

import styles from "./ventureCard.module.css";

import type { Venture, VentureStage } from '@/types/ventures';
import { formatDate, truncateText } from '@/utils/projectFormat';

interface VentureCardProps {
    venture: Venture;
    isVenturer: boolean;
    showFullCardInfo: boolean;
}

export default function ventureCard({
    venture,
    isVenturer,
    showFullCardInfo
} : VentureCardProps){
    const getStageClass = (stage: VentureStage) => {
         switch(stage){
            case "Idea":
                return styles.statusActive;
            case "Formalización":
                return styles.statusCompleted;
            case "Operación":
                return styles.statusPlanning;
            default:
                return styles.statusDefault;
        }
    };

    const getStageIcon = ( stage: VentureStage) => {
        switch(stage){
            case "Idea":
                return <Lightbulb size={16} />;
            case "Formalización":
                return <CheckCircle2 size={16} />;
            case "Operación":
                return <Clock size={16} />;
            default:
                return <Briefcase size={16} />;
        }
    };

    return(
         <article className={styles.projectCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderTop}>
          <div className={styles.cardHeaderLeft}>
            <span
              className={`${styles.statusBadge} ${getStageClass(
                venture.venture_stage
              )}`}
            >
              {getStageIcon(venture.venture_stage)}
              <span>{venture.venture_stage}</span>
            </span>
          </div>
        </div>

        <h3 className={styles.cardTitle}>
          <Link href={`/ventures/${venture.id}`}>
            {venture.nombre}
          </Link>
        </h3>

        <p className={styles.cardDescription}>
          {truncateText(venture.descripcion, isVenturer ? 120 : 180)}
        </p>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaInfo}>
          <div className={styles.metaItem}>
            <Calendar size={16} />
            <span>
              {formatDate(venture.fecha_inicio)}
              {venture.fecha_fin
                ? ` - ${formatDate(venture.fecha_fin)}`
                : " - Sin fecha de cierre"}
            </span>
          </div>

          <div className={styles.metaItem}>
            <HandCoins size={16} />
            <span>
              {venture.requiere_financiammiento
                ? "Si requiere financionamiento"
                : "No requiere finaciamiento"}
            </span>
          </div>

          {!isVenturer && (
            <>
              <div className={styles.metaItem}>
                <Mail size={16} />
                <span>{venture.contacto_email}</span>
              </div>

              <div className={styles.metaItem}>
                <Phone size={16} />
                <span>{venture.contacto_telefono}</span>
              </div>
            </>
          )}
        </div>

        {showFullCardInfo && (
          <>
            {venture.requisitos && (
              <div className={styles.infoBlock}>
                <h4 className={styles.infoTitle}>Requisitos</h4>
                <p className={styles.infoText}>
                  {truncateText(venture.requisitos, 100)}
                </p>
              </div>
            )}

            {venture.beneficios && (
              <div className={styles.infoBlock}>
                <h4 className={styles.infoTitle}>Beneficios</h4>
                <p className={styles.infoText}>
                  {truncateText(venture.beneficios, 100)}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className={styles.cardFooter}>
        <Link
          href={`/ventures/${venture.id}`}
          className={styles.detailsButton}
        >
          Ver detalles →
        </Link>
      </div>
    </article>
  ); 
}

