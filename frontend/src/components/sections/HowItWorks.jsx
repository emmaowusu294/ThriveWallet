import React from "react";
import { UserPlus, PlusCircle, LineChart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      badge: "01",
      icon: <UserPlus size={24} className="text-brand" />,
      title: "Create your secure wallet",
      description:
        "Enter your starting balance. No bank routing numbers, no Plaid integration, and no waiting days for micro-deposits to clear. You are in control.",
      mockup: (
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-xl w-full max-w-sm mx-auto">
          <p className="text-sm font-semibold text-text-primary mb-4">
            Set Starting Balance
          </p>
          <div className="flex items-center border-b-2 border-brand pb-2 mb-4">
            <span className="text-text-muted text-xl mr-2">GH₵</span>
            <span className="text-3xl font-bold text-text-primary">
              1,250.00
            </span>
          </div>
          <button className="w-full py-3 bg-brand/10 text-brand font-semibold rounded-xl">
            Continue
          </button>
        </div>
      ),
    },
    {
      badge: "02",
      icon: <PlusCircle size={24} className="text-brand" />,
      title: "Log expenses instantly",
      description:
        "Whenever you buy lunch, pay for a Bolt, or settle a bill, just tap 'Add'. It takes less than 3 seconds, making tracking a habit instead of a chore.",
      mockup: (
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-xl w-full max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm font-semibold text-text-primary">
              New Transaction
            </p>
            <span className="text-xs font-medium px-2 py-1 bg-red-500/10 text-red-500 rounded-md">
              Expense
            </span>
          </div>
          <div className="space-y-3">
            <div className="w-full h-10 bg-bg-base rounded-lg border border-border-subtle flex items-center px-3 text-text-muted text-sm">
              GH₵ 45.00
            </div>
            <div className="w-full h-10 bg-bg-base rounded-lg border border-border-subtle flex items-center px-3 text-text-muted text-sm">
              Bolt Ride to Campus
            </div>
            <button className="w-full py-3 bg-brand text-white font-semibold rounded-xl mt-2 shadow-md shadow-brand/20">
              Save Transaction
            </button>
          </div>
        </div>
      ),
    },
    {
      badge: "03",
      icon: <LineChart size={24} className="text-brand" />,
      title: "Watch your wealth grow",
      description:
        "At the end of the week, open your dashboard to see beautiful, automated reports. Find out exactly where your money went and adjust your budget.",
      mockup: (
        <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 shadow-xl w-full max-w-sm mx-auto">
          <p className="text-sm font-semibold text-text-primary mb-4">
            Spending Breakdown
          </p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-text-primary">Food & Dining</span>
                <span className="text-text-muted">45%</span>
              </div>
              <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-brand rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-text-primary">Transport</span>
                <span className="text-text-muted">30%</span>
              </div>
              <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-text-primary">Subscriptions</span>
                <span className="text-text-muted">25%</span>
              </div>
              <div className="w-full h-2 bg-bg-base rounded-full overflow-hidden">
                <div className="w-[25%] h-full bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-bg-surface border-t border-border-subtle"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-brand font-semibold tracking-wide uppercase text-sm mb-3">
            Simple Process
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
            How it works
          </h3>
          <p className="text-lg text-text-muted">
            You don't need an accounting degree to manage your money. We built
            ThriveWallet to be intuitive from day one.
          </p>
        </div>

        {/* The Steps */}
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => (
            <div
              key={index}
              // This exact class makes the zig-zag layout happen!
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-extrabold text-border-subtle select-none">
                    {step.badge}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h4 className="text-3xl font-bold text-text-primary mb-4">
                  {step.title}
                </h4>
                <p className="text-lg text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* UI Mockup Side */}
              <div className="w-full md:w-1/2 relative">
                {/* Subtle glow behind the mockups */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand/5 blur-[60px] rounded-full -z-10"></div>
                {step.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
