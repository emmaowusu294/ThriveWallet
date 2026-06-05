import React from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Kwame A.",
      role: "University Student",
      image: "https://i.pravatar.cc/150?img=11",
      content:
        "Between tracking my Bolt rides, printouts, and weekend food, my money used to just vanish. ThriveWallet is the only app that actually makes it easy to see exactly where my allowance is going. The UI is incredibly smooth.",
      rating: 5,
    },
    {
      name: "Abena M.",
      role: "Freelance Designer",
      image: "https://i.pravatar.cc/150?img=44",
      content:
        "As a freelancer, my income is completely irregular. I use this to separate my software subscriptions from my personal spending. Not having to link my bank account was the biggest selling point for me. Highly recommend.",
      rating: 5,
    },
    {
      name: "David O.",
      role: "Software Developer",
      image: "https://i.pravatar.cc/150?img=33",
      content:
        "I've tried every budgeting spreadsheet and complex finance app out there. They all require too much setup. ThriveWallet gets out of your way. I can log an expense in literally two seconds and get back to coding.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-bg-base border-t border-border-subtle relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-brand/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-brand font-semibold tracking-wide uppercase text-sm mb-3">
            Wall of Love
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
            Loved by people who value their privacy.
          </h3>
          <p className="text-lg text-text-muted">
            See how others are taking back control of their finances without
            handing over their banking data.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-bg-surface border border-border-subtle rounded-3xl p-8 relative group hover:border-brand/40 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brand/5"
            >
              {/* Background Quote Watermark */}
              <Quote
                className="absolute top-6 right-6 text-border-subtle opacity-50 group-hover:text-brand/10 transition-colors duration-300"
                size={60}
              />

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand text-brand" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-text-primary text-lg leading-relaxed mb-8 relative z-10">
                "{review.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-border-subtle object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    {review.name}
                  </h4>
                  <p className="text-xs text-text-muted font-medium">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
