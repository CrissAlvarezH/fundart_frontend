/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost:8000'],
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
