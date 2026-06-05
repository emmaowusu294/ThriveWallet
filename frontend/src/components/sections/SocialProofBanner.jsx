import React from "react";
import { Star } from "lucide-react";

const SocialProofBanner = () => {
  // Using i.pravatar.cc to grab 5 realistic placeholder faces!
  const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=33",
    "https://i.pravatar.cc/100?img=47",
    "https://i.pravatar.cc/100?img=68",
  ];

  return (
    <section className="py-8 border-y border-border-subtle bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* Left Side: Users & Stars */}
        <div className="flex items-center">
          {/* Overlapping Real Avatars */}
          <div className="flex -space-x-4">
            {avatars.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="ThriveWallet User"
                className="w-12 h-12 rounded-full border-[3px] border-bg-surface shadow-sm object-cover"
              />
            ))}
          </div>

          <div className="ml-4 flex flex-col items-start">
            {/* 5 Gold Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-text-primary mt-1">
              Loved by 5,000+ users
            </p>
          </div>
        </div>

        {/* Divider (Hidden on mobile) */}
        <div className="hidden md:block w-px h-12 bg-border-subtle"></div>

        {/* Right Side: A cool metric */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <p className="text-2xl font-bold text-text-primary">GH₵ 2M+</p>
          <p className="text-sm font-medium text-text-muted">
            Expenses tracked securely
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;
