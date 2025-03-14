/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'images.unsplash.com',
    //         port: '',
  
    //       },
    //     ],
    //   },
  
    reactStrictMode: true,
    images: {
      domains: ['res.cloudinary.com'],
    },
  };
  
  export default nextConfig;
  
  
  