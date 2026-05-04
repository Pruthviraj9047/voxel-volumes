import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Developer",
            value: "Pruthviraj Arun",
          },
          {
            key: "X-Built-With",
            value: "Next.js, Tailwind CSS, Framer Motion, Three.js",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
