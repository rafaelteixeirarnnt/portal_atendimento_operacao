# Portal de Atendimento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static React portal that routes customers to the correct Jira Service Management form from local contract configuration.

**Architecture:** A Vite React SPA will use React Router for home and contract pages. Local typed configuration drives all contracts, categories, services, search results, and links. shadcn/ui primitives provide accessible controls and Tailwind tokens define the light, dark, and system themes.

**Tech Stack:** React 19, TypeScript, Vite, TailwindCSS, shadcn/ui, Lucide React, Framer Motion, React Router, Vitest, Testing Library.

## Global Constraints

- 100% frontend static application.
- No backend, database, login, authentication, or custom APIs.
- Contracts and services must come from `src/data/contracts.ts`.
- Links must open in a new tab with `noopener noreferrer`.
- Theme preference, last contract, and recent services must use LocalStorage.
- Responsive layout: desktop 3 contract columns and 2 service columns, tablet 2 columns, mobile 1 column.
- TypeScript strict mode.

---

### Task 1: Project Scaffold And Tooling

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `eslint.config.js`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `components.json`
- Create: `src/test/setup.ts`

**Interfaces:**
- Produces: runnable Vite app with aliases, test setup, Tailwind and shadcn configuration.

- [ ] Create the scaffold files with React, TypeScript, Tailwind, shadcn aliases and Vitest configuration.
- [ ] Run `npm install` to install dependencies.
- [ ] Run `npm run test -- --run` and expect an empty-suite or no-test setup result before feature tests exist.

### Task 2: Domain Types, Data, And Utilities

**Files:**
- Create: `src/types/contracts.ts`
- Create: `src/data/contracts.ts`
- Create: `src/utils/contracts.ts`
- Create: `src/utils/search.ts`
- Create: `src/utils/storage.ts`
- Test: `src/utils/search.test.ts`
- Test: `src/utils/contracts.test.ts`
- Test: `src/utils/storage.test.ts`

**Interfaces:**
- Produces: `Contract`, `Service`, `Category`, `ThemePreference`, `getServiceCount(contract)`, `findContractById(id)`, `searchContracts(contracts, query)`, `storagePreferences`.

- [ ] Write failing tests for service counts, searching by keywords and descriptions, contract lookup, and LocalStorage fallback behavior.
- [ ] Implement typed contract data from the existing HTML prototype and add keywords for examples like `prescrição` and `senha`.
- [ ] Implement utility functions until tests pass.

### Task 3: UI Primitives And Layout

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/styles/globals.css`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/accordion.tsx`
- Create: `src/components/ui/dropdown-menu.tsx`
- Create: `src/components/ui/breadcrumb.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/empty.tsx`
- Create: `src/layouts/AppLayout.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/ThemeToggle.tsx`

**Interfaces:**
- Consumes: Tailwind config and shadcn component patterns.
- Produces: shared layout and UI primitives.

- [ ] Add shadcn-compatible component source files and semantic Tailwind theme tokens.
- [ ] Implement header, footer and theme toggle with keyboard-accessible controls.

### Task 4: Hooks And Main Workflows

**Files:**
- Create: `src/hooks/useContracts.ts`
- Create: `src/hooks/useSearch.ts`
- Create: `src/hooks/useGuidance.ts`
- Create: `src/hooks/useLocalPreferences.ts`
- Test: `src/hooks/useLocalPreferences.test.tsx`

**Interfaces:**
- Consumes: domain utilities and LocalStorage helpers.
- Produces: reusable hooks for pages and components.

- [ ] Write failing tests for local preferences updating last contract and recent services.
- [ ] Implement hooks with stable callbacks and derived state.

### Task 5: Pages And Components

**Files:**
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/ContractPage.tsx`
- Create: `src/components/SearchBar.tsx`
- Create: `src/components/ContractCard.tsx`
- Create: `src/components/ServiceCard.tsx`
- Create: `src/components/CategoryAccordion.tsx`
- Create: `src/components/GuidanceModal.tsx`
- Create: `src/components/BreadcrumbNav.tsx`
- Create: `src/components/EmptyState.tsx`
- Test: `src/pages/HomePage.test.tsx`
- Test: `src/pages/ContractPage.test.tsx`

**Interfaces:**
- Consumes: hooks, UI primitives, contracts config.
- Produces: home route `/` and contract route `/contracts/:contractId`.

- [ ] Write failing route tests for home cards, live search, missing contract state, category rendering and guidance modal.
- [ ] Implement pages and components with responsive layouts, accessible controls and safe external links.
- [ ] Add Framer Motion microinteractions without blocking reduced-motion users.

### Task 6: Documentation And Verification

**Files:**
- Create: `README.md`

**Interfaces:**
- Produces: project documentation and final verified static build.

- [ ] Document project description, technologies, run/build/publish commands, folder structure and how to add or edit contracts, categories, services and links.
- [ ] Run `npm run lint`.
- [ ] Run `npm run test -- --run`.
- [ ] Run `npm run build`.
- [ ] Start `npm run dev` and verify desktop and mobile flows.
