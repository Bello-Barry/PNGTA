"use client";

import { motion } from "framer-motion";

interface QrCodeBadgeProps {
  value: string;
  size?: number;
}

export function QrCodeBadge({ value, size = 120 }: QrCodeBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white border-2 border-primary rounded-2xl shadow-sm">
      <div 
        className="relative bg-white p-2"
        style={{ width: size, height: size }}
      >
        {/* Mock QR Code Grid */}
        <div className="grid grid-cols-10 gap-0 w-full h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className={`${
                Math.random() > 0.4 ? "bg-primary" : "bg-white"
              }`}
            />
          ))}
        </div>
        
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-1/4 h-1/4 border-4 border-white bg-primary" />
        <div className="absolute top-0 right-0 w-1/4 h-1/4 border-4 border-white bg-primary" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 border-4 border-white bg-primary" />
      </div>
      
      <div className="text-center">
        <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-tighter">
          Vérification Officielle
        </p>
        <p className="text-[12px] font-mono text-text-muted">
          {value}
        </p>
      </div>
      
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent opacity-50" />
    </div>
  );
}
