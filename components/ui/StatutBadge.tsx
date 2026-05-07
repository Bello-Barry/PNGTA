"use client";

type Statut =
  | "actif"
  | "inactif"
  | "en_attente"
  | "suspendu"
  | "en_transit"
  | "delivre"
  | "livre"
  | "bloque"
  | "valide"
  | "en_preparation"
  | "dedouane"
  | "active"
  | "resolue";

interface StatutBadgeProps {
  statut: Statut | string;
  label?: string;
}

const statutConfig: Record<string, { bg: string; text: string; label: string }> = {
  actif: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Actif",
  },
  inactif: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: "Inactif",
  },
  en_attente: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "En attente",
  },
  suspendu: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Suspendu",
  },
  en_transit: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "En transit",
  },
  delivre: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Livré",
  },
  livre: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Livré",
  },
  bloque: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Bloqué",
  },
  valide: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Validé",
  },
  en_preparation: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    label: "En préparation",
  },
  dedouane: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    label: "Dédouané",
  },
  active: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Active",
  },
  resolue: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Résolue",
  },
};

export function StatutBadge({ statut, label }: StatutBadgeProps) {
  const config = statutConfig[statut] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: statut,
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {label || config.label}
    </span>
  );
}
