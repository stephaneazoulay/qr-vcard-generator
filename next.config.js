module.exports = {
    output: 'standalone',
    experimental: {
      optimizeCss: false, // Désactive l'optimisation CSS, ce qui peut résoudre le problème avec LightningCSS
    },
  };
  
  /** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    css: {
      lightningcss: false
    }
  }
}

module.exports = nextConfig