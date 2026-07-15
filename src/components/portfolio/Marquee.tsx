export function Marquee() {
  const words = ["Design", "Motion", "Craft", "Performance", "Detail", "Systems", "Interaction", "Story"];
  const row = (
    <div className="flex shrink-0 items-center gap-14 px-7">
      {words.map((w, i) => (
        <div key={i} className="flex items-center gap-14">
          <span className="font-display text-6xl sm:text-8xl font-semibold tracking-tight text-foreground/80 whitespace-nowrap">{w}</span>
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400" />
        </div>
      ))}
    </div>
  );
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-white/5 py-10">
      <div className="flex w-max flex-nowrap animate-marquee">
        {row}{row}
      </div>
    </section>
  );
}
