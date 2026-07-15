import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map((l) => document.querySelector(l.href));
      for (const s of sections) {
        if (!s) continue;
        const r = (s as HTMLElement).getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass-strong" : ""}`}>
            <button onClick={() => go("#home")} className="group flex items-center gap-2" data-cursor="hover">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-70 blur-sm transition-opacity group-hover:opacity-100" />
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg glass-strong">
                  <span className="gradient-text text-sm font-bold">R</span>
                </div>
              </div>
              <span className="text-sm font-medium tracking-wide">Ajeet</span>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  data-cursor="hover"
                  className="group relative px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className={active === l.href.slice(1) ? "text-foreground" : ""}>{l.label}</span>
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gradient-to-r from-indigo-400 to-cyan-400 transition-transform duration-500 ${active === l.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </button>
              ))}
            </nav>

            <button
              onClick={() => go("#contact")}
              data-cursor="hover"
              className="hidden md:inline-flex items-center gap-2 rounded-full glass-strong px-5 py-2 text-sm font-medium transition-all hover:scale-105"
            >
              Let's talk
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            </button>

            <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-3xl glass-strong p-6 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => go(l.href)}
                  className="rounded-xl px-4 py-3 text-left text-lg font-medium hover:bg-white/5"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
