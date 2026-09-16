/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // On ne veut pas qu'un simple avertissement de lint fasse échouer le build Vercel.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // images servies depuis Supabase Storage (galerie / album)
    remotePatterns: [
      { protocol: "https", hostname: "jnqyjpgbmjclxbjxbnft.supabase.co" }
    ]
  }
};
export default nextConfig;
