  /** @type {import('next').NextConfig} */
const nextConfig = {
 // basePath: "/iso-media-next",
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({});
