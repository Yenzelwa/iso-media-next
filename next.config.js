
const path = require('path');

const nextConfig = {
  output: 'standalone', 
  reactStrictMode: true,
  trailingSlash: true,
  // Silence monorepo/multi-lockfile root warnings in tests/builds
  outputFileTracingRoot: path.join(__dirname),
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: false, 
  },
};

module.exports = nextConfig;
