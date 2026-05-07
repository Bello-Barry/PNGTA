"use client";

import React from "react";
import { Search, Filter, Layers, Users as UsersIcon, TrendingUp } from "lucide-react";
import { CULTURES_PRINCIPALES } from "@/lib/mock-data/geo";
import { cn } from "@/lib/utils";

interface PanneauFiltresProps {
  filtresCulture: string[];
  setFiltresCulture: (cultures: string[]) => void;
  filtreStatut: string;
  setFiltreStatut: (statut: string) => void;
  filtreType: "tous" | "individuel" | "cooperative";
  setFiltreType: (type: "tous" | "individuel" | "cooperative") => void;
  modeAffichage: "heatmap" | "agriculteurs" | "les-deux";
  setModeAffichage: (mode: "heatmap" | "agriculteurs" | "les-deux") => void;
}

export function PanneauFiltres({
  filtresCulture,
  setFiltresCulture,
  filtreStatut,
  setFiltreStatut,
  filtreType,
  setFiltreType,
  modeAffichage,
  setModeAffichage,
}: PanneauFiltresProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const toggleCulture = (culture: string) => {
    setFiltresCulture(
      filtresCulture.includes(culture)
        ? filtresCulture.filter((c) => c !== culture)
        : [...filtresCulture, culture]
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 bg-white h-full overflow-y-auto">
      {/* Mode d'affichage */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={16} className="text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wide">Couches de données</h3>
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
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all border",
                modeAffichage === mode.id
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-gray-50 text-muted-foreground border-transparent hover:border-primary/30"
              )}
            >
              <span>{mode.icon}</span>
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre type exploitant */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-2">
          <UsersIcon size={16} />
          Type d'Exploitant
        </label>
        <div className="grid grid-cols-3 gap-1">
          {[
            { val: "tous", label: "Tous" },
            { val: "individuel", label: "Individuel", icon: "👤" },
            { val: "cooperative", label: "Coopérative", icon: "🤝" },
          ].map(opt => (
            <button
              key={opt.val}
              onClick={() => setFiltreType(opt.val as typeof filtreType)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] border transition-all font-bold",
                filtreType === opt.val
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-muted-foreground border-border hover:border-primary"
              )}
            >
              {opt.icon && <span>{opt.icon}</span>}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre Statut */}
      <div className="space-y-4">
        <label className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-2">
          <TrendingUp size={16} />
          Statut Exploitant
        </label>
        <select
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value)}
          className="w-full p-2 bg-gray-50 border border-border rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="tous">Tous les statuts</option>
          <option value="actif">Actifs uniquement</option>
          <option value="inactif">Inactifs</option>
          <option value="suspendu">Suspendus</option>
        </select>
      </div>

      {/* Filtres Cultures */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wide">Cultures</h3>
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
          <input
            type="text"
            placeholder="Filtrer les cultures..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-border rounded-lg text-xs outline-none focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {CULTURES_PRINCIPALES.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase())).map((culture) => (
            <button
              key={culture}
              onClick={() => toggleCulture(culture)}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border",
                filtresCulture.includes(culture)
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 text-muted-foreground border-transparent hover:border-primary/20"
              )}
            >
              {culture}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
