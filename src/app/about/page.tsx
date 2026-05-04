"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Power4Out: [number, number, number, number] = [0.165, 0.84, 0.44, 1];
const cv: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.18, ease: Power4Out } } };
const iv: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { ease: Power4Out, duration: 1.1 } } };

const JaaliPattern = ({ id }: { id: string }) => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ opacity: "var(--jaali-opacity)" }}
  >
    <defs>
      <pattern id={id} x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
        <polygon points="28,2 52,14 52,38 28,50 4,38 4,14" fill="none" stroke="#87433b" strokeWidth="1" />
        <polygon points="28,10 44,19 44,33 28,42 12,33 12,19" fill="none" stroke="#87433b" strokeWidth="0.5" />
        <circle cx="28" cy="26" r="1.5" fill="#87433b" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

const highlights = [
  "architecture design",
  "turnkey civil construction",
  "interior design",
  "interior execution",
  "inching towards real estate",
];

const endToEnd = [
  "From your undeveloped parcel of land to key handover",
  "From your government approvals to the inauguration of your project",
];

const aboutVisuals = [
  {
    src: "/about/about-01.png",
    alt: "Living room interior with warm timber ceiling and lounge seating",
  },
  {
    src: "/about/about-02.png",
    alt: "Architectural elevation render on dark background",
  },
  {
    src: "/about/about-03.png",
    alt: "Architectural elevation render on light circular background",
  },
  {
    src: "/about/about-04.png",
    alt: "Interior view with staircase and warm wood detailing",
  },
  {
    src: "/about/about-05.png",
    alt: "Frontal architectural render on dark background",
  },
  {
    src: "/about/about-06.png",
    alt: "Contemporary living room TV unit and seating zone",
  },
];

function StatCounter({ end, label, inverse = false }: { end: number; label: string; inverse?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const step = Math.ceil(end / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(start);
          }, 24);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <span className={`font-display text-6xl font-bold tracking-[-0.03em] ${inverse ? "text-surface" : "text-on-surface"}`}>{count}+</span>
      {label ? (
        <span className={`font-mono text-xs uppercase tracking-[0.2em] font-bold ${inverse ? "text-surface" : "text-secondary"}`}>{label}</span>
      ) : null}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background w-full min-h-screen">
        <motion.section
          variants={cv} initial="hidden" animate="visible"
          className="relative overflow-hidden bg-surface-container-highest rounded-b-[3rem] mx-4 lg:mx-8 pt-12 lg:pt-16 pb-12"
        >
          <JaaliPattern id="jaali-about-hero" />
          <div className="relative z-10 px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              <motion.div
                variants={iv}
                className="lg:col-span-5 rounded-3xl bg-surface-container-low p-6 lg:p-10 min-h-fit lg:h-[38rem] flex flex-col justify-between"
              >
                <motion.div variants={iv} className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                    About Voxel Volumes
                  </span>
                  <div className="h-px w-16 bg-primary/40" />
                </motion.div>
                <motion.p variants={iv} className="font-display text-3xl lg:text-4xl text-on-surface leading-tight max-w-lg">
                  We don&apos;t just create places to live; we create reasons to stay.
                </motion.p>
                <div className="mt-auto flex flex-col items-start gap-3">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center justify-center rounded-full bg-surface-container-highest text-primary border border-primary/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-center w-full lg:w-auto"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.figure variants={iv} className="lg:col-span-7 relative overflow-hidden rounded-3xl min-h-[24rem] lg:h-[38rem]">
                <img
                  src={aboutVisuals[0].src}
                  alt={aboutVisuals[0].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-on-surface/85 via-on-surface/50 to-transparent" />
                <motion.h1
                  variants={iv}
                  className="absolute left-6 lg:left-8 bottom-6 lg:bottom-8 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-surface leading-[1.05] max-w-3xl"
                >
                  Practical Poetry, Built with Precision.
                </motion.h1>
              </motion.figure>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="bg-on-surface text-surface px-6 lg:px-12 py-16 lg:py-20 mt-8 lg:mt-12"
        >
          <motion.div variants={iv} className="relative z-10 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-white/10 border-t border-b border-white/10 py-10">
              <div className="flex flex-col items-center gap-2 px-8 py-8 lg:py-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-3 text-center">Years in Industry</span>
                <StatCounter end={7} label="" inverse />
              </div>

              <div className="flex flex-col items-center gap-2 px-8 py-8 lg:py-0 text-center">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-3 text-center">Where Ideas Meet Craft</span>
                <span className="font-display text-2xl lg:text-3xl font-bold text-surface tracking-[-0.03em] leading-tight whitespace-nowrap">
                  Creativity + Precision
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 px-8 py-8 lg:py-0">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-3 text-center">Projects Across Karnataka</span>
                <StatCounter end={30} label="" inverse />
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="px-6 lg:px-12 py-20 lg:py-24"
        >
          <motion.div variants={iv} className="max-w-6xl mx-auto">
            <h2
              className="font-display font-bold tracking-[-0.04em] text-on-surface leading-none select-none mb-12 lg:mb-16"
              style={{
                fontSize: "clamp(3rem, 10vw, 10rem)",
                WebkitTextStroke: "1px var(--on-surface)",
                color: "transparent",
                backgroundImage: "url('/about/about-01.png')",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              PRACTICAL<br />POETRY
            </h2>

            <div className="space-y-14 lg:space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div className="w-12 h-[3px] bg-primary rounded-full mb-6" />
                  <p className="font-sans text-[20px] text-on-surface leading-[2]">
                    When we are not refining a floor plan or exploring a construction site, you&apos;ll find us sketching urban ruins, studying the way light hits a leaf, or experimenting with sustainable materials that challenge the status quo.
                  </p>
                  <p className="font-sans text-[20px] text-on-surface leading-[2]">
                    End to end solutions under one roof.
                  </p>
                  <div className="space-y-3">
                    {endToEnd.map((item) => (
                      <p key={item} className="font-sans text-[20px] text-on-surface leading-[2]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <motion.figure variants={iv} className="lg:col-span-6 overflow-hidden rounded-3xl h-[300px] lg:h-[400px]">
                  <img
                    src={aboutVisuals[1].src}
                    alt={aboutVisuals[1].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </motion.figure>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.figure variants={iv} className="lg:col-span-6 overflow-hidden rounded-3xl h-[300px] lg:h-[400px]">
                  <img
                    src={aboutVisuals[2].src}
                    alt={aboutVisuals[2].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </motion.figure>
                <div className="lg:col-span-6 lg:order-2">
                  <div className="w-12 h-[3px] bg-primary rounded-full mb-6" />
                  <p className="font-sans text-[20px] text-on-surface leading-[2]">
                    Voxel Volumes is a parent company that has nurtured many budding aspirant architects. It is where a group of passionate and creative people meet. It all began in 2018 taking small steps to leap into what we are today.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6">
                  <div className="w-12 h-[3px] bg-primary rounded-full mb-6" />
                  <p className="font-sans text-[20px] text-on-surface leading-[2]">
                    We believe that a building shouldn&apos;t just occupy space; it should breathe with it. At Voxel volumes, our practice is a dialogue between the permanence of stone and the fleeting dance of light. We don&apos;t just sketch floor plans; we map out how you&apos;ll feel on a rainy Tuesday morning or how a room will hold the golden hour.
                  </p>
                </div>
                <motion.figure variants={iv} className="lg:col-span-6 overflow-hidden rounded-3xl h-[300px] lg:h-[400px]">
                  <img
                    src={aboutVisuals[3].src}
                    alt={aboutVisuals[3].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </motion.figure>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.figure variants={iv} className="lg:col-span-6 overflow-hidden rounded-3xl h-[300px] lg:h-[400px]">
                  <img
                    src={aboutVisuals[4].src}
                    alt={aboutVisuals[4].alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </motion.figure>
                <div className="lg:col-span-6 lg:order-2">
                  <div className="w-12 h-[3px] bg-primary rounded-full mb-6" />
                  <p className="font-sans text-[20px] text-on-surface leading-[2]">
                    To us, architecture is the art of &quot;Practical Poetry.&quot; It&apos;s the meticulous science of ensuring a structure stands for a century, infused with the creative soul that makes you never want to leave.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="px-6 lg:px-12 pb-24"
        >
          <motion.div variants={iv} className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl min-h-[20rem] lg:min-h-[24rem]">
            <img
              src={aboutVisuals[5].src}
              alt={aboutVisuals[5].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-on-surface/60" />
            <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 p-8 lg:p-12">
              <div>
                <p className="font-display text-4xl lg:text-6xl font-bold tracking-[-0.02em] text-surface">
                  Ar Aditya Jatha
                </p>
                <div className="h-px w-40 bg-primary/70 mt-5 mb-5" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-surface font-bold">
                  Principal Architect and proprietor
                </p>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-surface font-bold">
                Voxel Volumes
              </p>
            </div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
