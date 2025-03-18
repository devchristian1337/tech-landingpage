import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import ParticleBackground from "../components/ParticleBackground";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
    const textEl = textRef.current;
    const btnEl = btnRef.current;

    if (titleEl) observer.observe(titleEl);
    if (textEl) observer.observe(textEl);
    if (btnEl) observer.observe(btnEl);

    return () => {
      if (titleEl) observer.unobserve(titleEl);
      if (textEl) observer.unobserve(textEl);
      if (btnEl) observer.unobserve(btnEl);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 glass-card p-10 rounded-2xl max-w-md w-full mx-4">
        <h1
          ref={titleRef}
          className="text-6xl font-bold mb-6 text-gradient reveal-on-scroll"
        >
          404
        </h1>
        <p
          ref={textRef}
          className="text-xl text-foreground/80 mb-8 reveal-on-scroll"
          style={{ transitionDelay: "100ms" }}
        >
          The page you're looking for doesn't exist or has been moved to another
          dimension.
        </p>
        <div
          ref={btnRef}
          className="reveal-on-scroll"
          style={{ transitionDelay: "200ms" }}
        >
          <Link
            to="/"
            className={cn(
              "group flex items-center gap-2 btn-hover-effect",
              "bg-primary/80 hover:bg-primary text-primary-foreground",
              "px-6 py-3 rounded-lg font-medium transition-all duration-300"
            )}
            tabIndex={0}
            aria-label="Return to Home page"
            onKeyDown={handleKeyDown}
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
