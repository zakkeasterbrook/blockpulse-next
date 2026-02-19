const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/blockpulse-next" : "",
  assetPrefix: isProd ? "/blockpulse-next" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
