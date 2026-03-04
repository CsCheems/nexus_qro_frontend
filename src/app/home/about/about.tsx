"use client"
import React from "react";
import style from "./about.module.css";
import { Lightbulb, Network, Zap, Users } from "lucide-react";

const features = [
    { icon: Lightbulb, title: "Innovación", description: "Impulsamos proyectos disruptivos" },
    { icon: Network, title: "IoT", description: "Soluciones conectadas avanzadas" },
    { icon: Zap, title: "Transformación Digital", description: "Modernización tecnológica integral" },
    { icon: Users, title: "Colaboración Académica", description: "Vinculación universidad-empresa" },
];

export default function About() {
  return (
    <section id="nosotros" className={style.section}>
      <div className={style.container}>
        <div className={style.grid2}>

          <div>
            <div className={style.badge}>
              <span className={style.badgeText}>Sobre Nexus-Qro</span>
            </div>

            <h2 className={style.title}>Transformando el ecosistema de innovación</h2>

            <p className={style.paragraph}>
              Nexus-Qro es una plataforma web progresiva (PWA) diseñada para facilitar la
              colaboración entre actores clave del ecosistema tecnológico: academia, industria y
              gobierno.
            </p>

            <p className={style.paragraph}>
              Nuestra misión es acelerar la adopción de tecnologías emergentes, particularmente en
              el ámbito de Internet de las Cosas (IoT) y soluciones basadas en Mioty, creando
              puentes efectivos entre la investigación aplicada y las necesidades del mercado.
            </p>

            <div className={style.featuresGrid}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className={style.featureItem}>
                    <div className={style.featureIconBox}>
                      <Icon className={style.featureIcon} />
                    </div>
                    <div>
                      <div className={style.featureTitle}>{feature.title}</div>
                      <div className={style.featureDesc}>{feature.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={style.rightWrap}>
                <div className={style.card}>
                    <div className={style.imageGrid}>
                        <div className={`${style.imageItem} ${style.imageLarge}`}>
                            <img
                                src="./imgs/technology2.jpg"
                                alt="codigo"
                                className={style.img}
                            />
                            <div className={style.imageOverlay} />
                        </div>

                        <div className={style.imageItem}>
                             <img
                                src="./imgs/technology.jpg"
                                alt="codigo"
                                className={style.img}
                            />
                            <div className={style.imageOverlay} />
                        </div>

                        <div className={style.imageItem}>
                             <img
                                src="./imgs/programming.webp"
                                alt="codigo"
                                className={style.img}
                            />
                            <div className={style.imageOverlay} />
                        </div>
                    </div>
                </div>
          </div>
        </div>
      </div>

      <div className={style.decoration} />
    </section>
  )
}
