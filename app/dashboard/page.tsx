"use client";

import { AppShell } from "@/components/layout/AppShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { AlertesFeed } from "@/components/dashboard/AlertesFeed";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,

  Circle
} from "lucide-react";
import {
  KPI_DASHBOARD,

  TOP_DEPARTEMENTS_PRODUCTEURS,
  CARGAISONS_MOCK,
  getAlertesActives,
} from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ProductionChart } from "@/components/dashboard/ProductionChart";
import { CarteOverview } from "@/components/dashboard/CarteOverview";
import { useState, useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const alertesActivesCount = getAlertesActives().length;
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulation temps réel pour l'indicateur
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppShell>
      <div className="page-container">
        {/* En-tête */}
        <motion.div
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              Centre de Contrôle National
            </h1>
            <p className="text-gray-600">
              Supervision et analyses agricoles nationales — République du Congo
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Circle className="fill-green-600 text-green-600" size={10} />
            </motion.div>
            <span className="text-xs font-bold text-green-800 uppercase tracking-wider">
              Données en direct
            </span>
            <span className="text-[10px] text-green-600 font-mono">
              MàJ: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </motion.div>

        {/* KPIs */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <KpiCard
              titre="Agriculteurs enregistrés"
              valeur={KPI_DASHBOARD.totalAgriculteurs}
              variation={3.2}
              icone={Users}
              couleurIcone="text-primary"
            />
          </motion.div>
          <motion.div variants={item}>
            <KpiCard
              titre="Production nationale"
              valeur={KPI_DASHBOARD.productionNationale}
              unite="tonnes"
              variation={8.5}
              icone={TrendingUp}
              couleurIcone="text-green-600"
            />
          </motion.div>
          <motion.div variants={item}>
            <KpiCard
              titre="Valeur exports (trimestre)"
              valeur={(KPI_DASHBOARD.valeurExports / 1e9).toFixed(1)}
              unite="Mds FCFA"
              variation={5.2}
              icone={DollarSign}
              couleurIcone="text-accent-gold"
            />
          </motion.div>
          <motion.div variants={item}>
            <KpiCard
              titre="Alertes actives"
              valeur={alertesActivesCount}
              variation={-15.3}
              icone={AlertCircle}
              couleurIcone="text-red-600"
              alerte={alertesActivesCount > 0}
            />
          </motion.div>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Production Chart */}
          <motion.div
            className="lg:col-span-2 card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-serif font-bold">
                Évolution de la production par culture
              </h2>
              <div className="text-xs text-text-muted">Volume en tonnes (12 mois)</div>
            </div>
            <ProductionChart />
          </motion.div>

          {/* Alertes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AlertesFeed />
          </motion.div>
        </div>

        {/* Top départements et transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carte Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <CarteOverview />
          </motion.div>

          {/* Top départements */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-lg font-serif font-bold mb-4">
              Top 5 départements producteurs
            </h2>
            <div className="space-y-4">
              {TOP_DEPARTEMENTS_PRODUCTEURS.map((dept, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{dept.dept}</p>
                    <p className="text-xs text-gray-500">
                      {dept.agriculteurs.toLocaleString("fr-FR")} agriculteurs
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {dept.production.toLocaleString("fr-FR")}
                    </p>
                    <p className="text-xs text-gray-500">tonnes</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dernières cargaisons */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-lg font-serif font-bold mb-4">
              Dernières cargaisons
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {CARGAISONS_MOCK.slice(0, 5).map((cargo) => (
                <div key={cargo.id} className="p-3 bg-surface rounded-lg text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-mono font-bold text-primary">
                      {cargo.reference}
                    </p>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      cargo.type === "export"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {cargo.type === "export" ? "📤 Export" : "📥 Import"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{cargo.produit}</p>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-gray-500">{cargo.quantite}T</span>
                    <span className="font-medium text-primary">
                      {cargo.statut.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
