"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ALL_AGRICULTEURS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { QrCode, Mail, Phone, MapPin, Leaf, BarChart3, Calendar } from "lucide-react";
import { StatutBadge } from "@/components/ui/StatutBadge";
import { QrCodeBadge } from "@/components/agriculteurs/QrCodeBadge";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AgriculteurDetail() {
  const params = useParams();
  const agriculteur = ALL_AGRICULTEURS.find((a) => a.id === params.id);

  if (!agriculteur) {
    return (
      <AppShell>
        <div className="page-container text-center py-12">
          <p className="text-gray-500">Agriculteur non trouvé</p>
          <Link href="/agriculteurs" className="text-primary hover:underline mt-4 inline-block">
            Retour au registre
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="page-container">
        <Link
          href="/agriculteurs"
          className="text-primary hover:underline mb-6 inline-flex items-center gap-1"
        >
          ← Retour au registre
        </Link>

        {/* En-tête avec photo et infos de base */}
        <motion.div
          className="card mb-8 flex flex-col md:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white">
              <span className="text-5xl font-serif font-bold">
                {agriculteur.nom
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
          </div>

          {/* Infos de base */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                  {agriculteur.nom}
                </h1>
                <p className="font-mono text-sm text-gray-600 mb-2">
                  {agriculteur.numeroNational}
                </p>
              </div>
              <StatutBadge statut={agriculteur.statut} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-2 items-start">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Localisation</p>
                  <p className="font-medium">
                    {agriculteur.departement} / {agriculteur.district}
                  </p>
                  {agriculteur.village && (
                    <p className="text-sm text-gray-600">{agriculteur.village}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <Calendar size={18} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Enregistrement</p>
                  <p className="font-medium">{agriculteur.dateEnregistrement}</p>
                </div>
              </div>

              {agriculteur.email && (
                <div className="flex gap-2 items-start">
                  <Mail size={18} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-sm">{agriculteur.email}</p>
                  </div>
                </div>
              )}

              {agriculteur.telephone && (
                <div className="flex gap-2 items-start">
                  <Phone size={18} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500">Téléphone</p>
                    <p className="font-medium text-sm">{agriculteur.telephone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Cultures et production */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Cultures */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
              <Leaf size={20} />
              Cultures pratiquées
            </h2>
            <div className="flex flex-wrap gap-2">
              {agriculteur.cultures.map((culture) => (
                <span
                  key={culture}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg text-sm font-medium"
                >
                  {culture}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Production */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Données de production
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-surface rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Surface cultivée</p>
                <p className="text-2xl font-bold text-primary">
                  {agriculteur.surfaceHectares} <span className="text-lg text-gray-600">ha</span>
                </p>
              </div>
              <div className="p-3 bg-surface rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Production annuelle estimée</p>
                <p className="text-2xl font-bold text-accent-gold">
                  {agriculteur.productionAnnuelleEstimee.toLocaleString("fr-FR")}{" "}
                  <span className="text-lg text-gray-600">kg</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QR Code */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-serif font-bold mb-6 flex items-center gap-2">
            <QrCode size={20} className="text-primary" />
            Traçabilité et identification gouvernementale
          </h2>
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            {/* QR Code mockup */}
            <div className="flex-shrink-0">
              <QrCodeBadge value={agriculteur.numeroNational} size={140} />
            </div>

            {/* Infos supplémentaires */}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-4 text-primary">Informations de certification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-text-muted">ID National:</span>
                    <span className="font-mono font-bold text-primary">{agriculteur.numeroNational}</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-text-muted">Type de Registre:</span>
                    <span className="font-medium text-text-primary uppercase text-[11px]">Registre Centralisé (PNGTA)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-text-muted">Dernière Audit:</span>
                    <span className="font-medium">12 Mars 2024</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-text-muted">Niveau de Conformité:</span>
                    <span className="font-bold text-success text-[11px] uppercase">Haute (98%)</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-text-muted">Saison Actuelle:</span>
                    <span className="font-medium">Saison des pluies 2024</span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-2">
                    <span className="text-text-muted">Certification ISO:</span>
                    <span className="font-mono text-primary font-bold">CG-AGRI-9001</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-text-muted mt-6 italic">
                Ce QR code permet la vérification instantanée de l'authenticité de l'agriculteur et de la 
                traçabilité de ses produits par les agents du Ministère de l'Agriculture et de l'Élevage.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
