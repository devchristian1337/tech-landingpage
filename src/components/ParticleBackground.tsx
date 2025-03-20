import React, { useEffect, useRef, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastFrameTimeRef = useRef<number>(0);
  const isMobile = useIsMobile();

  // Using useMemo to avoid recreating these values on renders
  const particleColors = useMemo(
    () => [
      "rgba(0, 242, 254, 0.8)", // neon blue
      "rgba(138, 43, 226, 0.8)", // neon purple
      "rgba(255, 105, 180, 0.8)", // neon pink
      "rgba(0, 255, 255, 0.8)", // neon cyan
    ],
    []
  );

  const desiredFPS = useMemo(() => (isMobile ? 30 : 60), [isMobile]);
  const frameInterval = useMemo(() => 1000 / desiredFPS, [desiredFPS]);
  const maxParticles = useMemo(() => (isMobile ? 50 : 100), [isMobile]);
  const maxDistance = useMemo(() => (isMobile ? 100 : 150), [isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      // Calculate particle density based on screen size with upper limit
      const particleCount = Math.min(
        Math.floor(window.innerWidth * window.innerHeight * 0.00004),
        maxParticles
      );

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.1;
        const x = Math.random() * (canvas?.width || 0);
        const y = Math.random() * (canvas?.height || 0);
        const speedX = Math.random() * 0.2 - 0.1;
        const speedY = Math.random() * 0.2 - 0.1;
        const color =
          particleColors[Math.floor(Math.random() * particleColors.length)];

        particlesRef.current.push({ x, y, size, speedX, speedY, color });
      }
    };

    // Update particles position
    const updateParticles = () => {
      const particles = particlesRef.current;
      const canvasWidth = canvas?.width || 0;
      const canvasHeight = canvas?.height || 0;

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvasWidth) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvasHeight) {
          particle.speedY *= -1;
        }
      });
    };

    // Draw particles
    const drawParticles = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Connect nearby particles with lines
      if (!isMobile) {
        // Skip connections on mobile for better performance
        connectParticles();
      }
    };

    // Connect particles within a certain distance
    const connectParticles = () => {
      if (!ctx) return;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Set opacity based on distance
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop with frame rate control
    const animate = (timestamp: number) => {
      // Skip frames to maintain desired FPS
      if (timestamp - lastFrameTimeRef.current >= frameInterval) {
        lastFrameTimeRef.current = timestamp;
        updateParticles();
        drawParticles();
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle mouse movement with throttling
    let lastMoveTime = 0;
    const moveThrottle = 50; // ms between mouse move handling

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      if (currentTime - lastMoveTime < moveThrottle) return;
      lastMoveTime = currentTime;

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const particles = particlesRef.current;

      // Push particles away from cursor
      particles.forEach((particle) => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxForceDistance = isMobile ? 50 : 100;

        if (distance < maxForceDistance) {
          const force = (maxForceDistance - distance) / maxForceDistance;
          const directionX = dx / distance;
          const directionY = dy / distance;

          particle.speedX -= directionX * force * 0.5;
          particle.speedY -= directionY * force * 0.5;
        }
      });
    };

    // Initialize
    resizeCanvas();
    initParticles();
    lastFrameTimeRef.current = performance.now();
    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Event listeners
    const debouncedResize = debounce(() => {
      resizeCanvas();
      initParticles();
    }, 150);

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, maxParticles, maxDistance, particleColors, frameInterval]);

  // Simple debounce function
  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
};

export default ParticleBackground;
