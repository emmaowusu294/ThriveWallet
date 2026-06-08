import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TransactionDetailModal from "../components/layout/TransactionDetailModal";
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardOverview = () => {
  const { transactions, wallets, currentUser, handleDeleteTransaction } =
    useOutletContext();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);
  const totalIncome = transactions
    .filter((txn) => txn.type === "income")
    .reduce((acc, txn) => acc + txn.amount, 0);
  const totalExpenses = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const dynamicChartData = transactions
    .filter((txn) => txn.type === "expense")
    .slice(0, 7)
    .map((txn) => ({
      day: txn.date.split(",")[0].substring(0, 4),
      spent: txn.amount,
    }))
    .reverse();

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      {/* 1. TOP SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm min-w-0">
          <div className="flex items-center gap-3 mb-4 text-text-muted">
            <div className="p-2 bg-brand/10 text-brand rounded-lg shrink-0">
              <Wallet size={20} />
            </div>
            <h3 className="font-semibold text-sm uppercase tracking-wider truncate">
              Net Worth
            </h3>
          </div>
          <div className="text-3xl font-bold text-text-primary truncate">
            {currentUser.currency}{" "}
            {totalBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm min-w-0">
          <div className="flex items-center gap-3 mb-4 text-text-muted">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-semibold text-sm uppercase tracking-wider truncate">
              Income (Jun)
            </h3>
          </div>
          <div className="text-3xl font-bold text-text-primary truncate">
            {currentUser.currency}{" "}
            {totalIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm min-w-0">
          <div className="flex items-center gap-3 mb-4 text-text-muted">
            <div className="p-2 bg-red-500/10 text-red-500 rounded-lg shrink-0">
              <TrendingDown size={20} />
            </div>
            <h3 className="font-semibold text-sm uppercase tracking-wider truncate">
              Expenses (Jun)
            </h3>
          </div>
          <div className="text-3xl font-bold text-text-primary truncate">
            {currentUser.currency}{" "}
            {totalExpenses.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      {/* 2. CHART & ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Spending Trend
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dynamicChartData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
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
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <Tooltip
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
                  stroke="#10B981"
                  strokeWidth={3}
                  fill="url(#colorSpent)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-text-primary mb-6">
            Recent Activity
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                onClick={() => setSelectedTransaction(txn)}
                className="flex items-center justify-between p-3 hover:bg-bg-base rounded-2xl cursor-pointer border border-transparent hover:border-border-subtle gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${txn.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-bg-base text-text-muted"}`}
                  >
                    {txn.type === "income" ? (
                      <ArrowUpRight size={18} />
                    ) : (
                      <ArrowDownRight size={18} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-text-primary text-sm truncate">
                      {txn.desc}
                    </p>
                    <p className="text-xs text-text-muted">{txn.date}</p>
                  </div>
                </div>
                <div
                  className={`font-bold text-sm ${txn.type === "income" ? "text-emerald-500" : "text-text-primary"}`}
                >
                  {txn.type === "income" ? "+" : "-"}
                  {currentUser.currency}
                  {txn.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TransactionDetailModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transaction={selectedTransaction}
        currency={currentUser.currency}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

export default DashboardOverview;
