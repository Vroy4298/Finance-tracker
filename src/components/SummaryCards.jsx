import React, { useContext, useMemo } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const SummaryCards = () => {
  const { transactions } = useContext(TransactionContext);

  // Memoized calculations
  const metrics = useMemo(() => {
    const incomeTransactions = transactions.filter(
      (t) => t.type === "INCOME"
    );

    const expenseTransactions = transactions.filter(
      (t) => t.type === "EXPENSE"
    );

    const totalIncome = incomeTransactions.reduce(
      (acc, t) => acc + t.amount,
      0
    );

    const totalExpense = expenseTransactions.reduce(
      (acc, t) => acc + t.amount,
      0
    );

    const totalBalance = totalIncome - totalExpense;

    const uniqueIncomeCategories = new Set(
      incomeTransactions.map((t) => t.category)
    ).size;

    const expenseCount = expenseTransactions.length;

    const balanceTrend =
      totalBalance > 0
        ? Math.min(Math.round((totalBalance / 100000) * 100), 100)
        : 0;

    const incomeTrend =
      totalIncome > 0
        ? Math.round((totalIncome / 150000) * 100)
        : 0;

    const expenseTrend =
      totalIncome > 0
        ? Math.round((totalExpense / totalIncome) * 100)
        : 0;

    return {
      totalIncome,
      totalExpense,
      totalBalance,
      uniqueIncomeCategories,
      expenseCount,
      balanceTrend,
      incomeTrend,
      expenseTrend,
    };
  }, [transactions]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      
      {/* Balance Card */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="relative group overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 shadow-2xl shadow-indigo-500/5 border border-gray-100 dark:border-slate-800 transition-all hover:border-indigo-500/30"
      >
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />

        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Wallet size={24} />
          </div>

          <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg text-[10px] font-bold">
            <ArrowUpRight size={12} />
            <span>{metrics.balanceTrend}%</span>
          </div>
        </div>

        <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-1">
          Total Balance
        </p>

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-indigo-600/60 dark:text-indigo-400/60">
            ₹
          </span>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.totalBalance.toLocaleString()}
          </h2>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">
            Available Capital
          </span>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
            Net Wealth
          </span>
        </div>
      </motion.div>

      {/* Income Card */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="relative group overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 shadow-2xl shadow-emerald-500/5 border border-gray-100 dark:border-slate-800 transition-all hover:border-emerald-500/30"
      >
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />

        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <TrendingUp size={24} />
          </div>

          <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg text-[10px] font-bold">
            <ArrowUpRight size={12} />
            <span>{metrics.incomeTrend}%</span>
          </div>
        </div>

        <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-1">
          Total Income
        </p>

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-emerald-600/60 dark:text-emerald-400/60">
            ₹
          </span>
          <h2 className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            {metrics.totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">
            Active Streams
          </span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            {metrics.uniqueIncomeCategories}{" "}
            {metrics.uniqueIncomeCategories === 1 ? "Source" : "Sources"}
          </span>
        </div>
      </motion.div>

      {/* Expense Card */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="relative group overflow-hidden bg-white dark:bg-slate-900 rounded-[2.5rem] p-7 shadow-2xl shadow-rose-500/5 border border-gray-100 dark:border-slate-800 transition-all hover:border-rose-500/30"
      >
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-colors" />

        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
            <TrendingDown size={24} />
          </div>

          <div className="flex items-center gap-1 text-rose-500 bg-rose-500/10 px-2 py-1 rounded-lg text-[10px] font-bold">
            <ArrowDownRight size={12} />
            <span>{metrics.expenseTrend}%</span>
          </div>
        </div>

        <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-1">
          Total Expenses
        </p>

        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-rose-600/60 dark:text-rose-400/60">
            ₹
          </span>
          <h2 className="text-4xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
            {metrics.totalExpense.toLocaleString()}
          </h2>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
          <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">
            Monthly Traffic
          </span>
          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
            {metrics.expenseCount}{" "}
            {metrics.expenseCount === 1 ? "Txn" : "Txns"}
          </span>
        </div>
      </motion.div>

    </div>
  );
};

export default SummaryCards;
