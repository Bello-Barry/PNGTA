"use client";

import { motion } from "framer-motion";
import { PRODUITS_MARCHE_MOCK } from "@/lib/mock-data/produits";

export function PrixTicker() {
  // On double la liste pour un défilement infini fluide
  const items = [...PRODUITS_MARCHE_MOCK, ...PRODUITS_MARCHE_MOCK];

  return (
    <div className="w-full bg-sidebar py-3 overflow-hidden whitespace-nowrap border-y border-primary-light/20">
      <motion.div
        className="flex gap-8 items-center"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((produit, idx) => (
          <div key={`${produit.id}-${idx}`} className="flex items-center gap-4 px-4 border-r border-primary-light/30 last:border-r-0">
            <span className="text-[10px] font-bold text-accent-amber uppercase tracking-widest">
              {produit.nom}
            </span>
            <span className="text-sm font-mono font-bold text-white">
              {produit.prixActuel.toLocaleString()} <span className="text-[10px] text-primary-light">FCFA/kg</span>
            </span>
            <span className={`text-[10px] font-bold ${produit.variation >= 0 ? "text-success" : "text-danger"}`}>
              {produit.variation >= 0 ? "▲" : "▼"} {Math.abs(produit.variation)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
