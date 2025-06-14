const isAnalyze = process.env.ANALYZE === 'true';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isAnalyze,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, 
  },
};

module.exports = withBundleAnalyzer(nextConfig);
