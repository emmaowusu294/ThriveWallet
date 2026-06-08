import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Lightbulb,
  Home,
  Plane,
  Laptop,
} from "lucide-react";

// Professional color palette for the Donut Chart
const DONUT_COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#06B6D4",
];

// ==========================================
// HARDCODED PORTFOLIO MOCK DATA
// (Replace with DB queries in Phase 2)
// ==========================================
const mockDayData = [
  { day: "Mon", spent: 120 },
  { day: "Tue", spent: 80 },
  { day: "Wed", spent: 150 },
  { day: "Thu", spent: 170 },
  { day: "Fri", spent: 450 },
  { day: "Sat", spent: 700 },
  { day: "Sun", spent: 350 },
];

const mockTimeData = [
  { time: "Morning", spent: 200, percent: 15 },
  { time: "Afternoon", spent: 500, percent: 35 },
  { time: "Evening", spent: 900, percent: 65 },
  { time: "Night", spent: 400, percent: 25 },
];

const mockMonthlyData = [
  { month: "Jan", spent: 4500 },
  { month: "Feb", spent: 5000 },
  { month: "Mar", spent: 4800 },
  { month: "Apr", spent: 5200 },
  { month: "May", spent: 5100 },
  { month: "Jun", spent: 4300 },
];

const mockLargeTxns = [
  {
    id: 1,
    title: "MacBook Purchase",
    amount: 3200,
    icon: Laptop,
    color: "bg-blue-500",
    date: "Jun 12",
  },
  {
    id: 2,
    title: "Rent Payment",
    amount: 1200,
    icon: Home,
    color: "bg-emerald-500",
    date: "Jun 01",
  },
  {
    id: 3,
    title: "Flight to Accra",
    amount: 900,
    icon: Plane,
    color: "bg-amber-500",
    date: "May 28",
  },
];

const mockInsights = [
  "You spent 18% less than last month.",
  "Food accounts for 35% of all expenses.",
  "Saturday is your most expensive day.",
  "Your average daily spending is GH₵ 174.",
];

// ==========================================
// REUSABLE COMPONENTS
// (Must be defined OUTSIDE the main component to prevent render errors)
// ==========================================
const KPICard = ({
  title,
  amount,
  icon: Icon,
  isPositive,
  trend,
  prefix = "",
}) => (
  <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <p className="text-text-muted text-sm font-medium">{title}</p>
      <div
        className={`p-2 rounded-xl ${isPositive ? "bg-emerald-500/10 text-emerald-500" : isPositive === false ? "bg-red-500/10 text-red-500" : "bg-brand/10 text-brand"}`}
      >
        <Icon size={18} />
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-text-primary">
        {prefix}
        {amount.toLocaleString()}
      </h2>
      <span
        className={`text-xs font-medium flex items-center mt-1 ${isPositive ? "text-emerald-500" : isPositive === false ? "text-red-500" : "text-text-muted"}`}
      >
        {trend}
      </span>
    </div>
  </div>
);

// ==========================================
// MAIN ANALYTICS COMPONENT
// ==========================================
const Analytics = () => {
  const { transactions, chartData, currentUser } = useOutletContext();
  const [timeframe, setTimeframe] = useState("month");

  // Dynamic calculations for the top cards and donut chart based on live mock data
  const safeTransactions = transactions || [];
  const metrics = useMemo(() => {
    const income = safeTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = safeTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const netCash = income - expenses;

    const categoryTotals = safeTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const sortedCategories = Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      income,
      expenses,
      netCash,
      sortedCategories,
      count: safeTransactions.length,
    };
  }, [safeTransactions]);

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-bg-surface border border-border-subtle text-text-primary text-sm rounded-xl px-4 py-2.5 shadow-sm"
        >
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* SECTION 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Income"
          amount={metrics.income}
          icon={ArrowUpRight}
          isPositive={true}
          trend="+12% vs last month"
          prefix={currentUser?.currency || "GH₵"}
        />
        <KPICard
          title="Expenses"
          amount={metrics.expenses}
          icon={ArrowDownRight}
          isPositive={false}
          trend="-4% vs last month"
          prefix={currentUser?.currency || "GH₵"}
        />
        <KPICard
          title="Net Cash"
          amount={metrics.netCash}
          icon={Wallet}
          isPositive={metrics.netCash > 0}
          trend="+28% vs last month"
          prefix={currentUser?.currency || "GH₵"}
        />
        <KPICard
          title="Transactions"
          amount={metrics.count}
          icon={CreditCard}
          trend="Across all wallets"
          prefix=""
        />
      </div>

      {/* SECTION 2: Cash Flow Trend */}
      <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-6">
          Cash Flow Trend
        </h3>
        <div className="h-72 w-full">
          {chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderRadius: "12px",
                    border: "none",
                    color: "#F9FAFB",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="spent"
                  stroke="#EF4444"
                  strokeWidth={3}
                  fill="url(#colorSpent)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-text-muted text-sm">
              No trend data available.
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3 & 4: Expense Breakdown & Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Expense Breakdown
          </h3>
          <div className="flex-1 flex items-center justify-center min-h-[250px]">
            {metrics.sortedCategories.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.sortedCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {metrics.sortedCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value) =>
                      `${currentUser?.currency || "GH₵"}${value}`
                    }
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      borderRadius: "12px",
                      border: "none",
                      color: "#F9FAFB",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-text-muted text-sm py-10">
                No expenses logged yet.
              </div>
            )}
          </div>
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Top Categories
          </h3>
          <div className="space-y-5">
            {metrics.sortedCategories.length > 0 ? (
              metrics.sortedCategories.slice(0, 5).map((category, index) => {
                const percentage = Math.min(
                  (category.value / (metrics.expenses || 1)) * 100,
                  100,
                );
                return (
                  <div key={category.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <span className="font-medium text-text-primary">
                        {category.name}
                      </span>
                      <div className="text-right">
                        <span className="font-bold text-text-primary">
                          {currentUser?.currency || "GH₵"}
                          {category.value}
                        </span>
                        <span className="text-xs text-text-muted ml-2">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-bg-base rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor:
                            DONUT_COLORS[index % DONUT_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-text-muted text-sm py-10">
                No categories to display.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5 & 6: Spending by Day & Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Spending by Day
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockDayData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <RechartsTooltip
                  cursor={{ fill: "#374151", opacity: 0.1 }}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderRadius: "12px",
                    border: "none",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="spent" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Spending by Time of Day
          </h3>
          <div className="space-y-6">
            {mockTimeData.map((time) => (
              <div key={time.time} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    {time.time}
                  </span>
                  <span className="text-text-muted">
                    {currentUser?.currency || "GH₵"}
                    {time.spent}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-bg-base rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: `${time.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 7 & 8: Monthly Comparison & Large Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Monthly Comparison
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockMonthlyData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <RechartsTooltip
                  cursor={{ fill: "#374151", opacity: 0.1 }}
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderRadius: "12px",
                    border: "none",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="spent" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Recent Large Transactions
          </h3>
          <div className="space-y-4">
            {mockLargeTxns.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-bg-base transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl text-white ${txn.color}`}>
                    <txn.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">{txn.title}</p>
                    <p className="text-xs text-text-muted">{txn.date}</p>
                  </div>
                </div>
                <span className="font-bold text-text-primary">
                  -{currentUser?.currency || "GH₵"}
                  {txn.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 9: Smart Insights */}
      <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-6">
          Smart Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockInsights.map((insight, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 bg-brand/5 border border-brand/20 rounded-2xl"
            >
              <Lightbulb
                className="text-brand flex-shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-sm font-medium text-text-primary">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
