export default {
  reactStrictMode: false,
  pageExtensions: ['page.jsx', 'page.js'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}
