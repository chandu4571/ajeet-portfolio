import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Twitter } from "lucide-react";

const roles = ["Frontend Developer", "Creative Engineer", "Motion Designer", "Interface Architect"];

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      // Split hero words on load
      const words = headingRef.current!.querySelectorAll(".hero-word");
      gsap.from(words, {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.4,
      });
      gsap.from(".hero-fade", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        delay: 1.1,
      });

      // Parallax
      gsap.to(".hero-parallax", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let i = 0;
    const el = roleRef.current;
    if (!el) return;
    let typing = true;
    let charIdx = 0;
    const tick = () => {
      const word = roles[i];
      if (typing) {
        charIdx++;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          typing = false;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIdx--;
        el.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          typing = true;
          i = (i + 1) % roles.length;
        }
      }
      setTimeout(tick, typing ? 70 : 40);
    };
    const t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
  }, []);

  const line1 = ["Hi,", "I'm", "Ajeet."];
  const line2 = ["Web Developer"];

  return (
    <section id="home" className="hero-section relative flex min-h-screen items-center px-4 sm:px-6 pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto grid w-full max-w-7xl px-2 md:px-8 lg:px-16 grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="hero-parallax">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            Available for freelance
          </motion.div>

          <h1
            ref={headingRef}
            className="font-display text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tight text-balance"
          >
            <span className="block overflow-hidden">
              {line1.map((w, i) => (
                <span key={i} className="hero-word mr-4 inline-block">{w}</span>
              ))}
            </span>
            <span className="block overflow-hidden">
              {line2.map((w, i) => (
                <span key={i} className="hero-word mr-4 inline-block">
                  <span className={i === 1 ? "gradient-text" : ""}>{w}</span>
                </span>
              ))}
            </span>

          </h1>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3 text-lg text-muted-foreground">
            <span className="text-foreground/80">/</span>
            <span ref={roleRef} className="font-mono text-foreground" />
            <span className="inline-block h-5 w-[2px] animate-pulse bg-foreground" />
          </div>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <a
                href="#work"
                data-cursor="hover"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-7 py-4 text-sm font-medium text-white transition-transform"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">View Projects</span>
                <ArrowDown className="relative h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#"
                data-cursor="hover"
                className="inline-flex items-center gap-3 rounded-full glass-strong px-7 py-4 text-sm font-medium transition-all hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </MagneticButton>
          </div>

          <div className="hero-fade mt-12 flex items-center gap-6">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                data-cursor="hover"
                className="group flex h-11 w-11 items-center justify-center rounded-full glass transition-all hover:bg-white/10 hover:scale-110"
              >
                <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </div>

        {/* Profile visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-parallax relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-conic from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-30 blur-3xl animate-pulse-glow" />
          <div className="absolute inset-6 rounded-full glass-strong overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-transparent to-cyan-400/30" />
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a5b4fc" />
                  <stop offset="50%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#f0abfc" />
                </linearGradient>
              </defs>
              <text x="100" y="118" textAnchor="middle" fontSize="90" fontWeight="700" fill="url(#g1)" fontFamily="Geist, Inter, sans-serif">
                A
              </text>
            </svg>
          </div>
          {/* floating chips */}
          {[
            { t: "React", top: "5%", left: "-8%", delay: "0s" },
            { t: "GSAP", top: "20%", right: "-10%", delay: "-2s" },
            { t: "TS", bottom: "20%", left: "-12%", delay: "-4s" },
            { t: "Next", bottom: "8%", right: "-6%", delay: "-6s" },
          ].map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full glass-strong px-4 py-2 text-xs font-mono animate-float-slow"
              style={{ ...c, animationDelay: c.delay }}
            >
              {c.t}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-fade">
        <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
          <div className="h-10 w-[1px] bg-gradient-to-b from-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.5, ease: "power3.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <div ref={ref} className="magnetic inline-block">{children}</div>;
}
