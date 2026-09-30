"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        maxScroll > 0
          ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100))
          : 0;

      setProgress(percentage);
      setVisible(scrollTop > 320);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      style={
        {
          "--progress": `${progress}%`,
        } as React.CSSProperties
      }
      className={`back-top ${
        visible
          ? "translate-x-0 opacity-100"
          : "-translate-x-20 pointer-events-none opacity-0"
      }`}
    >
      <span className="back-top-ring" aria-hidden="true" />

      <span className="back-top-inner">
        <ArrowUp size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}