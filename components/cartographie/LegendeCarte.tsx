"use client";

import React from "react";

export function LegendeCarte() {
  return (
    <div className="card p-4 space-y-6">
      <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Légende de la carte</h4>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Production (Heatmap)</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">Faible</span>
            <div className="flex-1 h-2 bg-gradient-to-r from-[#E5EBE6] to-[#1B4D2E] rounded-full" />
            <span className="text-[10px] text-muted-foreground">Élevée</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase">Types d'exploitants</p>

          <div className="flex items-center justify-between text-[10px] font-medium">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#16A34A] border border-white" />
              <span>Individu (Actif)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#16A34A] border-2 border-[#C9922A] rotate-45" />
              <span className="ml-1">Coopérative (Actif)</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-medium pt-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D97706]" />
              <span>Inactif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span>Suspendu</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="font-bold text-primary">✓</span>
            <span>Validé par chef de secteur</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
            <span className="font-bold text-amber-500">⏳</span>
            <span>En attente de validation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
