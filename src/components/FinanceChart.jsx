import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function FinanceChart({ transactions }) {
  const chartData = useMemo(() => {
    // Basic aggregation for demo purposes
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

    return months.map((m) => ({
      name: m,
      income: Math.floor(Math.random() * 40000) + 10000,
      expense: Math.floor(Math.random() * 30000) + 5000,
    }));
  }, [transactions?.length]);

  return (
    <div className="w-full h-80 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
            opacity={0.5}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 700,
              fill: "#94a3b8",
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fontWeight: 600,
              fill: "#94a3b8",
            }}
          />

          <Tooltip
            cursor={{ fill: "transparent" }}
            contentStyle={{
              borderRadius: "16px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              padding: "12px",
            }}
          />

          <Bar
            dataKey="income"
            fill="#4f46e5"
            radius={[6, 6, 0, 0]}
            barSize={20}
          />

          <Bar
            dataKey="expense"
            fill="#f43f5e"
            radius={[6, 6, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinanceChart;
