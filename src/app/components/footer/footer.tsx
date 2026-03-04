"use client";

import React from "react";
import style from "./footer.module.css";
import { Mail, MapPin, Phone, Linkedin, Twitter, Github } from "lucide-react";

const navigation = {
  plataforma: [
    { name: "Características", href: "#" },
    { name: "Casos de Uso", href: "#" },
    { name: "Documentación", href: "#" },
    { name: "API", href: "#" },
  ],
  servicios: [
    { name: "Consultoría", href: "#" },
    { name: "IoT & Mioty", href: "#" },
    { name: "Vinculación", href: "#" },
    { name: "Capacitación", href: "#" },
  ],
  empresa: [
    { name: "Nosotros", href: "#" },
    { name: "Equipo", href: "#" },
    { name: "Carreras", href: "#" },
    { name: "Contacto", href: "#" },
  ],
  legal: [
    { name: "Privacidad", href: "#" },
    { name: "Términos", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Licencias", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.grid}>
          <div className={style.brandCol}>
            <div className={style.logoRow}>
              <div className={style.logoIcon}>
                <span>N</span>
              </div>
              <div>
                <div className={style.logoTitle}>Nexus-Qro</div>
                <div className={style.logoSubtitle}>Plataforma de Innovación</div>
              </div>
            </div>

            <p className={style.description}>
              Impulsando la transformación digital mediante la vinculación estratégica entre
              academia, industria y gobierno.
            </p>

            <div className={style.contactList}>
              <div className={style.contactItem}>
                <MapPin className={style.contactIcon} />
                <span>Querétaro, México</span>
              </div>

              <div className={style.contactItem}>
                <Mail className={style.contactIcon} />
                <a href="mailto:contacto@nexus-qro.com">
                  contacto@nexus-qro.com
                </a>
              </div>

              <div className={style.contactItem}>
                <Phone className={style.contactIcon} />
                <a href="tel:+52442123456">
                  +52 442 123 4567
                </a>
              </div>
            </div>
          </div>

          {Object.entries(navigation).map(([key, items]) => (
            <div key={key}>
              <h3 className={style.navTitle}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>
              <ul className={style.navList}>
                {items.map((item) => (
                  <li key={item.name}>
                    <a href={item.href}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={style.bottom}>
          <p className={style.copyright}>
            © {new Date().getFullYear()} Nexus-Qro. Todos los derechos reservados.
          </p>

          <div className={style.socialRow}>
            <a href="#" className={style.socialBtn}>
              <Linkedin className={style.socialIcon} />
            </a>
            <a href="#" className={style.socialBtn}>
              <Twitter className={style.socialIcon} />
            </a>
            <a href="#" className={style.socialBtn}>
              <Github className={style.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      <div className={style.backgroundGrid} />
    </footer>
  );
}