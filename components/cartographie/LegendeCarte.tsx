"use client";

import React from "react";

export function LegendeCarte() {
  return (
    <div className="card p-4">
      <h4 className="text-xs font-bold text-primary uppercase mb-4 tracking-wider">Légende de la carte</h4>

      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Production (Heatmap)</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-text-muted">Faible</span>
            <div className="flex-1 h-2 bg-gradient-to-r from-[#E5EBE6] to-[#1B4D2E] rounded-full" />
            <span className="text-[10px] text-text-muted">Élevée</span>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Statut Agriculteurs</p>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#16A34A] border border-white" />
              <span className="text-xs text-text-primary">Actif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D97706] border border-white" />
              <span className="text-xs text-text-primary">Inactif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#DC2626] border border-white" />
              <span className="text-xs text-text-primary">Suspendu</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-[10px] text-text-muted italic">
            Cliquez sur un département ou un marqueur pour afficher les détails.
          </p>
        </div>
      </div>
    </div>
  );
}
