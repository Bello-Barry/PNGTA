export interface DepartementSVG {
  id: string;
  nom: string;
  path: string;
  centroid: { x: number; y: number };
  couleurDefaut?: string;
}

// Carte fidèle au Congo-Brazzaville réel
// Le pays s'étend du nord (Likouala/Sangha) vers le sud (Kouilou/Pool)
// Frontières : Cameroun/RCA au nord, RDC à l'est, Gabon à l'ouest, Angola au sud
export const DEPARTEMENTS_SVG: DepartementSVG[] = [
  {
    id: "Likouala",
    nom: "Likouala",
    // Nord-est : grand département forestier
    path: "M 320 30 L 460 25 L 470 90 L 440 140 L 390 160 L 340 150 L 310 110 L 295 70 Z",
    centroid: { x: 385, y: 90 },
  },
  {
    id: "Sangha",
    nom: "Sangha",
    // Nord-ouest : frontière Cameroun
    path: "M 120 20 L 295 30 L 310 110 L 275 130 L 230 120 L 160 110 L 110 80 Z",
    centroid: { x: 215, y: 75 },
  },
  {
    id: "Cuvette",
    nom: "Cuvette",
    // Centre-nord : autour d'Owando
    path: "M 230 120 L 340 150 L 355 210 L 320 250 L 265 255 L 220 240 L 200 190 L 215 145 Z",
    centroid: { x: 280, y: 195 },
  },
  {
    id: "Cuvette-Ouest",
    nom: "Cuvette-Ouest",
    // Centre-ouest : autour d'Ewo
    path: "M 110 80 L 230 120 L 215 145 L 200 190 L 155 200 L 100 175 L 85 130 Z",
    centroid: { x: 158, y: 148 },
  },
  {
    id: "Plateaux",
    nom: "Plateaux",
    // Centre : autour de Djambala
    path: "M 200 190 L 265 255 L 270 310 L 240 340 L 190 335 L 155 310 L 148 260 L 155 200 Z",
    centroid: { x: 210, y: 270 },
  },
  {
    id: "Bouenza",
    nom: "Bouenza",
    // Sud-centre : autour de Madingou/Nkayi
    path: "M 155 310 L 240 340 L 245 385 L 210 410 L 165 405 L 135 370 L 138 330 Z",
    centroid: { x: 190, y: 365 },
  },
  {
    id: "Lékoumou",
    nom: "Lékoumou",
    // Sud-ouest intérieur : autour de Sibiti
    path: "M 100 295 L 155 310 L 138 370 L 105 385 L 72 360 L 70 315 Z",
    centroid: { x: 108, y: 345 },
  },
  {
    id: "Niari",
    nom: "Niari",
    // Sud-ouest : autour de Dolisie
    path: "M 50 330 L 100 295 L 105 385 L 95 430 L 60 445 L 35 415 L 32 370 Z",
    centroid: { x: 72, y: 385 },
  },
  {
    id: "Kouilou",
    nom: "Kouilou",
    // Extrême sud-ouest, côte Atlantique
    path: "M 25 430 L 60 445 L 65 490 L 45 510 L 18 500 L 15 465 Z",
    centroid: { x: 40, y: 472 },
  },
  {
    id: "Pointe-Noire",
    nom: "Pointe-Noire",
    // Enclave côtière : petite ville portuaire
    path: "M 15 465 L 45 460 L 48 490 L 18 495 Z",
    centroid: { x: 32, y: 478 },
  },
  {
    id: "Pool",
    nom: "Pool",
    // Sud-est : autour de Kinkala, jouxte Brazzaville
    path: "M 240 340 L 320 345 L 355 390 L 340 440 L 280 460 L 210 450 L 195 415 L 210 410 L 245 385 Z",
    centroid: { x: 278, y: 405 },
  },
  {
    id: "Brazzaville",
    nom: "Brazzaville",
    // Capitale : petit département au bord du fleuve Congo
    path: "M 320 345 L 365 348 L 372 390 L 355 395 L 340 440 L 320 435 L 310 390 Z",
    centroid: { x: 340, y: 388 },
  },
];

// Coordonnées du viewBox pour centrer la carte
export const CARTE_VIEWBOX = "0 0 500 540";
export const CARTE_ASPECT_RATIO = "500/540";
