import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Target,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  Plus,
  TrendingUp,
  AlertTriangle,
  Wallet,
} from "lucide-react";

// ==========================================
// REUSABLE UI COMPONENTS (Outside main render)
// ==========================================

const KPICard = ({ title, amount, icon: Icon, colorClass, prefix = "" }) => (
  <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <p className="text-text-muted text-sm font-medium">{title}</p>
      <div className={`p-2 rounded-xl ${colorClass}`}>
        <Icon size={18} />
      </div>
    </div>
    <h2 className="text-2xl font-bold text-text-primary mt-2">
      {prefix}
      {amount.toLocaleString()}
    </h2>
  </div>
);

const BudgetCard = ({ budget, currency }) => {
  const isDanger = budget.percentage >= 100;
  const isWarning = budget.percentage >= 70 && budget.percentage < 100;

  const statusColor = isDanger
    ? "bg-red-500"
    : isWarning
      ? "bg-amber-500"
      : "bg-emerald-500";
  const statusBg = isDanger
    ? "bg-red-500/10 text-red-500"
    : isWarning
      ? "bg-amber-500/10 text-amber-500"
      : "bg-emerald-500/10 text-emerald-500";
  const statusText = isDanger
    ? "Exceeded"
    : isWarning
      ? "Almost Reached"
      : "On Track";
  const StatusIcon = isDanger
    ? AlertCircle
    : isWarning
      ? AlertTriangle
      : CheckCircle2;

  return (
    <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${statusBg}`}>
            <Target size={20} />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-lg">
              {budget.categoryName}
            </h3>
            <p className="text-xs font-medium text-text-muted mt-0.5">
              {currency}
              {budget.spent.toLocaleString()} / {currency}
              {budget.limit.toLocaleString()}
            </p>
          </div>
        </div>
        <button className="text-text-muted hover:text-text-primary transition-colors p-1">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="h-2.5 w-full bg-bg-base rounded-full overflow-hidden mb-3">
        <div
          className={`h-full ${statusColor} rounded-full transition-all duration-1000`}
          style={{ width: `${Math.min(budget.percentage, 100)}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-text-primary">
          {budget.percentage.toFixed(0)}%
        </span>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${statusBg}`}
        >
          <StatusIcon size={14} />
          {statusText}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN BUDGETS COMPONENT
// ==========================================
const Budgets = () => {
  const { transactions, mockBudgets, categories, currentUser } =
    useOutletContext();
  const [period, setPeriod] = useState("monthly");

  // ==========================================
  // DATA PROCESSING (Live Calculations)
  // ==========================================
  const safeTransactions = transactions || [];
  const safeCategories = categories || [];
  const safeBudgets = mockBudgets || [];

  const processedBudgets = useMemo(() => {
    return safeBudgets
      .map((budget) => {
        const category = safeCategories.find((c) => c.id === budget.categoryId);
        const categoryName = category?.name || "Unknown";

        // Calculate spent for this specific category
        const spent = safeTransactions
          .filter((t) => t.type === "expense" && t.category === categoryName)
          .reduce((sum, t) => sum + t.amount, 0);

        const limit = budget.limit || 0;
        const percentage = limit > 0 ? (spent / limit) * 100 : 0;
        const remaining = limit - spent;

        return { ...budget, categoryName, spent, limit, percentage, remaining };
      })
      .sort((a, b) => b.percentage - a.percentage); // Sort by highest risk first
  }, [safeBudgets, safeCategories, safeTransactions]);

  // Overall KPI Calculations
  const totalLimit = processedBudgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = processedBudgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalLimit - totalSpent;
  const overallPercentage =
    totalLimit > 0 ? Math.min((totalSpent / totalLimit) * 100, 100) : 0;

  // Generate Smart Alerts based on live data
  const alerts = processedBudgets
    .map((b) => {
      if (b.percentage >= 100)
        return {
          type: "danger",
          text: `${b.categoryName} budget exceeded by ${currentUser?.currency || "GH₵"}${Math.abs(b.remaining)}!`,
        };
      if (b.percentage >= 80)
        return {
          type: "warning",
          text: `${b.categoryName} is ${b.percentage.toFixed(0)}% used. Slow down.`,
        };
      return null;
    })
    .filter(Boolean);

  if (alerts.length === 0 && processedBudgets.length > 0) {
    alerts.push({
      type: "success",
      text: "You are staying well within all your budgets. Great job!",
    });
  }

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Budgets</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage limits and track your spending
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-bg-surface border border-border-subtle text-text-primary text-sm rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:border-brand"
          >
            <option value="monthly">This Month</option>
            <option value="weekly">This Week</option>
          </select>
          <button className="bg-brand text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-brand/90 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg">
            <Plus size={18} />
            New Budget
          </button>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Budget"
          amount={totalLimit}
          icon={Target}
          colorClass="bg-blue-500/10 text-blue-500"
          prefix={currentUser?.currency || "GH₵"}
        />
        <KPICard
          title="Total Spent"
          amount={totalSpent}
          icon={TrendingUp}
          colorClass="bg-amber-500/10 text-amber-500"
          prefix={currentUser?.currency || "GH₵"}
        />
        <KPICard
          title="Remaining"
          amount={Math.max(totalRemaining, 0)}
          icon={Wallet}
          colorClass="bg-emerald-500/10 text-emerald-500"
          prefix={currentUser?.currency || "GH₵"}
        />
        <KPICard
          title="Active Categories"
          amount={processedBudgets.length}
          icon={CheckCircle2}
          colorClass="bg-brand/10 text-brand"
          prefix=""
        />
      </div>

      {/* SECTION 2: OVERALL PROGRESS */}
      <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              Overall Budget Usage
            </h3>
            <p className="text-sm text-text-muted mt-1">
              {currentUser?.currency || "GH₵"}
              {totalSpent.toLocaleString()} spent of{" "}
              {currentUser?.currency || "GH₵"}
              {totalLimit.toLocaleString()}
            </p>
          </div>
          <span className="text-2xl font-black text-text-primary">
            {overallPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="h-4 w-full bg-bg-base rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${overallPercentage > 90 ? "bg-red-500" : overallPercentage > 70 ? "bg-amber-500" : "bg-emerald-500"}`}
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* SECTION 3 & 4: HIGHEST RISK & SMART ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Highest Risk */}
        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-500" />
            Highest-Risk Budgets
          </h3>
          <div className="space-y-4">
            {processedBudgets.length > 0 ? (
              processedBudgets.slice(0, 3).map((budget, index) => (
                <div
                  key={budget.id}
                  className="flex justify-between items-center p-3 rounded-2xl bg-bg-base"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-text-muted font-bold text-sm w-4">
                      {index + 1}.
                    </span>
                    <span className="font-bold text-text-primary">
                      {budget.categoryName}
                    </span>
                  </div>
                  <span
                    className={`font-black ${budget.percentage >= 100 ? "text-red-500" : budget.percentage >= 70 ? "text-amber-500" : "text-emerald-500"}`}
                  >
                    {budget.percentage.toFixed(0)}%
                  </span>
                </div>
              ))
            ) : (
              <p className="text-text-muted text-sm py-4 text-center">
                No budgets created yet.
              </p>
            )}
          </div>
        </div>

        {/* Smart Alerts */}
        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-4">
            Alerts & Insights
          </h3>
          <div className="space-y-3">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-2xl border ${
                    alert.type === "danger"
                      ? "bg-red-500/5 border-red-500/20 text-red-600"
                      : alert.type === "warning"
                        ? "bg-amber-500/5 border-amber-500/20 text-amber-600"
                        : "bg-emerald-500/5 border-emerald-500/20 text-emerald-600"
                  }`}
                >
                  {alert.type === "danger" ? (
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm font-bold">{alert.text}</p>
                </div>
              ))
            ) : (
              <p className="text-text-muted text-sm py-4 text-center">
                No alerts at this time.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5: CATEGORY GRID */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Budget Categories
        </h3>
        {processedBudgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedBudgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                currency={currentUser?.currency || "GH₵"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-bg-surface border border-border-subtle rounded-3xl shadow-sm">
            <Target
              size={48}
              className="mx-auto mb-4 text-text-muted opacity-50"
            />
            <h3 className="text-lg font-bold text-text-primary mb-2">
              No Budgets Found
            </h3>
            <p className="text-text-muted max-w-sm mx-auto mb-6">
              You haven't set up any budgets yet. Create one to start tracking
              your spending.
            </p>
            <button className="bg-brand text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-brand/90 transition-colors">
              + Create First Budget
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budgets;
