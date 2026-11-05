# DESIGN SYSTEM — বাপের টাকা (Baper Taka)

**Phase:** 02  
**Status:** Implemented  
**Date:** 2026-11-05  
**Branch:** `arena/98a5daba-baper-taka`  

## 1. Brand Identity

### Brand Names
- **English:** Baper Taka
- **Bangla:** বাপের টাকা

### Personality
- Trustworthy, Friendly, Modern, Simple, Value-conscious, Professional but approachable

### Visual Direction
- **Primary:** Deep Navy (#172554)
- **Accent:** Warm Amber (#FACC15)
- **Supporting:** Neutral White (#FFFFFF), Off-white (#F8FAFC), Slate/Gray (#64748B)

### Brand Assets
- **Logo Mark:** `public/assets/logo/mark.svg` (SVG vector)
- **Logo Lockup:** `public/assets/logo/lockup.svg` (SVG text + mark)
- **Favicon:** `public/assets/logo/mark.svg` (SVG compatible)

## 2. Color Tokens

| Token Name | Value | Usage |
| ---------- | ----- | ----- |
| `--color-brand-50` | `#fef9c3` | Amber 50 (Light background) |
| `--color-brand-100` | `#fde047` | Amber 100 (Selection/Highlight) |
| `--color-brand-200` | `#facc15` | Amber 200 (Accent) |
| `--color-brand-600` | `#1e3a8a` | Navy 600 (Secondary) |
| `--color-brand-700` | `#172554` | Navy 700 (Primary/Ring) |
| `--color-brand-800` | `#1e293b` | Slate/Navy 800 (Hover) |
| `--color-brand-900` | `#0f172a` | Navy 900 (Foreground/Dark) |
| `--color-primary` | `var(--color-brand-700)` | Main action |
| `--color-secondary` | `var(--color-brand-200)` | Accent action |
| `--color-background` | `#ffffff` | Light mode bg |
| `--color-foreground` | `#0f172a` | Light mode text |
| `--color-card` | `#ffffff` | Card bg |
| `--color-muted` | `#f8fafc` | Muted bg |
| `--color-border` | `#e2e8f0` | Border |
| `--color-ring` | `var(--color-brand-700)` | Focus ring |

## 3. Typography

### Font Families
- **Sans:** `Noto Sans Bengali`, `Hind Siliguri`, `Inter`, `ui-sans-serif`, `system-ui`, `-apple-system`, `Segoe UI`, `sans-serif`
- **Display:** `Noto Sans Bengali`, `Hind Siliguri`, `Playfair Display`, `ui-serif`, `system-ui`, `serif`
- **License:** Open Source (Google Fonts / SIL Open Font License)

### Typography Tokens
| Token | Size / Line Height | Usage |
| ----- | ------------------ | ----- |
| `--type-display` | `clamp(2.25rem, 5vw, 4.5rem) / 1.2` | Hero / Brand |
| `--type-h1` | `clamp(1.875rem, 4vw, 3rem) / 1.2` | H1 |
| `--type-h2` | `clamp(1.5rem, 3vw, 2.25rem) / 1.3` | H2 |
| `--type-h3` | `clamp(1.25rem, 2.5vw, 1.875rem) / 1.4` | H3 |
| `--type-h4` | `clamp(1.125rem, 2vw, 1.5rem) / 1.5` | H4 |
| `--type-h5` | `clamp(1rem, 1.5vw, 1.25rem) / 1.5` | H5 |
| `--type-h6` | `clamp(0.875rem, 1vw, 1rem) / 1.5` | H6 |
| `--type-body` | `1rem / 1.5` | Body text |
| `--type-small` | `0.875rem / 1.5` | Small text |
| `--type-label` | `0.75rem / 1.4` | Labels (Uppercase) |
| `--type-button` | `0.875rem / 1.4` | Buttons (Semi-bold) |
| `--type-price` | `clamp(1.125rem, 2vw, 1.5rem) / 1.3` | Price/Currency |

## 4. Spacing & Layout Rules

- **Container Widths:** `xs` (20rem), `sm` (24rem), `md` (28rem), `lg` (32rem), `xl` (36rem), `2xl` (42rem), `full` (100%)
- **Border Radius:** `sm` (0.125rem), `md` (0.375rem), `lg` (0.5rem), `xl` (0.75rem), `2xl` (1rem)
- **Shadows:** `sm`, `base`, `md`, `lg`
- **Focus Ring:** `2px solid var(--ring)` with `2px offset`
- **Responsive:** Mobile-first, breakpoints via Tailwind v4

## 5. Component Conventions

- **Button:** Variants (default, outline, ghost, brand, accent), Sizes (sm, default, lg, icon)
- **Input/Textarea/Select:** Consistent border, focus ring, disabled state
- **Checkbox/Radio:** Peer-based styling, focus ring, checked state
- **Badge:** Variants (default, secondary, destructive, outline)
- **Card:** Header, Title, Description, Content, Footer
- **Alert:** Variants (default, destructive, warning, info)
- **Separator:** Horizontal/Vertical
- **Skeleton:** Pulse animation, rounded
- **Dialog:** Fixed overlay, grid content, header/footer
- **Dropdown:** Relative container, menu, item
- **Container:** Max-width utilities

## 6. Theme Behavior

- **Light Theme:** Default (`color-scheme: light`)
- **Dark Theme:** `[data-theme="dark"]` (Navy 900 bg, Slate/Navy 800 card, Blue primary contrast)
- **Accessibility:** High contrast, focus visibility, semantic HTML

## 7. Internationalization

- **Default:** Bangla (`bn`)
- **Secondary:** English (`en`)
- **New Strings:** Added to `src/locales/{bn,en}/translation.json`

## 8. Responsive & Accessibility

- **Mobile:** Stacked layout, touch-friendly targets
- **Desktop:** Grid layout, hover states
- **Keyboard:** Focus ring, tab order
- **Screen Reader:** Semantic roles, labels, skip link

## 9. Preview Route

- **Path:** `/design-system`
- **Component:** `DesignSystemPage`
- **Features:** Brand preview, Typography samples, Component showcase, Loading states

## 10. Limitations

- No real product catalog or checkout logic (Phase 02 scope)
- No Supabase database queries yet
- No paid fonts or services
