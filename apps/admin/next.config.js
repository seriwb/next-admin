// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const isProd = process.env.NODE_ENV === 'production';
const origin = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3500';
const sequreHeaders = [
  { key: 'Access-Control-Allow-Origin', value: origin },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
isProd &&
  sequreHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.plugins = [...config.plugins, new PrismaPlugin()];
  //   }
  //   return config;
  // },
  transpilePackages: ['@next-admin/db'],
  poweredByHeader: false,
  images: {
    minimumCacheTTL: 60,
    // unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/((?!auth/registered).*)',
        headers: sequreHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
