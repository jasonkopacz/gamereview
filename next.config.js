/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.rawg.io'],
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
