# OSTA — Manufacturing Outsourcing & Fabrication OS (MVP)

**The operating system for modern fabrication.** A manufacturing control MVP that connects
`Project → Assembly → Part → Operation → Material → Supplier/Factory → QC` into one operational view.

React 19 · TypeScript · Vite · Tailwind CSS · React Router · lucide-react.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  (verified: builds clean)
npm run preview    # serve the production build
```

## Architecture

```
src/
├─ main.tsx                  # createRoot + <HashRouter>
├─ App.tsx                   # <ToastProvider> + all routes
├─ index.css                 # design tokens (:root vars) + component classes; Tailwind layers on top
├─ types/index.ts            # Project, Assembly, Part, Material, OutsourceOrder, ProductionJob,
│                            #   QCInspection, Issue, Nest, Machine, Supplier, …
├─ lib/
│   ├─ cn.ts                 # class combiner, hexA(), mulberry32()
│   ├─ format.ts             # fmtEGP, fmtT, fmtDate, daysFromToday, TODAY
│   └─ status.ts             # MFG / PROJ_STATUS / OUT_STATUS / OUT_STEPS maps + tone palette
├─ data/                     # mock data — ONE file per entity, ONE selector hub
│   ├─ projects.ts assemblies.ts parts.ts materials.ts machines.ts
│   ├─ suppliers.ts outsource.ts jobs.ts qc.ts issues.ts nesting.ts misc.ts
│   └─ index.ts              # re-exports + selectors + buildSearchIndex() + connectionsFor()
├─ components/
│   ├─ ManufacturingStatus.tsx  # <MfgStatus/> + <Pill/> — the required reusable status component
│   ├─ ui.tsx                # Panel, Bar, Empty, PageHead, Crumbs
│   ├─ Icon.tsx              # string-name → lucide icon map
│   ├─ charts.tsx            # Spark, AreaTrend, BarsH  (hand-drawn SVG)
│   ├─ tables.tsx            # PartsTable, OutsourceTable, QcTable
│   ├─ BomTree.tsx  FlowStages.tsx  SheetView.tsx  CommandPalette.tsx
├─ layout/
│   ├─ AppLayout.tsx  Sidebar.tsx  ToastProvider.tsx
│   └─ crumbs.ts             # path → breadcrumb resolver (every crumb resolves to its object)
└─ pages/                    # one file per screen
    Dashboard · Projects · ProjectDetail · AssemblyView · PartDetail · Parts ·
    Outsourcing · OutsourcingDetail · Production · Bom · Materials · Nesting ·
    NestingDetail · Qc · Issues · CadCam · Inventory · Suppliers · Analytics · Settings
```

## Connecting a backend later

`src/data/index.ts` is the only seam. Replace the static arrays with a typed client
(`src/lib/api.ts`) exposing the same selector signatures — `findProject(code)`, `findPart(id)`,
`connectionsFor(id)`, `projectParts(code)`, … — returning `Promise<T>`, then wrap pages in
React Query / SWR. Components consume data through these selectors, not direct imports, so no
component changes are required.

## OSTA rules enforced in the UI

1. A Work Order belongs to an Assembly (Project + Assembly code = manufacturing context).
2. A Work Order exists only when the Assembly has ≥ 1 released Part (assemblies tab shows a
   blocked state otherwise).
3. Part number is identical across BOM, Nesting, Production, Outsourcing, QC — see
   **Workflow Connections** on any part detail page.
4. `FINAL_DIM_QC` is a mandatory route step on every part.
5. A part cannot become **Ready for Assembly** until FINAL_DIM_QC passes — the timeline shows it
   "gated", and the production board refuses to move a QC-failed job to *Complete*.
6. Material net-negative availability auto-surfaces as an Operational Risk.
7. Every outsourced job carries an explicit delivery state
   (Released → Material Confirmed → Production → QC → Dispatch → Received).

## End-to-end demo path

`Dashboard → PRJ-26001 → ASM-001 → P-001245 (blocked on 6 mm S235JR) → BOM line → Materials →
NEST-0261 → Production job → OUT-0261 → QC → (gated) Ready for Assembly` — every hop is one
click, with live breadcrumbs. Press **⌘K / Ctrl-K** and search `P-001245` to see the same part
resolve across Project, Assembly, BOM, Material, Nesting, Production, Outsourcing and QC.

## Design tokens

Dark-first industrial control room. Ground `#0B0D10`, panel `#14171C`, hairline `#252A32`,
ink `#E7EAEE`, accent `#4C9AFF`. Semantic: ok `#35C88F`, warn `#E0A63C`, critical `#E5484D`,
outsourced `#9A7CF0`. Type: Archivo (display) / Inter (body) / IBM Plex Mono (codes & figures).

> `tsconfig.app.json` has `noUnusedLocals` / `noUnusedParameters` set to `false` for MVP
> iteration speed — tighten before production.
