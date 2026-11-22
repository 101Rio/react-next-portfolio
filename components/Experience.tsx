"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
const MotionContext = createContext({ motion: false, toggleMotion: () => {} });
export function useMotion() {
  return useContext(MotionContext);
}
export function Experience({ children }: { children: ReactNode }) {
  const [motion, setMotion] = useState<boolean | null>(null);
  const pathname = usePathname();
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let disabled = false;
      try {
        disabled = localStorage.getItem("rio-motion") === "off";
      } catch {}
      setMotion(!media.matches && !disabled);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (motion === null) return;
    document.documentElement.dataset.motion = motion ? "on" : "off";
    if (!motion) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animations.push(
            entry.target.animate(
              [
                { opacity: 0, transform: "translateY(32px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 850,
                easing: "cubic-bezier(.2,.65,.2,1)",
                fill: "backwards",
              },
            ),
          );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.09 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      animations.forEach((a) => a.cancel());
    };
  }, [motion, pathname]);
  const toggleMotion = () => {
    const next = !motion;
    setMotion(next);
    try {
      localStorage.setItem("rio-motion", next ? "on" : "off");
    } catch {}
  };
  return (
    <MotionContext.Provider value={{ motion: motion === true, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}
export function MotionToggle() {
  const { motion, toggleMotion } = useMotion();
  return (
    <button
      className="motionToggle"
      onClick={toggleMotion}
      aria-pressed={motion}
      aria-label={motion ? "アニメーションを停止" : "アニメーションを再生"}
    >
      <span className="motionIndicator" aria-hidden="true" />
      Motion {motion ? "on" : "off"}
    </button>
  );
}
