import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

   allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    'lvh.me',
    '*.lvh.me',
    '*.localhost',
   ]
};

export default nextConfig;
