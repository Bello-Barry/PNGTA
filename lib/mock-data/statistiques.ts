import { StatistiqueMensuelle, KPIData } from "@/types";

export const STATISTIQUES_MENSUELLES: StatistiqueMensuelle[] = [
  {
    mois: "juin 2023",
    production: 95000,
    export: 1200000,
    import: 850000,
    prix: 450,
  },
  {
    mois: "juillet 2023",
    production: 108000,
    export: 1420000,
    import: 920000,
    prix: 460,
  },
  {
    mois: "août 2023",
    production: 125000,
    export: 1650000,
    import: 1100000,
    prix: 480,
  },
  {
    mois: "septembre 2023",
    production: 140000,
    export: 1890000,
    import: 1250000,
    prix: 510,
  },
  {
    mois: "octobre 2023",
    production: 155000,
    export: 2100000,
    import: 1400000,
    prix: 530,
  },
  {
    mois: "novembre 2023",
    production: 165000,
    export: 2300000,
    import: 1550000,
    prix: 540,
  },
  {
    mois: "décembre 2023",
    production: 172000,
    export: 2450000,
    import: 1680000,
    prix: 560,
  },
  {
    mois: "janvier 2024",
    production: 145000,
    export: 2100000,
    import: 1450000,
    prix: 520,
  },
  {
    mois: "février 2024",
    production: 138000,
    export: 1950000,
    import: 1350000,
    prix: 500,
  },
  {
    mois: "mars 2024",
    production: 152000,
    export: 2200000,
    import: 1550000,
    prix: 530,
  },
  {
    mois: "avril 2024",
    production: 168000,
    export: 2400000,
    import: 1750000,
    prix: 560,
  },
  {
    mois: "mai 2024",
    production: 182000,
    export: 2650000,
    import: 1920000,
    prix: 580,
  },
];

export const KPI_DASHBOARD: KPIData = {
  totalAgriculteurs: 47382,
  productionNationale: 1284500, // tonnes
  valeurExports: 4200000000, // FCFA (4,2 milliards)
  alertesActives: 12,
  tauxValidation: 94.6,
};

export const PRODUCTION_PAR_CULTURE = [
  { culture: "Manioc", production: 425000, pourcentage: 33.1 },
  { culture: "Maïs", production: 185000, pourcentage: 14.4 },
  { culture: "Banane plantain", production: 242000, pourcentage: 18.8 },
  { culture: "Cacao", production: 95000, pourcentage: 7.4 },
  { culture: "Palmier à huile", production: 165000, pourcentage: 12.8 },
  { culture: "Autres", production: 172500, pourcentage: 13.5 },
];

export const TOP_DEPARTEMENTS_PRODUCTEURS = [
  { dept: "Pool", production: 185000, agriculteurs: 3850 },
  { dept: "Bouenza", production: 175000, agriculteurs: 3620 },
  { dept: "Cuvette", production: 165000, agriculteurs: 3380 },
  { dept: "Kouilou", production: 155000, agriculteurs: 3120 },
  { dept: "Plateaux", production: 142000, agriculteurs: 2920 },
];

export const REVENUS_PAR_DEPARTEMENT = [
  { dept: "Brazzaville", revenus: 520000000 },
  { dept: "Pointe-Noire", revenus: 480000000 },
  { dept: "Bouenza", revenus: 620000000 },
  { dept: "Cuvette", revenus: 480000000 },
  { dept: "Cuvette-Ouest", revenus: 350000000 },
  { dept: "Kouilou", revenus: 580000000 },
  { dept: "Lékoumou", revenus: 280000000 },
  { dept: "Likouala", revenus: 210000000 },
  { dept: "Niari", revenus: 450000000 },
  { dept: "Plateaux", revenus: 520000000 },
  { dept: "Pool", revenus: 680000000 },
  { dept: "Sangha", revenus: 190000000 },
];

export const COMPARAISON_EXPORT_IMPORT_MENSUEL = [
  { mois: "juin", export: 1200000, import: 850000 },
  { mois: "juillet", export: 1420000, import: 920000 },
  { mois: "août", export: 1650000, import: 1100000 },
  { mois: "septembre", export: 1890000, import: 1250000 },
  { mois: "octobre", export: 2100000, import: 1400000 },
  { mois: "novembre", export: 2300000, import: 1550000 },
  { mois: "décembre", export: 2450000, import: 1680000 },
  { mois: "janvier", export: 2100000, import: 1450000 },
  { mois: "février", export: 1950000, import: 1350000 },
  { mois: "mars", export: 2200000, import: 1550000 },
  { mois: "avril", export: 2400000, import: 1750000 },
  { mois: "mai", export: 2650000, import: 1920000 },
];

export const EVOLUTION_PRODUCTION_CULTURE = [
  {
    mois: "juin",
    manioc: 31000,
    mais: 14000,
    cacao: 7500,
    cafe: 6500,
    palmier: 12000,
  },
  {
    mois: "juillet",
    manioc: 35200,
    mais: 16000,
    cacao: 8200,
    cafe: 7000,
    palmier: 13500,
  },
  {
    mois: "août",
    manioc: 40500,
    mais: 18500,
    cacao: 9200,
    cafe: 7800,
    palmier: 15000,
  },
  {
    mois: "septembre",
    manioc: 45000,
    mais: 20500,
    cacao: 10200,
    cafe: 8500,
    palmier: 16500,
  },
  {
    mois: "octobre",
    manioc: 50000,
    mais: 23000,
    cacao: 11500,
    cafe: 9200,
    palmier: 18200,
  },
  {
    mois: "novembre",
    manioc: 53500,
    mais: 25000,
    cacao: 12500,
    cafe: 10000,
    palmier: 19500,
  },
  {
    mois: "décembre",
    manioc: 56000,
    mais: 26500,
    cacao: 13500,
    cafe: 10800,
    palmier: 20500,
  },
  {
    mois: "janvier",
    manioc: 46500,
    mais: 21000,
    cacao: 11000,
    cafe: 8800,
    palmier: 16500,
  },
  {
    mois: "février",
    manioc: 44000,
    mais: 20000,
    cacao: 10500,
    cafe: 8200,
    palmier: 15800,
  },
  {
    mois: "mars",
    manioc: 49000,
    mais: 22500,
    cacao: 11500,
    cafe: 9200,
    palmier: 17500,
  },
  {
    mois: "avril",
    manioc: 54000,
    mais: 25000,
    cacao: 12800,
    cafe: 10200,
    palmier: 19000,
  },
  {
    mois: "mai",
    manioc: 58500,
    mais: 27000,
    cacao: 14000,
    cafe: 11200,
    palmier: 21000,
  },
];

export const PRIX_MOYENS_CULTURE = [
  { culture: "Manioc", prixMoyen: 450, tendance: "stable" },
  { culture: "Maïs", prixMoyen: 380, tendance: "baisse" },
  { culture: "Cacao", prixMoyen: 2150, tendance: "hausse" },
  { culture: "Café Robusta", prixMoyen: 1850, tendance: "baisse" },
  { culture: "Palmier à huile", prixMoyen: 380, tendance: "hausse" },
];

export const VARIATION_PRODUCTION_YOY = [
  { culture: "Manioc", variation: 8.5 },
  { culture: "Maïs", variation: 12.3 },
  { culture: "Banane plantain", variation: 6.8 },
  { culture: "Cacao", variation: 15.2 },
  { culture: "Café Robusta", variation: -3.5 },
  { culture: "Palmier à huile", variation: 9.4 },
];
