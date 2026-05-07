"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { DEPARTEMENTS_SVG, CARTE_VIEWBOX } from "@/lib/mock-data/carte-congo";
import { ALL_AGRICULTEURS } from "@/lib/mock-data/agriculteurs";
import { TOP_DEPARTEMENTS_PRODUCTEURS } from "@/lib/mock-data/statistiques";
import type { Agriculteur } from "@/types";

interface CarteCongoProps {
  filtresCulture: string[];
  filtreStatut: string;
  filtreType: "tous" | "individuel" | "cooperative";
  modeAffichage: "heatmap" | "agriculteurs" | "les-deux";
  onSelectDepartement: (dept: string | null) => void;
  onSelectAgriculteur: (agriculteur: Agriculteur | null) => void;
  departementSelectionne: string | null;
}

export function CarteCongo({
  filtresCulture,
  filtreStatut,
  filtreType,
  modeAffichage,
  onSelectDepartement,
  onSelectAgriculteur,
  departementSelectionne,
}: CarteCongoProps) {
  const maxProduction = Math.max(...TOP_DEPARTEMENTS_PRODUCTEURS.map((d) => d.production));

  const getHeatmapColor = (deptName: string) => {
    if (modeAffichage === "agriculteurs") return "#F4F7F4";

    const deptData = TOP_DEPARTEMENTS_PRODUCTEURS.find((d) => d.dept === deptName);
    if (!deptData) return "#E5EBE6";

    const ratio = Math.min(Math.max(deptData.production / maxProduction, 0), 1);
    // Interpolation entre #E5EBE6 (229, 235, 230) et #1B4D2E (27, 77, 46)
    const r = Math.round(229 + (27 - 229) * ratio);
    const g = Math.round(235 + (77 - 235) * ratio);
    const b = Math.round(230 + (46 - 230) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const marqueursAgriculteurs = useMemo(() => {
    if (modeAffichage === "heatmap") return [];

    return ALL_AGRICULTEURS
      .filter((ag) => {
        const matchCulture = filtresCulture.length === 0 || ag.cultures.some((c) => filtresCulture.includes(c));
        const matchStatut = filtreStatut === "tous" || ag.statut === filtreStatut;
        const matchType = filtreType === "tous" || ag.typeExploitant === filtreType;
        return matchCulture && matchStatut && matchType;
      })
      .map((ag, index) => {
        const dept = DEPARTEMENTS_SVG.find((d) => d.nom === ag.departement);
        if (!dept) return null;

        // Offset déterministe pour ne pas superposer les marqueurs
        const angle = (index * 137.5) % 360;
        const radius = (index % 5) * 8 + 10;
        const offsetX = Math.cos((angle * Math.PI) / 180) * radius;
        const offsetY = Math.sin((angle * Math.PI) / 180) * radius;

        return {
          ...ag,
          x: dept.centroid.x + offsetX,
          y: dept.centroid.y + offsetY,
        };
      })
      .filter((ag): ag is Agriculteur & { x: number; y: number } => ag !== null);
  }, [filtresCulture, filtreStatut, filtreType, modeAffichage]);

  const COULEUR_STATUT = {
    actif: "#16A34A",
    inactif: "#D97706",
    suspendu: "#DC2626",
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#EEF4EF] p-4 lg:p-8">
      <svg
        viewBox={CARTE_VIEWBOX}
        className="max-w-full max-h-full drop-shadow-xl"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Départements */}
        {DEPARTEMENTS_SVG.map((dept) => {
          const isSelected = departementSelectionne === dept.nom;
          return (
            <motion.path
              key={dept.id}
              d={dept.path}
              fill={getHeatmapColor(dept.nom)}
              stroke={isSelected ? "#C9922A" : "#FFFFFF"}
              strokeWidth={isSelected ? 3 : 1}
              onClick={(e) => {
                e.stopPropagation();
                onSelectDepartement(dept.nom === departementSelectionne ? null : dept.nom);
              }}
              whileHover={{
                fillOpacity: 0.9,
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              className="cursor-pointer transition-all"
            />
          );
        })}

        {/* Marqueurs agriculteurs */}
        {(modeAffichage === "agriculteurs" || modeAffichage === "les-deux") &&
          marqueursAgriculteurs.map((ag) => (
            <motion.g
              key={ag.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.5, cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectAgriculteur(ag);
              }}
            >
              {ag.typeExploitant === "individuel" ? (
                <circle
                  cx={ag.x} cy={ag.y} r={4.5}
                  fill={COULEUR_STATUT[ag.statut]}
                  stroke="#FFFFFF" strokeWidth={1}
                />
              ) : (
                <path
                  d={`M ${ag.x} ${ag.y - 7} L ${ag.x + 7} ${ag.y} L ${ag.x} ${ag.y + 7} L ${ag.x - 7} ${ag.y} Z`}
                  fill={COULEUR_STATUT[ag.statut]}
                  stroke="#C9922A" strokeWidth={1.5}
                />
              )}
            </motion.g>
          ))
        }
      </svg>

      {/* Overlay info */}
      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 text-right pointer-events-none">
        <p className="text-[8px] lg:text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">Projection Nationale</p>
        <p className="text-xs lg:text-sm font-serif font-bold text-primary">République du Congo</p>
      </div>
    </div>
  );
}
