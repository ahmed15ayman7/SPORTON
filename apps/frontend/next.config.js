/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'localhost',
            'sporton.com',
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.sporton.com',
            },
        ],
    },
    i18n: {
        locales: ['ar', 'en'],
        defaultLocale: 'ar',
    },
    experimental: {
        serverActions: true,
        optimizeCss: true,
        optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    },
    webpack: (config, { dev, isServer }) => {
        // إضافة Terser للضغط
        if (!dev && !isServer) {
            config.optimization.minimize = true;
            config.optimization.minimizer.push(
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true,
                        },
                    },
                })
            );
        }

        // إضافة JavaScript Obfuscator
        if (!dev && !isServer) {
            config.plugins.push(
                new JavaScriptObfuscator({
                    compact: true,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 0.75,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0.4,
                    debugProtection: true,
                    debugProtectionInterval: true,
                    disableConsoleOutput: true,
                    identifierNamesGenerator: 'hexadecimal',
                    log: false,
                    numbersToExpressions: true,
                    renameGlobals: false,
                    rotateStringArray: true,
                    selfDefending: true,
                    shuffleStringArray: true,
                    splitStrings: true,
                    splitStringsChunkLength: 10,
                    stringArray: true,
                    stringArrayEncoding: ['base64'],
                    stringArrayThreshold: 0.75,
                    transformObjectKeys: true,
                    unicodeEscapeSequence: false,
                })
            );
        }

        // تحسين الأداء في الإنتاج
        if (!dev && !isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    minSize: 20000,
                    maxSize: 244000,
                    minChunks: 1,
                    maxAsyncRequests: 30,
                    maxInitialRequests: 30,
                    cacheGroups: {
                        defaultVendors: {
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            reuseExistingChunk: true,
                        },
                        default: {
                            minChunks: 2,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                    },
                },
            }
        }

        return config;
    },
}

module.exports = nextConfig 