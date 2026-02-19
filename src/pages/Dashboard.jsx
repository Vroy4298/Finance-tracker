import React, { useState, useEffect, useContext, useMemo } from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionList from "../components/TransactionList";
import FinanceChart from "../components/FinanceChart";
import AddTransactionModal from "../components/AddTransactionModal";
import Filters from "../components/Filters";
import { TransactionContext } from "../context/TransactionContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus, LayoutPanelTop, BarChart3, Target } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { transactions, addTransaction, deleteTransaction } =
    useContext(TransactionContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalAmount, setGoalAmount] = useState(100000);

  const [filters, setFilters] = useState({
    search: "",
    category: "ALL",
    type: "ALL",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // 🔥 Calculate Balance
  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "INCOME")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const currentBalance = totalIncome - totalExpense;

  const goalPercentage = useMemo(() => {
    if (goalAmount <= 0) return 0;
    return Math.min(
      Math.round((currentBalance / goalAmount) * 100),
      100
    );
  }, [currentBalance, goalAmount]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.category === "ALL" || tx.category === filters.category;

      const matchesType =
        filters.type === "ALL" || tx.type === filters.type;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, filters]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="w-full px-6 md:px-10 lg:px-12 py-10 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Executive Dashboard
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium italic">
              Welcome back, {user?.displayName || "User"}.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-bold shadow-2xl shadow-indigo-600/20 transition-all border-b-4 border-indigo-800"
          >
            <Plus size={22} />
            <span>New Transaction</span>
          </motion.button>
        </div>

        {/* Summary */}
        <section>
          <SummaryCards />
        </section>

        {/* Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 border border-gray-100 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-wider">
                  Revenue & Flow
                </h3>
              </div>
            </div>

            <FinanceChart transactions={filteredTransactions} />
          </motion.div>

          {/* 🔥 Dynamic Savings Goal */}
          <div className="xl:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group h-full flex flex-col justify-center">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

              <Target className="mb-6 opacity-80" size={40} />

              <h4 className="text-2xl font-black mb-4">Savings Goal</h4>

              {/* Editable Goal */}
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Number(e.target.value))}
                className="mb-6 w-full bg-white/10 rounded-xl px-4 py-2 text-white placeholder-white/60 outline-none"
              />

              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goalPercentage}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-white rounded-full"
                />
              </div>

              <div className="flex justify-between items-end">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white">
                  ₹{currentBalance.toLocaleString()} / ₹{goalAmount.toLocaleString()}
                </p>
                <span className="text-2xl font-black italic opacity-40">
                  {goalPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl text-indigo-600">
              <LayoutPanelTop size={20} />
            </div>
            <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-wider">
              Activity History
            </h3>
          </div>

          <Filters filters={filters} setFilters={setFilters} />

          <TransactionList
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
          />
        </div>
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTransaction}
      />
    </div>
  );
};

export default Dashboard;
