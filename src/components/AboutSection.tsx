
import React, { useEffect, useRef } from 'react';
import { Zap, Cpu, Globe, Shield } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const elements = elementsRef.current;
      
      elements.forEach((element) => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is in viewport
        if (rect.top <= windowHeight * 0.8) {
          element.classList.add('revealed');
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add an element to the ref array
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const coreValues = [
    {
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technology and forward-thinking solutions.',
      icon: Zap,
      color: 'from-neon-blue to-neon-cyan',
      delay: 100
    },
    {
      title: 'Performance',
      description: 'Delivering high-performance systems that exceed expectations and scale with your needs.',
      icon: Cpu,
      color: 'from-neon-purple to-neon-pink',
      delay: 200
    },
    {
      title: 'Global Reach',
      description: 'Connecting businesses worldwide with solutions that bridge distances and cultures.',
      icon: Globe,
      color: 'from-neon-blue to-neon-purple',
      delay: 300
    },
    {
      title: 'Security',
      description: 'Prioritizing data protection and privacy with enterprise-grade security protocols.',
      icon: Shield,
      color: 'from-neon-pink to-neon-purple',
      delay: 400
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-neon-blue/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-neon-purple/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6">
        <div 
          ref={addToRefs}
          className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Pioneering the <span className="text-gradient">Digital Future</span>
          </h2>
          <p className="text-lg text-white/70">
            Founded on principles of innovation and excellence, we're dedicated to creating 
            technology solutions that empower businesses to thrive in an increasingly digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <div 
              key={index}
              ref={addToRefs}
              className="reveal-on-scroll glass-card rounded-xl p-6 flex flex-col items-center text-center"
              style={{ transitionDelay: `${value.delay}ms` }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}>
                <value.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{value.title}</h3>
              <p className="text-white/70">{value.description}</p>
            </div>
          ))}
        </div>

        <div 
          ref={addToRefs} 
          className="mt-20 grid md:grid-cols-2 gap-12 items-center reveal-on-scroll"
        >
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
              Our Vision & Mission
            </h3>
            <p className="text-white/70 mb-6">
              We envision a world where technology enhances human potential, breaks down barriers, 
              and creates opportunities for all. Our mission is to develop innovative solutions that 
              solve complex problems and drive sustainable growth for our clients.
            </p>
            <p className="text-white/70">
              Through collaborative partnerships and a commitment to excellence, we're building 
              a future where cutting-edge technology is accessible, intuitive, and empowering.
            </p>
          </div>
          <div className="order-1 md:order-2 scene">
            <div className="card-3d p-1 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg backdrop-blur-sm">
              <div className="bg-black/50 backdrop-blur-lg p-6 rounded-lg border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Projects', value: '200+' },
                    { label: 'Clients', value: '50+' },
                    { label: 'Countries', value: '12' },
                    { label: 'Team', value: '40+' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4">
                      <p className="text-3xl font-display font-bold text-gradient mb-2">{stat.value}</p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
