import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/use-lenis";
import { Background } from "@/components/portfolio/Background";
import { Cursor } from "@/components/portfolio/Cursor";
import { Loader } from "@/components/portfolio/Loader";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Services } from "@/components/portfolio/Services";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  useEffect(() => {
    if (loaded) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
  }, [loaded]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-foreground">
      <Loader onDone={() => setLoaded(true)} />
      <Cursor />
      <Background />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Services />
          <Testimonials />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
