"use client";

import { AppShell } from "@/components/layout/AppShell";
import { TOP_DEPARTEMENTS_PRODUCTEURS, DEPARTEMENTS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { CarteCongo } from "@/components/cartographie/CarteCongo";

export default function Cartographie() {
  const [selectedDept, setSelectedDept] = useState(TOP_DEPARTEMENTS_PRODUCTEURS[0].dept);

  const selectedData = TOP_DEPARTEMENTS_PRODUCTEURS.find((d) => d.dept === selectedDept);

  return (
    <AppShell>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">
            Cartographie Agricole
          </h1>
          <p className="text-gray-600">
            Carte interactive de la production agricole par département
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Carte */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CarteCongo 
              onSelectDept={setSelectedDept} 
              selectedDept={selectedDept} 
            />
          </motion.div>

          {/* Panel latéral */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Détails sélectionnés */}
            {selectedData && (
              <div className="card">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <MapPin size={18} />
                  Détails du département
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                    <p className="text-lg font-serif font-bold text-primary">
                      {selectedData.dept}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Production</p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedData.production.toLocaleString("fr-FR")}
                      <span className="text-sm text-gray-600"> tonnes</span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Agriculteurs</p>
                    <p className="text-2xl font-bold text-accent-gold">
                      {selectedData.agriculteurs.toLocaleString("fr-FR")}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-gray-500 mb-2">Part nationale</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full"
                        style={{
                          width: `${(selectedData.production / (TOP_DEPARTEMENTS_PRODUCTEURS.reduce((a, b) => a + b.production, 0))) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-right mt-1 text-primary font-semibold">
                      {(
                        (selectedData.production /
                          TOP_DEPARTEMENTS_PRODUCTEURS.reduce(
                            (a, b) => a + b.production,
                            0
                          )) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Top 5 */}
            <div className="card">
              <h3 className="font-bold mb-4">Top 5 producteurs</h3>
              <div className="space-y-2">
                {TOP_DEPARTEMENTS_PRODUCTEURS.slice(0, 5).map((dept, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDept(dept.dept)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedDept === dept.dept
                        ? "bg-primary text-white"
                        : "bg-surface hover:bg-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">
                        {idx + 1}. {dept.dept}
                      </span>
                      <span className="text-xs font-bold">
                        {dept.production.toLocaleString("fr-FR")}T
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppShell>
  );
}
