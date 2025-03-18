
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Globe from './Globe';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
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
    const createParticles = () => {
      const section = document.getElementById('hero');
      if (!section) return;

      // Adjust number of particles based on screen size
      const numberOfParticles = isMobile ? 25 : 50;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        const size = Math.random() * (isMobile ? 3 : 5) + 1;
        
        const opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity.toString();
        
        const animDuration = Math.random() * 15 + 5;
        particle.style.animation = `floating ${animDuration}s ease-in-out infinite`;
        
        section.appendChild(particle);
      }
    };

    createParticles();
    
    return () => {
      const section = document.getElementById('hero');
      if (section) {
        const particles = section.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
      }
    };
  }, [isMobile]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 md:py-20 pt-20 md:pt-32"
    >
      <div id="hero" className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0"></div>
        
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-neon-purple/20 rounded-full filter blur-[80px] md:blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-neon-blue/20 rounded-full filter blur-[80px] md:blur-[120px] animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 md:mb-6 opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            <span className="block">Innovate with</span>
            <span className="text-gradient">Next-Gen Technology</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-100"
          >
            Transforming ideas into digital reality. Discover how our cutting-edge solutions can elevate your business to new heights.
          </p>
          
          <div 
            ref={btnRef}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200"
          >
            <a 
              href="#features" 
              className="btn-hover-effect bg-gradient-to-r from-neon-blue to-neon-purple px-6 md:px-8 py-2.5 md:py-3 rounded-full text-white font-medium inline-flex items-center justify-center group w-full sm:w-auto"
            >
              Explore Features
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#about" 
              className="btn-hover-effect bg-white/5 backdrop-blur-sm border border-white/10 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-white font-medium hover:bg-white/10 transition-colors w-full sm:w-auto mt-3 sm:mt-0"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <div className="w-full sm:w-3/4 lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
          <div className="w-full aspect-square relative" style={{ maxWidth: isMobile ? '300px' : '450px', height: 'auto' }}>
            <Globe />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs text-white/60 mb-2 hidden sm:block">Scroll Down</span>
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-float mt-2"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
