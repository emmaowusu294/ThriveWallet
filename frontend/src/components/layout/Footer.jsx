import React from "react";
import { ArrowRight } from "lucide-react"; // ONLY importing ArrowRight

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-base relative pt-20 pb-10 border-t border-border-subtle overflow-hidden">
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-10 md:p-16 mb-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[80px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
                Ready to take control of your finances?
              </h2>
              <p className="text-lg text-text-muted">
                Join thousands of users tracking their wealth with zero bank
                syncing, beautiful analytics, and absolute privacy.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <button className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white bg-brand hover:bg-brand-hover rounded-xl transition-all duration-300 shadow-lg shadow-brand/30 hover:shadow-brand/50 hover:-translate-y-1 active:translate-y-0">
                Get Started for Free
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/30">
                <span className="text-white font-bold text-lg leading-none">
                  T
                </span>
              </div>
              <span className="text-xl font-bold text-text-primary tracking-tight">
                ThriveWallet
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              The manual, private, and beautiful way to track your expenses and
              build smart budgets. No bank logins required.
            </p>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li>
                <a
                  href="#features"
                  className="hover:text-brand transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-brand transition-colors"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p>© {currentYear} ThriveWallet. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p>Crafted in Kumasi</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
