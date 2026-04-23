import styles from "./activityFeed.module.css";

import {
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  FileText,
} from "lucide-react";

interface Activity {
  id: string;
  type: "stage-change" | "comment" | "update" | "document";
  title: string;
  description: string;
  timestamp: string;
  author: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityConfig = {
  "stage-change": {
    icon: TrendingUp,
    wrapper: styles.stage,
    iconColor: styles.iconStage,
  },
  comment: {
    icon: MessageSquare,
    wrapper: styles.comment,
    iconColor: styles.iconComment,
  },
  update: {
    icon: CheckCircle2,
    wrapper: styles.update,
    iconColor: styles.iconUpdate,
  },
  document: {
    icon: FileText,
    wrapper: styles.document,
    iconColor: styles.iconDocument,
  },
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Actividad reciente</h2>

      <div className={styles.timeline}>
        {activities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;
          const isLast = index === activities.length - 1;

          return (
            <div key={activity.id} className={styles.item}>
              <div className={styles.row}>
                {/* Icon */}
                <div className={`${styles.iconWrapper} ${config.wrapper}`}>
                  <Icon className={`${styles.icon} ${config.iconColor}`} />
                </div>

                {/* Content */}
                <div className={styles.content}>
                  <div className={styles.header}>
                    <h3 className={styles.activityTitle}>
                      {activity.title}
                    </h3>
                    <span className={styles.timestamp}>
                      {activity.timestamp}
                    </span>
                  </div>

                  <p className={styles.description}>
                    {activity.description}
                  </p>

                  <span className={styles.author}>
                    por {activity.author}
                  </span>
                </div>
              </div>

              {/* Line */}
              {!isLast && <div className={styles.line} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}