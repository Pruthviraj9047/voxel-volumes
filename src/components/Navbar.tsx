"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-screen bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
      <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
        {/* Logo */}
        <Link href="/home" className="flex items-center">
          <img
            src="/logo.svg"
            alt="Voxel Volumes"
            className="h-8 w-auto"
            style={{ filter: "invert(1) sepia(1) saturate(3) hue-rotate(5deg) brightness(0.9)" }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10 font-sans text-sm font-semibold tracking-wide">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors hover:text-primary ${pathname === href ? "text-primary border-b-2 pb-0.5" : "text-white/80"
                }`}
              style={pathname === href ? { borderColor: "#c9a84c", color: "#c9a84c" } : undefined}
            >
              {label}
            </Link>
          ))}
        </div>



        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-on-surface" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <div className="hidden lg:flex items-center justify-between px-6 lg:px-12 py-1.5 border-t border-white/5">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
          Architecture · Interior · Construction
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
          Bengaluru, IN · Est. 2018
        </span>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-outline-variant/30 px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="font-sans text-sm font-semibold text-on-surface hover:text-primary transition-colors py-2" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}

        </div>
      )}
    </header>
  );
}
