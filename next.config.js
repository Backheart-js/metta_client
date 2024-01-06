/** @type {import('next').NextConfig} */
const withVideos = require('next-videos');
const withPWA = require('next-pwa')({
    dest: 'public',
});

module.exports = withPWA(withVideos({
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'w0.peakpx.com',
            port: '',
            pathname: '/wallpaper/**',
          },
        ],
      },
}));
