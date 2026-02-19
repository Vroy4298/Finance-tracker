import React, { useState } from "react";
import { CATEGORIES } from "../constants";
import { X, Plus, CreditCard, AlignLeft, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TransactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

function AddTransactionModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: TransactionType.EXPENSE,
    category: CATEGORIES[0],
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    onAdd({
      ...formData,
      amount: parseFloat(formData.amount),
      type: formData.type, // stays consistent
    });

    setFormData({
      title: "",
      amount: "",
      type: TransactionType.EXPENSE,
      category: CATEGORIES[0],
      description: "",
      date: new Date().toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                New Transaction
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Type Toggle */}
              <div className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((f) => ({ ...f, type: TransactionType.INCOME }))
                  }
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    formData.type === TransactionType.INCOME
                      ? "bg-white dark:bg-slate-700 shadow-md text-emerald-600"
                      : "text-gray-500"
                  }`}
                >
                  Income
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData((f) => ({ ...f, type: TransactionType.EXPENSE }))
                  }
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    formData.type === TransactionType.EXPENSE
                      ? "bg-white dark:bg-slate-700 shadow-md text-rose-600"
                      : "text-gray-500"
                  }`}
                >
                  Expense
                </button>
              </div>

              {/* Inputs */}
              <div className="space-y-4">

                {/* Title */}
                <div className="relative">
                  <Plus
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Transaction Title"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, title: e.target.value }))
                    }
                  />
                </div>

                {/* Amount + Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <CreditCard
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Amount"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, amount: e.target.value }))
                      }
                    />
                  </div>

                  <div className="relative">
                    <Calendar
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="date"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, date: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="relative">
                  <select
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-semibold appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, category: e.target.value }))
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                </div>

                {/* Description */}
                <div className="relative">
                  <AlignLeft
                    size={18}
                    className="absolute left-4 top-5 text-gray-400"
                  />
                  <textarea
                    placeholder="Description (Optional)"
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, description: e.target.value }))
                    }
                  />
                </div>

              </div>

              <button className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-[1.25rem] font-black text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-1 transition-all active:scale-95">
                Save Transaction
              </button>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChevronDown({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default AddTransactionModal;
