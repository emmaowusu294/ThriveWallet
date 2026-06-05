import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import SocialProofBanner from "../components/sections/SocialProofBanner";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import Testimonials from "../components/sections/Testimonials";
import Footer from "../components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg-base transition-colors duration-300">
      <Navbar />

      {/* We replaced the messy HTML with our clean component! */}
      <div id="top">
        <Hero />
      </div>

      <SocialProofBanner />

      <Features />

      <HowItWorks />

      {/* These remaining sections stay here to test the Navbar Scroll Spy */}

      <Testimonials />

      <Footer />
    </div>
  );
};

export default LandingPage;
