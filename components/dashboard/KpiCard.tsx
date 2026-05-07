"use client";

import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  titre: string;
  valeur: string | number;
  unite?: string;
  variation?: number;
  icone: LucideIcon;
  couleurIcone?: string;
  alerte?: boolean;
}

export function KpiCard({
  titre,
  valeur,
  unite,
  variation,
  icone: Icon,
  couleurIcone = "text-primary",
  alerte = false,
}: KpiCardProps) {
  const isPositive = variation && variation >= 0;
  const variationColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`card overflow-hidden ${
        alerte ? "border-red-400 border-2" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-muted font-medium mb-2">{titre}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold font-serif text-text-primary">
              {valeur.toLocaleString("fr-FR")}
            </h3>
            {unite && <span className="text-lg text-text-muted">{unite}</span>}
          </div>
          {variation !== undefined && (
            <div className={`flex items-center gap-1 mt-3 ${variationColor}`}>
              {isPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span className="text-sm font-medium">
                {isPositive ? "+" : ""}
                {variation.toFixed(1)}%
              </span>
            </div>
          )}
        </div>
        <div className={`flex-shrink-0 p-3 bg-opacity-10 rounded-lg ${couleurIcone}`}>
          <Icon size={28} className={couleurIcone} />
        </div>
      </div>
      {alerte && (
        <div className="mt-3 pt-3 border-t border-red-200">
          <p className="text-xs text-red-600 font-medium">⚠️ Alerte active</p>
        </div>
      )}
    </div>
  );
}
