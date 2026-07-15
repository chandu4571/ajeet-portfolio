import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";

const experience = [
  { role: "Senior Frontend Engineer", company: "Lumen Labs", period: "2023 — Present", points: ["Led rebuild of the flagship dashboard, cutting TTI by 42%.", "Built the internal design system used by 6 product teams.", "Owned motion & interaction guidelines across the org."] },
  { role: "Frontend Engineer", company: "Orbit Studio", period: "2021 — 2023", points: ["Shipped 15+ award-winning marketing sites.", "Introduced GSAP + Lenis scroll architecture template.", "Mentored 4 junior developers to mid-level."] },
  { role: "UI Developer", company: "Freelance", period: "2019 — 2021", points: ["Delivered 30+ client projects across 4 continents.", "Specialized in creative one-pager sites and portfolios.", "Built long-term partnerships with 3 design agencies."] },
  { role: "CS Undergrad", company: "State University", period: "2015 — 2019", points: ["Graduated with honors in Computer Science.", "Won 2 hackathons, contributed to open source."] },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".tl-item", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: true }, transformOrigin: "top" },
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="experience" className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <SectionHeading eyebrow="Experience" title="A timeline of craft." />
        <div ref={ref} className="relative mx-auto max-w-3xl pl-8 sm:pl-16">
          <div className="absolute left-2 sm:left-6 top-2 bottom-2 w-px bg-white/10">
            <div className="tl-line absolute inset-0 bg-gradient-to-b from-indigo-400 via-fuchsia-400 to-cyan-400" />
          </div>
          <div className="flex flex-col gap-10">
            {experience.map((e) => (
              <div key={e.role} className="tl-item relative">
                <div className="absolute -left-[calc(2rem+1px)] sm:-left-[calc(4rem-1.25rem)] top-2 h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]" />
                <div className="glass-strong rounded-2xl p-6">
                  <div className="mb-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">{e.period}</div>
                  <h3 className="font-display text-2xl font-semibold">{e.role}</h3>
                  <div className="mb-4 gradient-text text-sm font-medium">{e.company}</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-foreground/60" />{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
