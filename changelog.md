# Changelog

All notable changes to Magical Blocks will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-09

### 🚀 MAJOR UPDATE - Complete Plugin Rebuild!

> ⚠️ **BREAKING CHANGE**: This is a complete rewrite of the plugin. The old simple blocks from WordPress.org have been entirely removed and replaced with a modern, professional block collection. Fresh install recommended for best experience.

### What's New

This version represents a **complete rebuild from the ground up**. Every aspect of the plugin has been redesigned and rewritten to provide a professional-grade block editing experience.

### Added

#### 12 Professional Blocks
- **Container Block** - Powerful Flexbox container with full layout controls (direction, wrap, justify, align)
- **Inner Container Block** - Nestable container for complex multi-column layouts
- **Section Block** - Full-width sections with backgrounds, overlays, and inner blocks
- **Heading Block** - Advanced typography controls with Google Fonts integration
- **Button Block** - Stylish buttons with hover effects, icons, and link options
- **Icon Box Block** - Icon + text combinations for features and services
- **Testimonial Block** - Customer reviews with avatar and star ratings
- **Info Box Block** - Information cards with icons and call-to-action
- **Image Box Block** - Image + text layouts with hover effects
- **Counter Block** - Animated number counters for statistics
- **Progress Bar Block** - Visual progress indicators with animations
- **Divider Block** - Stylish separators with icons and text

#### Modern Architecture
- **Complete codebase rewrite** with modern PHP 8.0+ and ES6+ standards
- **Flexbox Layout System** - Container blocks with full Flexbox controls like Elementor
- **On-Demand Asset Loading** - CSS/JS only loads when blocks are used (zero bloat!)
- **Responsive Controls** - Desktop, tablet, and mobile settings for all properties
- **CSS Variables System** - Easy theme integration and customization

#### Developer Features
- WPCS (WordPress Coding Standards) compliant PHP code
- ESLint and Prettier configured JavaScript/JSX
- @wordpress/scripts based build system with Webpack
- Comprehensive component library (ColorControl, SpacingControl, TypographyControl, ResponsiveControl, IconPicker)
- Internationalization ready with text domain support
- Modular architecture with traits and singleton pattern

#### Block Patterns
- Hero Section
- Features Grid
- Services Section
- Team Section
- Testimonial Cards
- Pricing Table
- CTA Banner

### Changed
- **Complete UI overhaul** - All blocks now feature Elementor-style design panels
- **Improved performance** - Lighter, faster, more efficient code
- **Better WordPress 6.7 compatibility** - Tested with latest WordPress and Gutenberg

### Removed
- ❌ Old simple blocks from previous WordPress.org version (completely replaced)
- ❌ Legacy code and outdated dependencies

### Technical Details

#### Requirements
- WordPress 6.0 or higher
- PHP 8.0 or higher
- Modern browser with ES6 support

#### Build Commands
```bash
npm install          # Install dependencies
npm run build        # Build for production
npm run start        # Development mode with watch
npm run lint:js      # JavaScript linting
npm run lint:css     # CSS linting
composer run phpcs   # PHP code standards check
```

---

## [Unreleased]

### Planned
- Admin Panel with block enable/disable settings
- Additional blocks
- Pro features and licensing
- Template Library

---

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| 2.0.0   | 2025-12-09 | 🚀 Complete rebuild - 12 professional blocks, modern architecture |
| 1.x.x   | Legacy | Old WordPress.org version (deprecated) |
