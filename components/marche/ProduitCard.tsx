"use client";

import { ProduitMarche } from "@/types";
import { motion } from "framer-motion";
import { ShoppingCart, MapPin, User, TrendingUp, TrendingDown } from "lucide-react";

interface ProduitCardProps {
  produit: ProduitMarche;
}

const EMOJI_MAP: Record<string, string> = {
  "Manioc (Racine)": "🥔",
  "Maïs (Grains)": "🌽",
  "Arachide (Grains)": "🥜",
  "Banane plantain": "🍌",
  "Cacao (Fèves)": "🍫",
  "Café Robusta": "☕",
  "Palmier à huile": "🌴",
  "Tomate (Caisse)": "🍅",
};

export function ProduitCard({ produit }: ProduitCardProps) {
  const emoji = EMOJI_MAP[produit.nom] || "🌾";

  return (
    <motion.div
      className="card hover:shadow-xl transition-all border border-border group overflow-hidden"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-40 bg-gradient-to-br from-surface to-border flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
        {emoji}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-border shadow-sm flex items-center gap-1">
          <MapPin size={10} className="text-primary" />
          <span className="text-[10px] font-bold text-primary uppercase">{produit.departementOrigine}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-text-primary text-lg">{produit.nom}</h3>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            produit.variation >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          }`}>
            {produit.variation >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {produit.variation >= 0 ? "+" : ""}{produit.variation}%
          </div>
        </div>

        <div className="flex items-end gap-1 mb-4">
          <span className="text-2xl font-mono font-bold text-primary">
            {produit.prixActuel.toLocaleString()}
          </span>
          <span className="text-sm text-text-muted mb-1 font-medium">FCFA/kg</span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted flex items-center gap-1">
              <User size={12} /> Vendeur:
            </span>
            <span className="font-medium text-text-primary">{produit.vendeurNom}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Stock disponible:</span>
            <span className="font-bold text-primary">{produit.stockDisponible.toLocaleString()} kg</span>
          </div>
          <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full" 
              style={{ width: `${Math.min((produit.stockDisponible / 20000) * 100, 100)}%` }} 
            />
          </div>
        </div>

        <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-light transition-colors shadow-lg shadow-primary/20">
          <ShoppingCart size={16} />
          Commander maintenant
        </button>
      </div>
    </motion.div>
  );
}
