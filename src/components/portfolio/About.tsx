import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./SectionHeading";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 80, suffix: "+", label: "Projects Completed" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 20, suffix: "+", label: "Technologies" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.floor(obj.v).toString();
      },
    });
    return () => { tw.kill(); };
  }, [value]);
  return (
    <>
      <span ref={ref}>0</span>
      <span className="gradient-text">{suffix}</span>
    </>
  );
}

export function About() {
  return (
    <section id="about" className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <SectionHeading
          eyebrow="About"
          title="Designer at heart, engineer by craft."
          description="I build fast, accessible and delightful interfaces at the intersection of design and engineering — obsessing over motion, hierarchy and the tiny details that make products feel alive."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-strong rounded-3xl p-8">
              <div className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Currently</div>
              <p className="text-lg leading-relaxed">
                Senior Frontend Engineer building product interfaces for early-stage startups. Focused on design systems, motion, and performance.
              </p>
            </div>
            <div className="glass-strong rounded-3xl p-8">
              <div className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Toolbox</div>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Next.js", "GSAP", "Framer Motion", "Tailwind", "Three.js", "Node"].map((t) => (
                  <span key={t} className="rounded-full glass px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
            </div>
            <div className="glass-strong rounded-3xl p-8 sm:col-span-2">
              <div className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Journey</div>
              <div className="space-y-4 text-muted-foreground">
                <p>Started tinkering with HTML in high school, fell in love with the web and never looked back. Studied Computer Science, then shipped my first production app in college.</p>
                <p>Since then I've collaborated with agencies, startups and open-source communities — always chasing the sweet spot between beautiful and bulletproof.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 content-start">
            {stats.map((s) => (
              <div key={s.label} className="glass-strong rounded-3xl p-6">
                <div className="font-display text-4xl font-semibold tabular-nums">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
