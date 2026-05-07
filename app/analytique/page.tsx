"use client";

import { AppShell } from "@/components/layout/AppShell";
import {

  PRODUCTION_PAR_CULTURE,
  REVENUS_PAR_DEPARTEMENT,
  COMPARAISON_EXPORT_IMPORT_MENSUEL,
} from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TendanceChart } from "@/components/analytique/TendanceChart";
import { EconomiePanel } from "@/components/analytique/EconomiePanel";

const COLORS = ["#1B4D2E", "#2D6A42", "#C9922A", "#E8B84B", "#16A34A", "#3B82F6"];

export default function Analytique() {
  const [periode, setPeriode] = useState("6m");

  const periodes = [
    { id: "3m", label: "3 mois" },
    { id: "6m", label: "6 mois" },
    { id: "1y", label: "1 an" },
  ];

  return (
    <AppShell>
      <div className="page-container">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              Espace Analytique
            </h1>
            <p className="text-gray-600">
              Tendances et analyses économiques agricoles nationales — République du Congo
            </p>
          </div>
          
          <div className="flex bg-surface p-1 rounded-2xl border border-border shadow-sm">
            {periodes.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriode(p.id)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  periode === p.id
                    ? "bg-white text-primary shadow-sm"
                    : "text-text-muted hover:text-primary"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Graphique 1: Évolution production */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TendanceChart />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Graphique 2: Revenus par département */}
            <motion.div
              className="card border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-serif font-bold text-primary mb-6">
                Revenus agricoles par département
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REVENUS_PAR_DEPARTEMENT}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EBE6" />
                    <XAxis dataKey="dept" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val / 1e6}M`} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5EBE6" }} />
                    <Bar dataKey="revenus" fill="#1B4D2E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Graphique 3: Export vs Import */}
            <motion.div
              className="card border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-serif font-bold text-primary mb-6">
                Comparaison Export vs Import (mensuel)
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={COMPARAISON_EXPORT_IMPORT_MENSUEL}>
                    <defs>
                      <linearGradient id="colorExport" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1B4D2E" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1B4D2E" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorImport" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C9922A" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#C9922A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EBE6" />
                    <XAxis dataKey="mois" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val / 1e6}M`} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5EBE6" }} />
                    <Legend verticalAlign="top" align="right" iconType="circle" />
                    <Area type="monotone" dataKey="export" name="Export" stroke="#1B4D2E" fillOpacity={1} fill="url(#colorExport)" />
                    <Area type="monotone" dataKey="import" name="Import" stroke="#C9922A" fillOpacity={1} fill="url(#colorImport)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Graphique 4: Répartition des cultures */}
            <motion.div
              className="card border border-border flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-serif font-bold text-primary mb-6 w-full">
                Répartition de la production
              </h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PRODUCTION_PAR_CULTURE}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="production"
                      nameKey="culture"
                    >
                      {PRODUCTION_PAR_CULTURE.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Panel Economie */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <EconomiePanel />
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
