import React, { useState, useEffect, useRef } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef(null);

  // 1. Theme Persistence & Initialization
  useEffect(() => {
    // Check local storage first, fallback to system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  // 2. Scroll Spy (Active Section Highlighting)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "how-it-works", "testimonials"];
      const scrollPosition = window.scrollY + 100; // Offset for the fixed navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            return;
          }
        }
      }
      // If at the very top, clear active state
      if (window.scrollY < 100) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Click Outside to Close Menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. Prevent Background Scrolling when Menu is Open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    }; // Cleanup
  }, [isMobileMenuOpen]);

  // Actions
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (section) => {
    setIsMobileMenuOpen(false); // Close menu on click
    // Optional: Smooth scroll logic here if not using native CSS scroll-behavior
  };

  return (
    <nav
      ref={menuRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 rounded-full bg-bg-surface/60 backdrop-blur-lg border border-border-subtle shadow-sm px-5 py-3 transition-all duration-300"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left side: Logo (Now scrolls to top) */}
        <div
          onClick={scrollToTop}
          className="flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/40">
            <span className="text-white font-bold text-lg leading-none">T</span>
          </div>
          <span className="text-xl font-bold text-text-primary tracking-tight">
            ThriveWallet
          </span>
        </div>

        {/* Middle: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["features", "how-it-works", "testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`cursor-pointer transition-colors duration-200 ${
                activeSection === item
                  ? "text-brand"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {item
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </a>
          ))}
        </div>

        {/* Right side: Actions & Toggles */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-muted hover:text-brand hover:bg-bg-base hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Desktop Only Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="w-px h-6 bg-border-subtle"></div>
            <button className="text-sm font-medium text-text-primary hover:text-brand transition-colors cursor-pointer">
              Sign In
            </button>
            <button className="px-5 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-hover rounded-full transition-all duration-300 shadow-md shadow-brand/30 hover:shadow-brand/50 hover:scale-105 active:scale-95 cursor-pointer">
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-text-muted hover:text-brand hover:bg-bg-base transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[110%] left-0 w-full bg-bg-surface/100 backdrop-blur-xl border border-border-subtle rounded-2xl p-5 flex flex-col gap-4 shadow-xl animate-dropdown">
          {["features", "how-it-works", "testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => handleNavClick(item)}
              className={`font-medium transition-colors ${
                activeSection === item
                  ? "text-brand"
                  : "text-text-primary hover:text-brand"
              }`}
            >
              {item
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </a>
          ))}
          <div className="w-full h-px bg-border-subtle my-2"></div>
          <button className="w-full py-3 text-text-primary font-medium border border-border-subtle rounded-xl hover:bg-bg-base transition-colors">
            Sign In
          </button>
          <button className="w-full py-3 text-white font-medium bg-brand rounded-xl hover:bg-brand-hover transition-colors shadow-md shadow-brand/30">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
