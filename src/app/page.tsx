import Image from "next/image";
import styles from "./page.module.css";
import Home from "./home/page";

export default function App() {
  return (
    <div className={styles.page}>
      <Home/>
    </div>
  );
}
