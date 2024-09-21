/** @type {import('next').NextConfig} */
const nextConfig = {
  //...
  css: {
    loader: "postcss-loader",
    modules: {
      localsConvention: "camelCase",
    },
  },
  //...
};

export default nextConfig;
