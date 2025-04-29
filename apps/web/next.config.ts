import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hynkxrflzpcvpfpthmso.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/camaras-images/**",
      },
    ],
  },
};

export default nextConfig;
