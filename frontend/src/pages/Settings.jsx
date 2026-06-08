import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  LogOut,
  ChevronRight,
  Check,
} from "lucide-react";

// ==========================================
// REUSABLE SETTINGS COMPONENTS
// ==========================================

const SettingsSection = ({ title, description, children }) => (
  <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 md:p-8 shadow-sm mb-6">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-text-primary">{title}</h2>
      {description && (
        <p className="text-sm text-text-muted mt-1">{description}</p>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const SettingsToggle = ({
  icon: Icon,
  label,
  description,
  isActive,
  onToggle,
}) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-bg-base transition-colors border border-transparent hover:border-border-subtle">
    <div className="flex items-center gap-4">
      <div className="p-2.5 bg-brand/10 text-brand rounded-xl">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-bold text-text-primary">{label}</p>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
    </div>
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? "bg-brand" : "bg-border-strong"}`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isActive ? "left-7" : "left-1"}`}
      />
    </button>
  </div>
);

const SettingsAction = ({
  icon: Icon,
  label,
  description,
  onClick,
  danger = false,
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-bg-base transition-colors border border-transparent hover:border-border-subtle text-left"
  >
    <div className="flex items-center gap-4">
      <div
        className={`p-2.5 rounded-xl ${danger ? "bg-red-500/10 text-red-500" : "bg-bg-base text-text-primary"}`}
      >
        <Icon size={20} />
      </div>
      <div>
        <p
          className={`font-bold ${danger ? "text-red-500" : "text-text-primary"}`}
        >
          {label}
        </p>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
    </div>
    <ChevronRight
      size={20}
      className={danger ? "text-red-500/50" : "text-text-muted"}
    />
  </button>
);

// ==========================================
// MAIN SETTINGS COMPONENT
// ==========================================

const Settings = () => {
  const { currentUser } = useOutletContext();

  // Local state for toggles (These would sync to a database later)
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-muted mt-1">
          Manage your account preferences and configurations
        </p>
      </div>

      <div className="max-w-4xl">
        {/* PROFILE SECTION */}
        <SettingsSection
          title="Profile Information"
          description="Update your personal details and how we can reach you."
        >
          <div className="flex items-center gap-6 mb-6 p-4 rounded-2xl bg-bg-base border border-border-subtle">
            <div className="w-20 h-20 rounded-full bg-brand text-white flex items-center justify-center text-3xl font-bold shadow-md">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary">
                {currentUser?.name || "User"}
              </h3>
              <p className="text-sm text-text-muted">Premium Member</p>
            </div>
            <button className="ml-auto bg-bg-surface border border-border-strong text-text-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-border-subtle transition-colors">
              Edit Profile
            </button>
          </div>
        </SettingsSection>

        {/* PREFERENCES SECTION */}
        <SettingsSection
          title="Preferences"
          description="Customize your app experience."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle">
              <div className="flex items-center gap-3 mb-3 text-text-primary">
                <Globe size={18} className="text-brand" />
                <span className="font-bold">Language</span>
              </div>
              <select className="w-full bg-bg-surface border border-border-strong rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
            <div className="p-4 rounded-2xl bg-bg-base border border-border-subtle">
              <div className="flex items-center gap-3 mb-3 text-text-primary">
                <CreditCard size={18} className="text-brand" />
                <span className="font-bold">Base Currency</span>
              </div>
              <select className="w-full bg-bg-surface border border-border-strong rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-brand">
                <option value="GHS">Ghanaian Cedi (GH₵)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
          </div>

          <div className="mt-4 border-t border-border-subtle pt-4">
            <SettingsToggle
              icon={Moon}
              label="Dark Mode"
              description="Switch between light and dark themes"
              isActive={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            />
          </div>
        </SettingsSection>

        {/* NOTIFICATIONS SECTION */}
        <SettingsSection
          title="Notifications"
          description="Control how and when you want to be alerted."
        >
          <SettingsToggle
            icon={Bell}
            label="Push Notifications"
            description="Receive alerts on your device for transactions"
            isActive={pushEnabled}
            onToggle={() => setPushEnabled(!pushEnabled)}
          />
          <SettingsToggle
            icon={Bell}
            label="Email Summaries"
            description="Get weekly breakdowns of your spending"
            isActive={emailEnabled}
            onToggle={() => setEmailEnabled(!emailEnabled)}
          />
          <SettingsToggle
            icon={Check}
            label="Budget Alerts"
            description="Warn me when I reach 80% of a category limit"
            isActive={budgetAlerts}
            onToggle={() => setBudgetAlerts(!budgetAlerts)}
          />
        </SettingsSection>

        {/* SECURITY & CONNECTED ACCOUNTS */}
        <SettingsSection
          title="Security & Connections"
          description="Keep your data safe and manage linked banks."
        >
          <SettingsAction
            icon={Shield}
            label="Change PIN / Password"
            description="Update your security credentials"
            onClick={() => console.log("Security clicked")}
          />
          <SettingsAction
            icon={CreditCard}
            label="Connected Banks"
            description="Manage links to GT Bank, Paystack, etc."
            onClick={() => console.log("Banks clicked")}
          />
        </SettingsSection>

        {/* DANGER ZONE */}
        <SettingsSection title="Danger Zone">
          <SettingsAction
            icon={LogOut}
            label="Sign Out"
            description="Securely log out of this device"
            danger={true}
            onClick={() => console.log("Sign out clicked")}
          />
        </SettingsSection>
      </div>
    </div>
  );
};

export default Settings;
