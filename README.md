# Audit des 7 blocages IA — Lead magnet interactif

Application Next.js premium, responsive et en français pour transformer le lead magnet **“Audit des 7 blocages IA”** en expérience quiz / jeu diagnostic.

## Stack

- Next.js + React
- TypeScript
- Redux Toolkit / React Redux
- Tailwind CSS
- Framer Motion
- Lucide React

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000).

## Vérifications

```bash
npm run typecheck
npm run lint
npm run build
```

## Structure

```text
src/
  app/                     Pages Next.js, layout, providers Redux, styles globaux
  components/ui/           Composants UI réutilisables premium
  features/quiz/           Feature complète du diagnostic IA
    components/            Landing, quiz, capture lead, résultats
    data/                  Contenu exact du quiz et bandes de scoring
    lib/                   Types et logique de scoring
    store/                 Redux slice, store et hooks typés
```

## Intégrations futures

La capture lead stocke temporairement les données en `localStorage`. Le point de branchement API / webhook / CRM est isolé dans `persistLeadLocally` (`src/features/quiz/components/LeadCapture.tsx`). Une route `POST /api/leads` est également prévue comme point d’entrée serveur pour connecter ensuite une base cloud, un webhook, un CRM ou des analytics.
