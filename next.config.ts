import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'es', 'pt-PT'],
  },
};

export default nextConfig;
