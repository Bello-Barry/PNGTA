import { Alerte } from "@/types";

export const ALERTES_MOCK: Alerte[] = [
  {
    id: "alert-001",
    type: "secheresse",
    titre: "Sécheresse sévère - Pool",
    description:
      "Conditions de sécheresse anormales signalées dans la région de Pool. Risque d'impact sur les rendements de manioc.",
    severite: "haute",
    departement: "Pool",
    dateCreation: "2024-05-06",
    statut: "active",
  },
  {
    id: "alert-002",
    type: "prix_anormal",
    titre: "Baisse de prix - Café Robusta",
    description:
      "Prix du café Robusta en baisse de 8.5% par rapport à la semaine précédente. Vérifier l'état du marché international.",
    severite: "moyenne",
    departement: "Bouenza",
    dateCreation: "2024-05-05",
    statut: "active",
  },
  {
    id: "alert-003",
    type: "stock_critique",
    titre: "Stock critique - Cacao",
    description:
      "Stock de cacao en dessous du seuil minimum. Besoin d'une déclaration urgente de nouvelles récoltes.",
    severite: "haute",
    departement: "Bouenza",
    dateCreation: "2024-05-04",
    statut: "active",
  },
  {
    id: "alert-004",
    type: "logistique",
    titre: "Cargaison bloquée - Banane plantain",
    description:
      "Cargaison CARGO-2024-007 bloquée à la douane de Yaoundé. Documents manquants pour clearance.",
    severite: "haute",
    departement: "Cuvette",
    dateCreation: "2024-05-06",
    statut: "active",
  },
  {
    id: "alert-005",
    type: "prix_anormal",
    titre: "Hausse de prix - Manioc",
    description:
      "Prix du manioc en hausse de 12% en 2 semaines. Opportunité commerciale pour les producteurs.",
    severite: "basse",
    departement: "Pool",
    dateCreation: "2024-05-03",
    statut: "active",
  },
  {
    id: "alert-006",
    type: "stock_critique",
    titre: "Stock critique - Semences",
    description: "Semences certifiées en quantité insuffisante pour la campagne. Importer d'urgence.",
    severite: "haute",
    departement: "Brazzaville",
    dateCreation: "2024-05-02",
    statut: "resolue",
  },
  {
    id: "alert-007",
    type: "secheresse",
    titre: "Alerte eau - Niari",
    description:
      "Ressources en eau limitées. Favoriser les cultures tolérantes à la sécheresse dans la région.",
    severite: "moyenne",
    departement: "Niari",
    dateCreation: "2024-05-01",
    statut: "active",
  },
  {
    id: "alert-008",
    type: "logistique",
    titre: "Retard de livraison - Équipements",
    description:
      "Équipements agricoles en retard de 3 jours. Impact attendu sur la saison des semis.",
    severite: "moyenne",
    departement: "Plateaux",
    dateCreation: "2024-05-05",
    statut: "active",
  },
  {
    id: "alert-009",
    type: "prix_anormal",
    titre: "Stabilité des prix - Maïs",
    description: "Prix du maïs stable cette semaine. Bon moment pour vendre.",
    severite: "basse",
    departement: "Plateaux",
    dateCreation: "2024-05-06",
    statut: "active",
  },
  {
    id: "alert-010",
    type: "stock_critique",
    titre: "Stock normal - Tomate",
    description:
      "Stocks de tomate au niveau normal. Production en ligne avec la demande.",
    severite: "basse",
    departement: "Niari",
    dateCreation: "2024-05-06",
    statut: "active",
  },
  {
    id: "alert-011",
    type: "secheresse",
    titre: "Pluies attendues - Cuvette",
    description: "Conditions pluvieuses attendues cette semaine à la Cuvette.",
    severite: "basse",
    departement: "Cuvette",
    dateCreation: "2024-05-04",
    statut: "resolue",
  },
  {
    id: "alert-012",
    type: "logistique",
    titre: "Transport fluide - Manioc",
    description: "Exportation de manioc se déroulant sans problème vers Kinshasa.",
    severite: "basse",
    departement: "Pool",
    dateCreation: "2024-05-06",
    statut: "active",
  },
];

export const getAlertesActives = () => {
  return ALERTES_MOCK.filter((a) => a.statut === "active");
};

export const getAlertesByType = (type: Alerte["type"]) => {
  return ALERTES_MOCK.filter((a) => a.type === type);
};

export const getAlertesBySeverite = (severite: Alerte["severite"]) => {
  return ALERTES_MOCK.filter((a) => a.severite === severite);
};

export const getCountByType = () => {
  const counts = {
    secheresse: 0,
    prix_anormal: 0,
    stock_critique: 0,
    logistique: 0,
  };
  ALERTES_MOCK.forEach((alert) => {
    counts[alert.type]++;
  });
  return counts;
};
