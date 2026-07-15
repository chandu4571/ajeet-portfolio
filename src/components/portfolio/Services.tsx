import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Layout, LayoutDashboard, Rocket, Smartphone, Sparkles, Zap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const services = [
  { icon: Code2, title: "Frontend Development", desc: "Production-grade React & Next.js apps engineered for scale." },
  { icon: Rocket, title: "Landing Pages", desc: "High-conversion, story-driven marketing pages built to ship fast." },
  { icon: LayoutDashboard, title: "Dashboard UI", desc: "Complex data interfaces distilled into elegant experiences." },
  { icon: Sparkles, title: "Portfolio Websites", desc: "Signature portfolios with cinematic animations and craft." },
  { icon: Layout, title: "Business Websites", desc: "Marketing sites that reflect a brand's ambition and voice." },
  { icon: Smartphone, title: "Responsive Design", desc: "Pixel-perfect layouts across every device and viewport." },
  { icon: Zap, title: "Performance", desc: "Core Web Vitals, lazy loading, code-splitting and beyond." },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".svc-card", {
        y: 40, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="services" className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <SectionHeading eyebrow="Services" title="What I build." description="A focused set of services designed to help teams ship exceptional interfaces." />
        <div ref={ref} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`svc-card group relative overflow-hidden rounded-3xl glass-strong p-8 transition-all hover:-translate-y-1 ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl glass">
                <s.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              <div className="mt-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">0{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
