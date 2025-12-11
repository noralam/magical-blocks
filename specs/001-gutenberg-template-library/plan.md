# Implementation Plan: Magical Blocks & Template Library

**Branch**: `001-gutenberg-template-library` | **Date**: 2025-12-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-gutenberg-template-library/spec.md`

## Summary

Build **Magical Blocks** - a comprehensive WordPress Gutenberg block library plugin with 50+ blocks, React admin panel, and template library system. The plugin follows a phased release strategy:

- **v1.0**: 10 blocks (MVP)
- **v1.1**: Admin Panel (React SPA)
- **v1.2**: +10 blocks (20 total)
- **v1.3**: +5 blocks (25 total)
- **v1.4**: Pro lock, advance features, upgrade Pro button
- **v1.5-v1.9**: +5 blocks each release (50 total)
- **v2.0**: Template Library

All code uses the `magical_blocks_` prefix consistently across PHP functions, classes, traits, hooks, and REST API endpoints.

## Technical Context

**Language/Version**: PHP 8.0+, JavaScript ES6+ (via @wordpress/scripts), CSS3  
**Primary Dependencies**: `@wordpress/scripts` ^31.1.0, `@wordpress/blocks`, `@wordpress/components`, `@wordpress/block-editor`, `@wordpress/i18n`, `@wordpress/element`, `@wordpress/icons`, `swiper` (for carousel blocks)  
**Storage**: WordPress Options API (`wp_options` table), no custom tables  
**Testing**: WordPress Plugin Unit Tests (PHPUnit), Jest for JavaScript, manual Block Editor testing  
**Target Platform**: WordPress 6.0+, PHP 8.0+, Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)  
**Project Type**: WordPress Plugin (hybrid PHP + React SPA)  
**Performance Goals**: <100ms block render in editor, <5KB common CSS, on-demand asset loading  
**Constraints**: WordPress.org guidelines compliance, no external CSS frameworks, WPCS strict mode  
**Scale/Scope**: 50+ blocks, 100+ templates, 10k+ active installations target

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Block-First Architecture | ✅ PASS | All features implemented as Gutenberg blocks with `block.json` |
| II. WordPress Standards (NON-NEGOTIABLE) | ✅ PASS | WPCS enforced via composer, ESLint via wp-scripts |
| III. Security-First (NON-NEGOTIABLE) | ✅ PASS | All I/O escaped/sanitized, nonces required, capability checks |
| IV. On-Demand Asset Loading | ✅ PASS | Per-block CSS/JS via `block.json` handles |
| V. Pro/Free Gating Architecture | ✅ PASS | Central `magical_blocks_has_pro()` function |
| VI. Internationalization (NON-NEGOTIABLE) | ✅ PASS | Text domain `magical-blocks`, @wordpress/i18n |
| VII. Clean & Minimal Design | ✅ PASS | Custom CSS only, CSS variables, @wordpress/components |
| VIII. Update Safety | ✅ PASS | Deprecation API for block migrations |

**Gate Status**: ✅ PASSED - Ready for Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-gutenberg-template-library/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (REST API contracts)
│   └── rest-api.md
└── tasks.md             # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
magical-blocks/
├── magical-blocks.php              # Main plugin file (bootstrap)
├── package.json                    # NPM dependencies
├── composer.json                   # PHP dependencies (WPCS)
├── webpack.config.js               # Custom webpack overrides (if needed)
│
├── includes/                       # PHP core functionality
│   ├── class-magical-blocks.php    # Main plugin class
│   ├── class-magical-blocks-loader.php    # Autoloader/init
│   ├── class-magical-blocks-blocks.php    # Block registration manager
│   ├── class-magical-blocks-assets.php    # Asset management
│   ├── class-magical-blocks-admin.php     # Admin page handler
│   ├── class-magical-blocks-rest-api.php  # REST API endpoints
│   ├── class-magical-blocks-templates.php # Template library (v2.0)
│   ├── functions.php               # Global helper functions
│   └── traits/                     # Reusable PHP traits
│       ├── trait-magical-blocks-singleton.php
│       ├── trait-magical-blocks-block-attributes.php
│       ├── trait-magical-blocks-responsive.php
│       └── trait-magical-blocks-pro-gating.php
│
├── blocks/                         # Individual block PHP (server-side)
│   ├── heading/
│   │   └── block.php               # Dynamic render callback
│   ├── button/
│   │   └── block.php
│   ├── icon-box/
│   │   └── block.php
│   ├── testimonial/
│   │   └── block.php
│   └── info-box/
│       └── block.php
│
├── src/                            # JavaScript/CSS source
│   ├── blocks/                     # Block editor scripts
│   │   ├── heading/
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── editor.scss
│   │   │   └── style.scss
│   │   ├── button/
│   │   ├── icon-box/
│   │   ├── testimonial/
│   │   └── info-box/
│   │
│   ├── components/                 # Shared React components
│   │   ├── icon-picker/
│   │   │   ├── index.js
│   │   │   └── style.scss
│   │   ├── color-control/
│   │   ├── spacing-control/
│   │   ├── typography-control/
│   │   ├── responsive-control/
│   │   └── pro-placeholder/
│   │
│   ├── admin/                      # React admin SPA (v1.1+)
│   │   ├── index.js                # Entry point
│   │   ├── App.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Blocks.js
│   │   │   ├── Settings.js
│   │   │   ├── ProUpgrade.js
│   │   │   └── Support.js
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   ├── Header.js
│   │   │   └── BlockCard.js
│   │   └── styles/
│   │       ├── admin.scss
│   │       └── variables.scss
│   │
│   ├── template-library/           # Template library modal (v2.0)
│   │   ├── index.js
│   │   ├── TemplateModal.js
│   │   ├── TemplateCard.js
│   │   ├── TemplatePreview.js
│   │   └── style.scss
│   │
│   └── common/                     # Shared utilities
│       ├── css-variables.scss      # Global CSS custom properties
│       ├── mixins.scss
│       ├── utils.js
│       └── constants.js
│
├── build/                          # Compiled assets (git-ignored)
│
├── assets/                         # Static assets
│   ├── css/
│   │   └── common.css              # Minimal shared CSS (<5KB)
│   ├── js/
│   │   └── common.js               # Minimal shared JS (if needed)
│   ├── icons/
│   │   └── font-awesome/           # Subset of FA icons
│   └── images/
│       └── placeholder.svg
│
├── templates/                      # Template library JSON (v2.0)
│   ├── hero/
│   ├── features/
│   ├── testimonials/
│   └── pricing/
│
├── languages/                      # i18n
│   └── magical-blocks.pot
│
└── admin/                          # Legacy admin assets (pre-React)
    └── views/
        └── admin-page.php          # Fallback admin page
```

**Structure Decision**: WordPress Plugin structure with hybrid architecture - PHP for server-side logic and block rendering, React (via @wordpress/scripts) for block editor controls and admin SPA. Blocks are self-contained in both `/blocks/` (PHP) and `/src/blocks/` (JS/CSS) directories, enabling on-demand asset loading per block.

## Complexity Tracking

> No constitution violations requiring justification.

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| Hybrid PHP/React | Required | WordPress blocks require both server-side PHP and client-side React |
| Dual block directories | Required | WordPress pattern: PHP renders, JS/CSS for editor |
| Admin SPA | Deferred to v1.1 | After 10 blocks in v1.0 |
| Pro Features | Deferred to v1.4 | After 25 blocks, ready for sales |
| Template Library | Deferred to v2.0 | After 50 blocks |
