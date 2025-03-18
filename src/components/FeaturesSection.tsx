
import React, { useEffect, useRef } from 'react';
import { Check, Code, Cloud, LineChart, Lock, Zap, Layers, Workflow } from 'lucide-react';

const FeaturesSection = () => {
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

  const features = [
    {
      title: 'Advanced Analytics',
      description: 'Gain valuable insights with our powerful analytics tools. Track performance and make data-driven decisions.',
      icon: LineChart,
      delay: 100
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solutions that grow with your business. Reliable, secure, and always available.',
      icon: Cloud,
      delay: 200
    },
    {
      title: 'API Integration',
      description: 'Seamlessly connect with third-party services. Our flexible API architecture makes integration simple.',
      icon: Code,
      delay: 300
    },
    {
      title: 'Enhanced Security',
      description: 'Enterprise-grade security protocols protect your data. Stay safe with advanced encryption and authentication.',
      icon: Lock,
      delay: 400
    },
    {
      title: 'Blazing Performance',
      description: 'Optimized for speed and efficiency. Experience lightning-fast response times and smooth operation.',
      icon: Zap,
      delay: 500
    },
    {
      title: 'Modular Architecture',
      description: 'Flexible and adaptable components that can be customized to your specific business requirements.',
      icon: Layers,
      delay: 600
    },
  ];

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-secondary"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-neon-blue/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-neon-purple/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6">
        <div 
          ref={addToRefs}
          className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Powerful <span className="text-gradient">Technology</span> Stack
          </h2>
          <p className="text-lg text-white/70">
            Explore our comprehensive suite of features designed to streamline your operations, 
            enhance performance, and drive growth in today's competitive landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={addToRefs}
              className="reveal-on-scroll glass-card rounded-xl p-6 hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-6">
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div 
          ref={addToRefs}
          className="mt-20 bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden reveal-on-scroll"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-6">
                Why Choose Our Platform?
              </h3>
              <div className="space-y-4">
                {[
                  'Advanced real-time analytics dashboard',
                  'Seamless integration with existing systems',
                  'Customizable workflows and automation',
                  'Enterprise-grade security and compliance',
                  'Dedicated support and comprehensive documentation',
                  'Regular updates and continuous improvement'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-3 mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    <p className="text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 p-1">
              <div className="h-full bg-black/50 backdrop-blur-lg p-8 md:p-12 flex items-center">
                <div className="scene w-full">
                  <div className="card-3d w-full aspect-video bg-black/70 rounded-lg border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Workflow size={80} className="text-white/20" />
                    </div>
                    
                    {/* Simulated platform interface */}
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                          <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <div className="col-span-2 h-12 bg-white/5 rounded-md"></div>
                        <div className="h-24 bg-white/5 rounded-md flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-neon-blue/20"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-white/5 rounded-full"></div>
                          <div className="h-4 w-3/4 bg-white/5 rounded-full"></div>
                          <div className="h-4 w-1/2 bg-white/5 rounded-full"></div>
                        </div>
                        <div className="col-span-2 grid grid-cols-3 gap-2">
                          <div className="h-8 bg-white/5 rounded-md"></div>
                          <div className="h-8 bg-white/5 rounded-md"></div>
                          <div className="h-8 bg-neon-blue/20 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
