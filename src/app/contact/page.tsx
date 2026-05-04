"use client";

import { motion, Variants } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
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

const socialLinks = [
  {
    href: "https://wa.me/917975540626",
    label: "WhatsApp",
    colour: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/voxelvolumes/",
    label: "Instagram",
    colour: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/voxel-volumes/",
    label: "LinkedIn",
    colour: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

// Google Maps embed for 167 4th Cross, Singapura Paradise, Vidyaranyapura 560097
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.2437889397305!2d77.54826067454892!3d13.073474711473826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae228c0c8a03c7%3A0xfb3bfb96c6acfca9!2sSingapura%20Paradise%2C%20Vidyaranyapura%2C%20Bengaluru%2C%20Karnataka%20560097!5e0!3m2!1sen!2sin!4v1712000000000!5m2!1sen!2sin";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background w-full min-h-screen">

        {/* ── Page Hero ── */}
        <motion.section
          variants={cv} initial="hidden" animate="visible"
          className="relative overflow-hidden rounded-b-[3rem] mx-4 lg:mx-8 py-36"
          style={{
            backgroundImage: "url('/about/about-02.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "28rem",
          }}
        >
          <div className="absolute inset-0 bg-on-surface/70" />

          <JaaliPattern id="jaali-contact-hero" />

          <div className="absolute top-8 right-8 lg:right-12 text-right hidden lg:block z-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">Est. 2018</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35 mt-1">Bengaluru, India</p>
          </div>

          <div className="relative z-10 px-6 lg:px-20 max-w-xl">
            <motion.div variants={iv} className="flex items-center gap-4 mb-5">
              <span className="font-mono text-[10px] uppercase font-bold text-white/60 tracking-[0.3em]">
                Hours & Appointments
              </span>
              <div className="h-px w-16 bg-white/30" />
            </motion.div>
            <motion.h1
              variants={iv}
              className="font-display text-5xl lg:text-[4.5rem] font-bold tracking-[-0.02em] text-surface leading-tight"
            >
              Let's Start Something Great.
            </motion.h1>
          </div>
        </motion.section>

        {/* ── Contact Details + Map ── */}
        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 px-6 lg:px-12 py-24"
        >
          {/* Left col — details */}
          <div className="lg:col-span-5 flex flex-col gap-10">

            <motion.div variants={iv} className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                  Call or Email
                </span>
                <div className="h-px w-16 bg-primary/40" />
              </div>
              <a href="tel:7975540626" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="font-display text-2xl font-bold tracking-[-0.02em] text-on-surface group-hover:text-primary transition-colors">
                  +91 79755 40626
                </span>
              </a>
              <a href="mailto:voxelvolumes@gmail.com" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="font-sans text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">
                  voxelvolumes@gmail.com
                </span>
              </a>
            </motion.div>

            <motion.div variants={iv} className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                  Hours
                </span>
                <div className="h-px w-16 bg-primary/40" />
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="font-sans text-on-surface leading-[1.9]">
                  <p className="font-semibold">Monday – Saturday</p>
                  <p className="text-secondary">9:00 AM – 5:00 PM</p>
                  <p className="font-semibold mt-1">Sunday</p>
                  <p className="text-secondary">Closed</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={iv} className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                  Visit Us
                </span>
                <div className="h-px w-16 bg-primary/40" />
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <p className="font-sans text-on-surface leading-[1.8]">
                  167, 4th Cross, next to SMR Vinay Estella Apartments,<br />
                  Singapura Paradise, Vidyaranyapura,<br />
                  Bengaluru – 560097
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right col — map */}
          <motion.div variants={iv} className="lg:col-span-7">
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(28,28,24,0.08)] border border-outline-variant/30">
              <iframe
                title="Voxel Volumes Location"
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="font-mono text-xs text-secondary mt-4 tracking-tight text-center">
              We're looking forward to your visit!
            </p>
          </motion.div>
        </motion.section>

        {/* ── Connect with Us / Social ── */}
        <motion.section
          variants={cv} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden bg-surface-container-highest mx-4 lg:mx-8 rounded-[3rem] px-8 lg:px-20 py-20 mb-8"
        >
          <JaaliPattern id="jaali-contact-social" />
          <div className="relative z-10 text-center">
            <motion.div variants={iv} className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-[0.3em]">
                Connect with us!
              </span>
              <div className="h-px w-16 bg-primary/40" />
            </motion.div>
            <motion.h2 variants={iv} className="font-display text-4xl font-bold tracking-[-0.02em] text-on-surface mt-4 leading-tight">
              Find us on social media.
            </motion.h2>
            <motion.div variants={iv} className="flex items-center justify-center gap-6 mt-10 flex-wrap">
              {socialLinks.map(({ href, label, colour, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group"
                >
                  <span
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                    style={{ backgroundColor: colour }}
                  >
                    {icon}
                  </span>
                  <span className="font-sans text-xs font-bold text-secondary uppercase tracking-widest group-hover:text-primary transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </motion.section>

      </main>
      <Footer />
    </>
  );
}
