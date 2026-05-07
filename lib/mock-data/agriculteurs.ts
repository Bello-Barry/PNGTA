import { Agriculteur } from "@/types";
import { DEPARTEMENTS, NOMS_AGRICULTEURS, CULTURES_PRINCIPALES, DISTRICTS_PAR_DEPARTEMENT } from "./geo";

function generateNGA(index: number): string {
  return `NGA-2024-${String(index + 1).padStart(6, "0")}`;
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDepartement(): string {
  return getRandomItem(DEPARTEMENTS);
}

function getRandomCultures(count: number = 2): string[] {
  const shuffled = [...CULTURES_PRINCIPALES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const AGRICULTEURS_MOCK: Agriculteur[] = [
  {
    id: "ag-001",
    numeroNational: "NGA-2024-000001",
    nom: "Jean-Baptiste Moukengué",
    departement: "Pool",
    district: "Kinkala",
    village: "Mbankolo",
    cultures: ["Manioc", "Maïs"],
    surfaceHectares: 15.5,
    productionAnnuelleEstimee: 85000,
    statut: "actif",
    dateEnregistrement: "2023-03-15",
    email: "jb.moukengue@agriculteur.congo",
    telephone: "+242 06 123 4567",
  },
  {
    id: "ag-002",
    numeroNational: "NGA-2024-000002",
    nom: "Marie-Claire Banzouzi",
    departement: "Bouenza",
    district: "Madingou",
    village: "Loumoula",
    cultures: ["Cacao", "Café Robusta"],
    surfaceHectares: 22.0,
    productionAnnuelleEstimee: 12500,
    statut: "actif",
    dateEnregistrement: "2023-06-20",
    email: "m.banzouzi@agriculteur.congo",
    telephone: "+242 06 234 5678",
  },
  {
    id: "ag-003",
    numeroNational: "NGA-2024-000003",
    nom: "Théophile Nkounkou",
    departement: "Cuvette",
    district: "Owando",
    village: "Ngamé",
    cultures: ["Banane plantain", "Taro"],
    surfaceHectares: 18.75,
    productionAnnuelleEstimee: 125000,
    statut: "actif",
    dateEnregistrement: "2023-05-10",
    email: "t.nkounkou@agriculteur.congo",
    telephone: "+242 06 345 6789",
  },
  {
    id: "ag-004",
    numeroNational: "NGA-2024-000004",
    nom: "Alphonsine Mbemba",
    departement: "Niari",
    district: "Dolisie",
    village: "Kamba",
    cultures: ["Tomate", "Gombo"],
    surfaceHectares: 8.25,
    productionAnnuelleEstimee: 35000,
    statut: "actif",
    dateEnregistrement: "2024-01-08",
    email: "a.mbemba@agriculteur.congo",
    telephone: "+242 06 456 7890",
  },
  {
    id: "ag-005",
    numeroNational: "NGA-2024-000005",
    nom: "Cyrille Mabondzo",
    departement: "Plateaux",
    district: "Djambala",
    village: "Kindamba",
    cultures: ["Maïs", "Arachide"],
    surfaceHectares: 25.0,
    productionAnnuelleEstimee: 125000,
    statut: "actif",
    dateEnregistrement: "2023-04-12",
    email: "c.mabondzo@agriculteur.congo",
    telephone: "+242 06 567 8901",
  },
  {
    id: "ag-006",
    numeroNational: "NGA-2024-000006",
    nom: "Joséphine Bikindou",
    departement: "Brazzaville",
    district: "Plateau",
    village: "Talangaï",
    cultures: ["Manioc", "Patate douce"],
    surfaceHectares: 12.0,
    productionAnnuelleEstimee: 65000,
    statut: "inactif",
    dateEnregistrement: "2023-02-28",
    email: "j.bikindou@agriculteur.congo",
    telephone: "+242 06 678 9012",
  },
  {
    id: "ag-007",
    numeroNational: "NGA-2024-000007",
    nom: "Prosper Nzaou",
    departement: "Kouilou",
    district: "Dolisie",
    village: "Mpinda",
    cultures: ["Palmier à huile", "Cacao"],
    surfaceHectares: 35.5,
    productionAnnuelleEstimee: 95000,
    statut: "actif",
    dateEnregistrement: "2023-07-19",
    email: "p.nzaou@agriculteur.congo",
    telephone: "+242 06 789 0123",
  },
  {
    id: "ag-008",
    numeroNational: "NGA-2024-000008",
    nom: "Cécile Loubassou",
    departement: "Lékoumou",
    district: "Sibiti",
    village: "Nkounkou",
    cultures: ["Igname", "Haricot"],
    surfaceHectares: 14.25,
    productionAnnuelleEstimee: 42000,
    statut: "actif",
    dateEnregistrement: "2023-08-05",
    email: "c.loubassou@agriculteur.congo",
    telephone: "+242 06 890 1234",
  },
  {
    id: "ag-009",
    numeroNational: "NGA-2024-000009",
    nom: "Gervais Mabiala",
    departement: "Cuvette-Ouest",
    district: "Ewo",
    village: "Mbandaka",
    cultures: ["Maïs", "Banane plantain"],
    surfaceHectares: 19.5,
    productionAnnuelleEstimee: 105000,
    statut: "suspendu",
    dateEnregistrement: "2023-09-14",
    email: "g.mabiala@agriculteur.congo",
    telephone: "+242 06 901 2345",
  },
  {
    id: "ag-010",
    numeroNational: "NGA-2024-000010",
    nom: "Thérèse Nguimbi",
    departement: "Pointe-Noire",
    district: "Ounda",
    village: "Nkeni",
    cultures: ["Tomate", "Aubergine africaine"],
    surfaceHectares: 6.75,
    productionAnnuelleEstimee: 28000,
    statut: "actif",
    dateEnregistrement: "2024-02-01",
    email: "t.nguimbi@agriculteur.congo",
    telephone: "+242 06 012 3456",
  },
];

// Generate additional 40 agriculteurs for realistic data
function generateAdditionalAgriculteurs(): Agriculteur[] {
  const agriculteurs: Agriculteur[] = [];
  for (let i = AGRICULTEURS_MOCK.length; i < 50; i++) {
    const nom = getRandomItem(NOMS_AGRICULTEURS);
    const dept = getRandomDepartement();
    agriculteurs.push({
      id: `ag-${String(i + 1).padStart(3, "0")}`,
      numeroNational: generateNGA(i),
      nom: nom,
      departement: dept,
      district: getRandomItem(
        DISTRICTS_PAR_DEPARTEMENT[dept as keyof typeof DISTRICTS_PAR_DEPARTEMENT] ?? ["District Central"]
      ),
      village: `Village ${i}`,
      cultures: getRandomCultures(),
      surfaceHectares: Math.round((Math.random() * 40 + 5) * 10) / 10,
      productionAnnuelleEstimee: Math.round(Math.random() * 150000 + 20000),
      statut: ["actif", "inactif", "suspendu"][
        Math.floor(Math.random() * 3)
      ] as "actif" | "inactif" | "suspendu",
      dateEnregistrement: new Date(
        2023 + Math.random(),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      )
        .toISOString()
        .split("T")[0],
      email: `agriculteur.${i}@congo.cg`,
      telephone: `+242 06 ${String(Math.floor(Math.random() * 1000000)).padStart(6, "0")}`,
    });
  }
  return agriculteurs;
}

export const ALL_AGRICULTEURS = [
  ...AGRICULTEURS_MOCK,
  ...generateAdditionalAgriculteurs(),
];
