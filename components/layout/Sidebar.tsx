"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  Map,
  TrendingUp,
  Smartphone,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: BarChart3 },
  { name: "Agriculteurs", href: "/agriculteurs", icon: Users },
  { name: "Marché", href: "/marche", icon: ShoppingCart },
  { name: "Export-Import", href: "/export-import", icon: Package },
  { name: "Cartographie", href: "/cartographie", icon: Map },
  { name: "Analytique", href: "/analytique", icon: TrendingUp },
  { name: "Terrain (Mobile)", href: "/mobile", icon: Smartphone },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-primary" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar text-white transform transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white border-opacity-10">
          <h1 className="font-serif text-xl font-bold text-accent-gold">
            PNGTA
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Plateforme Nationale Agricole
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-accent-gold text-sidebar"
                        : "text-gray-200 hover:bg-white hover:bg-opacity-10"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white border-opacity-10">
          <button className="flex items-center gap-2 w-full px-4 py-3 text-gray-200 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors text-sm">
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
