import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
      // Keep support for any explicit Supabase storage domains if needed later
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
      }
    ],
  },
};

export default nextConfig;
