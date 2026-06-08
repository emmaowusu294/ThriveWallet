import React, { useState } from "react";
import { X, ArrowDownRight, ArrowUpRight } from "lucide-react";

// Notice we added onSave and wallets to the props!
const TransactionModal = ({ isOpen, onClose, onSave, wallets }) => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Food & Drink");
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]?.name || "");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading
    if (!amount || !desc) return; // Basic validation

    // Package the data
    const newTransaction = {
      id: Math.random().toString(), // Fake ID for now
      desc: desc,
      amount: parseFloat(amount),
      type: type,
      date: "Just now",
      category: category,
      wallet: selectedWallet,
    };

    // Send it up to the Layout
    onSave(newTransaction);

    // Reset form and close
    setAmount("");
    setDesc("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-0">
      {/* We changed the div to a form so you can hit "Enter" on your keyboard to save */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-bg-surface border border-border-subtle rounded-t-3xl md:rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-text-primary">
            New Transaction
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-base rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex p-1 bg-bg-base rounded-xl mb-6 border border-border-subtle">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${type === "expense" ? "bg-bg-surface text-text-primary shadow-sm border border-border-subtle" : "text-text-muted hover:text-text-primary"}`}
          >
            <ArrowUpRight
              size={18}
              className={type === "expense" ? "text-red-500" : ""}
            />{" "}
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType("income")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all ${type === "income" ? "bg-bg-surface text-text-primary shadow-sm border border-border-subtle" : "text-text-muted hover:text-text-primary"}`}
          >
            <ArrowDownRight
              size={18}
              className={type === "income" ? "text-emerald-500" : ""}
            />{" "}
            Income
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-text-muted mb-2 text-center">
            Amount
          </label>
          <div className="flex items-center justify-center text-5xl font-bold text-text-primary">
            <span className="text-2xl text-text-muted mr-2">GH₵</span>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none outline-none text-center w-[200px] placeholder-text-muted/30 focus:ring-0 p-0"
              autoFocus
              required
            />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What was this for?"
              className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand transition-colors appearance-none"
              >
                <option>Food & Drink</option>
                <option>Transport</option>
                <option>Subscriptions</option>
                <option>Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1.5">
                Wallet
              </label>
              <select
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                className="w-full bg-bg-base border border-border-subtle rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-brand transition-colors appearance-none"
              >
                {wallets.map((w) => (
                  <option key={w.id} value={w.name}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-brand hover:bg-brand-hover text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand/20 hover:-translate-y-0.5 hover:shadow-brand/40"
        >
          Save {type === "expense" ? "Expense" : "Income"}
        </button>
      </form>
    </div>
  );
};

export default TransactionModal;
