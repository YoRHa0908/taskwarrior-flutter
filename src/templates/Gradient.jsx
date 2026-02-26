import { useState } from "react";
import { motion } from "framer-motion";

export default function CreativeAnimated() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">

      {/* Animated Blob 1 */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[600px] h-[600px] bg-pink-300/40 rounded-full blur-3xl -top-32 -left-32"
      />

      {/* Animated Blob 2 */}
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[600px] h-[600px] bg-indigo-300/40 rounded-full blur-3xl -bottom-32 -right-32"
      />

      {/* Content */}
      <div className="flex w-full items-center justify-center relative z-10 px-6">

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md p-12 rounded-[2.5rem]
                     bg-white/70 backdrop-blur-xl
                     border border-white/40
                     shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
        >

          <h2 className="text-3xl font-semibold mb-2 text-gray-900">
            Welcome back
          </h2>

          <p className="text-gray-500 mb-10">
            Continue your creative journey.
          </p>

          {/* Email */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl
                         bg-white/80 border border-gray-200
                         placeholder-gray-400
                         focus:outline-none
                         focus:ring-2 focus:ring-pink-400
                         transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl
                         bg-white/80 border border-gray-200
                         placeholder-gray-400
                         focus:outline-none
                         focus:ring-2 focus:ring-indigo-400
                         transition-all duration-200"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-medium text-white
                       bg-gradient-to-r from-pink-500 to-indigo-500
                       hover:opacity-90
                       active:scale-[0.97]
                       transition-all duration-200
                       shadow-lg shadow-pink-300/40"
          >
            Enter Studio
          </button>

        </motion.form>
      </div>
    </div>
  );
}