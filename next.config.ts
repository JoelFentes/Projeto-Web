// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
        pathname: '**', // aceita qualquer caminho
      },
    ],
  },
};

module.exports = nextConfig;
