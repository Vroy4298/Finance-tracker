import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  LayoutDashboard,
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
} from "lucide-react";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (error) {
      alert(error?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: TrendingUp, label: "Real-time Analytics" },
    { icon: Shield, label: "Bank-grade Security" },
    { icon: BarChart3, label: "Smart Insights" },
    { icon: Zap, label: "Instant Transfers" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none" />

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 px-16 py-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Fin<span className="text-indigo-600">Vue</span>
          </span>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="animate-float"
          >
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-4">
              Your Financial Command Center
            </p>
            <h1 className="text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
              Manage
              <br />
              money
              <br />
              <span className="text-indigo-600">smarter.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xs leading-relaxed">
              Everything you need to track, grow, and protect your wealth — all
              in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-3 animate-float-delayed"
          >
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm"
              >
                <Icon className="text-indigo-500 w-4 h-4" />
                <span className="text-sm font-semibold text-slate-700">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-slate-400 font-medium"
        >
          © 2025 FinVue · Trusted by 50,000+ users
        </motion.p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/60"
        >
          <div className="flex lg:hidden justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900">
                Fin<span className="text-indigo-600">Vue</span>
              </span>
            </div>
          </div>

          <h2 className="text-4xl font-black text-center text-slate-900 mb-2 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 text-center mb-10 font-medium">
            Continue your financial journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 outline-none focus:ring-4 focus:ring-indigo-500/10 border border-gray-100 transition-all font-medium text-slate-800 placeholder:text-gray-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 outline-none focus:ring-4 focus:ring-indigo-500/10 border border-gray-100 transition-all font-medium text-slate-800 placeholder:text-gray-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <span className="text-sm font-semibold text-indigo-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[1.25rem] font-black text-lg shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Login to Dashboard"}
            </button>

            <p className="text-sm text-center font-bold text-gray-400">
              New to FinVue?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;