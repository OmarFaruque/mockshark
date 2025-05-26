/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co', 'i.postimg.cc'], // Add all external image domains here
  },
   experimental: {
    turbo: true, // switch back to webpack
  },
};

export default nextConfig;
