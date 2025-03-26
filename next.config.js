// next.config.js

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'estarch.com.bd',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'fabrilife.com',
      },
      {
        protocol: 'https',
        hostname: 'api.v1.estarch.online',
      },
      {
        protocol: 'https',
        hostname: 'api.showroom.estarch.com.bd',
      },
      {
        protocol: 'https',
        hostname: 'estarch-server-presonal.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'api.test.backend.estarch.com.bd',
      },
      {
        protocol: 'https',
        hostname: 'api.main.estarch.online',
      },
      {
        protocol: 'https',
        hostname: 'api.estarch.online',
      },
      {
        protocol: 'http',
        hostname: '185.227.134.170',
        port:'5000'
      },
    ],
  },
};
