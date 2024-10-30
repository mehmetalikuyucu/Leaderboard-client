import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        hostname: "www.panteon.games",
        port: '',
        protocol: "https",
        pathname: "/wp-content/themes/panteon/assets/img/logo@2x.png"
        
      }
    ]
  },
};

export default nextConfig;
