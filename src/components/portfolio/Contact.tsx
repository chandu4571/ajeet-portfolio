import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-2 md:px-8 lg:px-16">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something people talk about."
          description="Have a project in mind? Drop a message — I usually reply within 24 hours."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@ajeet.dev" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: MapPin, label: "Location", value: "Bengaluru, India" },
            ].map((c) => (
              <div key={c.label} className="glass-strong flex items-center gap-4 rounded-2xl p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl glass"><c.icon className="h-4 w-4" /></div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </div>
            ))}
            <div className="glass-strong rounded-2xl p-5">
              <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Social</div>
              <div className="flex gap-3">
                {[Github, Linkedin, Twitter, Dribbble].map((I, i) => (
                  <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full glass transition-all hover:scale-110 hover:bg-white/10">
                    <I className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name: "", email: "", message: "" }); }}
            className="glass-strong rounded-3xl p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FloatingInput label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <FloatingInput label="Email address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </div>
            <div className="mt-6">
              <FloatingInput label="Tell me about your project" multiline value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
            </div>
            <button
              type="submit"
              data-cursor="hover"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-7 py-4 text-sm font-medium text-white transition-all hover:scale-[1.02]"
            >
              {sent ? "Sent ✓" : "Send message"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            {sent && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-emerald-400">
                Thanks! I'll get back to you shortly.
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({ label, value, onChange, type = "text", multiline = false }: { label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean; }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  const shared = "peer w-full bg-transparent outline-none text-foreground placeholder-transparent border-b border-white/15 focus:border-white/40 transition-colors pt-6 pb-2";
  return (
    <label className="relative block">
      {multiline ? (
        <textarea rows={4} required value={value} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => onChange(e.target.value)} placeholder={label} className={shared + " resize-none"} />
      ) : (
        <input type={type} required value={value} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => onChange(e.target.value)} placeholder={label} className={shared} />
      )}
      <span className={`pointer-events-none absolute left-0 text-muted-foreground transition-all ${active ? "top-0 text-xs" : "top-6 text-sm"}`}>
        {label}
      </span>
    </label>
  );
}
