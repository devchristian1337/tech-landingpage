
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Globe from './Globe';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

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
    // Add particles to the background
    const createParticles = () => {
      const section = document.getElementById('hero');
      if (!section) return;

      const numberOfParticles = 50;
      
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Apply styles
        particle.style.left = `${xPos}%`;
        particle.style.top = `${yPos}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity.toString();
        
        // Random animation duration
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
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 pt-32"
    >
      <div id="hero" className="absolute inset-0 z-0">
        {/* Particles will be added here by useEffect */}
        
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-0"></div>
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full filter blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/20 rounded-full filter blur-[120px] animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 opacity-0 translate-y-10 transition-all duration-700 ease-out"
          >
            <span className="block">Innovate with</span>
            <span className="text-gradient">Next-Gen Technology</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-100"
          >
            Transforming ideas into digital reality. Discover how our cutting-edge solutions can elevate your business to new heights.
          </p>
          
          <div 
            ref={btnRef}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-200"
          >
            <a 
              href="#features" 
              className="btn-hover-effect bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-3 rounded-full text-white font-medium inline-flex items-center justify-center group w-full sm:w-auto"
            >
              Explore Features
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#about" 
              className="btn-hover-effect bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-3 rounded-full text-white font-medium hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-md aspect-square relative scene">
            <div className="w-full h-full card-3d">
              <Globe />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-xs text-white/60 mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-float mt-2"></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
