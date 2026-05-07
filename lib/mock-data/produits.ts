import { ProduitMarche } from "@/types";

export const PRODUITS_MARCHE_MOCK: ProduitMarche[] = [
  {
    id: "prod-001",
    nom: "Manioc (Racine)",
    categorie: "vivrier",
    prixActuel: 450,
    variation: 2.5,
    stockDisponible: 15000,
    departementOrigine: "Pool",
    vendeurId: "ag-001",
    vendeurNom: "Jean-Baptiste Moukengué",
    dateMillesime: "2024-05",
  },
  {
    id: "prod-002",
    nom: "Maïs (Grains)",
    categorie: "vivrier",
    prixActuel: 380,
    variation: -1.2,
    stockDisponible: 8500,
    departementOrigine: "Plateaux",
    vendeurId: "ag-005",
    vendeurNom: "Cyrille Mabondzo",
    dateMillesime: "2024-04",
  },
  {
    id: "prod-003",
    nom: "Arachide (Grains)",
    categorie: "vivrier",
    prixActuel: 520,
    variation: 0.8,
    stockDisponible: 4200,
    departementOrigine: "Plateaux",
    vendeurId: "ag-005",
    vendeurNom: "Cyrille Mabondzo",
    dateMillesime: "2024-05",
  },
  {
    id: "prod-004",
    nom: "Banane Plantain",
    categorie: "vivrier",
    prixActuel: 290,
    variation: 3.1,
    stockDisponible: 12000,
    departementOrigine: "Cuvette",
    vendeurId: "ag-003",
    vendeurNom: "Théophile Nkounkou",
    dateMillesime: "2024-05",
  },
  {
    id: "prod-005",
    nom: "Cacao (Fèves fermentées)",
    categorie: "cultures_rente",
    prixActuel: 2150,
    variation: 5.3,
    stockDisponible: 2100,
    departementOrigine: "Bouenza",
    vendeurId: "ag-002",
    vendeurNom: "Marie-Claire Banzouzi",
    dateMillesime: "2024-03",
  },
  {
    id: "prod-006",
    nom: "Café Robusta (Grains verts)",
    categorie: "cultures_rente",
    prixActuel: 1850,
    variation: -0.5,
    stockDisponible: 850,
    departementOrigine: "Bouenza",
    vendeurId: "ag-002",
    vendeurNom: "Marie-Claire Banzouzi",
    dateMillesime: "2024-02",
  },
  {
    id: "prod-007",
    nom: "Palmier à huile (Fruits)",
    categorie: "cultures_rente",
    prixActuel: 380,
    variation: 1.2,
    stockDisponible: 18000,
    departementOrigine: "Kouilou",
    vendeurId: "ag-007",
    vendeurNom: "Prosper Nzaou",
    dateMillesime: "2024-05",
  },
  {
    id: "prod-008",
    nom: "Tomate",
    categorie: "maraichage",
    prixActuel: 650,
    variation: 4.2,
    stockDisponible: 3500,
    departementOrigine: "Niari",
    vendeurId: "ag-004",
    vendeurNom: "Alphonsine Mbemba",
    dateMillesime: "2024-05",
  },
  {
    id: "prod-009",
    nom: "Gombo",
    categorie: "maraichage",
    prixActuel: 580,
    variation: 2.0,
    stockDisponible: 1800,
    departementOrigine: "Niari",
    vendeurId: "ag-004",
    vendeurNom: "Alphonsine Mbemba",
    dateMillesime: "2024-05",
  },
  {
    id: "prod-010",
    nom: "Aubergine africaine",
    categorie: "maraichage",
    prixActuel: 420,
    variation: -2.1,
    stockDisponible: 1200,
    departementOrigine: "Brazzaville",
    vendeurId: "ag-006",
    vendeurNom: "Joséphine Bikindou",
    dateMillesime: "2024-05",
  },
  {
    id: "prod-011",
    nom: "Patate douce",
    categorie: "vivrier",
    prixActuel: 320,
    variation: 0.3,
    stockDisponible: 5600,
    departementOrigine: "Brazzaville",
    vendeurId: "ag-006",
    vendeurNom: "Joséphine Bikindou",
    dateMillesime: "2024-04",
  },
  {
    id: "prod-012",
    nom: "Igname",
    categorie: "vivrier",
    prixActuel: 280,
    variation: -0.8,
    stockDisponible: 2200,
    departementOrigine: "Lékoumou",
    vendeurId: "ag-008",
    vendeurNom: "Cécile Loubassou",
    dateMillesime: "2024-04",
  },
];

export const getProduitsParCategorie = (categorie: string) => {
  return PRODUITS_MARCHE_MOCK.filter((p) => p.categorie === categorie);
};

export const getTopProduitsDemandes = (limit: number = 5) => {
  return PRODUITS_MARCHE_MOCK.slice(0, limit);
};

export const getTopVendeurs = (limit: number = 3) => {
  const vendeurs = new Map<string, { nom: string; count: number }>();
  PRODUITS_MARCHE_MOCK.forEach((produit) => {
    if (!vendeurs.has(produit.vendeurId)) {
      vendeurs.set(produit.vendeurId, {
        nom: produit.vendeurNom,
        count: 0,
      });
    }
    const current = vendeurs.get(produit.vendeurId)!;
    current.count++;
  });
  return Array.from(vendeurs.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};
