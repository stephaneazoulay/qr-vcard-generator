import React, { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: ""
  });

  const handlePayment = async () => {
    // Sauvegarde les données de l'utilisateur dans le localStorage
    localStorage.setItem("userData", JSON.stringify(formData));

    console.log("Données sauvegardées dans localStorage :", formData); // Ajout du log pour vérifier les données

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erreur lors de la création de la session de paiement");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Carte de visite QR</h1>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          className="w-full mb-2 p-2 border rounded placeholder-gray-700"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          className="w-full mb-2 p-2 border rounded placeholder-gray-700"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded placeholder-gray-700"
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          className="w-full mb-2 p-2 border rounded placeholder-gray-700"
          onChange={handleChange}
        />
        <input
          type="url"
          name="website"
          placeholder="Site web"
          className="w-full mb-4 p-2 border rounded placeholder-gray-700"
          onChange={handleChange}
        />
        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Payer 1€ pour générer le QR Code
        </button>
      </div>
    </main>
  );
}
