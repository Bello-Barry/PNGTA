"use client";

import React, { useState } from "react";
import { Filter, Users, TrendingUp, MapPin } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { CarteCongo } from "@/components/cartographie/CarteCongo";
import { PanneauFiltres } from "@/components/cartographie/PanneauFiltres";
import { PanneauDetailAgriculteur } from "@/components/cartographie/PanneauDetailAgriculteur";
import { PanneauDetailDept } from "@/components/cartographie/PanneauDetailDept";
import { LegendeCarte } from "@/components/cartographie/LegendeCarte";
import { ALL_AGRICULTEURS } from "@/lib/mock-data/agriculteurs";
import { useStatsDepartement } from "@/hooks/useCarteStats";
import { Agriculteur } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function CartographiePage() {
  const [departementSelectionne, setDepartementSelectionne] = useState<string | null>(null);
  const [agriculteurSelectionne, setAgriculteurSelectionne] = useState<Agriculteur | null>(null);
  const [filtresCulture, setFiltresCulture] = useState<string[]>([]);
  const [filtreStatut, setFiltreStatut] = useState<string>("tous");
  const [filtreType, setFiltreType] = useState<"tous" | "individuel" | "cooperative">("tous");
  const [modeAffichage, setModeAffichage] = useState<"heatmap" | "agriculteurs" | "les-deux">("les-deux");
  const [panneauFiltresOuvert, setPanneauFiltresOuvert] = useState(false);

  const statsDept = useStatsDepartement(departementSelectionne);
  const panneauVisible = departementSelectionne !== null || agriculteurSelectionne !== null;

  const totalAgriculteurs = ALL_AGRICULTEURS.length;
  const totalProduction = ALL_AGRICULTEURS.reduce((sum, ag) => sum + ag.productionAnnuelleEstimee, 0);

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-gray-50">

        {/* HEADER PAGE */}
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-border bg-white z-10">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-primary font-serif">
              Cartographie Agricole Nationale
            </h1>
            <p className="text-[10px] lg:text-xs text-muted-foreground font-medium uppercase tracking-wider">
              République du Congo — {totalAgriculteurs} exploitants géolocalisés
            </p>
          </div>
          <button
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white text-xs font-bold"
            onClick={() => setPanneauFiltresOuvert(!panneauFiltresOuvert)}
          >
            <Filter className="w-4 h-4" />
            Filtres
          </button>
        </div>

        {/* LAYOUT PRINCIPAL */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

          {/* ─── COLONNE 1 : FILTRES ─── */}
          <aside className={cn(
            "w-full lg:w-72 xl:w-80 flex-shrink-0 border-r border-border bg-white overflow-y-auto transition-all",
            panneauFiltresOuvert ? "block" : "hidden lg:block"
          )}>
            <div className="p-4 space-y-6">
               <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-gray-50 border border-border rounded-2xl">
                  <div className="flex items-center gap-3 mb-2 text-primary">
                    <Users size={18} />
                    <span className="text-[10px] font-bold uppercase">Total Agriculteurs</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{totalAgriculteurs.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-gray-50 border border-border rounded-2xl">
                  <div className="flex items-center gap-3 mb-2 text-accent-gold">
                    <TrendingUp size={18} />
                    <span className="text-[10px] font-bold uppercase">Production Nat.</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{(totalProduction/1000).toFixed(0)} <span className="text-sm font-normal">k Tonnes</span></p>
                </div>
              </div>

              <PanneauFiltres
                filtresCulture={filtresCulture}
                setFiltresCulture={setFiltresCulture}
                filtreStatut={filtreStatut}
                setFiltreStatut={setFiltreStatut}
                filtreType={filtreType}
                setFiltreType={setFiltreType}
                modeAffichage={modeAffichage}
                setModeAffichage={setModeAffichage}
              />

              <LegendeCarte />
            </div>
          </aside>

          {/* ─── COLONNE 2 : CARTE ─── */}
          <main className="flex-1 relative overflow-hidden bg-[#EEF4EF] flex flex-col">
            <div className="flex-1 relative">
              <CarteCongo
                filtresCulture={filtresCulture}
                filtreStatut={filtreStatut}
                filtreType={filtreType}
                modeAffichage={modeAffichage}
                onSelectDepartement={(dept) => {
                  setDepartementSelectionne(dept);
                  setAgriculteurSelectionne(null);
                }}
                onSelectAgriculteur={(ag) => {
                  setAgriculteurSelectionne(ag);
                  if (ag) setDepartementSelectionne(ag.departement);
                }}
                departementSelectionne={departementSelectionne}
              />

              {/* Bouton reset selection */}
              {(departementSelectionne || agriculteurSelectionne) && (
                <button
                  onClick={() => {
                    setDepartementSelectionne(null);
                    setAgriculteurSelectionne(null);
                  }}
                  className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm border border-border rounded-full text-xs font-bold text-primary shadow-lg hover:bg-white transition-all z-20"
                >
                  ✕ Réinitialiser la vue
                </button>
              )}
            </div>

            {/* Mobile/Tablette Detail Panel (Below map in flux) */}
            {panneauVisible && (
              <div className="lg:hidden w-full border-t-2 border-primary bg-white overflow-y-auto max-h-[50vh] z-30">
                <AnimatePresence mode="wait">
                  {agriculteurSelectionne ? (
                    <motion.div
                      key="ag-detail-mob"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <PanneauDetailAgriculteur
                        agriculteur={agriculteurSelectionne}
                        onBack={() => setAgriculteurSelectionne(null)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="dept-detail-mob"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <PanneauDetailDept
                        stats={statsDept!}
                        onSelectAgriculteur={setAgriculteurSelectionne}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </main>

          {/* ─── COLONNE 3 : PANNEAU DÉTAIL (Desktop) ─── */}
          <aside className={cn(
            "hidden lg:block w-80 xl:w-96 flex-shrink-0 border-l border-border bg-white overflow-y-auto transition-all",
            panneauVisible ? "translate-x-0" : "translate-x-0"
          )}>
            <AnimatePresence mode="wait">
              {agriculteurSelectionne ? (
                <motion.div
                  key="ag-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full"
                >
                  <PanneauDetailAgriculteur
                    agriculteur={agriculteurSelectionne}
                    onBack={() => setAgriculteurSelectionne(null)}
                  />
                </motion.div>
              ) : departementSelectionne && statsDept ? (
                <motion.div
                  key="dept-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full"
                >
                  <PanneauDetailDept
                    stats={statsDept}
                    onSelectAgriculteur={setAgriculteurSelectionne}
                  />
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/20">
                    <MapPin size={40} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-primary text-lg">Sélectionnez une zone</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Cliquez sur un département ou un marqueur agriculteur pour voir les données détaillées.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </aside>

        </div>
      </div>
    </AppShell>
  );
}
