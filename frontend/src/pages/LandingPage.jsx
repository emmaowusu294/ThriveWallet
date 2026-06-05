import React from "react";
import Navbar from "../components/layout/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg-base transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section
        id="top"
        className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary tracking-tight mb-6">
          Take control of <br />
          <span className="text-brand">your money.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mb-10">
          The manual, private, and beautiful way to track your expenses, build
          smart budgets, and watch your net worth grow. No bank logins required.
        </p>
        <button className="px-8 py-4 text-lg font-semibold text-white bg-brand hover:bg-brand-hover rounded-full transition-colors shadow-lg shadow-brand/30 hover:scale-105 active:scale-95 cursor-pointer">
          Start Tracking for Free
        </button>
      </section>

      {/* Test Sections for Scroll Spy */}
      <section
        id="features"
        className="min-h-screen w-full flex items-center justify-center bg-bg-surface border-t border-border-subtle"
      >
        <h2 className="text-4xl font-bold text-text-primary">
          Features Section
        </h2>
      </section>

      <section
        id="how-it-works"
        className="min-h-screen w-full flex items-center justify-center bg-bg-base border-t border-border-subtle"
      >
        <h2 className="text-4xl font-bold text-text-primary">
          How it Works Section
        </h2>
      </section>

      <section
        id="testimonials"
        className="min-h-screen w-full flex items-center justify-center bg-bg-surface border-t border-border-subtle"
      >
        <h2 className="text-4xl font-bold text-text-primary">
          Testimonials Section
        </h2>
      </section>
    </div>
  );
};

export default LandingPage;
