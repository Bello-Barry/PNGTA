import { Cargaison } from "@/types";

export const CARGAISONS_MOCK: Cargaison[] = [
  {
    id: "cargo-001",
    reference: "CARGO-2024-001",
    type: "export",
    produit: "Cacao (Fèves fermentées)",
    quantite: 45,
    unite: "tonnes",
    origine: "Brazzaville",
    destination: "Douala, Cameroun",
    statut: "delivre",
    datePrevu: "2024-05-10",
    dateRelle: "2024-05-08",
    valeur: 96750000, // FCFA
  },
  {
    id: "cargo-002",
    reference: "CARGO-2024-002",
    type: "export",
    produit: "Café Robusta (Grains verts)",
    quantite: 28,
    unite: "tonnes",
    origine: "Brazzaville",
    destination: "Abidjan, Côte d'Ivoire",
    statut: "en_transit",
    datePrevu: "2024-05-15",
    valeur: 51800000,
  },
  {
    id: "cargo-003",
    reference: "CARGO-2024-003",
    type: "export",
    produit: "Manioc (Racine)",
    quantite: 120,
    unite: "tonnes",
    origine: "Pointe-Noire",
    destination: "Kinshasa, RDC",
    statut: "en_preparation",
    datePrevu: "2024-05-20",
    valeur: 54000000,
  },
  {
    id: "cargo-004",
    reference: "CARGO-2024-004",
    type: "export",
    produit: "Palmier à huile (Fruits)",
    quantite: 85,
    unite: "tonnes",
    origine: "Pointe-Noire",
    destination: "Libreville, Gabon",
    statut: "dedouane",
    datePrevu: "2024-05-12",
    valeur: 32300000,
  },
  {
    id: "cargo-005",
    reference: "CARGO-2024-005",
    type: "import",
    produit: "Engrais agricole NPK",
    quantite: 60,
    unite: "tonnes",
    origine: "Douala, Cameroun",
    destination: "Brazzaville",
    statut: "delivre",
    datePrevu: "2024-04-28",
    dateRelle: "2024-04-27",
    valeur: 18000000,
  },
  {
    id: "cargo-006",
    reference: "CARGO-2024-006",
    type: "import",
    produit: "Équipements agricoles",
    quantite: 25,
    unite: "tonnes",
    origine: "Abidjan, Côte d'Ivoire",
    destination: "Brazzaville",
    statut: "en_transit",
    datePrevu: "2024-05-18",
    valeur: 125000000,
  },
  {
    id: "cargo-007",
    reference: "CARGO-2024-007",
    type: "export",
    produit: "Banane plantain",
    quantite: 95,
    unite: "tonnes",
    origine: "Ouesso",
    destination: "Yaoundé, Cameroun",
    statut: "bloque",
    datePrevu: "2024-05-10",
    valeur: 27550000,
  },
  {
    id: "cargo-008",
    reference: "CARGO-2024-008",
    type: "export",
    produit: "Arachide (Grains)",
    quantite: 32,
    unite: "tonnes",
    origine: "Djambala",
    destination: "Bangui, RCA",
    statut: "en_preparation",
    datePrevu: "2024-05-25",
    valeur: 16640000,
  },
  {
    id: "cargo-009",
    reference: "CARGO-2024-009",
    type: "import",
    produit: "Semences certifiées",
    quantite: 8,
    unite: "tonnes",
    origine: "Nairobi, Kenya",
    destination: "Brazzaville",
    statut: "dedouane",
    datePrevu: "2024-05-14",
    valeur: 24000000,
  },
  {
    id: "cargo-010",
    reference: "CARGO-2024-010",
    type: "export",
    produit: "Maïs (Grains)",
    quantite: 67,
    unite: "tonnes",
    origine: "Brazzaville",
    destination: "Malabo, Guinée Équatoriale",
    statut: "delivre",
    datePrevu: "2024-05-05",
    dateRelle: "2024-05-04",
    valeur: 25460000,
  },
];

// Timeline events for a specific cargo
export const TIMELINE_EVENTS = [
  {
    step: "Déclaration",
    date: "2024-05-01",
    agent: "Moussa Traoré",
    comment: "Déclaration de la cargaison reçue",
  },
  {
    step: "Inspection",
    date: "2024-05-02",
    agent: "Amara Diallo",
    comment: "Inspection physique complétée - Conforme",
  },
  {
    step: "Dédouanement",
    date: "2024-05-03",
    agent: "Fatima Hassan",
    comment: "Clearance douanier approuvé",
  },
  {
    step: "Chargement",
    date: "2024-05-04",
    agent: "Pierre Moumbele",
    comment: "Cargaison chargée sur camion",
  },
  {
    step: "Transit",
    date: "2024-05-05",
    agent: "Système Tracking",
    comment: "En transit vers Douala",
  },
  {
    step: "Livraison",
    date: "2024-05-08",
    agent: "Réceptionnaire Douala",
    comment: "Cargaison reçue par destinataire",
  },
];

export const getCargoParType = (type: "export" | "import") => {
  return CARGAISONS_MOCK.filter((c) => c.type === type);
};

export const getCargoParStatut = (statut: Cargaison["statut"]) => {
  return CARGAISONS_MOCK.filter((c) => c.statut === statut);
};

export const getTotalValeurExports = () => {
  return CARGAISONS_MOCK.filter((c) => c.type === "export").reduce(
    (sum, c) => sum + c.valeur,
    0
  );
};

export const getTotalValeurImports = () => {
  return CARGAISONS_MOCK.filter((c) => c.type === "import").reduce(
    (sum, c) => sum + c.valeur,
    0
  );
};
