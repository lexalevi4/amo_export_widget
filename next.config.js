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
            {
                protocol: 'https',
                hostname: 'tb-widget-images.storage.yandexcloud.net',
                port: '',
                pathname: '/mid/**',
            },
            {
                protocol: 'https',
                hostname: 'tb-widget-images.storage.yandexcloud.net',
                port: '',
                pathname: '/thumb/**',
            },
        ],
    },
}

module.exports = nextConfig
