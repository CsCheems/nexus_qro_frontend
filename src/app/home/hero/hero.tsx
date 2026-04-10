"use client";

import React from "react";
import style from "./hero.module.css";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className={style.section}>
      {/* Background */}
      <div className={style.bg}>
        <div className={style.grid} />
        <div className={style.gradTopRight} />
        <div className={style.gradBottomLeft} />

        <svg className={style.network} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="node-gradient">
                <stop offset="0%" stopColor="#2562EA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2562EA" stopOpacity="0.3" />
                </radialGradient>
            </defs>

            <line x1="10%" y1="20%" x2="30%" y2="40%" className={style.line} />
            <line x1="30%" y1="40%" x2="50%" y2="30%" className={style.line} />
            <line x1="50%" y1="30%" x2="70%" y2="50%" className={style.line} />
            <line x1="70%" y1="50%" x2="85%" y2="35%" className={style.line} />
            <circle cx="10%" cy="20%" r="4" fill="url(#node-gradient)" />
            <circle cx="30%" cy="40%" r="6" fill="url(#node-gradient)" />
            <circle cx="50%" cy="30%" r="5" fill="url(#node-gradient)" />
            <circle cx="70%" cy="50%" r="7" fill="url(#node-gradient)" />
            <circle cx="85%" cy="35%" r="4" fill="url(#node-gradient)" />

            <line x1="10%" y1="75%" x2="30%" y2="55%" className={style.line} />
            <line x1="30%" y1="55%" x2="50%" y2="50%" className={style.line} />
            <line x1="50%" y1="50%" x2="70%" y2="70%" className={style.line} />
            <line x1="70%" y1="70%" x2="85%" y2="65%" className={style.line} />
            <circle cx="10%" cy="75%" r="6" fill="url(#node-gradient)" />
            <circle cx="30%" cy="55%" r="4" fill="url(#node-gradient)" />
            <circle cx="50%" cy="50%" r="4" fill="url(#node-gradient)" />
            <circle cx="70%" cy="70%" r="4" fill="url(#node-gradient)" />
            <circle cx="85%" cy="65%" r="6" fill="url(#node-gradient)" />
        </svg>
      </div>

      <div className={style.contentWrap}>
        <div className={style.content}>

          <div className={style.badge}>
            <Sparkles className={style.badgeIcon} />
            <span className={style.badgeText}>
              Plataforma de Innovación Tecnológica
            </span>
          </div>

          <h1 className={style.title}>
            Conectando Innovación,
            <br />
            <span className={style.titleGradient}>
              Academia e Industria
            </span>
          </h1>

          <p className={style.subtitle}>
            IngeniCCa impulsa la transformación tecnológica mediante la
            vinculación estratégica entre el sector académico, industrial y gubernamental.
          </p>

          <div className={style.ctaRow}>
            <button className={style.primaryBtn}>
              <span>Explorar Plataforma</span>
              <ArrowRight className={style.primaryBtnIcon} />
            </button>

            <button className={style.secondaryBtn}>
              Solicitar Consultoría
            </button>
          </div>

          <div className={style.stats}>
            <div className={style.stat}>
              <div className={style.statNumber}>50+</div>
              <div className={style.statLabel}>Proyectos Activos</div>
            </div>

            <div className={`${style.stat} ${style.statMiddle}`}>
              <div className={style.statNumber}>20+</div>
              <div className={style.statLabel}>Empresas Vinculadas</div>
            </div>

            <div className={style.stat}>
              <div className={style.statNumber}>100+</div>
              <div className={style.statLabel}>Profesionales</div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.bottomFade} />
    </section>
  );
}