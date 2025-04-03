import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s4.anilist.co",
        port: "",
        search: "",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
