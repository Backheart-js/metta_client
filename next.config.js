/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');
const withPWA = require('next-pwa')({
    dest: 'public',
    swSrc: 'service-worker.js',
});

module.exports = withPWA(
    withVideos({
        async redirects() {
            return [
                {
                    source: '/',
                    destination: '/home',
                    permanent: true,
                },
            ];
        },
        images: {
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: 'firebasestorage.googleapis.com',
                    port: '',
                    pathname: '/v0/**',
                },
            ],
        },
    }),
);
