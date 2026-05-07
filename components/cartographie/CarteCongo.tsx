"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { TOP_DEPARTEMENTS_PRODUCTEURS } from "@/lib/mock-data/statistiques";
import { motion } from "framer-motion";

// URL du TopoJSON pour les départements du Congo
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/congo/congo-brazzaville-departments.json";

function getDeptColor(production: number, maxProduction: number) {
  const ratio = Math.min(Math.max(production / maxProduction, 0), 1);
  // Interpolation entre #E5EBE6 (229, 235, 230) et #1B4D2E (27, 77, 46)
  const r = Math.round(229 + (27 - 229) * ratio);
  const g = Math.round(235 + (77 - 235) * ratio);
  const b = Math.round(230 + (46 - 230) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

interface CarteCongoProps {
  onSelectDept: (deptName: string) => void;
  selectedDept: string;
}

export function CarteCongo({ onSelectDept, selectedDept }: CarteCongoProps) {
  const [tooltipContent, setTooltipContent] = useState("");
  const maxProduction = Math.max(...TOP_DEPARTEMENTS_PRODUCTEURS.map((d) => d.production));

  return (
    <div className="relative w-full h-full min-h-[500px] bg-blue-50 rounded-2xl border border-border overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 2500,
          center: [15, -1],
        }}
        className="w-full h-full"
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const deptName = geo.properties.NAME_1;
                const deptData = TOP_DEPARTEMENTS_PRODUCTEURS.find(
                  (d) => d.dept === deptName
                );
                const isSelected = selectedDept === deptName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(
                        `${deptName}: ${
                          deptData
                            ? deptData.production.toLocaleString() + " T"
                            : "Pas de données"
                        }`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => onSelectDept(deptName)}
                    style={{
                      default: {
                        fill: deptData ? getDeptColor(deptData.production, maxProduction) : "#F3F4F6",
                        stroke: isSelected ? "#C9922A" : "#FFFFFF",
                        strokeWidth: isSelected ? 2 : 0.5,
                        outline: "none",
                        transition: "all 250ms",
                      },
                      hover: {
                        fill: "#C9922A",
                        stroke: "#FFFFFF",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#0F2D1C",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltipContent && (
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg border border-border z-20">
          <p className="text-sm font-bold text-primary">{tooltipContent}</p>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-white p-3 rounded-xl border border-border shadow-sm">
        <h4 className="text-xs font-bold text-primary uppercase mb-2">Légende</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#1B4D2E]" />
            <span className="text-[10px]">Production Élevée</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#E5EBE6]" />
            <span className="text-[10px]">Production Faible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
