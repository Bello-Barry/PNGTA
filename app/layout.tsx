import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PNGTA - Plateforme Nationale de Gestion et de Traçabilité Agricole",
  description: "République du Congo - Ministère de l'Agriculture",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-text-primary">{children}</body>
    </html>
  );
}
