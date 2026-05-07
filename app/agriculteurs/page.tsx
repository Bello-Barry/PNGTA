"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ALL_AGRICULTEURS } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Eye } from "lucide-react";
import { StatutBadge } from "@/components/ui/StatutBadge";

export default function AgriculteursList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedStatut, setSelectedStatut] = useState("");

  const departments = [...new Set(ALL_AGRICULTEURS.map((a) => a.departement))].sort();

  const filteredAgriculteurs = useMemo(() => {
    return ALL_AGRICULTEURS.filter((ag) => {
      const matchesSearch =
        ag.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ag.numeroNational.includes(searchTerm);
      const matchesDept = !selectedDept || ag.departement === selectedDept;
      const matchesStatut = !selectedStatut || ag.statut === selectedStatut;
      return matchesSearch && matchesDept && matchesStatut;
    });
  }, [searchTerm, selectedDept, selectedStatut]);

  return (
    <AppShell>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            Registre National des Agriculteurs
          </h1>
          <p className="text-gray-600">
            {filteredAgriculteurs.length.toLocaleString("fr-FR")} agriculteurs enregistrés
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          className="card mt-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search size={16} className="inline mr-1" />
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Nom ou N° National Agricole..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Département */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter size={16} className="inline mr-1" />
                Département
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Tous les départements</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Statut */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                value={selectedStatut}
                onChange={(e) => setSelectedStatut(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Tous les statuts</option>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
                <option value="suspendu">Suspendu</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tableau */}
        <motion.div
          className="card overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-text-muted">
                  N° National
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-muted">
                  Nom
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-muted">
                  Département
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-muted">
                  Cultures
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-muted">
                  Surface (ha)
                </th>
                <th className="text-left py-3 px-4 font-semibold text-text-muted">
                  Statut
                </th>
                <th className="text-center py-3 px-4 font-semibold text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAgriculteurs.map((ag) => (
                <motion.tr
                  key={ag.id}
                  className="border-b border-border hover:bg-surface transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="py-3 px-4 font-mono text-xs font-bold text-primary">
                    {ag.numeroNational}
                  </td>
                  <td className="py-3 px-4 font-medium">{ag.nom}</td>
                  <td className="py-3 px-4 text-gray-600">{ag.departement}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {ag.cultures.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="px-2 py-1 bg-primary-light bg-opacity-20 text-primary text-xs rounded"
                        >
                          {c}
                        </span>
                      ))}
                      {ag.cultures.length > 2 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{ag.cultures.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{ag.surfaceHectares}</td>
                  <td className="py-3 px-4">
                    <StatutBadge statut={ag.statut} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      href={`/agriculteurs/${ag.id}`}
                      className="inline-flex items-center justify-center p-2 hover:bg-surface rounded-lg transition-colors"
                      title="Voir le profil"
                    >
                      <Eye size={18} className="text-primary" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredAgriculteurs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Aucun agriculteur ne correspond aux critères.</p>
            </div>
          )}
        </motion.div>
      </div>
    </AppShell>
  );
}
