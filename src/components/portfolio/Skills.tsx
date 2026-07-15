import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";

const skills = [
  { name: "React", level: 96 },
  { name: "TypeScript", level: 94 },
  { name: "Next.js", level: 92 },
  { name: "Tailwind CSS", level: 98 },
  { name: "GSAP", level: 90 },
  { name: "Framer Motion", level: 92 },
  { name: "JavaScript", level: 97 },
  { name: "HTML / CSS", level: 99 },
  { name: "Redux Toolkit", level: 86 },
  { name: "Node.js", level: 84 },
  { name: "Express", level: 80 },
  { name: "MongoDB", level: 78 },
  { name: "REST API", level: 90 },
  { name: "Git / GitHub", level: 94 },
  { name: "Responsive Design", level: 98 },
  { name: "Performance", level: 88 },
];

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: { each: 0.05, from: "start" },
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
      cards.forEach((card) => {
        const bar = card.querySelector(".skill-bar") as HTMLElement | null;
        if (!bar) return;
        const level = card.dataset.level;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <SectionHeading
          eyebrow="Skills"
          title="Tools of the trade."
          description="A curated stack refined across dozens of production apps."
        />
        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => (
            <TiltCard key={s.name}>
              <div className="skill-card glass-strong h-full rounded-2xl p-5" data-level={s.level}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="skill-bar h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * 10, rotateX: -py * 10, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
    };
    const onLeave = () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <div ref={ref} style={{ transformStyle: "preserve-3d" }}>{children}</div>;
}
