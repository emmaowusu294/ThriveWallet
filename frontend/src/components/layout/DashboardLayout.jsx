import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TransactionModal from "./TransactionModal";
import {
  mockTransactions,
  mockWallets,
  mockCategories,
  currentUser,
  chartData,
  mockBudgets,
} from "../../data/mockData";

const DashboardLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("thrive_transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem("thrive_wallets");
    return saved ? JSON.parse(saved) : mockWallets;
  });

  React.useEffect(() => {
    localStorage.setItem("thrive_transactions", JSON.stringify(transactions));
    localStorage.setItem("thrive_wallets", JSON.stringify(wallets));
  }, [transactions, wallets]);

  const [categories] = useState(mockCategories);

  const handleAddTransaction = (newTxn) => {
    setTransactions((prev) => [newTxn, ...prev]);
    setWallets((prevWallets) =>
      prevWallets.map((wallet) => {
        if (wallet.name === newTxn.wallet) {
          return {
            ...wallet,
            balance:
              newTxn.type === "income"
                ? wallet.balance + newTxn.amount
                : wallet.balance - newTxn.amount,
          };
        }
        return wallet;
      }),
    );
    toast.success(
      newTxn.type === "income" ? "Income saved!" : "Expense logged!",
    );
  };

  const handleDeleteTransaction = (txnToDelete) => {
    setTransactions((prev) => prev.filter((t) => t.id !== txnToDelete.id));
    setWallets((prevWallets) =>
      prevWallets.map((wallet) => {
        if (wallet.name === txnToDelete.wallet) {
          return {
            ...wallet,
            balance:
              txnToDelete.type === "income"
                ? wallet.balance - txnToDelete.amount
                : wallet.balance + txnToDelete.amount,
          };
        }
        return wallet;
      }),
    );
    toast.success("Transaction deleted", { icon: "🗑️" });
  };

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Pass the function as a PROP to Header */}
        <Header onOpenModal={() => setIsModalOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <Outlet
              context={{
                transactions,
                wallets,
                currentUser,
                chartData,
                categories,
                mockBudgets,
                handleAddTransaction,
                handleDeleteTransaction,
              }}
            />
          </div>
        </main>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTransaction}
        wallets={wallets}
        categories={categories}
      />
    </div>
  );
};

export default DashboardLayout;
