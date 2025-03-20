import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const scrollPosition = useRef(0);
  const menuIconRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      closeMenu();
    }
  }, [isMobile, mobileMenuOpen]);

  // Control body scroll when menu is open
  const disableScroll = () => {
    // Store scroll position first
    scrollPosition.current = window.scrollY;

    // Get scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Apply styles to prevent body scroll but maintain position
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.width = "100%";
  };

  const enableScroll = () => {
    // Store the current position before removing styles
    const currentPos = scrollPosition.current;

    // Remove styles in reverse order
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";

    // Restore scroll position
    window.scrollTo({
      top: currentPos,
      behavior: "instant",
    });
  };

  // Effect to handle body scroll locking
  useEffect(() => {
    if (mobileMenuOpen) {
      disableScroll();
    } else {
      // Short delay to allow menu animation to complete
      const timer = setTimeout(() => {
        enableScroll();
      }, 300);

      return () => clearTimeout(timer);
    }

    // Cleanup on unmount
    return () => {
      if (document.body.style.position === "fixed") {
        enableScroll();
      }
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (mobileMenuOpen) {
      // Get the href before closing the menu
      const href = e.currentTarget.getAttribute("href");

      // Close the menu first
      closeMenu();

      // Only scroll to section if clicking a navigation link (not the logo)
      if (href && href !== "#") {
        // Allow time for the menu transition to complete before scrolling
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 400); // Increased delay to ensure menu is fully closed
      }

      // Prevent default to handle scrolling manually
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleMenu();
    }
  };

  return (
    <>
      {/* Navbar */}
      <header
        ref={navbarRef}
        className={cn(
          "fixed top-0 left-0 right-0 w-full transition-all duration-300",
          // Lower z-index so menu appears above it, and hide navbar when menu is open
          isMobile && mobileMenuOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100 z-[100]",
          isScrolled
            ? "py-2 md:py-3 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "py-3 md:py-6 bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="#"
              className="text-xl md:text-2xl font-display font-bold text-gradient relative group"
              tabIndex={0}
              aria-label="NOVATECH, back to home"
              onClick={handleNavigation}
            >
              NOVA<span className="text-white">TECH</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {["Home", "About", "Features", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-medium text-white/80 hover:text-white transition-all duration-300 relative group py-2"
                tabIndex={0}
                aria-label={`Navigate to ${item} section`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white rounded-full group"
              tabIndex={0}
              aria-label="Get Started - go to contact form"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gradient-to-r from-neon-blue to-neon-purple rounded-full group-hover:w-full group-hover:h-56"></span>
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 bg-gradient-to-b from-transparent to-neon-purple group-hover:opacity-0"></span>
              <span className="relative group-hover:text-white">
                Get Started
              </span>
            </a>
          </div>

          {/* Mobile Menu Button - Inside navbar */}
          <button
            className={cn(
              "md:hidden flex items-center justify-center text-white w-10 h-10 bg-black/30 backdrop-blur-lg rounded-full border border-white/10 hover:bg-black/40 transition-all duration-300 overflow-hidden",
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            )}
            onClick={handleToggleMenu}
            onKeyDown={handleKeyDown}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            tabIndex={0}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-lg md:hidden transition-opacity duration-300",
          "z-[200]",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleToggleMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-[300px] md:hidden shadow-2xl",
          "z-[300]",
          "transition-transform duration-300 ease-in-out will-change-transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Menu Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl border-l border-white/10"></div>

        {/* Top header with close button */}
        <div className="relative h-[60px] w-full flex items-center justify-between px-4 border-b border-white/10 bg-black/90 backdrop-blur-xl shadow-lg">
          <div className="text-lg font-medium text-white opacity-80">Menu</div>
          <button
            onClick={handleToggleMenu}
            className="flex items-center justify-center text-white w-10 h-10 bg-black/30 backdrop-blur-lg rounded-full border border-white/10 hover:bg-black/50 transition-all duration-200"
            aria-label="Close menu"
            tabIndex={0}
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative flex flex-col justify-center items-center h-[calc(100%-60px)] py-10 overflow-y-auto">
          <nav className="flex flex-col items-center space-y-7 px-6 w-full max-w-sm">
            {["Home", "About", "Features", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={cn(
                  "font-medium text-xl text-white/90 hover:text-white transition-all duration-300 w-full text-center py-3 relative group",
                  mobileMenuOpen ? "animate-slide-down-fade" : "opacity-0"
                )}
                onClick={handleNavigation}
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-label={`Navigate to ${item} section`}
                style={{
                  animationDelay: `${index * 50 + 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple group-hover:w-20 transition-all duration-300 -translate-x-1/2"></span>
              </a>
            ))}
            <a
              href="#contact"
              className={cn(
                "bg-gradient-to-r from-neon-blue to-neon-purple mt-6 px-8 py-3.5 rounded-full text-white font-medium w-full text-center transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] ring-1 ring-white/10",
                mobileMenuOpen ? "animate-slide-up-fade" : "opacity-0"
              )}
              onClick={handleNavigation}
              tabIndex={mobileMenuOpen ? 0 : -1}
              aria-label="Get Started - go to contact form"
              style={{
                animationDelay: "300ms",
                animationFillMode: "forwards",
              }}
            >
              Get Started
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
