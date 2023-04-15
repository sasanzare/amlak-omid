/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  
    "headers": [
      {
        "source": "/api/(.*)",
        "headers": [
          { "key": "Access-Control-Allow-Credentials", "value": "true" },
          { "key": "Access-Control-Allow-Origin", "value": "*" },
          { "key": "Access-Control-Allow-Methods", "value": "*" },
          { "key": "Access-Control-Allow-Headers", "value": "*" }
        ]
      }
    ]
  
}

module.exports = nextConfig



// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/api/:path*',
//         headers: [
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: '*',
//           },
//           {
//             key: 'Access-Control-Allow-Headers',
//             value: 'X-Requested-With, Content-Type, Authorization',
//           },
//         ],
//       },
//     ];
//   },
// };


// module.exports = {
//     reactStrictMode: true,
//   swcMinify: true,

//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   i18n: {
//     locales: ["fa"],
//     defaultLocale: "fa",
//   },
//   output: 'standalone',
// }