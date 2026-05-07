"use client";

import { TOP_DEPARTEMENTS_PRODUCTEURS } from "@/lib/mock-data/statistiques";
import { motion } from "framer-motion";

export function CarteOverview() {
  // Positions simplifiées pour les départements du Congo sur un SVG 100x100
  const deptPositions: Record<string, { x: number; y: number }> = {
    Brazzaville: { x: 45, y: 80 },
    "Pointe-Noire": { x: 20, y: 90 },
    Bouenza: { x: 35, y: 85 },
    Cuvette: { x: 60, y: 45 },
    "Cuvette-Ouest": { x: 50, y: 35 },
    Kouilou: { x: 15, y: 80 },
    Lékoumou: { x: 30, y: 70 },
    Likouala: { x: 80, y: 20 },
    Niari: { x: 25, y: 75 },
    Plateaux: { x: 55, y: 60 },
    Pool: { x: 40, y: 75 },
    Sangha: { x: 65, y: 25 },
  };

  const maxProduction = Math.max(...TOP_DEPARTEMENTS_PRODUCTEURS.map(d => d.production));

  return (
    <div className="relative w-full aspect-square max-h-[400px] bg-surface rounded-xl border border-border overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
          Intensité de Production
        </h3>
        <p className="text-[10px] text-text-muted mt-1">Répartition par département</p>
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full p-8">
        {/* Fond de carte simplifié */}
        <motion.path
          d="M40,95 L20,90 L10,80 L20,70 L30,60 L40,50 L50,20 L70,10 L90,20 L80,50 L60,80 Z"
          fill="none"
          stroke="#1B4D2E"
          strokeWidth="0.5"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {TOP_DEPARTEMENTS_PRODUCTEURS.map((dept, idx) => {
          const pos = deptPositions[dept.dept] || { x: 50, y: 50 };
          const intensity = dept.production / maxProduction;
          const radius = 2 + intensity * 8;

          return (
            <g key={dept.dept}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill="#1B4D2E"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1 + intensity * 0.6, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              />
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={1}
                fill="#1B4D2E"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + idx * 0.1 }}
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary opacity-20" />
          <span className="text-[10px] text-text-muted">Faible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary opacity-80" />
          <span className="text-[10px] text-text-muted">Élevée</span>
        </div>
      </div>
    </div>
  );
}
