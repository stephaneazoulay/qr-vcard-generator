module.exports = {
    output: 'export',  // Cette ligne est indispensable pour un export statique
    reactStrictMode: true,  // Pour activer les vérifications strictes dans le code React
    experimental: {
      outputStandalone: true,  // Nécessaire pour garantir que l'export fonctionne bien
    },
  };
  