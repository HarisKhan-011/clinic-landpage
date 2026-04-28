import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    config.snapshot = {
      ...(config.snapshot ?? {}),
      managedPaths: [],
    };
    return config;
  },
};

export default nextConfig;
