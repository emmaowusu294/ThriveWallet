import React, { useState } from "react";
import { Bell, Plus, Moon, Sun } from "lucide-react";

const Header = ({ onOpenModal }) => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("thrive-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("thrive-theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="h-20 bg-bg-base border-b border-border-subtle flex items-center justify-between px-6 md:px-10 sticky top-0 z-30 transition-colors duration-300">
      <div>
        <h2 className="text-xl font-bold text-text-primary hidden md:block">
          Welcome back, Emmanuel 👋
        </h2>
        <h2 className="text-lg font-bold text-text-primary md:hidden">
          Hi, Emmanuel
        </h2>
      </div>

      <div className="flex items-center gap-4 mr-12 md:mr-0">
        <button
          onClick={toggleDarkMode}
          className="p-2 text-text-muted hover:text-brand hover:bg-brand/10 rounded-full transition-all"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="relative p-2 text-text-muted hover:text-text-primary hover:bg-bg-surface rounded-full transition-colors hidden sm:block">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full border border-bg-base"></span>
        </button>

        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 bg-brand hover:bg-brand-hover text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-brand/20 transition-all hover:-translate-y-0.5"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Transaction</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
