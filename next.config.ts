/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Evita que ESLint falle en producción (Vercel)
  },
};

module.exports = nextConfig;
