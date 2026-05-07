"use client";

import { motion } from "framer-motion";
import { Download, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { STATISTIQUES_MENSUELLES } from "@/lib/mock-data/statistiques";

export function EconomiePanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-green-50 rounded-3xl border border-green-100 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">Variation Annuelle</p>
            <p className="text-3xl font-serif font-bold text-green-900">+12.5%</p>
            <div className="flex items-center gap-1 mt-2 text-green-700 text-xs font-medium">
              <TrendingUp size={14} /> Production en hausse
            </div>
          </div>
          <Activity className="absolute -bottom-2 -right-2 text-green-600/5 group-hover:scale-110 transition-transform" size={80} />
        </div>

        <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Indice des Prix</p>
            <p className="text-3xl font-serif font-bold text-blue-900">450 <span className="text-sm font-sans">FCFA</span></p>
            <div className="flex items-center gap-1 mt-2 text-blue-700 text-xs font-medium">
              <TrendingDown size={14} /> Tendance stable
            </div>
          </div>
          <DollarSign className="absolute -bottom-2 -right-2 text-blue-600/5 group-hover:scale-110 transition-transform" size={80} />
        </div>

        <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Balance Commerciale</p>
            <p className="text-3xl font-serif font-bold text-amber-900">+2.5<span className="text-sm font-sans">Mds</span></p>
            <div className="flex items-center gap-1 mt-2 text-amber-700 text-xs font-medium">
              <TrendingUp size={14} /> Excédent positif
            </div>
          </div>
          <Activity className="absolute -bottom-2 -right-2 text-amber-600/5 group-hover:scale-110 transition-transform" size={80} />
        </div>
      </div>

      <div className="card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-primary">Tableau des Données Nationales</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-light transition-all shadow-lg shadow-primary/10">
            <Download size={14} /> Exporter CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-2 font-bold text-text-muted text-[10px] uppercase tracking-wider">Période</th>
                <th className="py-3 px-2 font-bold text-text-muted text-[10px] uppercase tracking-wider">Production (T)</th>
                <th className="py-3 px-2 font-bold text-text-muted text-[10px] uppercase tracking-wider">Export (FCFA)</th>
                <th className="py-3 px-2 font-bold text-text-muted text-[10px] uppercase tracking-wider">Import (FCFA)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {STATISTIQUES_MENSUELLES.slice(-6).map((stat, idx) => (
                <tr key={idx} className="hover:bg-surface transition-colors">
                  <td className="py-3 px-2 font-medium text-primary">{stat.mois}</td>
                  <td className="py-3 px-2 font-mono">{stat.production.toLocaleString()}</td>
                  <td className="py-3 px-2 font-mono">{(stat.export / 1e6).toFixed(1)}M</td>
                  <td className="py-3 px-2 font-mono">{(stat.import / 1e6).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
