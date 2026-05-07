"use client";

import { AppShell } from "@/components/layout/AppShell";
import { CARGAISONS_MOCK, getTotalValeurExports, getTotalValeurImports, TIMELINE_EVENTS } from "@/lib/mock-data";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { StatutBadge } from "@/components/ui/StatutBadge";
import { QrCodeBadge } from "@/components/agriculteurs/QrCodeBadge";
import { CargaisonTimeline } from "@/components/export-import/CargaisonTimeline";
import { motion } from "framer-motion";
import { Package, TrendingUp, DollarSign, CheckCircle, QrCode, ArrowRight, Anchor } from "lucide-react";
import { useState } from "react";

export default function ExportImport() {
  const [selectedCargo, setSelectedCargo] = useState(CARGAISONS_MOCK[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "export" | "import">("all");
  const [statutFilter, setStatutFilter] = useState("all");

  const exportsCount = CARGAISONS_MOCK.filter((c) => c.type === "export").length;
  const importsCount = CARGAISONS_MOCK.filter((c) => c.type === "import").length;
  const totalValeurExports = getTotalValeurExports();
  const totalValeurImports = getTotalValeurImports();

  const filteredCargaisons = CARGAISONS_MOCK.filter((cargo) => {
    const matchesSearch = cargo.reference.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cargo.produit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || cargo.type === typeFilter;
    const matchesStatut = statutFilter === "all" || cargo.statut === statutFilter;
    return matchesSearch && matchesType && matchesStatut;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AppShell>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            Module Export-Import
          </h1>
          <p className="text-gray-600">
            Supervision et traçabilité des flux commerciaux internationaux
          </p>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <KpiCard
              titre="Cargaisons en transit"
              valeur={CARGAISONS_MOCK.filter((c) => c.statut === "en_transit").length}
              variation={2.5}
              icone={Package}
              couleurIcone="text-yellow-600"
            />
          </motion.div>
          <motion.div variants={item}>
            <KpiCard
              titre="Valeur exports"
              valeur={(totalValeurExports / 1e9).toFixed(2)}
              unite="Mds FCFA"
              variation={8.2}
              icone={TrendingUp}
              couleurIcone="text-green-600"
            />
          </motion.div>
          <motion.div variants={item}>
            <KpiCard
              titre="Valeur imports"
              valeur={(totalValeurImports / 1e9).toFixed(2)}
              unite="Mds FCFA"
              variation={3.1}
              icone={DollarSign}
              couleurIcone="text-blue-600"
            />
          </motion.div>
          <motion.div variants={item}>
            <KpiCard
              titre="Taux validation"
              valeur={92.5}
              unite="%"
              variation={1.2}
              icone={CheckCircle}
              couleurIcone="text-green-600"
            />
          </motion.div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="card mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Rechercher</label>
              <input 
                type="text" 
                placeholder="Référence ou produit..." 
                className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Type</label>
              <select 
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
              >
                <option value="all">Tous</option>
                <option value="export">Export</option>
                <option value="import">Import</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Statut</label>
              <select 
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white"
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="en_preparation">En préparation</option>
                <option value="en_transit">En transit</option>
                <option value="dedouane">Dédouané</option>
                <option value="delivre">Délivré</option>
                <option value="bloque">Bloqué</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tableau des cargaisons */}
          <motion.div
            className="lg:col-span-2 card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-serif font-bold">Cargaisons actives</h2>
              <span className="text-xs font-medium bg-surface px-2 py-1 rounded">
                {filteredCargaisons.length} résultats
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-2 px-3 font-semibold text-text-muted text-xs">
                      Ref.
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-text-muted text-xs">
                      Type
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-text-muted text-xs">
                      Produit
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-text-muted text-xs">
                      Quantité
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-text-muted text-xs">
                      Statut
                    </th>
                    <th className="text-center py-2 px-3 font-semibold text-text-muted text-xs">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCargaisons.map((cargo) => (
                    <tr
                      key={cargo.id}
                      className={`border-b border-border hover:bg-surface cursor-pointer transition-colors ${selectedCargo.id === cargo.id ? 'bg-surface' : ''}`}
                      onClick={() => setSelectedCargo(cargo)}
                    >
                      <td className="py-3 px-3 font-mono font-bold text-primary text-xs">
                        {cargo.reference}
                      </td>
                      <td className="py-3 px-3">
                        {cargo.type === "export" ? "📤" : "📥"}
                      </td>
                      <td className="py-3 px-3 text-xs truncate max-w-[120px]">{cargo.produit}</td>
                      <td className="py-3 px-3 text-xs font-medium">
                        {cargo.quantite}T
                      </td>
                      <td className="py-3 px-3">
                        <StatutBadge statut={cargo.statut} />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button className="text-primary hover:text-primary-light">
                          →
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCargaisons.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500 italic">
                        Aucune cargaison ne correspond aux critères
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Panel détail */}
          <motion.div
            className="card border border-border flex flex-col h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-serif font-bold text-primary">Détails Cargaison</h2>
              <QrCode size={20} className="text-primary-light" />
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                  {selectedCargo.type === "export" ? <ArrowRight size={24} /> : <Anchor size={24} />}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Référence</p>
                  <p className="font-mono font-bold text-primary text-lg">{selectedCargo.reference}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white border border-border rounded-xl">
                  <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Produit</p>
                  <p className="font-bold text-sm text-text-primary">{selectedCargo.produit}</p>
                </div>
                <div className="p-3 bg-white border border-border rounded-xl">
                  <p className="text-[10px] text-text-muted uppercase font-bold mb-1">Volume</p>
                  <p className="font-bold text-sm text-primary">{selectedCargo.quantite} {selectedCargo.unite}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-text-muted font-medium">Origine</span>
                  <span className="font-bold text-text-primary">{selectedCargo.origine}</span>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-text-muted font-medium">Destination</span>
                  <span className="font-bold text-text-primary">{selectedCargo.destination}</span>
                </div>
              </div>

              <div className="p-4 bg-sidebar rounded-2xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] text-primary-light uppercase font-bold mb-1 tracking-widest">Valeur Marchande Estimée</p>
                  <p className="text-2xl font-mono font-bold text-accent-gold">
                    {(selectedCargo.valeur / 1e6).toFixed(1)}M <span className="text-sm font-sans text-white/70">FCFA</span>
                  </p>
                </div>
                <DollarSign className="absolute -bottom-2 -right-2 text-white/5" size={80} />
              </div>

              <div className="flex justify-center py-4">
                <QrCodeBadge value={selectedCargo.reference} size={100} />
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border">
              <StatutBadge statut={selectedCargo.statut} />
              <button className="w-full mt-4 py-3 border border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all">
                Imprimer le Certificat de Traçabilité
              </button>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          className="card mt-8 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                Timeline Logistique & Traçabilité
              </h2>
              <p className="text-text-muted text-sm italic">
                Suivi en temps réel de la cargaison <span className="font-mono font-bold text-primary-light">#{selectedCargo.reference}</span>
              </p>
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-surface rounded-xl border border-border">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-primary-light text-[10px] text-white flex items-center justify-center font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                3 Agents assignés
              </span>
            </div>
          </div>
          
          <CargaisonTimeline events={TIMELINE_EVENTS} />
        </motion.div>
      </div>
    </AppShell>
  );
}
