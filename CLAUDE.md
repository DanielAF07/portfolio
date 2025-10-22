# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **minimalist, data-driven portfolio/CV website** built with Astro and TypeScript. It renders a professional resume using JSON Resume schema format from `cv.json`, generating both a web version and print-friendly PDF output.

**Key Details:**
- Framework: Astro 4.3.2
- Language: TypeScript 5.3.3
- Package Manager: pnpm
- Deployment: Vercel (with edge middleware for geolocation)
- Main Entry: `src/pages/index.astro`
- Data Source: `cv.json` (also `cv_espanol.json` for Spanish version)

## Common Development Commands

```bash
pnpm dev              # Start development server (localhost:4321)
pnpm build            # Type-check with astro check + build to ./dist/
pnpm preview          # Preview production build locally
pnpm astro <command>  # Direct Astro CLI access
```

**Note:** No separate lint or test commands exist. Type checking is integrated into the build pipeline via `@astrojs/check`.

## Architecture and Code Structure

### Component Organization

All components use Astro's file-based architecture with scoped CSS:

- **`src/pages/index.astro`** - Main entry point that assembles all sections
- **`src/layouts/Layout.astro`** - HTML shell with head metadata, analytics (Google Analytics, Microsoft Clarity)
- **`src/components/Section.astro`** - Reusable section wrapper component
- **`src/components/sections/`** - Individual portfolio sections (Hero, Experience, Education, About, Skills, Projects, Languages, Certificates)
- **`src/components/KeyboardManager.astro`** - Hotkeypad integration for Cmd+K command palette
- **`src/icons/`** - Skill and social media icon components (React, Next.js, GitHub, LinkedIn, etc.)

### Data Flow Pattern

The design follows a **data-driven architecture**:

1. **Single Source of Truth**: `cv.json` contains all resume data in JSON Resume schema format
2. **Type Safety**: `src/cv.d.ts` provides TypeScript interfaces for the CV structure
3. **Component Rendering**: Each section component imports `cv.json` and iterates over data to generate content
4. **Print Optimization**: CSS classes (`print` and `no-print`) control visibility in print vs. screen views

### Key Architectural Patterns

1. **Astro Island Pattern** - Static HTML generation by default, minimal JavaScript shipped to browser
2. **Path Aliases** - Configured in `tsconfig.json`:
   - `@cv` → `./cv.json`
   - `@/*` → `./src/*`
3. **Server-Side Rendering** - All components render at build time (no client-side hydration needed)
4. **Responsive Mobile-First** - Breakpoint at 700px for layout changes
5. **Geolocation Middleware** - `middleware.ts` runs on Vercel Edge, detects user country, sets cookie for location personalization in Hero section
6. **Keyboard Accessibility** - Hotkeypad command palette (Cmd+K) for quick social link access

### Print-Friendly Design

The site is optimized for PDF export:
- Conditional rendering with `display: none` for screen-only elements using `@media print`
- `@page` rules configured for margin/padding control in print
- Projects section can be hidden in print (controlled via class)

## Type System

- **`src/types.d.ts`** - General type definitions and Astro environment types
- **`src/cv.d.ts`** - CV schema interfaces matching JSON Resume specification
- **`src/env.d.ts`** - Astro environment type imports
- **`tsconfig.json`** - Uses `astro/tsconfigs/strict` preset for strict type checking

All components are fully typed. The build command (`pnpm build`) runs `astro check` before compilation to catch type errors.

## Important Dependencies

**Core:**
- `astro` - Meta-framework for static site generation
- `typescript` - Type system

**Development/Build:**
- `@astrojs/check` - TypeScript checking for Astro components
- `@vercel/edge` - Edge Runtime utilities
- `@vercel/functions` - Serverless function helpers

**Runtime:**
- `hotkeypad` - Keyboard shortcut command palette UI

**Analytics (Client-side):**
- Google Analytics (`gtag.js`) - ID: `G-4P4D81NHKS`
- Microsoft Clarity - ID: `l5zbory6mg`

**No external CSS framework** - All styling uses scoped Astro component styles.

## Development Workflow

### Adding Content to the Portfolio

1. Edit `cv.json` (or `cv_espanol.json` for Spanish version) to update resume data
2. Components automatically reflect changes due to data-driven architecture
3. Run `pnpm dev` to see changes in real-time

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and use it in `src/pages/index.astro`
3. Follow the pattern: wrap content in `<Section>` component
4. Add section-specific styles in the component's `<style>` block

### Updating Styles

- Each component has scoped `<style>` blocks (Astro automatically scopes them)
- Use CSS Grid/Flexbox for layout (mobile-first approach)
- Test with `@media print` queries for PDF output
- Test responsive behavior at 700px breakpoint

### Adding Icon Components

Create new icon files in `src/icons/` following the existing pattern:
```astro
---
interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<svg class={className} ...>
  <!-- SVG content -->
</svg>

<style>
  /* scoped styles */
</style>
```

## Build and Deployment

**Build Process:**
1. `astro check` runs type checking
2. Astro compiles all `.astro` components
3. Outputs static HTML/CSS/JS to `./dist/`

**Deployment:**
- Primary: Vercel (supports edge middleware and serverless functions)
- Alternative: Any static host (GitHub Pages, Netlify, etc.)
- Middleware (`middleware.ts`) handles geolocation on Vercel Edge

**Build Output Size:** ~76KB total (single index.html with inlined assets)

## Configuration Files

- **`astro.config.mjs`** - Minimal Astro configuration (currently empty/default)
- **`tsconfig.json`** - TypeScript strict mode with path aliases
- **`middleware.ts`** - Vercel edge middleware for geolocation
- **`package.json`** - Dependencies and scripts
- **`.vscode/extensions.json`** - Recommends `astro-build.astro-vscode` extension
- **`.vscode/launch.json`** - Debug configuration for `astro dev`

## Multi-Language Support

The portfolio supports multiple languages:
- **Primary:** `cv.json` (English)
- **Secondary:** `cv_espanol.json` (Spanish)

Language switching is controlled by the data imported in components. To add another language, create a new JSON file and import it conditionally or create a separate page.

## Performance Considerations

1. **No JavaScript Framework** - Zero runtime overhead from UI frameworks
2. **Static Generation** - All pages pre-rendered at build time
3. **Minimal Interactivity** - Only essential scripts (hotkeypad, analytics)
4. **Image Optimization** - Uses webp format for profile image (`public/me.webp`)
5. **CSS Scoping** - Astro automatically scopes styles, avoiding specificity issues

## Recent Changes (from Git History)

Recent commits show frequent CV data updates and print layout refinements. GitHub Actions CI/CD is configured for automated builds/deployments.

## Common Issues and Solutions

**Type Checking Failures:**
- Run `pnpm build` to see full type errors from `astro check`
- Check that `cv.json` structure matches `src/cv.d.ts` interfaces

**Dev Server Not Starting:**
- Ensure pnpm is installed: `corepack enable` then `pnpm install`
- Port 4321 must be available

**Print Preview Issues:**
- Test using browser DevTools (F12 → Print) to verify `@media print` styles
- Check `display: none` rules don't hide essential content

**Geolocation Not Working:**
- `middleware.ts` only runs on Vercel deployment (not local dev)
- Manually set cookie or comment out geolocation check for local testing
