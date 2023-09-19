/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextquestion.g-team.org",
      },
    ],
  },
};

module.exports = nextConfig;
