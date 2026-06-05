import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    // This creates a full-screen flex container. Sidebar on the left, content on the right.
    <div className="flex h-screen bg-bg-base overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          {/* <Outlet /> is a magic React Router component. 
              It injects whatever page you are currently visiting right here! */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
