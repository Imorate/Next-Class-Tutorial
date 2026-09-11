import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/is/image/samsung/assets/global/about-us/brand/logo/**",
      },
    ],
  },
};

export default nextConfig;
