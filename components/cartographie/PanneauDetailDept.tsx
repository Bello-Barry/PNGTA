"use client";

import React from "react";
import { StatsDepartement } from "@/hooks/useCarteStats";
import { Agriculteur } from "@/types";
import { MapPin, Users, TrendingUp, Landmark, PieChart } from "lucide-react";

interface PanneauDetailDeptProps {
  stats: StatsDepartement;
  onSelectAgriculteur: (ag: Agriculteur) => void;
}

export function PanneauDetailDept({ stats, onSelectAgriculteur }: PanneauDetailDeptProps) {
  return (
    <div className="flex flex-col h-full space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
      <div className="flex items-center gap-3 p-4 bg-primary text-white rounded-2xl shadow-lg">
        <MapPin size={24} />
        <div>
          <h2 className="text-xl font-serif font-bold">{stats.nom}</h2>
          <p className="text-xs opacity-80 uppercase font-bold tracking-widest">Département</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white border border-border rounded-2xl">
          <Users className="text-primary mb-2" size={20} />
          <p className="text-[10px] text-text-muted uppercase font-bold">Agriculteurs</p>
          <p className="text-xl font-bold text-primary">{stats.nombreAgriculteurs}</p>
        </div>
        <div className="p-4 bg-white border border-border rounded-2xl">
          <TrendingUp className="text-accent-gold mb-2" size={20} />
          <p className="text-[10px] text-text-muted uppercase font-bold">Production</p>
          <p className="text-xl font-bold text-primary">{stats.productionTotale.toLocaleString()} <span className="text-xs font-normal">T</span></p>
        </div>
      </div>

      <div className="p-4 bg-white border border-border rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="text-primary" size={18} />
          <h3 className="font-bold text-sm">Cultures Dominantes</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {stats.culturesDominantes.map((culture, idx) => (
            <span key={idx} className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-medium text-primary">
              {culture}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border border-border rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="text-primary" size={18} />
          <h3 className="font-bold text-sm">Répartition des Statuts</h3>
        </div>
        <div className="space-y-3">
          <StatBar label="Actifs" count={stats.statutRepartition.actif} total={stats.nombreAgriculteurs} color="bg-green-500" />
          <StatBar label="Inactifs" count={stats.statutRepartition.inactif} total={stats.nombreAgriculteurs} color="bg-amber-500" />
          <StatBar label="Suspendus" count={stats.statutRepartition.suspendu} total={stats.nombreAgriculteurs} color="bg-red-500" />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
          Liste des Agriculteurs
        </h3>
        <div className="space-y-2">
          {stats.agriculteurs.map((ag) => (
            <button
              key={ag.id}
              onClick={() => onSelectAgriculteur(ag)}
              className="w-full text-left p-3 bg-white border border-border rounded-xl hover:border-primary transition-all flex items-center gap-3 group"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${
                ag.statut === "actif" ? "bg-green-500" : ag.statut === "suspendu" ? "bg-red-500" : "bg-amber-500"
              }`}>
                {ag.nom.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-text-primary truncate group-hover:text-primary transition-colors">{ag.nom}</p>
                <p className="text-[10px] text-text-muted">{ag.cultures[0]} • {ag.district}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                ag.statut === "actif" ? "bg-green-500" : ag.statut === "suspendu" ? "bg-red-500" : "bg-amber-500"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, count, total, color }: { label: string, count: number, total: number, color: string }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-text-muted uppercase">{label}</span>
        <span>{count} ({Math.round(percentage)}%)</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
