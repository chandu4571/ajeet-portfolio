import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, GitBranch, Trophy, BadgeCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  { icon: Trophy, value: 12, label: "Awards" },
  { icon: BadgeCheck, value: 24, label: "Certificates" },
  { icon: GitBranch, value: 180, label: "OSS Contributions" },
  { icon: Award, value: 8, label: "Hackathons Won" },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => { if (ref.current) ref.current.textContent = Math.floor(o.v).toString(); },
    });
    return () => { tw.kill(); };
  }, [value]);
  return <span ref={ref}>0</span>;
}

export function Achievements() {
  return (
    <section className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <SectionHeading eyebrow="Achievements" title="Numbers that matter." />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.label} className="glass-strong rounded-3xl p-8 text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl glass">
                <i.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-5xl font-semibold tabular-nums gradient-text">
                <Counter value={i.value} />+
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{i.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
