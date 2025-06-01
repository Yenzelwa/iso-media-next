const isAnalyze = process.env.ANALYZE === 'true';

const withBundleAnalyzer = isAnalyze
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
