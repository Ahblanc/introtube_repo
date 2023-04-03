/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;
const BASEPATH = process.env.BASEPATH;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "yt3.ggpht.com",
      "yt3.googleusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
  async redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: "/api/category",
        destination: `${BASEPATH}/api/category`,
      },
      {
        source: "/api/channel/:category",
        destination: `${BASEPATH}/api/channel?category=:category`,
      },
      {
        source: "/api/video/:id",
        destination: `https://www.googleapis.com/youtube/v3/videos?id=:id&part=snippet&key=${API_KEY}`,
      },
      {
        source: "/api/comment/:yId",
        destination: `${BASEPATH}/api/comment?yId=:yId`,
      },
      {
        source: "/api/hashtag/:yId",
        destination: `${BASEPATH}/api/hashtag?yId=:yId`,
      },
      {
        source: "/api/hashtag/:yId",
        destination: `${BASEPATH}/api/hashtag?yId=:yId`,
      },
      {
        source: "/api/search/:search",
        destination: `${BASEPATH}/api/search?search=:search`,
      },
      {
        source: "/api/detail/:yId",
        destination: `https://www.googleapis.com/youtube/v3/channels?id=:yId&part=snippet,brandingSettings,statistics&key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
