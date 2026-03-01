import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Dark() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= PARTICLE SYSTEM ================= */

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const mouse = { x: null, y: null };
    const PARTICLE_COUNT = 110;
    let hue = 260;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("click", (e) => {
      for (let i = 0; i < 20; i++) {
        particles.push(new Particle(e.clientX, e.clientY, true));
      }
    });

    class Particle {
      constructor(x, y, explode = false) {
        this.x = x ?? Math.random() * canvas.width;
        this.y = y ?? Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.vx = explode
          ? (Math.random() - 0.5) * 6
          : (Math.random() - 0.5) * 1.2;
        this.vy = explode
          ? (Math.random() - 0.5) * 6
          : (Math.random() - 0.5) * 1.2;
        this.life = explode ? 80 : Infinity;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse repel
        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            this.x += dx * 0.02;
            this.y += dy * 0.02;
          }
        }

        // Button attraction
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const bx = rect.left + rect.width / 2;
          const by = rect.top + rect.height / 2;
          const dx = bx - this.x;
          const dy = by - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            this.x += dx * 0.005;
            this.y += dy * 0.005;
          }
        }

        this.life--;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.shadowColor = `hsl(${hue}, 80%, 60%)`;
        ctx.shadowBlur = 15;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;
          if (dist < 15000) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.1)`;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hue += 0.5;
      particles = particles.filter((p) => p.life > 0);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connect();
      requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduceMotion]);

  /* ================= 3D PARALLAX ================= */

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `
      rotateY(${x * 20}deg)
      rotateX(${y * -20}deg)
    `;
  };

  const resetTilt = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
  };

  /* ================= UI ================= */

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {!shouldReduceMotion && (
        <canvas ref={canvasRef} className="absolute inset-0" />
      )}

      <motion.form
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 backdrop-blur-3xl bg-white/5 border border-white/20 text-white p-10 rounded-3xl shadow-[0_0_120px_rgba(139,92,246,0.6)] w-96 transition-transform duration-200"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/70 rounded-xl outline-none border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition duration-300"
          />
        </div>

        <div className="mb-8">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/70 rounded-xl outline-none border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition duration-300"
          />
        </div>

        <motion.button
          ref={buttonRef}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-semibold tracking-wide shadow-lg"
        >
          Sign In
        </motion.button>
      </motion.form>
    </div>
  );
}