/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'i.pravatar.cc', 'nyc3.digitaloceanspaces.com'],
  },
}

module.exports = nextConfig
