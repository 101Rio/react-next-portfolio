import { WaveText } from "./WaveText";
import styles from "./PageHeading.module.css";

export function PageHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className={styles.heading} lang="en">
      <span className="eyebrow">{label}</span>
      <h1 className="sectionTitle"><WaveText text={title} /></h1>
    </div>
  );
}
