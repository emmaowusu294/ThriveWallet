import React from "react";
import { X, Calendar, CreditCard, Tag, Hash } from "lucide-react";

const TransactionDetailModal = ({
  isOpen,
  onClose,
  transaction,
  currency,
  onDelete,
}) => {
  // If the modal isn't open OR we don't have a transaction, render nothing
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-0 animate-fade-in">
      {/* Modal Container */}
      <div className="w-full max-w-md bg-bg-surface border border-border-subtle rounded-t-3xl md:rounded-3xl p-6 shadow-2xl relative animate-dropdown">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-text-muted hover:text-text-primary hover:bg-bg-base rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Top Section: Amount & Description */}
        <div className="flex flex-col items-center mt-4 mb-8">
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            {currency}
            {transaction.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
          <p className="text-text-muted text-sm font-medium">
            {transaction.desc}
          </p>
        </div>

        {/* Details List */}
        <div className="bg-bg-base rounded-2xl border border-border-subtle p-2 mb-6">
          <DetailRow
            icon={<Tag size={18} />}
            label="Category"
            value={transaction.category}
          />
          <DetailRow
            icon={<Calendar size={18} />}
            label="Date"
            value={transaction.date}
          />
          <DetailRow
            icon={<CreditCard size={18} />}
            label="Wallet"
            value={transaction.wallet}
          />
          <DetailRow
            icon={<Hash size={18} />}
            label="Transaction ID"
            value={`TXN-${transaction.id.toString().substring(0, 8)}`}
          />
        </div>

        {/* Actions */}
        <button
          onClick={() => {
            onDelete(transaction);
            onClose();
          }}
          className="w-full py-3.5 bg-bg-base hover:bg-red-500/10 text-red-500 rounded-xl font-bold text-sm transition-colors border border-border-subtle hover:border-red-500/30"
        >
          Delete Transaction
        </button>
      </div>
    </div>
  );
};

// Helper component for clean details rows
const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-3 border-b border-border-subtle last:border-0">
    <div className="flex items-center gap-3 text-text-muted">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="font-semibold text-text-primary text-sm truncate max-w-[50%]">
      {value || "N/A"}
    </span>
  </div>
);

export default TransactionDetailModal;
