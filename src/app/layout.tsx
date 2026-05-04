import type { Metadata } from "next";
import { Manrope, Noto_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voxel Volumes Studio",
  description: "Modern Indian Vernacular Architecture",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  authors: [{ name: "Pruthviraj Arun" }],
  creator: "Pruthviraj Arun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSerif.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      {/* No bg class — body is transparent so hero canvas shows through */}
      <body className="min-h-screen w-screen overflow-x-hidden flex flex-col font-sans text-foreground">
        {/* Designed & developed by Pruthviraj Arun — github.com/Pruthviraj9047 */}
        {/* Noise texture overlay */}
        <div
          className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
        />
        {children}
      </body>
    </html>
  );
}