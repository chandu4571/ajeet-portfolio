import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
    };
    const loop = () => {
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      setRingPos({ x: current.x, y: current.y });
      rafId = requestAnimationFrame(loop);
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor='hover'], a, button");
      setHover(!!el);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" style={{ transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` }} />
      <div
        className={`cursor-ring ${hover ? "hover" : ""}`}
        style={{ transform: `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)` }}
      />
    </>
  );
}
