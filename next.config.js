module.exports = {
    output: 'export', // Indique à Next.js de produire un export statique
    reactStrictMode: true, // Mode strict activé pour plus de sécurité
    experimental: {
      outputStandalone: true, // Pour assurer que l'export est autonome
    },
  };
  