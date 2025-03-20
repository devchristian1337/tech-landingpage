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

// Offscreen canvas is used for better performance when available
const supportsOffscreenCanvas =
  typeof window !== "undefined" && "OffscreenCanvas" in window;

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastFrameTimeRef = useRef<number>(0);
  const workerRef = useRef<Worker | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    }) as CanvasRenderingContext2D;
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      // Calculate particle density based on screen size with upper limit
      const particleCount = Math.min(
        Math.floor(window.innerWidth * window.innerHeight * 0.00003),
        maxParticles
      );

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 0.2 - 0.1;
        const speedY = Math.random() * 0.2 - 0.1;
        const color =
          particleColors[Math.floor(Math.random() * particleColors.length)];

        particlesRef.current.push({ x, y, size, speedX, speedY, color });
      }
    };

    // Try to use web worker for better performance
    if (typeof window !== "undefined" && window.Worker && !isMobile) {
      try {
        // Create a worker for handling particle calculations
        const workerCode = `
          self.onmessage = function(e) {
            const { particles, canvasWidth, canvasHeight, maxDistance, mousePosition, maxForceDistance } = e.data;
            
            // Update particles position
            particles.forEach(particle => {
              particle.x += particle.speedX;
              particle.y += particle.speedY;
              
              // Bounce off walls
              if (particle.x < 0 || particle.x > canvasWidth) {
                particle.speedX *= -1;
              }
              if (particle.y < 0 || particle.y > canvasHeight) {
                particle.speedY *= -1;
              }
              
              // Apply mouse interaction if mouse position exists
              if (mousePosition) {
                const dx = mousePosition.x - particle.x;
                const dy = mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxForceDistance) {
                  const force = (maxForceDistance - distance) / maxForceDistance;
                  const directionX = dx / distance;
                  const directionY = dy / distance;
                  
                  particle.speedX -= directionX * force * 0.5;
                  particle.speedY -= directionY * force * 0.5;
                }
              }
            });
            
            // Calculate connections
            const connections = [];
            if (maxDistance) {
              for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                  const dx = particles[i].x - particles[j].x;
                  const dy = particles[i].y - particles[j].y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance < maxDistance) {
                    connections.push({
                      from: i,
                      to: j,
                      opacity: 1 - distance / maxDistance
                    });
                  }
                }
              }
            }
            
            self.postMessage({ particles, connections });
          };
        `;

        const blob = new Blob([workerCode], { type: "application/javascript" });
        const workerUrl = URL.createObjectURL(blob);
        workerRef.current = new Worker(workerUrl);

        // Clean up URL
        URL.revokeObjectURL(workerUrl);
      } catch (e) {
        console.warn(
          "Web Worker creation failed, falling back to main thread",
          e
        );
        workerRef.current = null;
      }
    }

    // Update particles on main thread if no worker
    const updateParticles = () => {
      const particles = particlesRef.current;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

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

    // Connect particles that are close to each other
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

    // Draw particles and connections
    const drawParticles = (
      particles: Particle[],
      connections?: { from: number; to: number; opacity: number }[]
    ) => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Draw connections if provided
      if (connections) {
        connections.forEach((connection) => {
          const from = particles[connection.from];
          const to = particles[connection.to];
          ctx.strokeStyle = `rgba(0, 242, 254, ${connection.opacity * 0.2})`;
          ctx.lineWidth = 0.5;

          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        });
      } else if (!isMobile) {
        // If no connections provided and not mobile, calculate on main thread
        connectParticles();
      }
    };

    // Animation loop with frame rate control and RAF scheduling
    const animate = (timestamp: number) => {
      // Use the worker if available
      if (workerRef.current) {
        if (timestamp - lastFrameTimeRef.current >= frameInterval) {
          lastFrameTimeRef.current = timestamp;

          // Send data to worker for processing
          workerRef.current.postMessage({
            particles: particlesRef.current,
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
            maxDistance: !isMobile ? maxDistance : null,
            mousePosition: mousePositionRef.current,
            maxForceDistance: isMobile ? 50 : 100,
          });
        }
      } else {
        // Use main thread
        if (timestamp - lastFrameTimeRef.current >= frameInterval) {
          lastFrameTimeRef.current = timestamp;
          updateParticles();
          drawParticles(particlesRef.current);
        }
      }

      // Schedule next frame optimally
      animationFrameIdRef.current = window.requestAnimationFrame(animate);
    };

    // Handle worker messages
    if (workerRef.current) {
      workerRef.current.onmessage = (e) => {
        const { particles, connections } = e.data;
        particlesRef.current = particles;
        drawParticles(particles, connections);
      };
    }

    // Handle mouse movement with throttling
    let lastMoveTime = 0;
    const moveThrottle = 50; // ms between mouse move handling

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      if (currentTime - lastMoveTime < moveThrottle) return;
      lastMoveTime = currentTime;

      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };

      // If not using worker, handle particle interactions directly
      if (!workerRef.current) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const particles = particlesRef.current;
        const maxForceDistance = isMobile ? 50 : 100;

        // Push particles away from cursor
        particles.forEach((particle) => {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxForceDistance) {
            const force = (maxForceDistance - distance) / maxForceDistance;
            const directionX = dx / distance;
            const directionY = dy / distance;

            particle.speedX -= directionX * force * 0.5;
            particle.speedY -= directionY * force * 0.5;
          }
        });
      }
    };

    // Initialize
    resizeCanvas();
    initParticles();
    lastFrameTimeRef.current = performance.now();
    animationFrameIdRef.current = window.requestAnimationFrame(animate);

    // Event listeners
    const debouncedResize = debounce(() => {
      resizeCanvas();
      initParticles();
    }, 200);

    window.addEventListener("resize", debouncedResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile, maxParticles, maxDistance, particleColors, frameInterval]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="fixed inset-0 z-[-1] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
