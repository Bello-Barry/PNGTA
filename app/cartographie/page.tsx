"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CarteCongo } from "@/components/cartographie/CarteCongo";
import { PanneauDetailDept } from "@/components/cartographie/PanneauDetailDept";
import { PanneauDetailAgriculteur } from "@/components/cartographie/PanneauDetailAgriculteur";
import { LegendeCarte } from "@/components/cartographie/LegendeCarte";
import { useStatsDepartement } from "@/hooks/useCarteStats";
import { CULTURES_PRINCIPALES } from "@/lib/mock-data/geo";
import { ALL_AGRICULTEURS } from "@/lib/mock-data/agriculteurs";
import type { Agriculteur } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Layers, Users, TrendingUp } from "lucide-react";

export default function CartographiePage() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedAg, setSelectedAg] = useState<Agriculteur | null>(null);
  const [filtresCulture, setFiltresCulture] = useState<string[]>([]);
  const [modeAffichage, setModeAffichage] = useState<"heatmap" | "agriculteurs" | "les-deux">("les-deux");
  const [searchTerm, setSearchTerm] = useState("");

  const statsDept = useStatsDepartement(selectedDept);

  const toggleCulture = (culture: string) => {
    setFiltresCulture(prev =>
      prev.includes(culture)
        ? prev.filter(c => c !== culture)
        : [...prev, culture]
    );
  };

  const totalAgriculteurs = ALL_AGRICULTEURS.length;
  const totalProduction = ALL_AGRICULTEURS.reduce((sum, ag) => sum + ag.productionAnnuelleEstimee, 0);

  return (
    <AppShell>
      <div className="page-container max-w-[1600px]">
        <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-12rem)]">

          {/* Colonne 1 : Filtres et Stats Globales */}
          <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-hide">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl font-serif font-bold text-primary mb-2">Cartographie</h1>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">République du Congo</p>
              </div>

              {/* Stats Globales */}
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-white border border-border rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <Users size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Total Agriculteurs</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{totalAgriculteurs.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white border border-border rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-accent-gold/10 rounded-lg text-accent-gold">
                      <TrendingUp size={18} />
                    </div>
                    <span className="text-[10px] font-bold text-text-muted uppercase">Production Nat.</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{(totalProduction/1000).toFixed(0)} <span className="text-sm font-normal">k Tonnes</span></p>
                </div>
              </div>

              {/* Mode d'affichage */}
              <div className="card p-4 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layers size={16} className="text-primary" />
                  <h3 className="text-sm font-bold">Couches de données</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "heatmap", label: "Heatmap Production", icon: "🔥" },
                    { id: "agriculteurs", label: "Marqueurs Agriculteurs", icon: "📍" },
                    { id: "les-deux", label: "Vue Combinée", icon: "🗺️" }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setModeAffichage(mode.id as any)}
                      className={`flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all border ${
                        modeAffichage === mode.id
                          ? "bg-primary text-white border-primary shadow-md"
                          : "bg-surface text-text-muted border-transparent hover:border-primary/30"
                      }`}
                    >
                      <span>{mode.icon}</span>
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtres Cultures */}
              <div className="card p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-primary" />
                    <h3 className="text-sm font-bold">Cultures</h3>
                  </div>
                  {filtresCulture.length > 0 && (
                    <button
                      onClick={() => setFiltresCulture([])}
                      className="text-[10px] font-bold text-accent-gold hover:underline"
                    >
                      Effacer
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                  <input
                    type="text"
                    placeholder="Filtrer..."
                    className="w-full pl-9 pr-3 py-2 bg-surface border-none rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {CULTURES_PRINCIPALES.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase())).map((culture) => (
                    <button
                      key={culture}
                      onClick={() => toggleCulture(culture)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                        filtresCulture.includes(culture)
                          ? "bg-primary text-white border-primary"
                          : "bg-surface text-text-muted border-transparent hover:border-primary/20"
                      }`}
                    >
                      {culture}
                    </button>
                  ))}
                </div>
              </div>

              <LegendeCarte />
            </motion.div>
          </div>

          {/* Colonne 2 : Carte Principale */}
          <div className="flex-1 relative bg-white rounded-[3rem] shadow-2xl shadow-primary/5 border border-border p-4">
            <CarteCongo
              filtresCulture={filtresCulture}
              modeAffichage={modeAffichage}
              onSelectDepartement={(dept) => {
                setSelectedDept(dept);
                setSelectedAg(null);
              }}
              onSelectAgriculteur={(ag) => {
                setSelectedAg(ag);
                setSelectedDept(ag?.departement || null);
              }}
              departementSelectionne={selectedDept}
            />

            {/* Bouton reset selection */}
            {(selectedDept || selectedAg) && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSelectedDept(null);
                  setSelectedAg(null);
                }}
                className="absolute top-8 left-8 px-4 py-2 bg-white/80 backdrop-blur-md border border-border rounded-full text-xs font-bold text-primary shadow-lg hover:bg-white transition-all"
              >
                ✕ Réinitialiser la vue
              </motion.button>
            )}
          </div>

          {/* Colonne 3 : Panneau de Détail */}
          <div className="w-full lg:w-96 bg-surface/50 rounded-[3rem] border border-border p-6 overflow-hidden">
            <AnimatePresence mode="wait">
              {selectedAg ? (
                <motion.div
                  key="ag-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <PanneauDetailAgriculteur
                    agriculteur={selectedAg}
                    onBack={() => setSelectedAg(null)}
                  />
                </motion.div>
              ) : selectedDept && statsDept ? (
                <motion.div
                  key="dept-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <PanneauDetailDept
                    stats={statsDept}
                    onSelectAgriculteur={setSelectedAg}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="no-selection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
                >
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/20">
                    <MapPinIcon size={40} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-primary text-lg">Sélectionnez une zone</h3>
                    <p className="text-sm text-text-muted mt-2">
                      Cliquez sur un département ou un marqueur agriculteur pour voir les données détaillées.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </AppShell>
  );
}

function MapPinIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
