# Visual Knowledge Canvas (Phase 1 MVP)

A local-first visual thinking canvas built with **React + TypeScript + Vite + tldraw**.

## Features

- Infinite zoom/pan canvas (powered by tldraw)
- Idea node creation via:
  - Toolbar button: **New Idea**
  - Keyboard shortcut: **N**
  - Connector action: select two nodes then click **Connect Nodes**
- Editable and movable idea nodes
- Arrow connections between nodes
- Quick connector action: select 2 nodes and click **Connect Nodes**
- Auto-save to LocalStorage with debounce
- Reload restores previous canvas state
- Explicit domain model (`IdeaNode`, `Connection`, `CanvasDocument`) persisted alongside tldraw snapshot

## Project Structure

```text
src/
  app/          # app composition and global styles
  canvas/       # tldraw integration and canvas hooks
  components/   # reusable UI pieces
  domain/       # domain models + constants
  storage/      # persistence layer (localStorage)
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run dev server

```bash
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

### 3) Type check and build

```bash
npm run check
npm run build
```

## Como testar (PT-BR)

Sim — você precisa instalar as dependências antes de testar.

### Passo a passo rápido

```bash
npm install
npm run dev
```

Depois, abra a URL do Vite no navegador (geralmente `http://localhost:5173`).

### Importante

- **Não abra o `index.html` diretamente** (ex.: `file:///.../index.html`).
- Este projeto usa Vite + módulos ESM + dependências (`react`, `tldraw`), então precisa rodar via servidor de desenvolvimento.

### Erro comum ao abrir só o index

Se abrir o arquivo direto, você verá erros de import/módulo porque o browser não resolve os pacotes de `node_modules` sem o bundler/dev server.

## Architectural Notes

- **UI layer** (`app`, `components`, `canvas/CanvasBoard.tsx`) handles rendering and interactions.
- **Canvas integration layer** (`canvas/useCreateIdeaNode.ts`, `canvas/useCanvasPersistence.ts`) handles editor actions and event subscriptions.
- **Domain layer** (`domain/models.ts`) defines app-level entities independent of tldraw internals.
- **Persistence layer** (`storage/localCanvasStorage.ts`) encapsulates LocalStorage load/save behavior.

Persistence stores:
1. The full tldraw snapshot for exact visual restoration.
2. A mapped `CanvasDocument` for clean architecture and future migration/analytics use cases.

## Scope Constraints (Intentionally Phase 1)

- Single-user only
- No authentication
- No backend/database
- No collaboration
- Local persistence only
