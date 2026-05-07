"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PRODUITS_MARCHE_MOCK, getTopVendeurs } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, TrendingUp, TrendingDown, Search, Filter } from "lucide-react";
import { PrixTicker } from "@/components/marche/PrixTicker";
import { ProduitCard } from "@/components/marche/ProduitCard";

const categories = [
  { id: "vivrier", label: "Vivriers", icon: "🌾" },
  { id: "cultures_rente", label: "Cultures de rente", icon: "🌳" },
  { id: "maraichage", label: "Maraîchage", icon: "🥕" },
  { id: "elevage", label: "Élevage", icon: "🐄" },
];

export default function Marche() {
  const [selectedCategory, setSelectedCategory] = useState("vivrier");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProduits = useMemo(() => {
    return PRODUITS_MARCHE_MOCK.filter(
      (p) => p.categorie === selectedCategory && 
            (p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
             p.departementOrigine.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [selectedCategory, searchTerm]);

  const topVendeurs = getTopVendeurs(3);

  return (
    <AppShell>
      {/* Prix Ticker en haut */}
      <PrixTicker />

      <div className="page-container mt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">
                Marché Agricole Numérique
              </h1>
              <p className="text-gray-600">
                Plateforme nationale de commercialisation et de suivi des cours
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher un produit..." 
                  className="pl-10 pr-4 py-2 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2 border border-border rounded-xl hover:bg-surface transition-colors">
                <Filter size={20} className="text-primary" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filtres de catégories */}
        <motion.div
          className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all shadow-sm ${
                selectedCategory === cat.id
                  ? "bg-primary text-white shadow-primary/20 scale-105"
                  : "bg-white text-primary border border-border hover:border-primary/50"
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Grille de produits */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredProduits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProduits.map((produit) => (
                  <ProduitCard key={produit.id} produit={produit} />
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center bg-surface rounded-3xl border border-dashed border-border">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-text-muted font-medium">Aucun produit trouvé pour cette catégorie ou recherche.</p>
              </div>
            )}
          </motion.div>

          {/* Panneau latéral */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Top vendeurs */}
            <div className="card border border-border">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-primary">
                👑 Meilleurs Vendeurs
              </h3>
              <div className="space-y-4">
                {topVendeurs.map((vendeur, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-surface rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {vendeur.nom[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-text-primary group-hover:text-primary transition-colors">{vendeur.nom}</p>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">{vendeur.count} produits actifs</p>
                      </div>
                    </div>
                    <span className="text-xl">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="card bg-sidebar text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="font-bold mb-6 text-accent-gold uppercase text-xs tracking-widest">
                  Aperçu du Marché
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-primary-light uppercase font-bold mb-1">Prix Moyen National</p>
                    <p className="text-2xl font-mono font-bold">
                      {Math.round(
                        PRODUITS_MARCHE_MOCK.reduce((a, b) => a + b.prixActuel, 0) /
                          PRODUITS_MARCHE_MOCK.length
                      ).toLocaleString()}{" "}
                      <span className="text-sm font-sans text-primary-light">FCFA/kg</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-primary-light uppercase font-bold mb-1">Variation 24h</p>
                    <p className="text-2xl font-mono font-bold text-success">
                      +4.2% <TrendingUp className="inline ml-1" size={20} />
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Cercle décoratif */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-light/10 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
