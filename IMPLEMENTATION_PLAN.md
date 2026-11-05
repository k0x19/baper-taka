# Phase 02 Implementation Plan — Baper Taka (বাপের টাকা)

## Goal
Implement the Branding & Design System (Phase 02) for the Baper Taka e-commerce project, building upon the Phase 01 foundation.

## Scope
1. Brand Identity & Design Tokens (Deep Navy/Amber palette)
2. Logo & Brand Assets (SVG mark, text lockup, favicon)
3. Typography System (Bangla & English)
4. Reusable UI Components (shadcn/ui-compatible)
5. Shared Application Layout (Header, Footer, Navigation)
6. Design System Preview Route (`/design-system`)
7. Documentation (`docs/DESIGN_SYSTEM.md`, `docs/DEVELOPMENT_LOG.md`)
8. Quality Checks (Typecheck, Lint, Format, Test, Build)
9. Pull Request creation targeting `main`

## Implementation Steps
1. **Design Tokens**: Update `src/styles/globals.css` with Deep Navy/Amber palette and typography tokens.
2. **Assets**: Create SVG logo mark and text lockup in `public/assets/` and `src/styles/`.
3. **Typography**: Define font families and tokens for Display, H1-H6, Body, Small, Labels, Buttons, Price.
4. **Components**: Implement Button, Input, Textarea, Select, Checkbox, Radio, Badge, Card, Dialog, Dropdown, Separator, Skeleton, Alert, Container.
5. **Layout**: Create `Header`, `Footer`, `Navigation` in `src/components/layout/`.
6. **Preview Route**: Create `/design-system` route in `src/app/router.tsx` and `src/features/design-system/`.
7. **i18n**: Add new strings to `src/locales/{bn,en}/translation.json`.
8. **Documentation**: Create `docs/DESIGN_SYSTEM.md` and update `docs/DEVELOPMENT_LOG.md`.
9. **Verification**: Run `npm run check` and create PR.

## Constraints
- Branch: `arena/98a5daba-baper-taka` (fixed session branch)
- Target: `main`
- No paid dependencies
- Strict TypeScript, Tailwind CSS v4
- Bangla default, English secondary
- Free-tier/open-source only

## Current Status
- Phase 01 foundation complete
- Working branch: `arena/98a5daba-baper-taka`
- Clean working tree
