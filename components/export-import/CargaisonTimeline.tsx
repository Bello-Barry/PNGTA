"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
   
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";

interface TimelineEvent {
  step: string;
  date: string;
  agent: string;
  comment: string;
  completed?: boolean;
}

interface CargaisonTimelineProps {
  events: TimelineEvent[];
}

/**
 * Normalise les étapes pour éviter les erreurs de mapping
 */
const normalizeStep = (step: string) =>
  step
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, ""); // enlève accents (Dédouanement → dedouanement)

/**
 * Mapping robuste des icônes
 */
const ICON_MAP: Record<string, LucideIcon> = {
  declaration: Clock,
  inspection: ShieldCheck,
  dedouanement: ShieldCheck,
  chargement: Truck,
  transit: MapPin,
  livraison: CheckCircle2,
};

export function CargaisonTimeline({ events }: CargaisonTimelineProps) {
  return (
    <div className="space-y-8">
      {events.map((event, idx) => {
        const key = normalizeStep(event.step);
        const Icon = ICON_MAP[key] ?? Circle;
        const isLast = idx === events.length - 1;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: idx * 0.05 }}
            className="relative flex gap-6 group"
          >
            {!isLast && (
              <div className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-border group-hover:bg-primary/30 transition-colors" />
            )}

            {/* ICON */}
            <div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                event.completed !== false
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white border-border text-text-muted"
              }`}
            >
              <Icon size={18} />
            </div>

            {/* CONTENT */}
            <div className="flex-1 pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 gap-1">
                <h4 className="font-bold text-text-primary text-sm uppercase tracking-wide">
                  {event.step}
                </h4>

                <span className="text-[10px] font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                  {event.date}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full bg-surface border border-border flex items-center justify-center">
                  <span className="text-[8px] font-bold text-text-muted">
                    {event.agent?.[0] ?? "A"}
                  </span>
                </div>
                <span className="text-[11px] text-text-muted font-medium">
                  Agent: {event.agent}
                </span>
              </div>

              <div className="p-3 bg-surface rounded-xl border border-border group-hover:border-primary/20 transition-all">
                <p className="text-xs text-text-primary leading-relaxed">
                  {event.comment}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}