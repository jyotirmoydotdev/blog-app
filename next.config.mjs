/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'xwb4brge0msdxh2x.public.blob.vercel-storage.com',
              port: '',
              pathname: '/blog-app/**',
            },
        ],
    },
};

export default nextConfig;