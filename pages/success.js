import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session_id) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/session?session_id=${session_id}`);
        const data = await res.json();

        if (res.ok) {
          setSession(data.session);
        } else {
          setError(data.error || 'Erreur inconnue');
        }
      } catch (err) {
        setError('Erreur lors de la récupération des données de la session.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [session_id]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-600">✅ Paiement réussi !</h1>
      <p className="text-center mb-4">Merci pour votre achat.</p>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p><strong>ID de la session :</strong> {session.id}</p>
        <p><strong>Email :</strong> {session.customer_details?.email}</p>
        <p><strong>Montant payé :</strong> {session.amount_total / 100} €</p>
      </div>

      <p className="text-center mt-4 text-sm text-gray-600">
        Vous pouvez maintenant générer votre QR code.
      </p>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push('/generate')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Générer mon QR Code
        </button>
      </div>
    </div>
  );
}
