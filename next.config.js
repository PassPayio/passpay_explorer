/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate-plugin');

module.exports = nextTranslate({
    webpack: (config, { isServer, webpack }) => {
      return config;
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: false,
    compiler: {
        styledComponents: true,
    },
})

// const nextConfig = {}

// module.exports = nextConfig
