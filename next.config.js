/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["fa"],
    defaultLocale: "fa",
  },
  api: {
    bodyParser: {
        sizeLimit: '15mb' // Set desired value here
    }
}

}

module.exports = nextConfig
