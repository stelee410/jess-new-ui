import type { NextConfig } from "next";
const withNextIntl = require('next-intl/plugin')();
 

const nextConfig: NextConfig = {
  /* config options here */ 
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://127.0.0.1:8080/api/v1/:path*',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
