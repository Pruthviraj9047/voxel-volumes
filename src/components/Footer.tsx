import Link from "next/link";

const socialLinks = [
  {
    href: "https://wa.me/917975540626",
    label: "WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/voxelvolumes/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/voxel-volumes/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-on-surface text-surface">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">Voxel Volumes</h2>
          <p className="font-sans text-sm text-white/50 leading-[1.8] max-w-xs">
            Luxury in every detail. Architecture rooted in clarity, driven by context, shaped by innovation.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white/40 mb-2">Navigate</p>
          {[
            { href: "/home",    label: "Home" },
            { href: "/about",   label: "About" },
            { href: "/projects", label: "Projects" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="font-sans text-sm text-white/70 hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-white/40 mb-2">Connect with us</p>
          <a href="tel:7975540626" className="font-sans text-sm text-white/70 hover:text-white transition-colors">+91 79755 40626</a>
          <a href="mailto:voxelvolumes@gmail.com" className="font-sans text-sm text-white/70 hover:text-white transition-colors">voxelvolumes@gmail.com</a>
          <div className="flex items-center gap-4 mt-3">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <p className="font-sans text-xs text-white/30 tracking-wider uppercase">
          © 2026 Voxel Volumes. All rights reserved.
        </p>
        <p className="font-sans text-xs text-white/30">Vidyaranyapura, Bengaluru 560097</p>
      </div>
      <p className="text-center text-[11px] text-white/30 tracking-widest uppercase mt-4 pb-2 font-mono select-none">
        Website designed &amp; developed by Pruthviraj Arun
      </p>
    </footer>
  );
}
