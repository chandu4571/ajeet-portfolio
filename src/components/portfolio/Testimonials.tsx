import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const testimonials = [
  { name: "Maya Chen", role: "Head of Design, Lumen Labs", quote: "Ajeet blends design sensitivity with engineering rigor. Every interaction he ships feels considered.", rating: 5 },
  { name: "Alex Rivera", role: "Founder, Orbit Studio", quote: "One of the sharpest frontend engineers we've worked with. Delivered an award-winning site on a brutal timeline.", rating: 5 },
  { name: "Priya Kapoor", role: "PM, Nebula", quote: "The dashboard he rebuilt cut our onboarding time in half. Our users won't stop talking about it.", rating: 5 },
  { name: "Jonas Weber", role: "CEO, Fable Commerce", quote: "Craft, speed, and communication — a rare trio. Would hire again in a heartbeat.", rating: 5 },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <section className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Testimonials" title="Kind words from clients." />
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong mx-auto max-w-3xl rounded-3xl p-10 sm:p-14 text-center"
            >
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="font-display text-2xl sm:text-3xl leading-snug text-balance">"{t.quote}"</p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-white/10">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-foreground" : "w-1.5 bg-white/30"}`}
                />
              ))}
            </div>
            <button onClick={() => setI((i + 1) % testimonials.length)} className="flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-white/10">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
