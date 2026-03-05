"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, User, UserKey, Phone } from "lucide-react";
import PhoneInput from 'react-phone-number-input'
import type { E164Number } from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import styles from "./auth.module.css";

export default function Auth() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerSecondLastName, setRegisterSecondLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState<string>("");
  const [registerRole, setRegisterRole] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { loginEmail, loginPassword, rememberMe });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", {
      registerName,
      registerLastName,
      registerSecondLastName,
      registerEmail,
      registerRole,
      registerPassword,
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.side}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
          </Link>

          <div className={styles.logoWrapper}>
            <div className={styles.logoBox}>N</div>
            <div>
              <div className={styles.logoTitle}>
                Nexus-Qro
              </div>
              <div className={styles.logoSubtitle}>
                Plataforma de Innovación
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h1 className={styles.title}>Iniciar Sesión</h1>
            <p className={styles.subtitle}>Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleLoginSubmit} className={styles.form}>

            <div className={styles.field}>
              <label htmlFor="login-email" className={styles.label}>
                Correo Electrónico
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <Mail size={20} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="login-password" className={styles.label}>
                Contraseña
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <Lock size={20} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className={styles.input}
                  required
                  style={{ paddingRight: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className={styles.iconRight}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#2e2e2e" }}>
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ fontSize: "0.9rem" }}>Recordarme</span>
              </label>

              <a href="#" style={{ fontSize: "0.9rem", color: "#2562EA", fontWeight: 600 }}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button type="submit" className={styles.buttonPrimary}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>

      <div className={styles.side}>
        <div className={styles.container}>
          {/* Header */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h1 className={styles.title}>Crear Cuenta</h1>
            <p className={styles.subtitle}>Únete al ecosistema de innovación</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className={styles.form}>
            {/* Name */}
            <div className={styles.field}>
              <label htmlFor="register-name" className={styles.label}>
                Nombre(s)
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <User size={20} />
                </span>
                <input
                  id="register-name"
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Juan"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="register-lastName" className={styles.label}>
                Apellido Paterno
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <User size={20} />
                </span>
                <input
                  id="register-lastName"
                  type="text"
                  value={registerLastName}
                  onChange={(e) => setRegisterLastName(e.target.value)}
                  placeholder="Pérez"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="register-secondLastName" className={styles.label}>
                Apellido Materno
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <User size={20} />
                </span>
                <input
                  id="register-secondLastName"
                  type="text"
                  value={registerSecondLastName}
                  onChange={(e) => setRegisterSecondLastName(e.target.value)}
                  placeholder="Pérez"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="register-email" className={styles.label}>
                Correo Electrónico
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <Mail size={20} />
                </span>
                <input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="juan@email.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="register-phone" className={styles.label}>
                Correo Electrónico
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <Phone size={20} />
                </span>
                <PhoneInput
                  id="register-phone"
                  value={registerPhone as E164Number | undefined}
                  onChange={(value) => setRegisterPhone(value ?? "")}
                  className={styles.input}
                  defaultCountry="MX"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="register-role" className={styles.label}>
                Tipo de usuario
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <UserKey size={20} />
                </span>
                <select
                  id="register-role"
                  value={registerRole}
                  onChange={(e) => setRegisterRole(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">Selecciona tu tipo de usuario</option>
                  <option value='estudiante'>Estudiante</option>
                  <option value='consultor'>Consultor</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="register-password" className={styles.label}>
                Contraseña
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.iconLeft}>
                  <Lock size={20} />
                </span>
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className={styles.input}
                  required
                  minLength={8}
                  style={{ paddingRight: "3rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className={styles.iconRight}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* No pondre esto de momento */}
            {/*
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", color: "#2e2e2e" }}>
              <input
                id="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
                style={{ width: 16, height: 16, marginTop: 3 }}
              />
              <span style={{ fontSize: "0.9rem" }}>
                Acepto los{" "}
                <a href="#" style={{ color: "#2562EA", fontWeight: 600 }}>
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" style={{ color: "#2562EA", fontWeight: 600 }}>
                  política de privacidad
                </a>
              </span>
            </label>
            */}
            
            <button type="submit" className={styles.buttonPrimary}>
              Crear Cuenta
            </button>
          </form>
        </div>
      </div>

      <div
        className={[
          styles.overlay,
          isRegisterMode ? styles.overlayLeft : styles.overlayRight,
        ].join(" ")}
      >
        <div className={styles.overlayContent}>
          <div>
            {!isRegisterMode ? (
              <>
                <h2 className={styles.overlayTitle}>¿No tienes cuenta?</h2>
                <p className={styles.overlayText}>
                  Crea una cuenta y accede a proyectos colaborativos, recursos tecnologicos y una red preofesional.
                </p>
                <button className={styles.overlayButton} onClick={() => setIsRegisterMode(true)} type="button">
                  Crear Cuenta
                </button>
              </>
            ) : (
              <>
                <h2 className={styles.overlayTitle}>¿Ya tienes cuenta?</h2>
                <p className={styles.overlayText}>
                  Inicia sesión para acceder a tu cuenta y continuar con tus proyectos.
                </p>
                <button className={styles.overlayButton} onClick={() => setIsRegisterMode(false)} type="button">
                  Iniciar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}