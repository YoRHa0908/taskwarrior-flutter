import { useState } from "react";

export default function PerfectLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white text-black flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 border-r-[6px] border-black">
        <div>
          <div className="w-14 h-14 bg-black mb-12" />
          
          <h1 className="text-6xl font-extrabold leading-[0.95] tracking-tight uppercase">
            WORK. <br />
            HARD. <br />
            LOG IN.
          </h1>

          <p className="mt-8 text-lg max-w-md font-medium">
            No gradients. No fluff.  
            Just control, clarity, and execution.
          </p>
        </div>

        <p className="text-sm font-bold">
          © 2026 YOURCOMPANY
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center p-8">
        <form className="w-full max-w-md">

          <h2 className="text-5xl font-black uppercase mb-4 tracking-tight">
            SIGN IN
          </h2>

          <p className="mb-12 text-lg font-medium">
            Access your system.
          </p>

          {/* Email */}
          <div className="mb-8">
            <label className="block text-sm font-bold uppercase mb-3">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border-[4px] border-black focus:outline-none focus:bg-black focus:text-white transition-all duration-150"
            />
          </div>

          {/* Password */}
          <div className="mb-12">
            <label className="block text-sm font-bold uppercase mb-3">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 border-[4px] border-black focus:outline-none focus:bg-black focus:text-white transition-all duration-150"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-black text-white py-5 text-xl font-extrabold uppercase border-[4px] border-black 
                       hover:bg-white hover:text-black 
                       active:translate-x-2 active:translate-y-2 
                       transition-all duration-150
                       shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            ENTER
          </button>

          {/* Divider */}
          <div className="flex items-center my-12">
            <div className="flex-1 h-[3px] bg-black" />
            <span className="px-6 font-bold uppercase text-sm">or</span>
            <div className="flex-1 h-[3px] bg-black" />
          </div>

          {/* Social */}
          <button className="w-full border-[4px] border-black py-4 font-bold uppercase mb-6 hover:bg-black hover:text-white transition">
            Google
          </button>

          <button className="w-full border-[4px] border-black py-4 font-bold uppercase hover:bg-black hover:text-white transition">
            GitHub
          </button>

          <p className="mt-12 text-sm font-bold uppercase text-center">
            No account?{" "}
            <span className="underline cursor-pointer">
              Create One.
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}