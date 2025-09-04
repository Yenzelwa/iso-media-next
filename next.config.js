

const nextConfig = {
  output: 'standalone', 
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, 
  },
};

module.exports = nextConfig;
