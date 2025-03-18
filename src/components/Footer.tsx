import React, { useState } from "react";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) validateEmail(e.target.value);
  };

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setEmailError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail(email)) {
      // Handle subscription logic here
      alert("Subscribed successfully!");
      setEmail("");
    }
  };

  return (
    <footer
      className="py-12 bg-black/50 backdrop-blur-lg border-t border-white/10"
      role="contentinfo"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <a
              href="#"
              className="text-2xl font-display font-bold text-gradient mb-6 inline-block"
              tabIndex={0}
              aria-label="NOVATECH"
            >
              NOVA<span className="text-white">TECH</span>
            </a>
            <p className="text-white/70 mb-6">
              Transforming ideas into digital reality with cutting-edge
              solutions for modern businesses.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Twitter"
                tabIndex={0}
              >
                <Twitter size={18} className="text-white/70" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
                tabIndex={0}
              >
                <Linkedin size={18} className="text-white/70" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="GitHub"
                tabIndex={0}
              >
                <Github size={18} className="text-white/70" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Instagram"
                tabIndex={0}
              >
                <Instagram size={18} className="text-white/70" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Features", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/70 hover:text-white transition-colors"
                    tabIndex={0}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "Mobile Apps",
                "Cloud Solutions",
                "API Integration",
                "UX/UI Design",
                "Consulting",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#features"
                    className="text-white/70 hover:text-white transition-colors"
                    tabIndex={0}
                    aria-label={`${item} service`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter to receive the latest updates and
              news.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-2 w-full"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flex-1 w-full">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className={`w-full px-4 py-2 bg-white/5 border ${
                      emailError ? "border-red-500" : "border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue/50 text-white`}
                    required
                    aria-required="true"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "email-error" : undefined}
                    onChange={handleEmailChange}
                    onBlur={() => validateEmail(email)}
                    value={email}
                  />
                  {emailError && (
                    <p
                      id="email-error"
                      className="absolute mt-1 text-sm text-red-500"
                    >
                      {emailError}
                    </p>
                  )}
                </div>
              </div>
              <div className="self-start">
                <button
                  type="submit"
                  className="btn-hover-effect whitespace-nowrap bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 rounded-lg text-white font-medium"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NovaTech. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:space-x-6">
            <a
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors"
              tabIndex={0}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors"
              tabIndex={0}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors"
              tabIndex={0}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
