/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/ ']
  },
  domains: ['https:/firebasestorage.googleapis.com/v0/b/vincethekids.appspot.com/']
}

module.exports = nextConfig
