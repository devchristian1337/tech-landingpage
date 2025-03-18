
import React, { useEffect, useRef } from 'react';

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasSize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Globe properties
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Grid properties
    const gridStep = Math.PI / 12;
    let rotation = 0;
    let rotationSpeed = 0.0005;
    let isHovering = false;
    let isMouseDown = false;
    let lastMouseX = 0;
    
    // Draw globe
    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw globe background
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(13, 16, 25, 0.8)');
      gradient.addColorStop(0.5, 'rgba(13, 16, 25, 0.5)');
      gradient.addColorStop(1, 'rgba(13, 16, 25, 0.2)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw grid lines
      for (let i = 0; i < Math.PI * 2; i += gridStep) {
        // Latitude line
        ctx.beginPath();
        for (let j = 0; j < Math.PI * 2; j += Math.PI / 60) {
          const x = centerX + radius * Math.cos(j) * Math.sin(i + rotation);
          const y = centerY + radius * Math.sin(j);
          const z = Math.cos(i + rotation);
          
          // Only draw points in front of the globe
          if (z < 0) continue;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        // Longitude line
        ctx.beginPath();
        for (let j = 0; j < Math.PI; j += Math.PI / 60) {
          const x = centerX + radius * Math.sin(j) * Math.cos(i + rotation);
          const y = centerY + radius * Math.cos(j);
          const z = Math.sin(i + rotation);
          
          // Only draw points in front of the globe
          if (z < 0) continue;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Draw points at grid intersections
      for (let i = 0; i < Math.PI * 2; i += gridStep) {
        for (let j = 0; j < Math.PI; j += gridStep) {
          const x = centerX + radius * Math.sin(j) * Math.cos(i + rotation);
          const y = centerY + radius * Math.cos(j);
          const z = Math.sin(i + rotation);
          
          // Only draw points in front of the globe
          if (z < 0) continue;
          
          const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          const normalizedDist = distFromCenter / radius;
          const pointSize = 2 * (1 - normalizedDist * 0.5);
          
          ctx.beginPath();
          ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(0, 242, 254, 0.8)';
          ctx.fill();
        }
      }
      
      // Draw outer glow
      const outerGlowGradient = ctx.createRadialGradient(
        centerX, centerY, radius, 
        centerX, centerY, radius * 1.2
      );
      outerGlowGradient.addColorStop(0, 'rgba(0, 242, 254, 0.3)');
      outerGlowGradient.addColorStop(1, 'rgba(0, 242, 254, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, 2 * Math.PI);
      ctx.fillStyle = outerGlowGradient;
      ctx.fill();
    };
    
    // Animation loop
    const animate = () => {
      if (!isMouseDown && !isHovering) {
        rotation += rotationSpeed;
      }
      drawGlobe();
      requestAnimationFrame(animate);
    };
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Check if mouse is over the globe
      const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
      isHovering = distance <= radius;
      
      if (isMouseDown) {
        const deltaX = mouseX - lastMouseX;
        rotation += deltaX * 0.005;
        lastMouseX = mouseX;
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastMouseX = e.clientX - rect.left;
      isMouseDown = true;
      canvas.style.cursor = 'grabbing';
    };
    
    const handleMouseUp = () => {
      isMouseDown = false;
      canvas.style.cursor = isHovering ? 'grab' : 'default';
    };
    
    const handleMouseEnter = () => {
      canvas.style.cursor = 'grab';
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      isMouseDown = false;
      canvas.style.cursor = 'default';
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden rounded-full bg-gradient-to-br from-black/40 to-black/10 backdrop-blur-lg border border-white/10 shadow-[0_0_30px_rgba(0,242,254,0.2)]"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default Globe;
