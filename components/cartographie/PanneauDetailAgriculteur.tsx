"use client";

import React from "react";
import { Agriculteur } from "@/types";
import { ArrowLeft, MapPin, Wheat, Scale, Phone, Mail, FileText, Users, User, Shield, CheckCircle, Clock } from "lucide-react";
import { QrCodeBadge } from "@/components/agriculteurs/QrCodeBadge";
import { cn } from "@/lib/utils";

interface PanneauDetailAgriculteurProps {
  agriculteur: Agriculteur;
  onBack: () => void;
}

export function PanneauDetailAgriculteur({ agriculteur, onBack }: PanneauDetailAgriculteurProps) {
  return (
    <div className="flex flex-col h-full space-y-6 overflow-y-auto p-4 lg:p-6 bg-white">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-[-4px] transition-transform w-fit"
      >
        <ArrowLeft size={20} />
        Retour au département
      </button>

      {/* Type d'exploitant Badge */}
      {agriculteur.typeExploitant === "cooperative" ? (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-bold text-amber-700 uppercase">Coopérative</span>
          </div>
          <p className="text-sm font-semibold">{agriculteur.nomCooperative}</p>
          <p className="text-xs text-muted-foreground">{agriculteur.nombreMembres} membres</p>
          {agriculteur.capaciteStockage && (
            <p className="text-xs text-muted-foreground">
              Stockage : {agriculteur.capaciteStockage} tonnes
            </p>
          )}
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-green-600" />
            <span className="text-[10px] font-bold text-green-700 uppercase">Exploitant Individuel</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Non affilié à une coopérative
          </p>
        </div>
      )}

      <div className="flex flex-col items-center text-center p-6 bg-white border border-border rounded-3xl shadow-sm">
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center text-3xl font-serif font-bold text-white mb-4 shadow-lg",
          agriculteur.statut === "actif" ? "bg-green-500 shadow-green-100" : agriculteur.statut === "suspendu" ? "bg-red-500 shadow-red-100" : "bg-amber-500 shadow-amber-100"
        )}>
          {agriculteur.nom.charAt(0)}
        </div>
        <h2 className="text-xl font-serif font-bold text-primary mb-1">{agriculteur.nom}</h2>
        <p className="font-mono text-[10px] font-bold text-primary-light bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
          {agriculteur.numeroNational}
        </p>
        <div className={cn(
          "mt-4 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
          agriculteur.statut === "actif" ? "bg-green-100 text-green-700" : agriculteur.statut === "suspendu" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
        )}>
          {agriculteur.statut}
        </div>
      </div>

      {/* Chef de Secteur responsable */}
      <div className="flex items-start gap-3 py-4 border-t border-border">
        <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase">Chef de Secteur</p>
          <p className="text-sm font-medium">{agriculteur.chefSecteurResponsable}</p>
          <span className={cn(
            "inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full mt-2 font-bold",
            agriculteur.statutValidation === "valide"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          )}>
            {agriculteur.statutValidation === "valide" ? (
              <><CheckCircle className="w-3 h-3" /> Validé le {agriculteur.dateValidation}</>
            ) : (
              <><Clock className="w-3 h-3" /> En attente de validation</>
            )}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">Localisation</h3>
        <div className="p-4 bg-white border border-border rounded-2xl space-y-4">
          <InfoRow icon={<MapPin size={16} />} label="Département" value={agriculteur.departement} />
          <div className="h-px bg-gray-50" />
          <InfoRow icon={<MapPin size={16} />} label="District" value={agriculteur.district} />
          <div className="h-px bg-gray-50" />
          <InfoRow icon={<MapPin size={16} />} label="Village" value={agriculteur.village || "Non spécifié"} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">Exploitation</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-border rounded-2xl text-center">
            <Scale className="mx-auto text-primary mb-2" size={20} />
            <p className="text-[10px] text-text-muted uppercase font-bold">Surface</p>
            <p className="font-bold text-primary">{agriculteur.surfaceHectares} <span className="text-xs font-normal">ha</span></p>
          </div>
          <div className="p-4 bg-white border border-border rounded-2xl text-center">
            <Wheat className="mx-auto text-accent-gold mb-2" size={20} />
            <p className="text-[10px] text-text-muted uppercase font-bold">Production</p>
            <p className="font-bold text-primary">{(agriculteur.productionAnnuelleEstimee / 1000).toFixed(1)} <span className="text-xs font-normal">T/an</span></p>
          </div>
        </div>
        <div className="p-4 bg-white border border-border rounded-2xl">
          <p className="text-[10px] text-text-muted uppercase font-bold mb-3">Cultures</p>
          <div className="flex flex-wrap gap-2">
            {agriculteur.cultures.map((c, idx) => (
              <span key={idx} className="px-3 py-1 bg-surface border border-border rounded-full text-[10px] font-bold text-primary">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">Contact</h3>
        <div className="p-4 bg-white border border-border rounded-2xl space-y-4">
          <InfoRow icon={<Phone size={16} />} label="Téléphone" value={agriculteur.telephone || "N/A"} />
          <div className="h-px bg-gray-50" />
          <InfoRow icon={<Mail size={16} />} label="Email" value={agriculteur.email || "N/A"} />
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <QrCodeBadge value={agriculteur.numeroNational} size={120} />
      </div>

      <div className="pt-4 pb-8">
        <button className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-light transition-all shadow-lg shadow-primary/20">
          <FileText size={18} />
          Télécharger la fiche complète
        </button>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-primary-light">{icon}</div>
      <div className="flex-1">
        <p className="text-[10px] text-text-muted uppercase font-bold">{label}</p>
        <p className="text-sm font-bold text-text-primary">{value}</p>
      </div>
    </div>
  );
}
