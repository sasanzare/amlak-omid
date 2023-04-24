// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,

//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     // !! WARN !!
//     ignoreBuildErrors: true,
//   },
//   i18n: {
//     locales: ["fa"],
//     defaultLocale: "fa",
//   },
  
//     "headers": [
//       {
//         "source": "/api/(.*)",
//         "headers": [
//           { "key": "Access-Control-Allow-Credentials", "value": "true" },
//           { "key": "Access-Control-Allow-Origin", "value": "*" },
//           { "key": "Access-Control-Allow-Methods", "value": "*" },
//           { "key": "Access-Control-Allow-Headers", "value": "*" }
//         ]
//       }
//     ]
  
// }

// module.exports = nextConfig



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


// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,

//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   i18n: {
//     locales: ["fa"],
//     defaultLocale: "fa",
//   },
//   output: 'standalone',
//   async middleware() {
//     const middleware = await import('./middleware');
//     return middleware.default;
//   },

// };




module.exports = {
  reactStrictMode: true,
  swcMinify: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["fa"],
    defaultLocale: "fa",
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ]
  },
};