import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ParticleBackground from "../components/ParticleBackground";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastMouseMoveTime = useRef<number>(0);

  // Initialize scroll animation observer with debounced reveal
  useEffect(() => {
    // Cleanup previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Process entries in the next animation frame to avoid layout thrashing
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
            }
          });
        });
      },
      { threshold: isMobile ? 0.05 : 0.1, rootMargin: "0px 0px 10% 0px" }
    );

    // Target all elements with reveal-on-scroll class
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  // Initialize parallax effect for 3D cards - disable on mobile for better performance
  useEffect(() => {
    if (isMobile) return; // Skip parallax effect on mobile devices

    const cards = document.querySelectorAll(".card-3d");
    if (cards.length === 0) return;

    // Throttled mouse move handler to reduce calculations
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle to max 30fps (33ms) for this non-critical animation
      if (now - lastMouseMoveTime.current < 33) return;
      lastMouseMoveTime.current = now;

      // Use requestAnimationFrame to prevent layout thrashing
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        cards.forEach((card) => {
          const rect = (card as HTMLElement).getBoundingClientRect();

          // Skip offscreen cards
          if (
            rect.bottom < 0 ||
            rect.top > window.innerHeight ||
            rect.right < 0 ||
            rect.left > window.innerWidth
          ) {
            return;
          }

          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          // Calculate distance from center (in percentage)
          const percentX = (mouseX - centerX) / (rect.width / 2);
          const percentY = (mouseY - centerY) / (rect.height / 2);

          // Limit the rotation
          const maxRotation = 10;
          const rotateX = -percentY * maxRotation;
          const rotateY = percentX * maxRotation;

          // Apply transform if mouse is relatively close to the card
          if (Math.abs(percentX) < 2 && Math.abs(percentY) < 2) {
            (
              card as HTMLElement
            ).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }
        });
      });
    };

    const handleMouseLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        cards.forEach((card) => {
          (card as HTMLElement).style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";
        });
      });
    };

    // Use passive event listeners to prevent blocking the main thread
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
