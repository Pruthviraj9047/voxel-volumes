"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Power4Out: [number, number, number, number] = [0.165, 0.84, 0.44, 1];
const cv: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, ease: Power4Out } } };
const iv: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { ease: Power4Out, duration: 1.0 } } };

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

function imgs(folder: string, count: number) {
    return Array.from({ length: count }, (_, i) => `/${folder}/${i + 1}.jpg`);
}

const projects = [
    {
        title: "Residence for Mr Srinivas Reddy",
        location: "Vidyaranyapura, Bengaluru",
        category: "Residential",
        images: imgs("srinivas-reddy", 12),
    },
    {
        title: "Residence for Mr Vikas",
        location: "Uttarahalli, Bengaluru",
        category: "Residential",
        images: imgs("vikas", 11),
    },
    {
        title: "Residence for Mr Pradeep",
        location: "Vishweshwaraya Layout, Bengaluru",
        category: "Residential",
        images: imgs("pradeep", 7),
    },
    {
        title: "Residence for Mr Girish",
        location: "Sanjay Nagar, Bengaluru",
        category: "Residential",
        images: imgs("girish", 11),
    },
    {
        title: "Residence for Mr Gangadhar",
        location: "Rajankunte, Bengaluru",
        category: "Residential",
        images: imgs("gangadhar", 12),
    },
];

function AccordionGallery({
  projects,
  onOpen,
}: {
  projects: { title: string; location: string; category: string; images: string[] }[];
  onOpen: (pIdx: number, imgIdx: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-stretch gap-2 w-full h-[520px] lg:h-[640px]">
      {projects.map((project, i) => (
        <button
          key={i}
          onClick={() => onOpen(i, 0)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          aria-label={`View ${project.title}`}
          className="relative flex-shrink-0 rounded-[1.5rem] overflow-hidden focus:outline-none"
          style={{
            transition: "flex 0.6s cubic-bezier(0.165,0.84,0.44,1), width 0.6s cubic-bezier(0.165,0.84,0.44,1)",
            flex: hovered === i ? "4 1 0%" : hovered !== null ? "0.4 1 0%" : "1 1 0%",
            minWidth: "3rem",
          }}
        >
          {/* Image */}
          <img
            src={project.images[0]}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: hovered === i ? "saturate(1) brightness(1)" : "saturate(0.3) brightness(0.75)",
              transition: "filter 0.6s ease",
            }}
          />

          {/* Dark gradient overlay — always present, stronger when collapsed */}
          <div
            className="absolute inset-0"
            style={{
              background: hovered === i
                ? "linear-gradient(to top, rgba(10,8,6,0.96) 0%, rgba(10,8,6,0.75) 30%, rgba(10,8,6,0.25) 60%, transparent 100%)"
                : "linear-gradient(to top, rgba(10,8,6,0.75) 0%, rgba(10,8,6,0.45) 100%)",
              transition: "background 0.6s ease",
            }}
          />

          {/* Collapsed state — vertical rotated label */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: hovered === i ? 0 : 1,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {String(i + 1).padStart(2, "0")} — {project.category}
            </span>
          </div>

          {/* Expanded state — bottom metadata */}
          <div
            className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-left backdrop-blur-none"
            style={{
              opacity: hovered === i ? 1 : 0,
              transform: hovered === i ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s",
              pointerEvents: "none",
              backdropFilter: "blur(0px)",
            }}
          >
            {/* Eyebrow with rule */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c9a84c] font-bold">
                {project.category}
              </span>
              <div className="h-px w-10 bg-primary/50" />
              <span className="font-mono text-[10px] text-white/60 tracking-[0.2em]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-display text-xl lg:text-2xl font-bold text-white tracking-[-0.02em] leading-snug"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
            >
              {project.title}
            </h3>

            {/* Location */}
            <p
              className="font-sans text-sm text-white/80 font-medium mt-1.5"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
            >
              {project.location}
            </p>

            {/* View prompt */}
            <div className="flex items-center gap-2 mt-4">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#c9a84c] font-bold"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
              >
                View Gallery
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#c9a84c]" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
    const [lightbox, setLightbox] = useState<{ projectIdx: number; imgIdx: number } | null>(null);

    const openLightbox = (projectIdx: number, imgIdx: number) =>
        setLightbox({ projectIdx, imgIdx });
    const closeLightbox = () => setLightbox(null);

    const prev = () => {
        if (!lightbox) return;
        const total = projects[lightbox.projectIdx].images.length;
        setLightbox({ ...lightbox, imgIdx: (lightbox.imgIdx - 1 + total) % total });
    };
    const next = () => {
        if (!lightbox) return;
        const total = projects[lightbox.projectIdx].images.length;
        setLightbox({ ...lightbox, imgIdx: (lightbox.imgIdx + 1) % total });
    };

    return (
        <>
            <svg className="absolute -top-[999px] -left-[999px] w-0 h-0" aria-hidden="true">
                <defs>
                    <clipPath id="vv-clip-0" clipPathUnits="objectBoundingBox">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.71161 0H0V1H0.0362048C0.236734 1 0.42296 0.940031 0.577199 0.837408H0.74407V0.718826H0.888889V0.5H1V0.0562347V0H0.71161Z" />
                    </clipPath>
                    <clipPath id="vv-clip-1" clipPathUnits="objectBoundingBox">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.00124689 0H1V0.665217V0.88913V0.890217C1 0.950849 0.943617 1 0.874065 1C0.804513 1 0.74813 0.950849 0.74813 0.890217V0.890761C0.74813 0.951092 0.692026 1 0.622818 1C0.559929 1 0.50786 0.959615 0.498877 0.906971C0.490714 0.959506 0.439061 1 0.376559 1C0.311952 1 0.258938 0.956733 0.253565 0.901625C0.246444 0.956975 0.192577 1 0.127182 1C0.0569414 1 0 0.950362 0 0.88913V0.666304C0 0.661014 0.00042501 0.655811 0.00124689 0.650718V0Z" />
                    </clipPath>
                    <clipPath id="vv-clip-2" clipPathUnits="objectBoundingBox">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.827825 0.233206C0.928457 0.262983 1 0.338976 1 0.428023V0.964491C1 0.984102 0.979649 1 0.954545 1H0.0454546C0.0203507 1 0 0.984102 0 0.964491V0.428023C0 0.338976 0.0715426 0.262983 0.172175 0.233206C0.187663 0.102409 0.328522 0 0.5 0C0.671478 0 0.812337 0.102409 0.827825 0.233206Z" />
                    </clipPath>
                    <clipPath id="vv-clip-3" clipPathUnits="objectBoundingBox">
                        <path d="M0.997417 0.541807C1.02854 0.316235 0.773628 -0.00919936 0.492039 0.000199072C0.249199 0.00830422 0 0.217547 0 0.539457C0.0251948 0.836695 0.248984 1 0.492039 1C0.745469 1 0.982596 0.83787 0.997417 0.541807Z" />
                    </clipPath>
                    <clipPath id="vv-clip-4" clipPathUnits="objectBoundingBox">
                        <path d="M0 1H0.152466C0.185351 0.960002 0.327354 0.884713 0.505232 0.884713C0.683109 0.884713 0.818635 0.968237 0.849028 1H1V0.347104C0.985052 0.222406 0.838565 0.00477544 0.497758 6.98837e-05C0.156951 -0.00463567 0.0239163 0.229466 0 0.347104V1Z" />
                    </clipPath>
                </defs>
            </svg>
            <Navbar />
            <main className="bg-background w-full">

                {/* ── Hero ── */}
                <motion.section
                    variants={cv} initial="hidden" animate="visible"
                    className="relative overflow-hidden px-6 lg:px-20 py-28 bg-surface-container-highest rounded-b-[3rem] mx-4 lg:mx-8"
                >
                    <JaaliPattern id="jaali-projects-hero" />
                    <div className="relative z-10 max-w-2xl mx-auto lg:mx-0">
                        <motion.div variants={iv} className="flex items-center gap-4">
                            <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                                Our Portfolio
                            </span>
                            <div className="h-px w-16 bg-primary/40" />
                        </motion.div>
                        <motion.h1
                            variants={iv}
                            className="font-display text-5xl lg:text-[4.5rem] font-bold tracking-[-0.02em] text-on-surface leading-tight mt-5"
                        >
                            Work That Speaks for Itself.
                        </motion.h1>
                        <motion.p variants={iv} className="font-sans text-[17px] text-secondary font-medium leading-[1.8] mt-6 max-w-xl">
                            A curated selection of residences designed and built across Bengaluru and beyond.
                            Click any project to explore the full gallery.
                        </motion.p>
                    </div>
                </motion.section>

                {/* ── Project Gallery ── */}
                <motion.section
                    variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                    className="bg-background px-6 lg:px-12 py-24"
                >
                    <motion.div variants={iv} className="w-full px-4 lg:px-8">
                        <AccordionGallery projects={projects} onOpen={openLightbox} />
                    </motion.div>
                </motion.section>

            </main>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/92 flex flex-col items-center justify-center p-4"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={e => {e.stopPropagation(); closeLightbox();}}
                            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
                            aria-label="Close"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.div
                            key={`${lightbox.projectIdx}-${lightbox.imgIdx}`}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
                            className="relative max-w-4xl w-full"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={projects[lightbox.projectIdx].images[lightbox.imgIdx]}
                                alt={projects[lightbox.projectIdx].title}
                                className="w-full max-h-[72vh] object-contain rounded-2xl"
                            />

                            {projects[lightbox.projectIdx].images.length > 1 && (
                                <>
                                    <button
                                        onClick={e => { e.stopPropagation(); prev(); }}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={e => { e.stopPropagation(); next(); }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </motion.div>

                        {/* Thumbnail strip */}
                        <div
                            className="flex items-center gap-3 mt-5 overflow-x-auto max-w-xl px-2"
                            onClick={e => e.stopPropagation()}
                        >
                            {projects[lightbox.projectIdx].images.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setLightbox({ ...lightbox, imgIdx: i })}
                                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === lightbox.imgIdx
                                            ? "border-[#c9a84c] scale-110"
                                            : "border-transparent opacity-50 hover:opacity-80"
                                        }`}
                                >
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 text-center" onClick={e => e.stopPropagation()}>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                                {projects[lightbox.projectIdx].category}
                            </p>
                            <p className="font-display text-xl font-bold text-white mt-1">
                                {projects[lightbox.projectIdx].title}
                            </p>
                            <p className="font-sans text-sm text-white/50 mt-0.5">
                                {projects[lightbox.projectIdx].location}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </>
    );
}
