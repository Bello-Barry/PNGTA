"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { EVOLUTION_PRODUCTION_CULTURE } from "@/lib/mock-data/statistiques";

const COLORS = ["#1B4D2E", "#2D6A42", "#C9922A", "#E8B84B", "#16A34A", "#3B82F6"];

export function TendanceChart() {
  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-3xl border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-primary">Analyse des Tendances</h3>
        <p className="text-xs text-text-muted italic">Évolution comparative de la production (Volume en Tonnes)</p>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={EVOLUTION_PRODUCTION_CULTURE}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EBE6" />
          <XAxis 
            dataKey="mois" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 11 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 11 }}
            tickFormatter={(val) => `${val / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#FFFFFF", 
              border: "1px solid #E5EBE6", 
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
            }}
          />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ paddingBottom: "20px" }}
          />
          <Line type="monotone" dataKey="manioc" name="Manioc" stroke={COLORS[0]} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="mais" name="Maïs" stroke={COLORS[1]} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="cacao" name="Cacao" stroke={COLORS[2]} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="cafe" name="Café" stroke={COLORS[3]} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="palmier" name="Palmier" stroke={COLORS[4]} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
