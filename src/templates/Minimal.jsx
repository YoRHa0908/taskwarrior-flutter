import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function PerfectLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cardRef = useRef(null);

  /* ================= 3D PARALLAX ================= */

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `
      rotateY(${x * 18}deg)
      rotateX(${y * -18}deg)
      scale(1.02)
    `;
  };

  const resetTilt = () => {
    cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden">

      {/* Animated Background Gradient */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[900px] h-[900px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[180px]"
      />

      {/* Floating Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-transform duration-200"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-semibold text-white mb-2">
            Welcome back
          </h2>
          <p className="text-neutral-400 mb-10">
            Sign in to your workspace
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 relative"
        >
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 
                       focus:outline-none text-white"
          />
          {/* Animated underline sweep */}
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-400 
                           peer-focus:w-full transition-all duration-500" />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 relative"
        >
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 
                       focus:outline-none text-white"
          />
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-purple-400 to-pink-400 
                           peer-focus:w-full transition-all duration-500" />
        </motion.div>

        {/* Energy Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 40px rgba(139,92,246,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          className="relative w-full py-3 rounded-xl font-medium overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
        >
          <motion.span
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <span className="relative z-10">Continue</span>
        </motion.button>

      </motion.div>
    </div>
  );
}