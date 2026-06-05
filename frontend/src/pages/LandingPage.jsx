import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg-base transition-colors duration-300">
      <Navbar />

      {/* We replaced the messy HTML with our clean component! */}
      <div id="top">
        <Hero />
      </div>

      {/* These remaining sections stay here to test the Navbar Scroll Spy */}
      <section
        id="features"
        className="min-h-screen w-full flex items-center justify-center bg-bg-surface border-t border-border-subtle"
      >
        <h2 className="text-4xl font-bold text-text-primary">
          Features Section (Coming Soon)
        </h2>
      </section>

      <section
        id="how-it-works"
        className="min-h-screen w-full flex items-center justify-center bg-bg-base border-t border-border-subtle"
      >
        <h2 className="text-4xl font-bold text-text-primary">
          How it Works Section (Coming Soon)
        </h2>
      </section>

      <section
        id="testimonials"
        className="min-h-screen w-full flex items-center justify-center bg-bg-surface border-t border-border-subtle"
      >
        <h2 className="text-4xl font-bold text-text-primary">
          Testimonials Section (Coming Soon)
        </h2>
      </section>
    </div>
  );
};

export default LandingPage;
