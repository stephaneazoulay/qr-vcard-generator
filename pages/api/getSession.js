import Stripe from "stripe";

// Initialise Stripe avec ta clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id } = req.query;

  console.log("Session ID reçu :", session_id); // Vérifie que l'ID de session est bien reçu

  if (!session_id) {
    return res.status(400).json({ error: "Session ID manquant" });
  }

  try {
    // Récupère la session Stripe avec l'ID de la session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    console.log("Session récupérée :", session); // Vérifie si la session est bien récupérée

    // Si la session est correctement récupérée, renvoie-la
    return res.status(200).json({ session });
  } catch (error) {
    console.error("Erreur lors de la récupération de la session Stripe:", error);
    return res.status(500).json({ error: "Erreur lors de la récupération de la session" });
  }
}
