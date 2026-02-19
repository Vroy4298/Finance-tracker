import React from "react";
import { CATEGORIES } from "../constants";
import { Search, ChevronDown } from "lucide-react";

const TransactionType = {
  INCOME: "income",
  EXPENSE: "expense",
};

function Filters({ filters, setFilters }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800">
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-grow">
        
        {/* Search */}
        <div className="relative group flex-grow lg:max-w-xs">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-all outline-none font-medium placeholder:text-gray-400"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                search: e.target.value,
              }))
            }
          />
        </div>

        {/* Category Select */}
        <div className="relative min-w-[200px]">
          <select
            className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800 rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500/20 dark:text-white transition-all appearance-none cursor-pointer outline-none"
            value={filters.category}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                category: e.target.value,
              }))
            }
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
        </div>

      </div>

      {/* Type Toggle */}
      <div className="flex bg-gray-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start lg:self-center">
        {[
          { label: "All", value: "ALL" },
          { label: "Income", value: TransactionType.INCOME },
          { label: "Expense", value: TransactionType.EXPENSE },
        ].map((btn) => (
          <button
            key={btn.value}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                type: btn.value,
              }))
            }
            className={`px-6 py-2.5 text-xs font-bold rounded-[0.875rem] transition-all transform active:scale-95 ${
              filters.type === btn.value
                ? "bg-white dark:bg-slate-700 shadow-md text-slate-900 dark:text-white"
                : "text-gray-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
