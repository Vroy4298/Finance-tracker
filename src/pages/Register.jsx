import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, LayoutDashboard } from "lucide-react";

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(email, password, name);
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-6 relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-300 dark:bg-emerald-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-300 dark:bg-teal-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-gray-100/50 dark:border-slate-800/50 relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/50">
            <LayoutDashboard className="text-white w-8 h-8" />
          </div>
        </div>

        <h2 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-2 tracking-tight">
          Join FinVue
        </h2>

        <p className="text-gray-500 text-center mb-10 font-medium">
          Start managing like a pro.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            
            {/* Name */}
            <div className="relative group">
              <UserIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 outline-none focus:ring-4 focus:ring-emerald-500/10 border-none transition-all font-medium text-slate-800 dark:text-white"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 outline-none focus:ring-4 focus:ring-emerald-500/10 border-none transition-all font-medium text-slate-800 dark:text-white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
                size={20}
              />
              <input
                type="password"
                placeholder="Create Password"
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 outline-none focus:ring-4 focus:ring-emerald-500/10 border-none transition-all font-medium text-slate-800 dark:text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          </div>

          <button
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[1.25rem] font-black text-lg shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-sm text-center font-bold text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 hover:underline"
            >
              Login here
            </Link>
          </p>

        </form>
      </motion.div>
    </div>
  );
}

export default Register;
