import React from "react";
import {
  ArrowRight,
  Play,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  Wallet,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT SIDE: Copy & Call to Actions */}
          <div className="flex flex-col items-start text-left">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-sm font-semibold mb-6 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse"></span>
              ThriveWallet Beta is Live
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1] mb-6">
              Manage your money with{" "}
              <span className="text-brand">absolute clarity.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-text-muted mb-8 max-w-lg leading-relaxed">
              The manual, private, and beautiful way to track your expenses,
              build smart budgets, and watch your net worth grow. No bank logins
              required.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-brand hover:bg-brand-hover rounded-xl transition-all duration-300 shadow-lg shadow-brand/30 hover:shadow-brand/50 hover:-translate-y-1 active:translate-y-0">
                Start Tracking Free
                <ArrowRight size={20} />
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-text-primary bg-bg-surface border border-border-subtle hover:border-text-muted rounded-xl transition-all duration-300 hover:bg-bg-base hover:-translate-y-1 active:translate-y-0">
                <Play size={20} className="text-brand" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 text-sm text-text-muted font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand" />
                <span>100% Private Data</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-brand" />
                <span>No Bank Sync Needed</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CSS UI Mockup */}
          <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto mt-10 lg:mt-0 perspective-1000">
            {/* Main Floating Card */}
            <div className="relative z-20 bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-2xl transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-text-muted text-sm font-medium mb-1">
                    Total Balance
                  </p>
                  <h3 className="text-4xl font-bold text-text-primary">
                    GH₵ 12,450.00
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                  <Wallet size={24} className="text-brand" />
                </div>
              </div>

              {/* Fake Graph/Metric */}
              <div className="flex items-center gap-2 text-emerald-500 font-medium text-sm mb-6 bg-emerald-500/10 inline-flex px-3 py-1 rounded-full">
                <TrendingUp size={16} />
                <span>+14.5% from last month</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-text-primary border-b border-border-subtle pb-2">
                  Recent Transactions
                </p>

                {/* Transaction 1 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bg-base flex items-center justify-center text-xl">
                      🛒
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Melcom Supermarket
                      </p>
                      <p className="text-xs text-text-muted">Today, 2:30 PM</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-text-primary">
                    - GH₵ 450.00
                  </span>
                </div>

                {/* Transaction 2 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-bg-base flex items-center justify-center text-xl">
                      💻
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        Freelance Client
                      </p>
                      <p className="text-xs text-text-muted">Yesterday</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-500">
                    + GH₵ 2,000.00
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative element behind the card */}
            <div className="absolute -top-6 -right-6 z-10 w-72 h-72 bg-gradient-to-br from-brand to-emerald-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
