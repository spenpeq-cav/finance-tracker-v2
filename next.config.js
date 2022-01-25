/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({})

module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}