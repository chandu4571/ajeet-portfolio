import { ArrowUp, Github, Linkedin, Twitter, Dribbble } from "lucide-react";

const cols = [
  { title: "Sitemap", items: [{ l: "Home", h: "#home" }, { l: "About", h: "#about" }, { l: "Work", h: "#work" }, { l: "Contact", h: "#contact" }] },
  { title: "Services", items: [{ l: "Frontend", h: "#services" }, { l: "Dashboards", h: "#services" }, { l: "Portfolios", h: "#services" }, { l: "Landing Pages", h: "#services" }] },
];

export function Footer() {
  const scrollTop = () => document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="relative px-4 sm:px-6 pt-16 pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 sm:flex-row">
          <a href="#home" className="group flex items-center gap-3">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-70 blur-md" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl glass-strong">
                <span className="gradient-text text-lg font-bold">R</span>
              </div>
            </div>
            <div>
              <div className="font-medium">Ajeet.dev</div>
              <div className="text-xs text-muted-foreground">Frontend Developer</div>
            </div>
          </a>
          <button
            onClick={scrollTop}
            data-cursor="hover"
            className="group inline-flex items-center gap-3 rounded-full glass-strong px-5 py-3 text-sm transition-all hover:bg-white/10"
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Say hi</div>
            <a href="mailto:hello@ajeet.dev" className="font-display text-2xl gradient-text">hello@ajeet.dev</a>
            <div className="mt-6 flex gap-3">
              {[Github, Linkedin, Twitter, Dribbble].map((I, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-white/10">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
              <ul className="space-y-2">
                {c.items.map((i) => (
                  <li key={i.l}><a href={i.h} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{i.l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Ajeet. Crafted with care.</div>
          <div>Built with React · GSAP · Lenis · Tailwind</div>
        </div>
      </div>
    </footer>
  );
}
