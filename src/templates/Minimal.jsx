import { useState } from "react";
import { motion } from "framer-motion";

export default function PerfectLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">

      {/* Soft Ambient Gradient */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Logo */}
        <div className="w-10 h-10 rounded-xl bg-white/90 mb-8" />

        <h2 className="text-3xl font-semibold text-white tracking-tight mb-2">
          Welcome back
        </h2>

        <p className="text-neutral-400 mb-10">
          Sign in to continue to your workspace
        </p>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm text-neutral-400 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 
                       focus:border-white/30 focus:bg-white/[0.06] 
                       outline-none transition-all duration-200 text-white"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm text-neutral-400 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 
                       focus:border-white/30 focus:bg-white/[0.06] 
                       outline-none transition-all duration-200 text-white"
          />
        </div>

        {/* Primary Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-white text-black py-3 rounded-xl font-medium 
                     hover:bg-neutral-200 transition-all duration-200"
        >
          Continue
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-4 text-sm text-neutral-500">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social */}
        <button className="w-full border border-white/10 py-3 rounded-xl mb-4 
                           hover:bg-white/[0.04] transition-all duration-200 text-white">
          Continue with Google
        </button>

        <button className="w-full border border-white/10 py-3 rounded-xl 
                           hover:bg-white/[0.04] transition-all duration-200 text-white">
          Continue with GitHub
        </button>

        <p className="text-sm text-neutral-500 mt-10 text-center">
          Don’t have an account?{" "}
          <span className="text-white hover:underline cursor-pointer">
            Create one
          </span>
        </p>
      </motion.div>
    </div>
  );
}