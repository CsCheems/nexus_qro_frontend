import styles from "./quickMetrics.module.css";

import { motion } from "framer-motion";

interface Metric {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: string;
    positive: boolean;
  };
}

interface QuickMetricsProps {
  metrics: Metric[];
}

export function QuickMetrics({ metrics }: QuickMetricsProps) {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {metrics.map((metric, index) => {
          const Icon = metric.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={styles.card}
            >
              {/* Top */}
              <div className={styles.header}>
                <div className={styles.iconWrapper}>
                  <Icon className={styles.icon} />
                </div>

                {metric.trend && (
                  <span
                    className={`${styles.trend} ${
                      metric.trend.positive
                        ? styles.positive
                        : styles.negative
                    }`}
                  >
                    {metric.trend.positive ? "↑" : "↓"}{" "}
                    {metric.trend.value}
                  </span>
                )}
              </div>

              {/* Value */}
              <div>
                <p className={styles.value}>{metric.value}</p>
                <p className={styles.label}>{metric.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}