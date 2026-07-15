import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const words = ref.current!.querySelectorAll(".sh-word");
      gsap.from(words, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
      gsap.from(".sh-fade", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="mb-8 md:mb-16 max-w-3xl">
      <div className="sh-fade mb-5 inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span className="h-px w-8 bg-foreground/40" />
        {eyebrow}
      </div>
      <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
        {title.split(" ").map((w, i) => (
          <span key={i} className="mr-3 inline-block overflow-hidden pb-2">
            <span className="sh-word inline-block">{w}</span>
          </span>
        ))}
      </h2>
      {description && <p className="sh-fade mt-6 text-lg text-muted-foreground text-balance">{description}</p>}
    </div>
  );
}
