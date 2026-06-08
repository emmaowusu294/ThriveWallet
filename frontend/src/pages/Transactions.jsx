import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Search,
  ArrowDownRight,
  ArrowUpRight,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TransactionDetailModal from "../components/layout/TransactionDetailModal";

const Transactions = () => {
  const { transactions, currentUser, handleDeleteTransaction } =
    useOutletContext();

  // State for search, filter, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const itemsPerPage = 6;

  // Filter Engine
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || txn.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          Transaction History
        </h1>
        <p className="text-text-muted mt-1">
          Search and filter all your financial activity.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 bg-bg-surface border border-border-subtle rounded-xl text-text-primary focus:outline-none focus:border-brand transition-colors"
          />
        </div>

        <div className="relative min-w-[160px]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
            <Filter size={18} />
          </div>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 bg-bg-surface border border-border-subtle rounded-xl text-text-primary focus:outline-none focus:border-brand transition-colors appearance-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>
      </div>

      {/* Master List */}
      <div className="bg-bg-surface border border-border-subtle rounded-3xl p-2 sm:p-6 shadow-sm">
        {paginatedTransactions.length === 0 ? (
          <div className="py-12 text-center text-text-muted">
            <p>No transactions found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {paginatedTransactions.map((txn) => (
              <div
                key={txn.id}
                onClick={() => setSelectedTransaction(txn)}
                className="flex items-center justify-between p-3 hover:bg-bg-base rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-border-subtle gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${txn.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-bg-base text-text-muted"}`}
                  >
                    {txn.type === "income" ? (
                      <ArrowDownRight size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text-primary text-sm truncate">
                      {txn.desc}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5 truncate">
                      {txn.date} • {txn.category}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-bold text-sm shrink-0 ${txn.type === "income" ? "text-emerald-500" : "text-text-primary"}`}
                >
                  {txn.type === "income" ? "+" : "-"}
                  {currentUser.currency}
                  {txn.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-border-subtle">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              // Added text-brand for visibility, and explicitly set disabled styles
              className="p-2 rounded-lg bg-bg-base transition-colors text-brand hover:bg-brand/10 disabled:opacity-30 disabled:text-text-muted"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>

            <span className="text-sm font-medium text-text-muted">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              // Added text-brand for visibility, and explicitly set disabled styles
              className="p-2 rounded-lg bg-bg-base transition-colors text-brand hover:bg-brand/10 disabled:opacity-30 disabled:text-text-muted"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        )}
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

export default Transactions;
