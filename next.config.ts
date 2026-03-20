import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // React Compiler can currently cause App Router runtime issues with this Next version.
  // Keeping it off unblocks layout router mounting.
  reactCompiler: false,
    turbopack: {
      root: '.',
  },
};

export default nextConfig;
