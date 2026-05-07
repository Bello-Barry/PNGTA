# Prompt Agent — Plateforme Nationale de Gestion et de Traçabilité Agricole
**République du Congo — MVP Présentation Ministérielle**

---

## CONTEXTE & MISSION

Tu es un expert senior en Product Design, UX/UI gouvernemental, architecture SaaS et développement Full Stack moderne.

Ta mission est de créer un **MVP de présentation** — visuellement impressionnant et institutionnellement crédible — d'une plateforme appelée :

> **"Plateforme Nationale de Gestion et de Traçabilité Agricole"**
> *République du Congo — Ministère de l'Agriculture*

Ce MVP sera présenté au Ministère de l'Agriculture de la République du Congo pour validation et financement.

### Ce que ce projet EST
- Une plateforme institutionnelle nationale de niveau gouvernemental
- Un outil de supervision, de traçabilité et d'analyse agricole
- Un produit de démonstration convaincant, prêt pour une présentation officielle

### Ce que ce projet N'EST PAS
- Une marketplace e-commerce classique
- Un projet avec base de données réelle (tout est mock data)
- Une app nécessitant authentification ou backend fonctionnel

> ⚠️ **IMPORTANT — ZÉRO BASE DE DONNÉES** : Toutes les données sont des **fichiers mock statiques** en TypeScript (`/lib/mock-data/`). Pas de Supabase, pas d'API, pas d'appels réseau. Le projet doit fonctionner entièrement en local et sur Vercel sans aucune variable d'environnement.

---

## STACK TECHNIQUE

```
Framework    : Next.js 15 (App Router)
Langage      : TypeScript strict
Style        : TailwindCSS v3
Composants   : shadcn/ui
Animations   : Framer Motion
Graphiques   : Recharts
Icônes       : Lucide React
Cartographie : react-simple-maps (SVG, pas de token requis)
Données      : Fichiers mock .ts uniquement — AUCUNE base de données
Déploiement  : Vercel (zero config, zero env vars)
```

---

## IDENTITÉ VISUELLE

### Palette de couleurs
```css
--primary       : #1B4D2E   /* Vert forêt congolais — couleur principale */
--primary-light : #2D6A42   /* Vert moyen pour hover/accents */
--accent-gold   : #C9922A   /* Or pour KPIs critiques et badges */
--accent-amber  : #E8B84B   /* Ambre pour alertes et highlights */
--surface       : #F4F7F4   /* Fond général légèrement vert */
--card          : #FFFFFF   /* Cartes blanches */
--sidebar       : #0F2D1C   /* Sidebar très sombre */
--text-primary  : #111827
--text-muted    : #6B7280
--border        : #E5EBE6
--danger        : #DC2626
--success       : #16A34A
--warning       : #D97706
```

### Typographie
```
Titres         : 'Playfair Display' (Google Fonts) — autorité institutionnelle
Corps/données  : 'DM Sans' (Google Fonts) — lisibilité moderne
Monospace/IDs  : 'JetBrains Mono' — numéros agriculteurs, QR codes
```

### Principes UI
- Interface sobre, dense en information mais jamais surchargée
- Grandes cartes statistiques avec icône + chiffre + tendance
- Tableaux élégants avec pagination et filtres
- Badges colorés pour statuts (actif, en attente, alerté)
- Sidebar fixe avec navigation iconographique
- Header avec breadcrumb + indicateur de rôle actif
- Tons verts inspirés des forêts et terres agricoles congolaises

---

## DONNÉES MOCK — RÉFÉRENTIEL CONGO

### Géographie (à utiliser dans TOUS les composants)
```typescript
const DEPARTEMENTS = [
  "Brazzaville", "Pointe-Noire", "Bouenza", "Cuvette",
  "Cuvette-Ouest", "Kouilou", "Lékoumou", "Likouala",
  "Niari", "Plateaux", "Pool", "Sangha"
]

const DISTRICTS_PAR_DEPARTEMENT = {
  "Bouenza": ["Madingou", "Nkayi", "Loudima", "Mouyondzi"],
  "Pool": ["Kinkala", "Mindouli", "Kibangou", "Goma Tsé-Tsé"],
  "Cuvette": ["Owando", "Makoua", "Boundji", "Oyo"],
  "Niari": ["Dolisie", "Mossendjo", "Kibangou", "Kimongo"],
  "Plateaux": ["Djambala", "Lékana", "Gamboma", "Abala"],
  // etc.
}
```

### Cultures principales
```typescript
const CULTURES = [
  "Manioc", "Maïs", "Arachide", "Banane plantain",
  "Igname", "Taro", "Patate douce", "Haricot",
  "Cacao", "Café Robusta", "Palmier à huile",
  "Piment", "Aubergine africaine", "Gombo", "Tomate"
]
```

### Monnaie et unités
```typescript
const MONNAIE = "FCFA"
const DEVISE_CODE = "XAF"
// Exemple : 125 000 FCFA/tonne pour le manioc
// Volumes en kg, tonnes, sacs (1 sac = 80kg standard Congo)
```

### Exemples de noms congolais pour les agriculteurs mock
```typescript
const NOMS = [
  "Jean-Baptiste Moukengué", "Marie-Claire Banzouzi",
  "Théophile Nkounkou", "Alphonsine Mbemba",
  "Cyrille Mabondzo", "Joséphine Bikindou",
  "Prosper Nzaou", "Cécile Loubassou",
  "Gervais Mabiala", "Thérèse Nguimbi"
]
```

---

## ARCHITECTURE DU PROJET

```
/
├── app/
│   ├── layout.tsx                    # Layout racine avec sidebar
│   ├── page.tsx                      # Redirect → /dashboard
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard Ministère
│   ├── agriculteurs/
│   │   ├── page.tsx                  # Registre national
│   │   └── [id]/page.tsx             # Profil détaillé
│   ├── marche/
│   │   └── page.tsx                  # Marché agricole numérique
│   ├── export-import/
│   │   └── page.tsx                  # Module exportation/importation
│   ├── cartographie/
│   │   └── page.tsx                  # Carte agricole interactive
│   ├── analytique/
│   │   └── page.tsx                  # Espace analytique
│   └── mobile/
│       └── page.tsx                  # Version terrain mobile
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx               # Navigation principale
│   │   ├── Header.tsx                # Barre du haut + breadcrumb
│   │   └── AppShell.tsx              # Wrapper layout global
│   ├── ui/                           # shadcn/ui components
│   ├── dashboard/
│   │   ├── KpiCard.tsx               # Carte statistique réutilisable
│   │   ├── AlertesFeed.tsx           # Flux d'alertes temps réel (mock)
│   │   ├── ProductionChart.tsx       # Graphique production Recharts
│   │   └── CarteOverview.tsx         # Mini carte Congo
│   ├── agriculteurs/
│   │   ├── AgriculteurTable.tsx      # Tableau avec filtres
│   │   ├── AgriculteurCard.tsx       # Carte profil
│   │   └── QrCodeBadge.tsx           # Badge QR code stylisé
│   ├── marche/
│   │   ├── ProduitCard.tsx           # Carte produit marché
│   │   └── PrixTicker.tsx            # Ticker prix en temps réel mock
│   ├── export-import/
│   │   ├── CargaisonTimeline.tsx     # Timeline logistique
│   │   └── StatutBadge.tsx           # Badge statut douanier
│   ├── cartographie/
│   │   └── CarteCongo.tsx            # Carte SVG react-simple-maps
│   └── analytique/
│       ├── TendanceChart.tsx
│       └── EconomiePanel.tsx
│
├── lib/
│   └── mock-data/
│       ├── index.ts                  # Export central
│       ├── agriculteurs.ts           # 50+ agriculteurs mock
│       ├── produits.ts               # Produits marché
│       ├── cargaisons.ts             # Cargaisons export/import
│       ├── statistiques.ts           # KPIs et séries temporelles
│       ├── alertes.ts                # Alertes système mock
│       └── geo.ts                    # Données géographiques Congo
│
├── hooks/
│   ├── useFilteredData.ts            # Hook générique de filtrage
│   └── useMockRealtime.ts            # Simule des updates en temps réel
│
├── types/
│   └── index.ts                      # Tous les types TypeScript
│
└── public/
    └── assets/
        ├── logo-ministere.svg
        └── armoiries-congo.svg
```

---

## PAGES À GÉNÉRER — DÉTAIL FONCTIONNEL

### 1. DASHBOARD MINISTÈRE `(/dashboard)`
**Sous-titre : "Centre de Contrôle National"**

Sections :
- **Barre du haut** : Logo ministère + "République du Congo" + date + indicateur "DONNÉES EN DIRECT" (mock animé)
- **KPIs principaux** (4 grandes cartes) :
  - Total agriculteurs enregistrés : `47 382`
  - Production nationale (tonnes) : `1 284 500 T`
  - Valeur exports trimestre : `4,2 Mds FCFA`
  - Alertes actives : `12 alertes`
- **Carte du Congo** : Heatmap par département, intensité = volume production
- **Graphique production** : Évolution 12 mois par culture principale (Recharts LineChart)
- **Top 5 produits commercialisés** : BarChart horizontal
- **Flux d'alertes** : Liste scrollable avec types (sécheresse, prix anormal, stock critique)
- **Répartition par département** : PieChart ou DonutChart
- **Dernières transactions** : Tableau mini des 5 dernières entrées

---

### 2. REGISTRE NATIONAL DES AGRICULTEURS `(/agriculteurs)`

Sections :
- **Barre de recherche + filtres** : Par département, culture, statut (actif/inactif/suspendu)
- **Tableau principal** : Avatar + Nom + N° National Agricole + District + Culture principale + Statut + Actions
- **Fiche détaillée** `(/agriculteurs/[id])` :
  - Photo (avatar généré via initiales)
  - Numéro National Agricole : format `NGA-2024-XXXXXX`
  - Département / District / Village
  - Cultures pratiquées (badges)
  - Surface cultivée (hectares)
  - Production annuelle estimée
  - **QR Code unique** généré visuellement (mockup stylisé)
  - Historique des déclarations de récolte
  - Statut de conformité administrative

**Données mock** : Générer 50 agriculteurs avec données cohérentes Congo

---

### 3. MARCHÉ AGRICOLE NUMÉRIQUE `(/marche)`

Sections :
- **Prix du marché en temps réel** : Ticker horizontal animé (Framer Motion) avec prix FCFA/kg
- **Filtres** : Par catégorie (Vivriers / Cultures de rente / Maraîchage / Élevage)
- **Grille de produits** : Cards avec photo (emoji ou icône), nom, prix actuel, variation ±%, stock disponible, département d'origine, vendeur
- **Tableau des commandes récentes** : N° commande + Produit + Quantité + Montant FCFA + Statut + Date
- **Panneau latéral** : Top 3 vendeurs du mois + Produit le plus demandé

---

### 4. MODULE EXPORTATION / IMPORTATION `(/export-import)`

Sections :
- **KPIs** : Cargaisons en transit / Valeur totale exports / Valeur totale imports / Taux de validation
- **Tableau des cargaisons** :
  - Référence : `CARGO-2024-XXXX`
  - Type : Export / Import
  - Produit + Quantité
  - Origine → Destination (ex: Brazzaville → Libreville)
  - Statut : En préparation / En transit / Dédouané / Livré / Bloqué
  - Date prévue / réelle
- **Timeline logistique** pour une cargaison sélectionnée :
  - Étapes visuelles : Déclaration → Inspection → Dédouanement → Chargement → Transit → Livraison
  - Chaque étape avec date, agent responsable, commentaire
- **QR Code de traçabilité** : Badge imprimable par cargaison
- **Graphique** : Volume export vs import sur 6 mois

---

### 5. CARTOGRAPHIE AGRICOLE `(/cartographie)`

Sections :
- **Carte Congo SVG interactive** (react-simple-maps) :
  - Coloration par département selon production (gradient vert clair → vert foncé)
  - Tooltip au survol : Département + Production + N° agriculteurs + Culture dominante
  - Marqueurs de points pour les grandes zones agricoles
- **Panneau latéral** :
  - Filtres par culture (checkboxes avec couleur)
  - Légende de la heatmap
  - Top 3 départements producteurs
- **Statistiques par département** : Tableau cliquable qui met en évidence la région sur la carte

---

### 6. ESPACE ANALYTIQUE `(/analytique)`

Sections :
- **Sélecteur de période** : 3 mois / 6 mois / 1 an / Personnalisé
- **Graphique 1** : Évolution de la production par culture — MultiLine Recharts
- **Graphique 2** : Revenus agricoles par département — BarChart groupé
- **Graphique 3** : Comparaison Export vs Import mensuel — AreaChart
- **Graphique 4** : Répartition des cultures — PieChart avec légende
- **Tableau analytique** : Données exportables (bouton "Exporter CSV" — mock)
- **Indicateurs économiques** :
  - Prix moyen manioc (tendance)
  - Variation production vs année précédente
  - Balance commerciale agricole

---

### 7. VERSION MOBILE TERRAIN `(/mobile)`

Design radicalement différent — ultra simplifié :
- **Fond blanc**, grandes zones tactiles, texte large
- **3 actions principales** en gros boutons :
  1. 📦 Déclarer une récolte
  2. 🔍 Scanner un QR Code
  3. 📊 Mes statistiques
- **Formulaire de déclaration** :
  - Culture (liste déroulante)
  - Quantité (kg ou sacs)
  - District (pré-rempli)
  - Date (date picker simple)
  - Bouton "SOUMETTRE LA DÉCLARATION" (vert, pleine largeur)
- **Indicateur réseau** : Badge "Mode hors-ligne disponible"
- **Dernières déclarations** : Liste simple des 3 dernières avec statut

---

## COMPOSANTS TRANSVERSAUX

### `KpiCard.tsx`
```typescript
interface KpiCardProps {
  titre: string
  valeur: string | number
  unite?: string
  variation?: number      // ex: +12.4 → affiche "+12.4%" en vert
  icone: LucideIcon
  couleurIcone?: string
  alerte?: boolean        // true → bordure rouge pulsante
}
```

### `StatutBadge.tsx`
```typescript
type Statut = "actif" | "inactif" | "en_attente" | "suspendu" | 
              "en_transit" | "delivre" | "bloque" | "valide"
// Chaque statut a une couleur et un libellé français
```

### `useMockRealtime.ts`
```typescript
// Simule des données qui changent toutes les X secondes
// Utilisé pour le ticker de prix et le flux d'alertes
// Utilise setInterval + useState, pas de WebSocket
```

---

## INSTRUCTIONS DE GÉNÉRATION

### Ordre de génération recommandé
1. `types/index.ts` — tous les types TypeScript
2. `lib/mock-data/` — tous les fichiers de données mock
3. `components/layout/` — Sidebar, Header, AppShell
4. `components/ui/` — KpiCard, StatutBadge, composants partagés
5. `app/dashboard/page.tsx` — Page la plus importante
6. `app/agriculteurs/` — Registre + fiche détaillée
7. `app/marche/page.tsx`
8. `app/export-import/page.tsx`
9. `app/cartographie/page.tsx`
10. `app/analytique/page.tsx`
11. `app/mobile/page.tsx`

### Règles absolues
- ✅ Toutes les données viennent de `lib/mock-data/`
- ✅ Chaque page importe ses données directement (pas de fetch, pas d'API)
- ✅ Noms, lieux et montants sont en français et en FCFA
- ✅ Le projet doit tourner avec `npm run dev` sans aucune configuration
- ✅ Responsive parfait : mobile 375px / tablette 768px / desktop 1280px+
- ❌ Pas de Supabase, pas de Prisma, pas de base de données
- ❌ Pas de variables d'environnement
- ❌ Pas d'authentification (navigation libre entre toutes les pages)
- ❌ Pas d'appels API externes

### Qualité du rendu
- Animations d'entrée sur toutes les pages (Framer Motion `staggerChildren`)
- Loader skeleton sur les tableaux (Framer Motion ou shadcn Skeleton)
- Tooltips sur tous les graphiques Recharts
- États vides soignés si tableau sans résultat de filtre
- Toasts de confirmation sur les actions (shadcn Toast)

---

## RÉSULTAT ATTENDU

Le rendu final doit donner l'impression :
- D'une **startup tech africaine sérieuse** ayant investi 12 mois de développement
- D'un **projet national crédible** porté par une équipe expérimentée
- D'une **plateforme institutionnelle haut de gamme** comparable aux meilleures solutions gouvernementales africaines (ex : plateformes Rwanda, Sénégal, Côte d'Ivoire)
- D'une **solution immédiatement déployable** après validation ministérielle

---

*Généré pour présentation au Ministère de l'Agriculture — République du Congo*
*Version MVP — Données de démonstration uniquement*