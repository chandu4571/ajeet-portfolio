export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#070712] to-[#050505]" />
      {/* radial glow blobs */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-600/25 blur-[140px] animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[140px] animate-float-slow" style={{ animationDelay: "-4s" }} />
      <div className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[160px] animate-float-slow" style={{ animationDelay: "-8s" }} />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
