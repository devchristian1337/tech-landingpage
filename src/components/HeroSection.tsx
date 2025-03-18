import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Globe from "./Globe";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const btnEl = btnRef.current;

    if (titleEl) observer.observe(titleEl);
    if (subtitleEl) observer.observe(subtitleEl);
    if (btnEl) observer.observe(btnEl);

    return () => {
      if (titleEl) observer.unobserve(titleEl);
      if (subtitleEl) observer.unobserve(subtitleEl);
      if (btnEl) observer.unobserve(btnEl);
    };
  }, []);

  useEffect(() => {
    // Capture the section ref at the start of the effect
    const section = heroRef.current;

    const createParticles = () => {
      if (!section) return;

      // Clear existing particles first
      const existingParticles = section.querySelectorAll(".particle");
      existingParticles.forEach((particle) => particle.remove());

      // Adjust number of particles based on screen size
      const numberOfParticles = isMobile ? 25 : 50;

      // Create particles in a more optimized way using document fragment
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;

        const size = Math.random() * (isMobile ? 2.5 : 4) + 1;

        const opacity = Math.random() * 0.5 + 0.1;

        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity.toString();

        const animDuration = Math.random() * 15 + 5;
        particle.style.animation = `floating ${animDuration}s ease-in-out infinite`;

        // Add a glow effect to some particles
        if (Math.random() > 0.7) {
          particle.style.boxShadow = `0 0 ${
            Math.random() * 5 + 2
          }px rgba(0, 242, 254, ${Math.random() * 0.3 + 0.1})`;
        }

        fragment.appendChild(particle);
      }

      section.appendChild(fragment);
    };

    createParticles();

    // Only reattach particles on resize if isMobile changes
    const handleResize = () => {
      const wasMobile = isMobile;
      if (wasMobile !== window.innerWidth < 768) {
        createParticles();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // Use the captured section variable here
      if (section) {
        const particles = section.querySelectorAll(".particle");
        particles.forEach((particle) => particle.remove());
      }
    };
  }, [isMobile]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 md:py-20 pt-20 md:pt-32"
      aria-label="Hero section"
    >
      <div id="hero" ref={heroRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0"></div>

        <div className="absolute top-1/4 left-1/4 w-56 md:w-96 h-56 md:h-96 bg-neon-purple/20 rounded-full filter blur-[100px] md:blur-[150px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 md:w-96 h-56 md:h-96 bg-neon-blue/20 rounded-full filter blur-[100px] md:blur-[150px] animate-pulse-glow animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-32 md:w-64 h-32 md:h-64 bg-neon-cyan/10 rounded-full filter blur-[80px] md:blur-[120px] animate-pulse-glow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center items-center mb-8 md:mb-12">
          <div
            className="w-full aspect-square relative group"
            style={{ maxWidth: isMobile ? "320px" : "480px", height: "auto" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full filter blur-[60px] animate-pulse-glow opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Globe />
          </div>
        </div>

        <div className="w-full max-w-4xl text-center">
          <div className="relative inline-block mb-2 md:mb-4">
            <span className="bg-white/10 backdrop-blur-sm text-white/90 text-xs md:text-sm px-3 py-1 rounded-full border border-white/10 select-none">
              Next Generation Tech Solutions
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 md:mb-8 opacity-0 translate-y-10 transition-all duration-700 ease-out"
            aria-level={1}
          >
            <span className="block mb-2">Innovate with</span>
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Next-Gen Technology
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl text-white/80 mb-8 md:mb-10 max-w-xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out delay-100 leading-relaxed"
          >
            Transforming ideas into digital reality. Discover how our
            cutting-edge solutions can elevate your business to new heights.
          </p>

          <div
            ref={btnRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200"
          >
            <a
              href="#features"
              className="relative overflow-hidden group px-8 md:px-10 py-3 md:py-4 rounded-full text-white font-medium inline-flex items-center justify-center w-full sm:w-auto shadow-lg shadow-neon-blue/20"
              tabIndex={0}
              aria-label="Explore Features section"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-blue to-neon-purple"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-neon-purple to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></span>
              <span className="relative flex items-center">
                Explore Features
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300"
                />
              </span>
            </a>

            <a
              href="#about"
              className="group px-8 md:px-10 py-3 md:py-4 rounded-full text-white font-medium bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto flex items-center justify-center relative overflow-hidden"
              tabIndex={0}
              aria-label="Learn more about us"
            >
              <span className="absolute inset-0 w-0 h-0 bg-white/10 group-hover:w-full group-hover:h-full transition-all duration-500 ease-out rounded-full"></span>
              <span className="relative">Learn More</span>
            </a>
          </div>

          <div className="hidden md:flex items-center justify-center gap-4 mt-10 mb-16 text-white/60 text-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 12}`}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=User+${i}&background=0D1117&color=fff&size=32`;
                    }}
                  />
                </div>
              ))}
            </div>
            <span>Trusted by 10,000+ customers worldwide</span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10"
        aria-hidden="true"
      >
        <span className="text-xs text-white/60 mb-2 hidden sm:block">
          Scroll Down
        </span>
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-float mt-1"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
