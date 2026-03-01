"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

/* ================= PARTICLE FIELD ================= */

function ParticleField({ blackhole }) {
  const ref = useRef();

  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame(() => {
    const positions = ref.current.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      let x = positions[i];
      let y = positions[i + 1];
      let z = positions[i + 2];

      // slow floating
      positions[i] += Math.sin(Date.now() * 0.0005 + x) * 0.0005;
      positions[i + 1] += Math.cos(Date.now() * 0.0005 + y) * 0.0005;

      // blackhole pull
      if (blackhole.active) {
        const dx = -x;
        const dy = -y;
        const dz = -z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist > 0.1) {
          positions[i] += dx * 0.02;
          positions[i + 1] += dy * 0.02;
          positions[i + 2] += dz * 0.02;
        }
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </Points>
  );
}

/* ================= MAIN UI ================= */

export default function UltraLogin() {
  const [blackhole, setBlackhole] = useState({ active: false });

  const triggerBlackhole = () => {
    setBlackhole({ active: true });
    setTimeout(() => setBlackhole({ active: false }), 4000);
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">

      {/* 3D Particle Universe */}
      <Canvas camera={{ position: [0, 0, 10] }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.5} />
        <ParticleField blackhole={blackhole} />
      </Canvas>

      {/* Glass Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-[420px] p-10 rounded-3xl 
                        bg-white/5 backdrop-blur-3xl 
                        border border-white/10 
                        shadow-[0_0_100px_rgba(139,92,246,0.4)]">

          <h2 className="text-3xl text-white mb-8 font-light tracking-wide">
            Enter The System
          </h2>

          <input
            placeholder="Email"
            className="w-full mb-5 px-4 py-3 rounded-xl bg-black/40 
                       border border-white/10 text-white focus:outline-none"
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full mb-8 px-4 py-3 rounded-xl bg-black/40 
                       border border-white/10 text-white focus:outline-none"
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={triggerBlackhole}
            className="w-full py-3 rounded-xl 
                       bg-gradient-to-r from-purple-600 to-indigo-600 
                       text-white font-medium"
          >
            Collapse Reality
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}