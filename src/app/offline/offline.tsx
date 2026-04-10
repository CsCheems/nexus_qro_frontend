"use client";

import { useEffect, useState } from "react";
import { WifiOff, RefreshCw, CloudOff, AlertCircle } from "lucide-react";
import styles from "./offline.module.css";
import { checkConnection } from "@/services/networkService";

export function Offline() {
  const [isOnline, setIsOnline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);

    const hasConnection = await checkConnection();

    if (hasConnection) {
      setIsOnline(true);
      window.location.reload();
      return;
    }

    setIsRetrying(false);
    setIsOnline(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.backgroundPattern} />
      <div className={styles.backgroundGlowTop} />
      <div className={styles.backgroundGlowBottom} />

      <div className={styles.contentWrapper}>
        <section className={styles.card}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconPulse} />
            <div className={styles.iconCircle}>
              <WifiOff className={styles.mainIcon} />
            </div>
          </div>

          <h1 className={styles.title}>Sin Conexión a Internet</h1>

          <p className={styles.description}>
            Parece que no tienes conexión a internet en este momento. Por favor,
            verifica tu conexión e intenta nuevamente.
          </p>

          {isOnline && (
            <div className={styles.statusBox}>
              <div className={styles.statusDot} />
              <p className={styles.statusText}>
                Conexión restaurada. Recargando...
              </p>
            </div>
          )}

          <button
            onClick={handleRetry}
            disabled={isRetrying || isOnline}
            className={`${styles.retryButton} ${
              isRetrying || isOnline ? styles.retryButtonDisabled : ""
            }`}
          >
            <RefreshCw
              className={`${styles.retryIcon} ${isRetrying ? styles.spin : ""}`}
            />
            <span>{isRetrying ? "Verificando..." : "Reintentar Conexión"}</span>
          </button>

          <div className={styles.tipsSection}>
            <div className={styles.tipsHeader}>
              <AlertCircle className={styles.tipsHeaderIcon} />
              <h3 className={styles.tipsTitle}>
                Sugerencias para solucionar el problema:
              </h3>
            </div>

            <ul className={styles.tipsList}>
              <li className={styles.tipItem}>
                <span className={styles.tipBullet} />
                <span>Verifica que tu Wi-Fi o datos móviles estén activados</span>
              </li>
              <li className={styles.tipItem}>
                <span className={styles.tipBullet} />
                <span>Intenta activar y desactivar el modo avión</span>
              </li>
              <li className={styles.tipItem}>
                <span className={styles.tipBullet} />
                <span>Reinicia tu router si estás usando Wi-Fi</span>
              </li>
              <li className={styles.tipItem}>
                <span className={styles.tipBullet} />
                <span>
                  Contacta a tu proveedor de internet si el problema persiste
                </span>
              </li>
            </ul>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoContent}>
              <CloudOff className={styles.infoIcon} />
              <div>
                <p className={styles.infoTitle}>Modo sin conexión</p>
                <p className={styles.infoText}>
                  Algunas funciones pueden estar limitadas hasta que se
                  restablezca la conexión a internet.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.branding}>
          <div className={styles.brandingBadge}>
            <div className={styles.brandingLogo}>
              <span className={styles.brandingLogoText}>I</span>
            </div>
            <span className={styles.brandingText}>IngeniCCA</span>
          </div>
        </div>
      </div>
    </main>
  );
}