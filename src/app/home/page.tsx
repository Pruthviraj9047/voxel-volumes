"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Power4Out: [number, number, number, number] = [0.165, 0.84, 0.44, 1];
const cv: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, ease: Power4Out } },
};
const iv: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { ease: Power4Out, duration: 1.1 } },
};

/* ── Jaali SVG pattern ── */
const JaaliPattern = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ opacity: "var(--jaali-opacity)" }}
  >
    <defs>
      <pattern id="jaali-home" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
        <polygon points="28,2 52,14 52,38 28,50 4,38 4,14" fill="none" stroke="#87433b" strokeWidth="1" />
        <polygon points="28,10 44,19 44,33 28,42 12,33 12,19" fill="none" stroke="#87433b" strokeWidth="0.5" />
        <line x1="28" y1="2" x2="28" y2="10" stroke="#87433b" strokeWidth="0.5" />
        <line x1="52" y1="14" x2="44" y2="19" stroke="#87433b" strokeWidth="0.5" />
        <line x1="52" y1="38" x2="44" y2="33" stroke="#87433b" strokeWidth="0.5" />
        <line x1="28" y1="50" x2="28" y2="42" stroke="#87433b" strokeWidth="0.5" />
        <line x1="4" y1="38" x2="12" y2="33" stroke="#87433b" strokeWidth="0.5" />
        <line x1="4" y1="14" x2="12" y2="19" stroke="#87433b" strokeWidth="0.5" />
        <circle cx="28" cy="26" r="1.5" fill="#87433b" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#jaali-home)" />
  </svg>
);



/* ══════════════════════════════════════════════
   FEATURE 3: 3D tilt service card
══════════════════════════════════════════════ */
function TiltCard({ svc, variants }: { svc: { num: string; title: string; desc: string; img: string }; variants: Variants }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y / rect.height) - 0.5) * -10;
    const rotY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="flex flex-col gap-5 bg-surface-container-low rounded-2xl overflow-hidden
                 shadow-[0_4px_24px_rgba(28,28,24,0.06)]
                 hover:shadow-[0_24px_56px_rgba(135,67,59,0.14)]"
      style={{ transition: "transform 0.15s ease, box-shadow 0.4s ease", willChange: "transform" }}
    >
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={svc.img}
          alt={svc.title}
          className="w-full h-full object-cover sepia-[15%] group-hover:sepia-0 scale-100 hover:scale-105 transition-all duration-[1.2s] ease-out"
        />
      </div>
      <div className="px-6 pb-7 flex flex-col gap-3">
        <span className="font-display text-3xl font-normal text-primary/30 tracking-[-0.02em]">{svc.num}</span>
        <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-on-surface leading-snug">{svc.title}</h3>
        <p className="font-sans text-sm text-secondary leading-[1.8]">{svc.desc}</p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   FEATURE 2: Animated section heading
══════════════════════════════════════════════ */
function DrawInHeading({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <h2
      ref={ref}
      className="font-display text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-on-surface mt-4 leading-tight"
      style={{
        clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        transition: "clip-path 0.9s cubic-bezier(0.165,0.84,0.44,1)",
      }}
    >
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════════
   Voxel hero canvas
══════════════════════════════════════════════ */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const existing = document.getElementById("three-cdn");
    const doInit = () => init(canvas);
    if (existing) { doInit(); return; }

    const script = document.createElement("script");
    script.id = "three-cdn";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = doInit;
    document.head.appendChild(script);

    return () => {
      cancelAnimationFrame(animRef.current);
      cleanupRef.current?.();
    };
  }, []);

  function init(canvas: HTMLCanvasElement) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const THREE = (window as any).THREE;
    if (!THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setClearColor(0x0d0b08, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const parent = canvas.parentElement!;
    const getW = () => parent.offsetWidth;
    const getH = () => parent.offsetHeight;
    renderer.setSize(getW(), getH());

    const scene = new THREE.Scene();

    /* FIX: camera at (0,35,8) — correct distance used in computeN */
    const CAM_Y = 35;
    const CAM_Z = 8;
    const FOV = 75;
    const camera = new THREE.PerspectiveCamera(FOV, getW() / getH(), 0.1, 600);
    camera.position.set(0, CAM_Y, CAM_Z);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xfff5e0, 1.2));
    const sun = new THREE.DirectionalLight(0xffd580, 1.4);
    sun.position.set(8, 20, 12);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xc8a46e, 0.8);
    fill.position.set(-8, 10, -8);
    scene.add(fill);

    const geo = new THREE.BoxGeometry(1.0, 0.7, 1.0);
    const mat = new THREE.MeshStandardMaterial({ color: 0x8a7055, roughness: 0.7, metalness: 0.05 });

    const SPACING = 1.15;
    const dummy = new THREE.Object3D();

    /* FIX: use actual camera position for distance */
    function computeN() {
      const aspect = getW() / getH();
      const vFOV = (FOV * Math.PI) / 180;
      const camDist = Math.sqrt(CAM_Y * CAM_Y + CAM_Z * CAM_Z);
      const visH = 2 * Math.tan(vFOV / 2) * camDist;
      const visW = visH * aspect;
      return Math.ceil(Math.max(visW, visH) / SPACING) + 20;
    }

    let N = computeN();
    let count = N * N;
    let px = new Float32Array(count);
    let pz = new Float32Array(count);
    let mesh = new THREE.InstancedMesh(geo, mat, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    function buildGrid() {
      const HALF = ((N - 1) * SPACING) / 2;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const idx = i * N + j;
          px[idx] = i * SPACING - HALF;
          pz[idx] = j * SPACING - HALF;
          dummy.position.set(px[idx], 0, pz[idx]);
          dummy.updateMatrix();
          mesh.setMatrixAt(idx, dummy.matrix);
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
    buildGrid();

    const mouse2D = new THREE.Vector2(9999, 9999);
    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const mouseWorld = new THREE.Vector3();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse2D.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse2D.x = ((t.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2D.y = -((t.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    const onResize = () => {
      camera.aspect = getW() / getH();
      camera.updateProjectionMatrix();
      renderer.setSize(getW(), getH());
      const newN = computeN();
      if (newN !== N) {
        scene.remove(mesh);
        mesh.dispose();
        N = newN; count = N * N;
        px = new Float32Array(count); pz = new Float32Array(count);
        mesh = new THREE.InstancedMesh(geo, mat, count);
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        scene.add(mesh);
        buildGrid();
      }
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      t += 0.007;
      raycaster.setFromCamera(mouse2D, camera);
      raycaster.ray.intersectPlane(groundPlane, mouseWorld);
      for (let k = 0; k < count; k++) {
        const breath = Math.sin(t + k * 0.28) * 0.22;
        const dx = px[k] - mouseWorld.x;
        const dz = pz[k] - mouseWorld.z;
        const d2 = dx * dx + dz * dz;
        const rise = d2 < 64 ? (1 - Math.sqrt(d2) / 8) ** 2 * 4.0 : 0;
        dummy.position.set(px[k], breath + rise, pz[k]);
        dummy.updateMatrix();
        mesh.setMatrixAt(k, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    cleanupRef.current = () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

/* ── Service data ── */
const services = [
  { num: "01", title: "Architectural Design", desc: "From concept to completion — site-responsive buildings that balance form, function, and regional identity.", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800" },
  { num: "02", title: "Urban & Spatial Planning", desc: "Masterplanning and urban frameworks that shape how communities move, gather, and grow.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800" },
  { num: "03", title: "Interior Architecture", desc: "Interior volumes that feel curated, not decorated — layered with light, texture, and honest materials.", img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=800" },
  { num: "04", title: "Concept Development & Visualisation", desc: "High-fidelity renders and spatial narratives that communicate vision before the first brick is laid.", img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=800" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">

        {/* ── Hero ── */}
        <motion.section
          variants={cv} initial="hidden" animate="visible"
          className="relative min-h-[88vh] flex flex-col justify-center px-6 lg:px-20 py-24 overflow-hidden"
        >
          <HeroCanvas />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(105deg, rgba(13,11,8,0.90) 0%, rgba(13,11,8,0.65) 45%, rgba(13,11,8,0.05) 100%)"
          }} />
          <div className="relative z-10 max-w-3xl">
            <motion.span variants={iv} className="font-mono text-xs uppercase font-bold tracking-[0.22em]" style={{ color: "#FFB300" }}>
              Luxury in every detail
            </motion.span>
            <motion.h1
              variants={iv}
              className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-[-0.02em] leading-tight mt-5"
              style={{ color: "#f5f0e8" }}
            >
              We shape spaces.<br />Spaces shape us.
            </motion.h1>
            <motion.p variants={iv} className="font-sans text-[17px] font-medium leading-[1.8] mt-8 max-w-xl" style={{ color: "rgba(255,255,255,0.88)" }}>
              At Voxel Volumes, we translate ideas into spatial experiences. Our architecture is rooted in
              clarity, driven by context, and shaped by innovation — where every volume serves a purpose.
            </motion.p>
            <motion.div variants={iv} className="flex flex-wrap gap-4 mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase font-bold px-8 py-4 rounded-md tracking-widest hover:opacity-90 transition-all shadow-lg"
                style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
              >
                View Our Work <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-sans text-xs uppercase font-bold px-8 py-4 rounded-md tracking-widest transition-all"
                style={{ color: "#f5f0e8", border: "2px solid rgba(245,240,232,0.55)" }}
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Transition ramp */}
        <div className="h-24 bg-gradient-to-b from-[#0d0b08] to-background" />

        {/* ── What We Do / Services with FEATURE 3: 3D tilt cards ── */}
        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="bg-background px-6 lg:px-12 py-24"
          id="services"
        >
          <motion.div variants={iv} className="text-center mb-16">
            <span className="font-mono text-xs uppercase font-bold text-primary tracking-[0.22em]">What We Do</span>
            {/* FEATURE 2: Draw-in heading */}
            <DrawInHeading>Four Disciplines. One Vision.</DrawInHeading>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((svc, idx) => (
              <TiltCard key={idx} svc={svc} variants={iv} />
            ))}
          </div>
        </motion.section>

        {/* ── Philosophy strip ── */}
        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden bg-surface-container-highest mx-4 lg:mx-8 rounded-[3rem] px-8 lg:px-20 py-20"
        >
          <JaaliPattern />
          <div className="relative z-10 max-w-4xl mx-auto text-center">

            {/* Giant decorative opening quotation mark */}
            <motion.span
              variants={iv}
              aria-hidden="true"
              className="block font-display font-bold text-primary leading-none select-none"
              style={{ fontSize: "clamp(7rem, 18vw, 15rem)", opacity: 0.15, lineHeight: 0.75, marginBottom: "-1rem" }}
            >
              &ldquo;
            </motion.span>

            {/* Churchill quote */}
            <motion.blockquote
              variants={iv}
              className="font-display font-bold tracking-[-0.025em] text-on-surface uppercase leading-[1.05]"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.75rem)" }}
            >
              We shape our buildings;<br />
              thereafter they<br className="lg:hidden" /> shape us.
            </motion.blockquote>

            {/* Divider line */}
            <motion.div variants={iv} className="flex items-center justify-center gap-4 mt-10 mb-6">
              <div className="h-px w-12 bg-primary/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              <div className="h-px w-12 bg-primary/40" />
            </motion.div>

            {/* Attribution in script-style italic */}
            <motion.p
              variants={iv}
              className="font-display text-xl lg:text-2xl italic text-primary font-normal tracking-normal"
              style={{ fontStyle: "italic" }}
            >
              — Winston Churchill
            </motion.p>

            {/* Small mono caption below */}
            <motion.p
              variants={iv}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mt-3 font-bold"
            >
              The Philosophy We Build By
            </motion.p>

          </div>
        </motion.section>

        {/* ── CTA Banner ── */}
        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="relative bg-on-surface mx-4 lg:mx-8 rounded-[3rem] px-8 lg:px-20 py-24 text-center mb-8 mt-8"
        >
          <motion.span variants={iv} className="font-mono text-xs uppercase font-bold text-primary tracking-[0.22em]">
            Ready to build?
          </motion.span>
          <motion.h2 variants={iv} className="font-display text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-surface mt-4 leading-tight">
            Have a project in mind?<br />
            <span style={{ color: "#c9a84c" }}>Let's shape it — one volume at a time.</span>
          </motion.h2>
          <motion.div variants={iv} className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 font-sans text-xs uppercase font-bold text-on-surface px-10 py-4 rounded-md tracking-widest hover:opacity-90 transition-all shadow-md"
              style={{ backgroundColor: "#FFB300" }}
            >
              Start a Conversation <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.section>

      </main>
      <Footer />
    </>
  );
}
