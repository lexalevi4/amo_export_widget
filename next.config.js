/** @type {import('next').NextConfig} */
const nextConfig = {
    // async headers() {
    //     return [
    //         {
    //             // matching all API routes
    //             source: "/api/:path*",
    //             headers: [
    //                 { key: "Access-Control-Allow-Credentials", value: "true" },
    //                 { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
    //                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
    //                 { key: "Access-Control-Allow-Headers", value: "*" },
    //             ]
    //         }
    //     ]
    // },
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
