import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/router";

export default function Generate() {
  const router = useRouter();
  const { session_id } = router.query;

  const [formData, setFormData] = useState(null);
  const [vCardData, setVCardData] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupère les données de l'utilisateur depuis le localStorage
    const userData = localStorage.getItem("userData");

    if (userData) {
      setFormData(JSON.parse(userData));
    } else {
      setError("Aucune donnée utilisateur trouvée");
    }
  }, []);

  useEffect(() => {
    if (formData) {
      generateVCard(formData.firstName, formData.lastName, formData.email, formData.phone, formData.website);
    }
  }, [formData]);

  const generateVCard = (firstName, lastName, email, phone, website) => {
    const vCard = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};;;\nFN:${firstName} ${lastName}\nEMAIL:${email}\nTEL:${phone}\nURL:${website}\nEND:VCARD`;
    setVCardData(vCard);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas"); // Récupère directement le premier canvas de la page
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png"); // Convertit le canvas en image PNG
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${formData.firstName}_${formData.lastName}_QR_Code.png`; // Nom du fichier de téléchargement
      link.click();
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!formData) return <p className="text-center">Chargement...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-600">QR Code de votre carte de visite</h1>
      <div className="text-center">
        {vCardData && <QRCodeCanvas value={vCardData} size={200} includeMargin={true} />}
        <p className="mt-4 text-sm text-gray-500">Scannez ce code pour ajouter le contact</p>
        <button
          onClick={handleDownload}
          className="mt-6 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Télécharger le QR Code
        </button>
      </div>
    </div>
  );
}
