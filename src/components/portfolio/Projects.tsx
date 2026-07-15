import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  year: string;
};

const projects: Project[] = [
  { title: "Nebula Analytics", category: "Dashboard", description: "Realtime SaaS analytics dashboard with custom charting and command-k.", tags: ["Next.js", "TypeScript", "D3", "tRPC"], gradient: "from-indigo-500 via-purple-500 to-fuchsia-500", year: "2025" },
  { title: "Orbit Studio", category: "Agency", description: "Award-winning creative agency site with GSAP-driven scroll storytelling.", tags: ["React", "GSAP", "Lenis", "WebGL"], gradient: "from-cyan-400 via-sky-500 to-indigo-500", year: "2025" },
  { title: "Fable Commerce", category: "E-Commerce", description: "Headless storefront with buttery product transitions and instant checkout.", tags: ["Next.js", "Shopify", "Framer"], gradient: "from-rose-400 via-pink-500 to-fuchsia-500", year: "2024" },
  { title: "Lumen Docs", category: "Product", description: "Docs platform with live playgrounds and MDX-powered content pipeline.", tags: ["Astro", "MDX", "Shiki"], gradient: "from-amber-400 via-orange-500 to-rose-500", year: "2024" },
  { title: "Pulse Fitness", category: "Mobile Web", description: "Progressive web app for interval training with haptic-perfect timers.", tags: ["React", "Zustand", "PWA"], gradient: "from-emerald-400 via-teal-500 to-cyan-500", year: "2024" },
  { title: "Aurora Portfolio", category: "Portfolio", description: "Personal portfolio for a photographer, feat. custom cursor and image reveals.", tags: ["Vite", "GSAP", "Tailwind"], gradient: "from-violet-500 via-purple-500 to-indigo-500", year: "2023" },
];

const categories = ["All", "Dashboard", "Agency", "E-Commerce", "Product", "Mobile Web", "Portfolio"];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const shown = projects.filter((p) => filter === "All" || p.category === filter);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".pj-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="work" className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <SectionHeading eyebrow="Featured Work" title="Selected projects." description="A handful of recent builds — from marketing sites to complex product interfaces." />

        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-cursor="hover"
              className={`rounded-full px-4 py-2 text-sm transition-all ${filter === c ? "bg-white text-black" : "glass hover:bg-white/10"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {shown.map((p) => (
            <button
              key={p.title}
              onClick={() => setSelected(p)}
              data-cursor="hover"
              className="pj-card group relative overflow-hidden rounded-3xl glass-strong text-left"
            >
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-[8rem] font-bold text-white/15 mix-blend-overlay transition-transform duration-700 group-hover:scale-110">
                    {p.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute top-4 left-4 rounded-full glass-strong px-3 py-1 text-xs">{p.category}</div>
                <div className="absolute top-4 right-4 rounded-full glass-strong px-3 py-1 text-xs font-mono">{p.year}</div>
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/30" />
                <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-1">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full glass px-3 py-1 text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-strong"
            >
              <div className={`aspect-video bg-gradient-to-br ${selected.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full glass-strong"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="p-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{selected.category} · {selected.year}</div>
                <h3 className="mt-2 font-display text-3xl font-semibold">{selected.title}</h3>
                <p className="mt-4 text-muted-foreground">{selected.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.tags.map((t) => (
                    <span key={t} className="rounded-full glass px-3 py-1 text-xs">{t}</span>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black">
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href="#" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium">
                    <Github className="h-4 w-4" /> Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
