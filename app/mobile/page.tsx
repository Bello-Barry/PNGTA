"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, QrCode, BarChart3, ArrowLeft } from "lucide-react";

type Screen = "menu" | "declare" | "scan" | "stats";

export default function Mobile() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [selectedCulture, setSelectedCulture] = useState("");
  const [quantite, setQuantite] = useState("");
  const [district, setDistrict] = useState("Kinkala");
  const [isSyncing, setIsSyncing] = useState(false);

  // Simulation de synchronisation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2500);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const cultures = [
    "Manioc",
    "Maïs",
    "Arachide",
    "Banane plantain",
    "Cacao",
    "Café",
    "Palmier à huile",
    "Tomate",
  ];

  const declarations = [
    {
      id: 1,
      culture: "Manioc",
      quantite: 500,
      date: "2024-05-06",
      statut: "Validée",
    },
    {
      id: 2,
      culture: "Maïs",
      quantite: 250,
      date: "2024-05-04",
      statut: "En attente",
    },
    {
      id: 3,
      culture: "Arachide",
      quantite: 150,
      date: "2024-05-01",
      statut: "Validée",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Status bar */}
      <div className="bg-sidebar text-white px-4 py-2 flex justify-between items-center text-xs font-mono">
        <span>🇨🇬 Congo</span>
        <span>09:45</span>
        <span>📶 5G</span>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {screen === "menu" && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-bold mb-4">
                PNGTA TERRAIN
              </div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                Application Mobile
              </h1>
              <p className="text-sm text-gray-600">
                Gestion agricole hors-ligne
              </p>
            </div>

            {/* Main buttons */}
            <motion.button
              onClick={() => setScreen("declare")}
              className="w-full py-8 bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl font-bold text-2xl shadow-lg flex flex-col items-center justify-center gap-3"
              whileTap={{ scale: 0.95 }}
            >
              <Package size={48} />
              Déclarer une récolte
            </motion.button>

            <motion.button
              onClick={() => setScreen("scan")}
              className="w-full py-8 bg-gradient-to-br from-accent-gold to-accent-amber text-white rounded-2xl font-bold text-2xl shadow-lg flex flex-col items-center justify-center gap-3"
              whileTap={{ scale: 0.95 }}
            >
              <QrCode size={48} />
              Scanner un QR Code
            </motion.button>

            <motion.button
              onClick={() => setScreen("stats")}
              className="w-full py-8 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl font-bold text-2xl shadow-lg flex flex-col items-center justify-center gap-3"
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 size={48} />
              Mes statistiques
            </motion.button>

            {/* Offline badge */}
            <div className="text-center pt-4 border-t border-gray-300">
              <p className="text-sm text-gray-600">
                ✓ Mode hors-ligne disponible
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Vos données se synchroniseront lors de la connexion
              </p>
            </div>
          </motion.div>
        )}

        {screen === "declare" && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setScreen("menu")}
              className="text-primary font-bold flex items-center gap-2 mb-4"
            >
              <ArrowLeft size={24} />
              Retour
            </button>

            <h2 className="text-2xl font-serif font-bold text-primary">
              Déclarer une récolte
            </h2>

            {/* Culture selection */}
            <div>
              <label className="block font-bold text-primary mb-3">
                Quelle culture déclarez-vous?
              </label>
              <select
                value={selectedCulture}
                onChange={(e) => setSelectedCulture(e.target.value)}
                className="w-full px-4 py-4 border-2 border-primary rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Choisir une culture</option>
                {cultures.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantité */}
            <div>
              <label className="block font-bold text-primary mb-3">
                Quantité (kg ou sacs)
              </label>
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                placeholder="Ex: 500"
                className="w-full px-4 py-4 border-2 border-primary rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* District */}
            <div>
              <label className="block font-bold text-primary mb-3">
                District (pré-rempli)
              </label>
              <input
                type="text"
                value={district}
                disabled
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-lg font-bold bg-gray-100 text-gray-600"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block font-bold text-primary mb-3">
                Date de déclaration
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-4 border-2 border-primary rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Submit button */}
            <motion.button
              onClick={() => setScreen("menu")}
              className="w-full py-6 bg-primary text-white rounded-2xl font-bold text-xl shadow-lg"
              whileTap={{ scale: 0.95 }}
            >
              ✓ SOUMETTRE LA DÉCLARATION
            </motion.button>
          </motion.div>
        )}

        {screen === "scan" && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setScreen("menu")}
              className="text-primary font-bold flex items-center gap-2 mb-4"
            >
              <ArrowLeft size={24} />
              Retour
            </button>

            <h2 className="text-2xl font-serif font-bold text-primary text-center">
              Scanner un QR Code
            </h2>

            {/* Camera preview mockup */}
            <div className="aspect-square bg-black rounded-2xl flex items-center justify-center border-4 border-accent-gold">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📷</div>
                <p className="font-bold">Camér activée</p>
                <p className="text-xs text-gray-400 mt-2">
                  Positionner le QR code dans le cadre
                </p>
              </div>
            </div>

            {/* Focus points */}
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-accent-gold rounded-xl" />
              <div className="h-20 border-4 border-accent-gold rounded-xl" />
              <div className="h-20 bg-accent-gold rounded-xl" />
            </div>

            {/* Result mockup */}
            <div className="p-4 bg-green-50 rounded-2xl border-2 border-green-500">
              <p className="text-green-800 font-bold text-center">
                ✓ QR Code lu avec succès!
              </p>
              <p className="text-green-700 text-center text-sm mt-2">
                NGA-2024-000001 • Jean-Baptiste Moukengué
              </p>
            </div>

            <button className="w-full py-4 bg-green-600 text-white rounded-xl font-bold">
              Valider cette déclaration
            </button>
          </motion.div>
        )}

        {screen === "stats" && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setScreen("menu")}
              className="text-primary font-bold flex items-center gap-2 mb-4"
            >
              <ArrowLeft size={24} />
              Retour
            </button>

            <h2 className="text-2xl font-serif font-bold text-primary">
              Mes statistiques
            </h2>

            {/* Stats cards */}
            <div className="space-y-3">
              <div className="p-4 bg-primary text-white rounded-2xl">
                <p className="text-sm opacity-90">Déclarations validées</p>
                <p className="text-4xl font-bold">12</p>
              </div>

              <div className="p-4 bg-accent-gold text-white rounded-2xl">
                <p className="text-sm opacity-90">Production totale</p>
                <p className="text-4xl font-bold">2.5T</p>
              </div>

              <div className="p-4 bg-green-600 text-white rounded-2xl">
                <p className="text-sm opacity-90">Valeur estimée</p>
                <p className="text-4xl font-bold">1.2M FCFA</p>
              </div>
            </div>

            {/* Dernières déclarations */}
            <div>
              <h3 className="font-bold text-primary mb-3">
                3 dernières déclarations
              </h3>
              <div className="space-y-2">
                {declarations.map((decl) => (
                  <div
                    key={decl.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-300"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-primary">{decl.culture}</p>
                        <p className="text-xs text-gray-600">{decl.quantite} kg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">{decl.date}</p>
                        <p
                          className={`text-xs font-bold ${
                            decl.statut === "Validée"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {decl.statut}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-sidebar text-white text-center py-3 text-xs border-t border-gray-300">
        PNGTA © 2024 | Ministère de l&apos;Agriculture — République du Congo
      </div>
    </div>
  );
}
