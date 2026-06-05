import React from "react";
import { Zap, PieChart, ShieldOff, Target, Tags, Download } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Zap size={24} className="text-brand" />,
      title: "Lightning Fast Entry",
      description:
        "Log an expense in under 3 seconds. Our streamlined interface is built for speed, so tracking never feels like a chore.",
    },
    {
      icon: <PieChart size={24} className="text-brand" />,
      title: "Beautiful Analytics",
      description:
        "See exactly where your money goes with crisp, interactive charts. Spot spending trends before they break your budget.",
    },
    {
      icon: <ShieldOff size={24} className="text-brand" />,
      title: "Zero Bank Syncing",
      description:
        "No Plaid, no bank logins, no data mining. Your financial data is 100% private and manually controlled by you.",
    },
    {
      icon: <Target size={24} className="text-brand" />,
      title: "Smart Budget Goals",
      description:
        "Set custom limits for groceries, transport, or fun. Get visual warnings when you are getting too close to your cap.",
    },
    {
      icon: <Tags size={24} className="text-brand" />,
      title: "Custom Categories",
      description:
        "Create folders and tags that actually match your lifestyle. Track your Bolt rides separately from your Trotro fares.",
    },
    {
      icon: <Download size={24} className="text-brand" />,
      title: "Total Data Ownership",
      description:
        "Your data belongs to you. Export your entire transaction history to a CSV or Excel file with a single click.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-bg-base border-t border-border-subtle relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-brand font-semibold tracking-wide uppercase text-sm mb-3">
            Why ThriveWallet?
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
            Everything you need. <br />
            <span className="text-text-muted font-medium">
              Nothing you don't.
            </span>
          </h3>
          <p className="text-lg text-text-muted">
            We stripped away the clutter of traditional banking apps to give you
            a clean, focused environment for managing your wealth.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-bg-surface border border-border-subtle rounded-2xl p-8 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon Container with subtle background */}
              <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h4 className="text-xl font-bold text-text-primary mb-3">
                {feature.title}
              </h4>
              <p className="text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
