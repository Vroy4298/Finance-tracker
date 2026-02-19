import React from "react";
import { getCategoryIcon } from "../constants";
import { Trash2, SearchX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TransactionType = {
  INCOME: "income",
  EXPENSE: "expense",
};

function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 glass rounded-[2.5rem] border border-dashed border-gray-300 dark:border-slate-700"
      >
        <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
          <SearchX className="text-gray-400 w-10 h-10" />
        </div>

        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          No transactions found
        </h3>

        <p className="text-gray-500 dark:text-slate-400 mt-2 text-center max-w-xs">
          Your search didn't match any activity. Try different filters or add a new record.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-8 py-6">Details</th>
              <th className="px-8 py-6">Category</th>
              <th className="px-8 py-6">Date</th>
              <th className="px-8 py-6 text-right">Amount</th>
              <th className="px-8 py-6 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
            <AnimatePresence mode="popLayout">
              {transactions.map((tx) => (
                <motion.tr
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl text-xl shadow-sm border border-gray-100 dark:border-slate-700">
                        {getCategoryIcon(tx.category)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white tracking-tight">
                          {tx.title}
                        </p>

                        {tx.description && (
                          <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5 line-clamp-1 max-w-[200px]">
                            {tx.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                      {tx.category}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-sm font-semibold text-gray-500 dark:text-slate-400">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td
                    className={`px-8 py-5 text-right font-black text-lg ${
                      tx.type === TransactionType.INCOME
                        ? "text-emerald-500 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {tx.type === TransactionType.INCOME ? "+" : "-"}₹
                    {tx.amount.toLocaleString()}
                  </td>

                  <td className="px-8 py-5 text-center">
                    <button
                      onClick={() => onDelete(tx.id)}
                      className="p-2.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 active:scale-95"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
