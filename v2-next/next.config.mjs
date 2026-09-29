/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // On ne veut pas qu'un simple avertissement de lint fasse échouer le build Vercel.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // images servies depuis Supabase Storage (galerie / album)
    remotePatterns: [
      { protocol: "https", hostname: "jnqyjpgbmjclxbjxbnft.supabase.co" }
    ]
  },
  // Pages héritées servies telles quelles depuis public/ (routes propres → .html)
  async rewrites() {
    const legacy = ["admin", "portrait", "univers", "demande", "recu", "moi", "fil", "bonne-nuit", "coffret", "anniversaire", "avent"];
    return legacy.map((p) => ({ source: "/" + p, destination: "/" + p + ".html" }));
  }
};
export default nextConfig;
