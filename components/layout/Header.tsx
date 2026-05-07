"use client";

import { ChevronRight, Radio } from "lucide-react";
import { usePathname } from "next/navigation";

const breadcrumbMap: Record<string, string[]> = {
  "/dashboard": ["Tableau de bord"],
  "/agriculteurs": ["Registre", "Agriculteurs"],
  "/marche": ["Marché", "Produits agricoles"],
  "/export-import": ["Logistique", "Export-Import"],
  "/cartographie": ["Cartographie", "Carte agricole"],
  "/analytique": ["Analytique", "Tendances"],
  "/mobile": ["Terrain", "Application mobile"],
};

export function Header() {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbMap[pathname] || ["Page"];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-20">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Ministry logo placeholder */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">🇨🇬</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  République du Congo
                </p>
                <p className="text-sm font-bold text-primary">
                  Ministère de l'Agriculture
                </p>
              </div>
            </div>
          </div>
          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 ml-6">
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx > 0 && <ChevronRight size={16} className="text-gray-300" />}
                <span className={idx === breadcrumbs.length - 1 ? "font-bold text-primary" : "text-gray-500 text-sm"}>
                  {crumb}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <Radio size={14} className="text-green-600 animate-pulse" />
            <span className="text-xs font-medium text-green-700">EN DIRECT</span>
          </div>
          <div className="text-xs text-gray-500">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
