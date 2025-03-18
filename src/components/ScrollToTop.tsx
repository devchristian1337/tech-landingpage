import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <button
      className={`fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16 pointer-events-none"
      }`}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Scroll to top of page"
      tabIndex={isVisible ? 0 : -1}
      type="button"
      style={{
        background: isHovered
          ? "linear-gradient(140deg, #00f2fe, #8A2BE2)"
          : "linear-gradient(45deg, #00f2fe, #8A2BE2)",
      }}
    >
      <span
        className={`absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? "opacity-20" : "opacity-0"
        }`}
      ></span>

      <div className="relative z-10 bg-white/20 rounded-full p-1.5 shadow-inner">
        <ChevronUp
          size={24}
          className={`text-white transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] ${
            isHovered ? "transform -translate-y-1" : ""
          }`}
          strokeWidth={2.5}
        />
      </div>

      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple blur-md opacity-30 group-hover:opacity-70 animate-pulse-glow"></span>
    </button>
  );
};

export default ScrollToTop;
