import styles from "./Opening.module.css";

// Runs before the first paint. The root layout persists during client navigation.
export const initializeOpening = `(() => {
  const root = document.documentElement;
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let motion = !media.matches;
  try { motion = motion && localStorage.getItem("rio-motion") !== "off"; } catch {}
  root.dataset.motion = motion ? "on" : "off";
  const navigation = performance.getEntriesByType("navigation")[0];
  if (!motion || navigation?.type === "back_forward") return;

  root.dataset.opening = "play";
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  const finish = () => {
    delete root.dataset.opening;
    listeners.abort();
  };
  document.addEventListener("animationend", event => {
    if (event.target.id === "site-opening") finish();
  }, options);
  window.addEventListener("pagehide", finish, options);
  media.addEventListener("change", finish, options);
  document.addEventListener("DOMContentLoaded", () => {
    const fallback = window.setTimeout(finish, 2600);
    listeners.signal.addEventListener("abort", () => clearTimeout(fallback), { once: true });
  }, options);
})();`;

export function Opening() {
  return (
    <div id="site-opening" className={styles.curtain} aria-hidden="true">
      <div className={styles.signature}>
        <span className={styles.mark}>ri<span>o.</span></span>
      </div>
    </div>
  );
}
