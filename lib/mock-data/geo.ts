export const DEPARTEMENTS = [
  "Brazzaville",
  "Pointe-Noire",
  "Bouenza",
  "Cuvette",
  "Cuvette-Ouest",
  "Kouilou",
  "Lékoumou",
  "Likouala",
  "Niari",
  "Plateaux",
  "Pool",
  "Sangha",
];

export const DISTRICTS_PAR_DEPARTEMENT: Record<string, string[]> = {
  Brazzaville: ["Cité verte", "Plateau", "Bacongo", "Talangaï"],
  "Pointe-Noire": ["Ounda", "Maluku", "Côte Matève", "Tié-Tié"],
  Bouenza: ["Madingou", "Nkayi", "Loudima", "Mouyondzi"],
  Cuvette: ["Owando", "Makoua", "Boundji", "Oyo"],
  "Cuvette-Ouest": ["Ewo", "Okoyo", "Linzolo", "Enyelle"],
  Kouilou: ["Dolisie", "Mossendjo", "Kibangou", "Kimongo"],
  Lékoumou: ["Sibiti", "Makabana", "Komono", "Bambama"],
  Likouala: ["Impfondo", "Epena", "Betou", "Dongou"],
  Niari: ["Loubomo", "Mossendjo", "Goma-Tsé-Tsé", "Kibangou"],
  Plateaux: ["Djambala", "Lékana", "Gamboma", "Abala"],
  Pool: ["Kinkala", "Mindouli", "Kibangou", "Goma-Tsé-Tsé"],
  Sangha: ["Ouésso", "Poloko", "Mambili", "Iyela"],
};

export const CULTURES_PRINCIPALES = [
  "Manioc",
  "Maïs",
  "Arachide",
  "Banane plantain",
  "Igname",
  "Taro",
  "Patate douce",
  "Haricot",
  "Cacao",
  "Café Robusta",
  "Palmier à huile",
  "Piment",
  "Aubergine africaine",
  "Gombo",
  "Tomate",
];

export const CATEGORIES_PRODUITS = [
  "vivrier",
  "cultures_rente",
  "maraichage",
  "elevage",
] as const;

export const MONNAIE = "FCFA";
export const DEVISE_CODE = "XAF";

export const NOMS_AGRICULTEURS = [
  "Jean-Baptiste Moukengué",
  "Marie-Claire Banzouzi",
  "Théophile Nkounkou",
  "Alphonsine Mbemba",
  "Cyrille Mabondzo",
  "Joséphine Bikindou",
  "Prosper Nzaou",
  "Cécile Loubassou",
  "Gervais Mabiala",
  "Thérèse Nguimbi",
  "Henri Mikaya",
  "Marguerite Mouamba",
  "Samuel Biboumba",
  "Josephine Likembe",
  "Claude Makosso",
  "Denise Makouala",
  "Georges Moupali",
  "Suzanne Ntsonde",
  "Albert Nkounkou",
  "Bernadette Ondandy",
];
