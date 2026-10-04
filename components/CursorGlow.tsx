"use client";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener?.("change", update);
    const move = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      media.removeEventListener?.("change", update);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} aria-hidden="true" />
      <div className="cursor-ring" style={{ left: pos.x, top: pos.y }} aria-hidden="true">
        <span className="cursor-dot" />
      </div>
    </>
  );
}
