import styles from "../additionalInfo/additionalInfo.module.css";

export function Input({ label, value, onChange }: any) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input
        className={styles.input}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function Select({ label, value, onChange, options }: any) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <select
        className={styles.input}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o: string) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}