import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  Settings,
  LogOut,
  Menu,
  X,
  PieChart,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // NavLink automatically adds an "active" class when the user is on that page!
  const navItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Transactions",
      path: "/dashboard/transactions",
      icon: <ArrowLeftRight size={20} />,
    },
    { name: "Budgets", path: "/dashboard/budgets", icon: <Target size={20} /> },

    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <PieChart size={20} />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-bg-surface border border-border-subtle rounded-lg text-text-primary shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 bg-bg-surface border-r border-border-subtle flex flex-col transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Brand Logo */}
        <div className="h-20 flex items-center px-6 border-b border-border-subtle shrink-0">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/30 mr-3">
            <span className="text-white font-bold text-lg leading-none">T</span>
          </div>
          <span className="text-xl font-bold text-text-primary tracking-tight">
            ThriveWallet
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-text-muted hover:bg-bg-base hover:text-text-primary"
                }
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-border-subtle shrink-0">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-colors font-medium">
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay Background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
