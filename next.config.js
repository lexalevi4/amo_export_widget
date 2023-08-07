/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tb-widget-images.storage.yandexcloud.net',
                port: '',
                pathname: '/full/**',
            },
        ],
    },
}

module.exports = nextConfig
