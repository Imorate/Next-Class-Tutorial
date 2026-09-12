import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/is/image/samsung/assets/global/about-us/brand/logo/**",
      },
      {
        protocol: "https",
        hostname: "www.technolife.com",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
