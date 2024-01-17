/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');
const withPWA = require('next-pwa')({
    dest: 'public',
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
                    port: '',
                    pathname: '/v0/**',
                    hostname: 'w0.peakpx.com',
                },
                {
                    protocol: 'https',
                    pathname: '/wallpaper/**',
                    hostname: 'firebasestorage.googleapis.com',
                    port: '',
                },
            ],
        },
    }),
);
