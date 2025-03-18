import React, { useEffect, useRef } from "react";
import { Zap, Cpu, Globe, Shield, ArrowRight } from "lucide-react";

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

  const coreValues = [
    {
      title: "Innovation",
      description:
        "Pushing boundaries with cutting-edge technology and forward-thinking solutions.",
      icon: Zap,
      color: "from-neon-blue to-neon-cyan",
      delay: 100,
    },
    {
      title: "Performance",
      description:
        "Delivering high-performance systems that exceed expectations and scale with your needs.",
      icon: Cpu,
      color: "from-neon-purple to-neon-pink",
      delay: 200,
    },
    {
      title: "Global Reach",
      description:
        "Connecting businesses worldwide with solutions that bridge distances and cultures.",
      icon: Globe,
      color: "from-neon-blue to-neon-purple",
      delay: 300,
    },
    {
      title: "Security",
      description:
        "Prioritizing data protection and privacy with enterprise-grade security protocols.",
      icon: Shield,
      color: "from-neon-pink to-neon-purple",
      delay: 400,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-neon-blue/15 rounded-full filter blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-neon-purple/15 rounded-full filter blur-[120px] animate-pulse-glow animation-delay-1000"></div>
        <div className="absolute top-2/3 left-2/3 w-48 h-48 bg-neon-cyan/10 rounded-full filter blur-[100px] animate-pulse-glow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6">
        <div
          ref={addToRefs}
          className="text-center max-w-3xl mx-auto mb-20 reveal-on-scroll opacity-0 translate-y-10"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 mb-6 animate-shimmer bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.1),transparent)] bg-[length:200%_100%] select-none">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
            Pioneering the{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple">
              Digital Future
            </span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Founded on principles of innovation and excellence, we're dedicated
            to creating technology solutions that empower businesses to thrive
            in an increasingly digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="reveal-on-scroll glass-card rounded-xl p-8 flex flex-col items-center text-center opacity-0 translate-y-10 border border-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/5 group"
              style={{ transitionDelay: `${value.delay}ms` }}
            >
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
              >
                <value.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3 text-white">
                {value.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={addToRefs}
          className="mt-24 grid md:grid-cols-2 gap-12 lg:gap-16 items-center reveal-on-scroll opacity-0 translate-y-10"
        >
          <div className="order-2 md:order-1">
            <div className="inline-block px-4 py-1.5 text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 mb-6 select-none">
              Our Story
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white">
              Our Vision & Mission
            </h3>
            <p className="text-white/70 mb-6 leading-relaxed">
              We envision a world where technology enhances human potential,
              breaks down barriers, and creates opportunities for all. Our
              mission is to develop innovative solutions that solve complex
              problems and drive sustainable growth for our clients.
            </p>
            <p className="text-white/70 mb-8 leading-relaxed">
              Through collaborative partnerships and a commitment to excellence,
              we're building a future where cutting-edge technology is
              accessible, intuitive, and empowering.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-neon-blue hover:text-white group transition-colors duration-300"
              tabIndex={0}
              aria-label="Learn more about our company"
            >
              <span>Learn more about us</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>
          <div className="order-1 md:order-2 scene">
            <div className="card-3d bg-gradient-to-br from-neon-blue/20 via-transparent to-neon-purple/20 p-[1px] rounded-2xl backdrop-blur-md">
              <div className="bg-black/50 backdrop-blur-lg p-8 rounded-2xl border border-white/10">
                <div className="grid grid-cols-2 gap-6 select-none">
                  {[
                    { label: "Projects", value: "200+" },
                    { label: "Clients", value: "50+" },
                    { label: "Countries", value: "12" },
                    { label: "Team", value: "40+" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <p className="text-3xl font-display font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple mb-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-2 select-none">
                    <span className="text-sm text-white/70">
                      Client Satisfaction
                    </span>
                    <span className="text-sm font-medium text-neon-blue">
                      98%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"></div>
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

export default AboutSection;
