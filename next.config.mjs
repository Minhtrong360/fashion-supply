/** @type {import('next').NextConfig} */
const nextConfig = {
  css: {
    loader: "postcss-loader",
    modules: {
      localsConvention: "camelCase",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Cho phép xử lý ảnh từ thư mục public
    domains: [],
  },
};

export default nextConfig;
