import { useMemo } from "react";
import { ALL_AGRICULTEURS } from "@/lib/mock-data/agriculteurs";
import { Agriculteur } from "@/types";

export interface StatsDepartement {
  nom: string;
  nombreAgriculteurs: number;
  productionTotale: number;
  surfaceTotale: number;
  culturesDominantes: string[];
  statutRepartition: {
    actif: number;
    inactif: number;
    suspendu: number;
  };
  agriculteurs: Agriculteur[];
}

export function useStatsDepartement(departement: string | null): StatsDepartement | null {
  return useMemo(() => {
    if (!departement) return null;

    const agriculteurs = ALL_AGRICULTEURS.filter(
      a => a.departement === departement
    );

    const productionTotale = agriculteurs.reduce(
      (sum, a) => sum + a.productionAnnuelleEstimee, 0
    );

    const surfaceTotale = agriculteurs.reduce(
      (sum, a) => sum + a.surfaceHectares, 0
    );

    // Top cultures : compter les occurrences
    const culturesCount: Record<string, number> = {};
    agriculteurs.forEach(a => {
      a.cultures.forEach(c => {
        culturesCount[c] = (culturesCount[c] || 0) + 1;
      });
    });

    const culturesDominantes = Object.entries(culturesCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([culture]) => culture);

    const statutRepartition = {
      actif: agriculteurs.filter(a => a.statut === "actif").length,
      inactif: agriculteurs.filter(a => a.statut === "inactif").length,
      suspendu: agriculteurs.filter(a => a.statut === "suspendu").length,
    };

    return {
      nom: departement,
      nombreAgriculteurs: agriculteurs.length,
      productionTotale,
      surfaceTotale: Math.round(surfaceTotale * 10) / 10,
      culturesDominantes,
      statutRepartition,
      agriculteurs,
    };
  }, [departement]);
}
