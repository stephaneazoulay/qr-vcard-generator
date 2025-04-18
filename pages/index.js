import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: ""
  });
  const [vCardData, setVCardData] = useState("");
  const [vCardUrl, setVCardUrl] = useState("");

  const generateVCard = () => {
    const { firstName, lastName, email, phone, website } = formData;
    const vCard = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName};;;\nFN:${firstName} ${lastName}\nEMAIL:${email}\nTEL:${phone}\nURL:${website}\nEND:VCARD`;
    setVCardData(vCard);

    // Crée un fichier Blob pour le lien de téléchargement
    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    setVCardUrl(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Carte de visite QR</h1>
        <input type="text" name="firstName" placeholder="Prénom" className="w-full mb-2 p-2 border rounded placeholder-gray-700" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Nom" className="w-full mb-2 p-2 border rounded placeholder-gray-700" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full mb-2 p-2 border rounded placeholder-gray-700" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Téléphone" className="w-full mb-2 p-2 border rounded placeholder-gray-700" onChange={handleChange} />
        <input type="url" name="website" placeholder="Site web" className="w-full mb-4 p-2 border rounded placeholder-gray-700" onChange={handleChange} />
        <button onClick={generateVCard} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Générer QR Code</button>
        {vCardData && (
          <div className="mt-6 text-center">
            <QRCodeCanvas value={vCardData} size={200} includeMargin={true} />
            <p className="mt-2 text-sm text-gray-500">Scannez ce code pour ajouter le contact</p>
            <a
              href={vCardUrl}
              download={`${formData.firstName}_${formData.lastName}.vcf`}
              className="block mt-4 text-blue-600 underline"
            >
              📥 Télécharger la fiche contact (.vcf)
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
