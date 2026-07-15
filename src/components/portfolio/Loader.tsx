import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(id);
        setTimeout(() => {
          setShow(false);
          setTimeout(onDone, 900);
        }, 400);
      } else {
        setProgress(Math.floor(p));
      }
    }, 120);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="mb-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 blur-md opacity-70 animate-pulse-glow" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl glass-strong">
                <span className="gradient-text text-xl font-bold">R</span>
              </div>
            </div>
            <span className="text-lg font-medium tracking-wide">Ajeet.dev</span>
          </motion.div>

          <div className="w-[min(400px,70vw)]">
            <div className="mb-3 flex items-end justify-between text-xs text-muted-foreground">
              <span className="uppercase tracking-[0.3em]">Loading</span>
              <span className="tabular-nums text-foreground text-2xl font-light">{progress}%</span>
            </div>
            <div className="h-[2px] w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
            <motion.p
              className="mt-6 text-center text-xs uppercase tracking-[0.4em] text-muted-foreground"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Crafting Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
