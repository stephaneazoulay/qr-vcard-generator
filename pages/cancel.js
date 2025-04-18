export default function Cancel() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Paiement annulé</h1>
          <p className="text-lg mb-4">Le paiement n’a pas été effectué.</p>
          <p className="text-md text-gray-600">Essayez à nouveau ou contactez le support.</p>
        </div>
      </div>
    );
  }
  