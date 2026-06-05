import React from "react";

const DashboardOverview = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-text-primary mb-2">
        Welcome back, Emmanuel 👋
      </h1>
      <p className="text-text-muted mb-8">
        Here is what is happening with your money today.
      </p>

      <div className="h-64 w-full rounded-2xl border-2 border-dashed border-border-subtle flex items-center justify-center">
        <p className="text-text-muted font-medium">
          We will build the dynamic charts here next!
        </p>
      </div>
    </div>
  );
};

export default DashboardOverview;
