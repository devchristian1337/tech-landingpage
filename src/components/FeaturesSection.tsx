import React, { useEffect, useRef } from "react";
import {
  Check,
  Code,
  Cloud,
  LineChart,
  Lock,
  Zap,
  Layers,
  Workflow,
  ArrowRight,
} from "lucide-react";

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
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;

        // Element is in viewport
        if (rect.top <= windowHeight * 0.8) {
          element.classList.add("revealed");
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
      title: "Advanced Analytics",
      description:
        "Gain valuable insights with our powerful analytics tools. Track performance and make data-driven decisions.",
      icon: LineChart,
      color: "from-neon-blue to-neon-cyan",
      delay: 100,
    },
    {
      title: "Cloud Infrastructure",
      description:
        "Scalable cloud solutions that grow with your business. Reliable, secure, and always available.",
      icon: Cloud,
      color: "from-neon-purple to-neon-pink",
      delay: 200,
    },
    {
      title: "API Integration",
      description:
        "Seamlessly connect with third-party services. Our flexible API architecture makes integration simple.",
      icon: Code,
      color: "from-neon-blue to-neon-purple",
      delay: 300,
    },
    {
      title: "Enhanced Security",
      description:
        "Enterprise-grade security protocols protect your data. Stay safe with advanced encryption and authentication.",
      icon: Lock,
      color: "from-neon-pink to-neon-purple",
      delay: 400,
    },
    {
      title: "Blazing Performance",
      description:
        "Optimized for speed and efficiency. Experience lightning-fast response times and smooth operation.",
      icon: Zap,
      color: "from-neon-cyan to-neon-blue",
      delay: 500,
    },
    {
      title: "Modular Architecture",
      description:
        "Flexible and adaptable components that can be customized to your specific business requirements.",
      icon: Layers,
      color: "from-neon-purple to-neon-blue",
      delay: 600,
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-neon-blue/15 rounded-full filter blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-neon-purple/15 rounded-full filter blur-[120px] animate-pulse-glow animation-delay-1000"></div>
        <div className="absolute top-2/3 right-1/2 w-48 h-48 bg-neon-cyan/10 rounded-full filter blur-[100px] animate-pulse-glow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6">
        <div
          ref={addToRefs}
          className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll opacity-0 translate-y-10"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 mb-6 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.1),transparent)] bg-[length:200%_100%] select-none">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
            Powerful{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Technology
            </span>{" "}
            Stack
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Explore our comprehensive suite of features designed to streamline
            your operations, enhance performance, and drive growth in today's
            competitive landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="reveal-on-scroll glass-card rounded-xl p-8 hover:translate-y-[-8px] hover:shadow-lg transition-all duration-500 ease-out opacity-0 translate-y-10 bg-white/5 backdrop-blur-md border border-white/5 group"
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:text-neon-blue transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className="flex justify-end">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-neon-blue/20 transition-all duration-300">
                  <ArrowRight
                    size={14}
                    className="text-white/70 group-hover:text-white transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={addToRefs}
          className="mt-24 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden reveal-on-scroll opacity-0 translate-y-10 shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <div className="inline-block px-4 py-1.5 text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 mb-6 select-none">
                Why Choose Us
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-white">
                Why Choose Our Platform?
              </h3>
              <div className="space-y-5">
                {[
                  "Advanced real-time analytics dashboard",
                  "Seamless integration with existing systems",
                  "Customizable workflows and automation",
                  "Enterprise-grade security and compliance",
                  "Dedicated support and comprehensive documentation",
                  "Regular updates and continuous improvement",
                ].map((item, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="mr-4 mt-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Check size={12} className="text-white" />
                    </div>
                    <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 text-white"
                  tabIndex={0}
                  aria-label="Get started with our platform"
                >
                  <span>Try it free for 30 days</span>
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-neon-blue/20 via-transparent to-neon-purple/20 p-[1px]">
              <div className="h-full bg-black/50 backdrop-blur-xl p-8 md:p-12 flex items-center">
                <div className="scene w-full">
                  <div className="card-3d w-full aspect-video bg-black/70 rounded-lg border border-white/10 relative overflow-hidden shadow-xl">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Workflow size={100} className="text-white" />
                    </div>

                    {/* Simulated platform interface */}
                    <div className="absolute inset-0 p-5 flex flex-col">
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex space-x-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
                        </div>
                        <div className="h-5 w-32 bg-white/10 rounded-full"></div>
                      </div>

                      <div className="flex-1 grid grid-cols-4 gap-3">
                        {/* Sidebar */}
                        <div className="col-span-1 bg-white/5 rounded-lg p-2 space-y-3">
                          <div className="h-8 w-full bg-neon-blue/20 rounded-md"></div>
                          <div className="h-4 w-full bg-white/10 rounded-md"></div>
                          <div className="h-4 w-full bg-white/10 rounded-md"></div>
                          <div className="h-4 w-full bg-white/10 rounded-md"></div>
                        </div>

                        {/* Main content */}
                        <div className="col-span-3 space-y-3">
                          <div className="h-8 bg-white/5 rounded-lg"></div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/5 rounded-lg p-2 h-20">
                              <div className="h-3 w-1/2 bg-white/10 rounded-full mb-2"></div>
                              <div className="h-10 w-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-md"></div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 h-20">
                              <div className="h-3 w-1/2 bg-white/10 rounded-full mb-2"></div>
                              <div className="h-10 w-full bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 rounded-md"></div>
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 grid grid-cols-4 gap-2">
                            <div className="col-span-1">
                              <div className="h-3 w-3/4 bg-white/10 rounded-full mb-2"></div>
                              <div className="h-3 w-1/2 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="col-span-3 flex items-end justify-end">
                              <div className="h-6 w-24 bg-neon-blue/30 rounded-md"></div>
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
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
