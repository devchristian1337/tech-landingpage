import React, { useEffect, useRef, useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

type FormField = {
  value: string;
  error: string;
  touched: boolean;
};

type FormState = {
  name: FormField;
  email: FormField;
  subject: FormField;
  message: FormField;
};

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  const [formState, setFormState] = useState<FormState>({
    name: { value: "", error: "", touched: false },
    email: { value: "", error: "", touched: false },
    subject: { value: "", error: "", touched: false },
    message: { value: "", error: "", touched: false },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const validateField = (name: string, value: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "email":
        if (value.trim() === "") return "Email is required";
        return !emailRegex.test(value) ? "Invalid email address" : "";
      case "subject":
        return value.trim() === "" ? "Subject is required" : "";
      case "message":
        return value.trim() === "" ? "Message is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: {
        value,
        error: validateField(name, value),
        touched: true,
      },
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormState],
        error: validateField(name, value),
        touched: true,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newFormState = { ...formState };
    let hasError = false;

    (Object.keys(newFormState) as Array<keyof FormState>).forEach(
      (fieldName) => {
        const error = validateField(fieldName, newFormState[fieldName].value);
        newFormState[fieldName] = {
          ...newFormState[fieldName],
          error,
          touched: true,
        };
        if (error) hasError = true;
      }
    );

    setFormState(newFormState);

    if (hasError) return;

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      setFormState({
        name: { value: "", error: "", touched: false },
        email: { value: "", error: "", touched: false },
        subject: { value: "", error: "", touched: false },
        message: { value: "", error: "", touched: false },
      });

      setIsSubmitting(false);
      setFormSubmitted(true);

      // Reset form submitted state after a delay
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-neon-blue/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-neon-purple/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6">
        <div
          ref={addToRefs}
          className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/70 mb-4 select-none">
            Contact Us
          </span>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-white/70">
            Have questions or want to learn more about our solutions? Reach out
            to our team and we'll get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div
            ref={addToRefs}
            className="glass-card rounded-xl p-8 reveal-on-scroll"
          >
            <h3 className="text-2xl font-display font-bold mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Full Name{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formState.name.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      formState.name.touched && formState.name.error
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue/50 text-white`}
                    placeholder="John Doe"
                    aria-required="true"
                    aria-invalid={
                      formState.name.touched && !!formState.name.error
                    }
                    aria-describedby={
                      formState.name.error ? "name-error" : undefined
                    }
                    disabled={isSubmitting}
                  />
                  {formState.name.touched && formState.name.error && (
                    <p id="name-error" className="mt-1 text-sm text-red-500">
                      {formState.name.error}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Email Address{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formState.email.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 bg-white/5 border ${
                      formState.email.touched && formState.email.error
                        ? "border-red-500"
                        : "border-white/10"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue/50 text-white`}
                    placeholder="john@example.com"
                    aria-required="true"
                    aria-invalid={
                      formState.email.touched && !!formState.email.error
                    }
                    aria-describedby={
                      formState.email.error ? "email-error" : undefined
                    }
                    disabled={isSubmitting}
                  />
                  {formState.email.touched && formState.email.error && (
                    <p id="email-error" className="mt-1 text-sm text-red-500">
                      {formState.email.error}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Subject{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formState.subject.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    formState.subject.touched && formState.subject.error
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue/50 text-white`}
                  placeholder="How can we help you?"
                  aria-required="true"
                  aria-invalid={
                    formState.subject.touched && !!formState.subject.error
                  }
                  aria-describedby={
                    formState.subject.error ? "subject-error" : undefined
                  }
                  disabled={isSubmitting}
                />
                {formState.subject.touched && formState.subject.error && (
                  <p id="subject-error" className="mt-1 text-sm text-red-500">
                    {formState.subject.error}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white/70 mb-2"
                >
                  Message{" "}
                  <span className="text-red-500" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formState.message.value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    formState.message.touched && formState.message.error
                      ? "border-red-500"
                      : "border-white/10"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue/50 text-white resize-none`}
                  placeholder="Tell us about your project or inquiry..."
                  aria-required="true"
                  aria-invalid={
                    formState.message.touched && !!formState.message.error
                  }
                  aria-describedby={
                    formState.message.error ? "message-error" : undefined
                  }
                  disabled={isSubmitting}
                ></textarea>
                {formState.message.touched && formState.message.error && (
                  <p id="message-error" className="mt-1 text-sm text-red-500">
                    {formState.message.error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-hover-effect w-full bg-gradient-to-r from-neon-blue to-neon-purple py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center"
                aria-live="polite"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <Send size={18} className="ml-2" />
                  </span>
                )}
              </button>

              {formSubmitted && (
                <div
                  className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-white"
                  role="alert"
                >
                  <p>Thank you for your message! We'll get back to you soon.</p>
                </div>
              )}
            </form>
          </div>

          <div
            ref={addToRefs}
            className="flex flex-col space-y-8 reveal-on-scroll"
          >
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-2xl font-display font-bold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Email</h4>
                    <a
                      href="mailto:info@novatech.com"
                      className="text-white/70 hover:text-neon-blue transition-colors"
                      tabIndex={0}
                    >
                      info@novatech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Phone</h4>
                    <a
                      href="tel:+1234567890"
                      className="text-white/70 hover:text-neon-blue transition-colors"
                      tabIndex={0}
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Location</h4>
                    <p className="text-white/70">
                      123 Innovation Street
                      <br />
                      Tech City, TC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 glass-card rounded-xl p-8 flex flex-col">
              <h3 className="text-2xl font-display font-bold mb-6">
                Office Hours
              </h3>

              <div className="space-y-3 flex-1">
                <div className="flex justify-between">
                  <span className="text-white/70">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/70">
                  For urgent inquiries outside of business hours, please email
                  us and we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
