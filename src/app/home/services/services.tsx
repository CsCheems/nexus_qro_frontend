"use client";

import React from "react";
import style from "./services.module.css";
import { Radio, Code, Link2, Globe } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Consultoría Tecnológica",
    description:
      "Asesoría estratégica en transformación digital, evaluación de tecnologías emergentes y diseño de arquitecturas escalables para su organización.",
    features: ["Análisis de madurez digital", "Roadmap tecnológico", "Arquitectura de soluciones"],
  },
  {
    icon: Radio,
    title: "Desarrollo IoT (Mioty)",
    description:
      "Implementación de soluciones IoT basadas en Mioty (LPWAN) para aplicaciones industriales, urbanas y de monitoreo con alcance extendido y bajo consumo.",
    features: ["Sensores inalámbricos", "Redes LPWAN", "Dashboards en tiempo real"],
  },
  {
    icon: Link2,
    title: "Vinculación Académica",
    description:
      "Conexión estratégica entre universidades, centros de investigación y empresas para proyectos de I+D+i, transferencia tecnológica y desarrollo conjunto.",
    features: ["Proyectos colaborativos", "Transferencia tecnológica", "Formación especializada"],
  },
  {
    icon: Code,
    title: "Plataforma Digital",
    description:
      "Acceso a nuestra PWA escalable que integra herramientas de gestión de proyectos, networking profesional y recursos para la innovación tecnológica.",
    features: ["Gestión de proyectos", "Red profesional", "Recursos compartidos"],
  },
];

export default function Services() {
  return (
    <section id="servicios" className={style.section}>
      <div className={style.container}>
        {/* Header */}
        <div className={style.header}>
          <div className={style.badge}>
            <span className={style.badgeText}>Nuestros Servicios</span>
          </div>

          <h2 className={style.title}>Soluciones integrales para la innovación</h2>

          <p className={style.subtitle}>
            Ofrecemos un ecosistema completo de servicios tecnológicos diseñados para impulsar la
            competitividad y modernización de organizaciones.
          </p>
        </div>


        <div className={style.grid}>
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div key={index} className={style.card}>

                <div className={style.topBar} />

                <div className={style.iconBox}>
                  <Icon className={style.icon} />
                </div>

                <h3 className={style.cardTitle}>{service.title}</h3>
                <p className={style.cardDesc}>{service.description}</p>

                <ul className={style.features}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={style.featureItem}>
                      <span className={style.dot} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={style.cta}>
          <p className={style.ctaText}>¿Necesita una solución personalizada?</p>
          <button className={style.ctaBtn}>Contactar con un experto</button>
        </div>
      </div>

      <div className={style.decoration} />
    </section>
  );
}