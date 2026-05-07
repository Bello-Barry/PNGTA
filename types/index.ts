// Agriculteur types
export interface Agriculteur {
  id: string;
  numeroNational: string;
  nom: string;
  departement: string;
  district: string;
  village?: string;
  cultures: string[];
  surfaceHectares: number;
  productionAnnuelleEstimee: number;
  statut: "actif" | "inactif" | "suspendu";
  dateEnregistrement: string;
  email?: string;
  telephone?: string;
  avatar?: string;
}

// Produit Marché
export interface ProduitMarche {
  id: string;
  nom: string;
  categorie: "vivrier" | "cultures_rente" | "maraichage" | "elevage";
  prixActuel: number; // FCFA/kg
  variation: number; // percentage
  stockDisponible: number; // kg
  departementOrigine: string;
  vendeurId: string;
  vendeurNom: string;
  dateMillesime?: string;
}

// Cargaison
export interface Cargaison {
  id: string;
  reference: string;
  type: "export" | "import";
  produit: string;
  quantite: number; // tonnes
  unite: "tonnes" | "kg";
  origine: string;
  destination: string;
  statut: "en_preparation" | "en_transit" | "dedouane" | "livre" | "bloque";
  datePrevu: string;
  dateRelle?: string;
  valeur: number; // FCFA
}

// Alerte
export interface Alerte {
  id: string;
  type: "secheresse" | "prix_anormal" | "stock_critique" | "logistique";
  titre: string;
  description: string;
  severite: "basse" | "moyenne" | "haute";
  departement: string;
  dateCreation: string;
  statut: "active" | "resolue";
}

// Statistiques
export interface StatistiqueMensuelle {
  mois: string;
  production: number;
  export: number;
  import: number;
  prix?: number;
}

export interface KPIData {
  totalAgriculteurs: number;
  productionNationale: number;
  valeurExports: number;
  alertesActives: number;
  tauxValidation?: number;
}
