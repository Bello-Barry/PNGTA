"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAlertesActives } from "@/lib/mock-data";
import { AlertTriangle, AlertCircle, TrendingDown } from "lucide-react";

export function AlertesFeed() {
  const alertes = getAlertesActives().slice(0, 8);

  const getSeveriteColor = (severite: string) => {
    switch (severite) {
      case "haute":
        return "border-red-300 bg-red-50";
      case "moyenne":
        return "border-yellow-300 bg-yellow-50";
      default:
        return "border-blue-300 bg-blue-50";
    }
  };

  const getSeveriteIcon = (severite: string) => {
    switch (severite) {
      case "haute":
        return <AlertTriangle size={18} className="text-red-600" />;
      case "moyenne":
        return <AlertCircle size={18} className="text-yellow-600" />;
      default:
        return <TrendingDown size={18} className="text-blue-600" />;
    }
  };

  return (
    <div className="card">
      <h2 className="text-lg font-serif font-bold mb-4">Flux d'alertes actives</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alertes.map((alerte) => (
          <div
            key={alerte.id}
            className={`p-3 rounded-lg border-l-4 ${getSeveriteColor(
              alerte.severite
            )}`}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getSeveriteIcon(alerte.severite)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm">{alerte.titre}</h3>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {alerte.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-semibold text-primary">
                    {alerte.departement}
                  </span>
                  <span className="text-xs text-gray-500">{alerte.dateCreation}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
