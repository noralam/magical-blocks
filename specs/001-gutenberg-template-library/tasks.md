# Tasks: Magical Blocks & Template Library

**Input**: Design documents from `/specs/001-gutenberg-template-library/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/rest-api.md ✓, quickstart.md ✓

**Tests**: Tests included where explicitly beneficial (block testing, API testing). Not all tasks require automated tests - WordPress plugin testing relies heavily on manual Block Editor validation.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- **ALL PHP** uses `magical_blocks_` prefix (functions, classes, traits, hooks)

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create plugin structure, install dependencies, configure build tools

- [X] T001 Create plugin directory structure per plan.md (`includes/`, `includes/traits/`, `blocks/`, `src/blocks/`, `src/components/`, `src/common/`, `assets/css/`, `assets/icons/`, `languages/`)
- [X] T002 Create main plugin file `magical-blocks.php` with plugin header, activation/deactivation hooks using `magical_blocks_` prefix
- [X] T003 [P] Create `composer.json` with WPCS dependencies and scripts (`phpcs`, `phpcbf`)
- [X] T004 [P] Update `package.json` with @wordpress/scripts, build scripts, and block dependencies
- [X] T005 [P] Create `.editorconfig` for consistent coding style
- [X] T006 [P] Create `.gitignore` excluding `node_modules/`, `vendor/`, `build/`
- [X] T007 Run `composer install` and `npm install` to verify dependency installation
- [X] T008 Create `webpack.config.js` for multi-block entry points (extends @wordpress/scripts)
- [X] T009 Verify `npm run build` compiles without errors

---

## Phase 2: Foundational (Core Infrastructure)

**Purpose**: Core PHP classes, traits, and helpers that ALL blocks depend on

**⚠️ CRITICAL**: No block implementation can begin until this phase is complete

### Core Classes

- [X] T010 Create `includes/class-magical-blocks.php` - Main plugin class with `magical_blocks_` methods for initialization
- [X] T011 Create `includes/class-magical-blocks-loader.php` - Autoloader and hook registration using `magical_blocks_register_*` methods
- [X] T012 [P] Create `includes/class-magical-blocks-blocks.php` - Block registration manager with `magical_blocks_register_blocks()` and `magical_blocks_get_block_list()`
- [X] T013 [P] Create `includes/class-magical-blocks-assets.php` - Asset management with `magical_blocks_enqueue_*` methods for on-demand loading
- [X] T014 [P] Create `includes/functions.php` - Global helper functions (`magical_blocks_has_pro()`, `magical_blocks_get_settings()`, `magical_blocks_sanitize_*`)

### Traits

- [X] T015 [P] Create `includes/traits/trait-magical-blocks-singleton.php` - Singleton pattern trait
- [X] T016 [P] Create `includes/traits/trait-magical-blocks-block-attributes.php` - Shared attribute getters (`magical_blocks_get_typography_attributes()`, `magical_blocks_get_spacing_attributes()`, `magical_blocks_get_color_attributes()`)
- [X] T017 [P] Create `includes/traits/trait-magical-blocks-responsive.php` - Responsive CSS generation (`magical_blocks_generate_responsive_css()`)
- [X] T018 [P] Create `includes/traits/trait-magical-blocks-pro-gating.php` - Pro feature checks (`magical_blocks_is_pro_block()`, `magical_blocks_render_pro_placeholder()`)

### CSS Variables System

- [X] T019 Create `src/common/css-variables.scss` - Root-level CSS custom properties (colors, spacing, typography, radii) per research.md
- [X] T020 [P] Create `src/common/mixins.scss` - SCSS mixins for responsive breakpoints, typography, shadows
- [X] T021 [P] Create `src/common/utils.js` - JavaScript utilities (generateBlockId, classNames helper)
- [X] T022 [P] Create `src/common/constants.js` - Shared constants (breakpoints, default values, CSS variable names)
- [X] T023 Build and verify `assets/css/common.css` is under 5KB minified

### Block Category Registration

- [X] T024 Add `magical_blocks_register_block_categories()` function in `class-magical-blocks-blocks.php` to register custom categories (`magical-blocks-content`, `magical-blocks-layout`, `magical-blocks-interactive`, `magical-blocks-media`)

### Internationalization Setup

- [X] T025 Create `languages/` directory and initial POT file generation script
- [X] T026 Verify all PHP strings use `__()` / `_e()` / `esc_html__()` with `magical-blocks` text domain

**Checkpoint**: Foundation ready - block implementation can now begin

---

## Phase 3: User Story 1 - Add and Customize a Block (Priority: P1) 🎯 MVP (v1.0 - 10 Blocks)

**Goal**: Users can add Gutenberg blocks from Magical Blocks and customize every visual aspect

**Independent Test**: Install plugin, add any block, verify all customization options work in Block Editor and render correctly on frontend

**v1.0 MVP Scope**: 10 fully functional blocks with all customization options

### Shared Components (Used by All Blocks)

- [X] T027 Create `src/components/color-control/index.js` - Color picker with preset colors and custom input
- [X] T028 [P] Create `src/components/color-control/attributes.js` - Shared color attribute schema
- [X] T029 [P] Create `src/components/color-control/style.scss` - Color control styling
- [X] T030 Create `src/components/spacing-control/index.js` - Padding/margin control with linked/unlinked values
- [X] T031 [P] Create `src/components/spacing-control/attributes.js` - Shared spacing attribute schema (desktop/tablet/mobile)
- [X] T032 [P] Create `src/components/spacing-control/style.scss` - Spacing control styling
- [X] T033 Create `src/components/typography-control/index.js` - Font family, size, weight, line-height, letter-spacing
- [X] T034 [P] Create `src/components/typography-control/attributes.js` - Shared typography attribute schema (responsive)
- [X] T035 [P] Create `src/components/typography-control/style.scss` - Typography control styling
- [X] T036 Create `src/components/responsive-control/index.js` - Device tab switcher (desktop/tablet/mobile)
- [X] T037 [P] Create `src/components/responsive-control/style.scss` - Device tabs styling
- [X] T038 Create `src/components/icon-picker/index.js` - Searchable Font Awesome icon picker with SVG rendering
- [X] T039 [P] Create `src/components/icon-picker/icons-data.js` - Curated Font Awesome SVG icon set (~500 icons)
- [X] T040 [P] Create `src/components/icon-picker/style.scss` - Icon picker modal styling

### Block 1: Heading Block

- [X] T041 [P] [US1] Create `src/blocks/heading/block.json` with attributes (content, level, alignment, typography, colors, spacing)
- [X] T042 [P] [US1] Create `src/blocks/heading/index.js` - Block registration entry point
- [X] T043 [US1] Create `src/blocks/heading/edit.js` - Editor component with InspectorControls (Content, Style, Advanced panels)
- [X] T044 [US1] Create `src/blocks/heading/save.js` - Save component outputting semantic heading tag
- [X] T045 [P] [US1] Create `src/blocks/heading/editor.scss` - Editor-only styles
- [X] T046 [P] [US1] Create `src/blocks/heading/style.scss` - Frontend + editor shared styles
- [X] T047 [US1] Create `blocks/heading/block.php` with `magical_blocks_render_heading()` callback

### Block 2: Dual Button Block

- [X] T048 [P] [US1] Create `src/blocks/button/block.json` with attributes (text, url, target, icon, colors, hover colors, spacing, border, shadow)
- [X] T049 [P] [US1] Create `src/blocks/button/index.js` - Block registration entry point
- [X] T050 [US1] Create `src/blocks/button/edit.js` - Editor component with link controls, icon picker, hover state preview
- [X] T051 [US1] Create `src/blocks/button/save.js` - Save component outputting anchor/button element
- [X] T052 [P] [US1] Create `src/blocks/button/editor.scss` - Editor-only styles
- [X] T053 [P] [US1] Create `src/blocks/button/style.scss` - Frontend styles including hover transitions
- [X] T054 [US1] Create `blocks/button/block.php` with `magical_blocks_render_button()` callback

### Block 3: Icon Box Block

- [X] T055 [P] [US1] Create `src/blocks/icon-box/block.json` with attributes (icon, title, description, icon position, colors, spacing)
- [X] T056 [P] [US1] Create `src/blocks/icon-box/index.js` - Block registration entry point
- [X] T057 [US1] Create `src/blocks/icon-box/edit.js` - Editor component with icon picker, layout options
- [X] T058 [US1] Create `src/blocks/icon-box/save.js` - Save component with icon + text layout
- [X] T059 [P] [US1] Create `src/blocks/icon-box/editor.scss` - Editor-only styles
- [X] T060 [P] [US1] Create `src/blocks/icon-box/style.scss` - Frontend styles with icon positioning
- [X] T061 [US1] Create `blocks/icon-box/block.php` with `magical_blocks_render_icon_box()` callback

### Block 4: Testimonial Block

- [X] T062 [P] [US1] Create `src/blocks/testimonial/block.json` with attributes (content, author, role, avatar, rating, colors, layout)
- [X] T063 [P] [US1] Create `src/blocks/testimonial/index.js` - Block registration entry point
- [X] T064 [US1] Create `src/blocks/testimonial/edit.js` - Editor component with avatar upload, star rating control
- [X] T065 [US1] Create `src/blocks/testimonial/save.js` - Save component with testimonial card layout
- [X] T066 [P] [US1] Create `src/blocks/testimonial/editor.scss` - Editor-only styles
- [X] T067 [P] [US1] Create `src/blocks/testimonial/style.scss` - Frontend styles with avatar, quote styling
- [X] T068 [US1] Create `blocks/testimonial/block.php` with `magical_blocks_render_testimonial()` callback

### Block 5: Info Box Block

- [X] T069 [P] [US1] Create `src/blocks/info-box/block.json` with attributes (icon, title, content, url, colors, border, shadow)
- [X] T070 [P] [US1] Create `src/blocks/info-box/index.js` - Block registration entry point
- [X] T071 [US1] Create `src/blocks/info-box/edit.js` - Editor component with content areas, link settings
- [X] T072 [US1] Create `src/blocks/info-box/save.js` - Save component with info box layout
- [X] T073 [P] [US1] Create `src/blocks/info-box/editor.scss` - Editor-only styles
- [X] T074 [P] [US1] Create `src/blocks/info-box/style.scss` - Frontend styles with hover effects
- [X] T075 [US1] Create `blocks/info-box/block.php` with `magical_blocks_render_info_box()` callback

### On-Demand Asset Verification

- [X] T076 [US1] Verify each block only loads its own CSS/JS via `block.json` handles
- [X] T077 [US1] Test page with single block loads only that block's assets
- [X] T078 [US1] Test page with no Magical Blocks loads zero plugin assets

### Editor Integration

- [X] T079 [US1] Add `magical_blocks_editor_assets()` to localize block data to JavaScript
- [X] T080 [US1] Create `src/blocks/index.js` as shared block registration entry
- [X] T081 [US1] Verify first 5 blocks appear in inserter under "Magical Content" category

### Block 6: Section/Container Block

- [X] T082 [P] [US1] Create `src/blocks/section/block.json` with container attributes (width, background, padding, alignment)
- [X] T083 [P] [US1] Create `src/blocks/section/index.js` - Block registration entry point
- [X] T084 [US1] Create `src/blocks/section/edit.js` with InnerBlocks for nested content
- [X] T085 [US1] Create `src/blocks/section/save.js` - Save component with container wrapper
- [X] T086 [P] [US1] Create `src/blocks/section/editor.scss` - Editor-only styles
- [X] T087 [P] [US1] Create `src/blocks/section/style.scss` - Frontend + editor shared styles
- [X] T088 [US1] Create `blocks/section/block.php` with `magical_blocks_render_section()` callback

### Block 7: Image Box Block

- [X] T089 [P] [US1] Create `src/blocks/image-box/block.json` with image + text layout attributes
- [X] T090 [P] [US1] Create `src/blocks/image-box/index.js` - Block registration entry point
- [X] T091 [US1] Create `src/blocks/image-box/edit.js` with MediaUpload integration
- [X] T092 [US1] Create `src/blocks/image-box/save.js` - Save component with image + content layout
- [X] T093 [P] [US1] Create `src/blocks/image-box/editor.scss` - Editor-only styles
- [X] T094 [P] [US1] Create `src/blocks/image-box/style.scss` - Frontend styles
- [X] T095 [US1] Create `blocks/image-box/block.php` with `magical_blocks_render_image_box()` callback

### Block 8: Counter/Number Block

- [X] T096 [P] [US1] Create `src/blocks/counter/block.json` with number, prefix, suffix, animation attributes
- [X] T097 [P] [US1] Create `src/blocks/counter/index.js` - Block registration entry point
- [X] T098 [US1] Create `src/blocks/counter/edit.js` with number formatting controls
- [X] T099 [US1] Create `src/blocks/counter/save.js` - Save component with animated counter
- [X] T100 [P] [US1] Create `src/blocks/counter/editor.scss` - Editor-only styles
- [X] T101 [P] [US1] Create `src/blocks/counter/style.scss` - Frontend styles with animation
- [X] T102 [US1] Create `blocks/counter/block.php` with `magical_blocks_render_counter()` callback

### Block 9: Progress Bar Block

- [X] T103 [P] [US1] Create `src/blocks/progress-bar/block.json` with percentage, colors, label attributes
- [X] T104 [P] [US1] Create `src/blocks/progress-bar/index.js` - Block registration entry point
- [X] T105 [US1] Create `src/blocks/progress-bar/edit.js` with visual progress editor
- [X] T106 [US1] Create `src/blocks/progress-bar/save.js` - Save component with progress bar
- [X] T107 [P] [US1] Create `src/blocks/progress-bar/editor.scss` - Editor-only styles
- [X] T108 [P] [US1] Create `src/blocks/progress-bar/style.scss` - Frontend styles with animation
- [X] T109 [US1] Create `blocks/progress-bar/block.php` with `magical_blocks_render_progress_bar()` callback

### Block 10: Divider/Separator Block

- [X] T110 [P] [US1] Create `src/blocks/divider/block.json` with style, width, color, icon attributes
- [X] T111 [P] [US1] Create `src/blocks/divider/index.js` - Block registration entry point
- [X] T112 [US1] Create `src/blocks/divider/edit.js` with divider style options
- [X] T113 [US1] Create `src/blocks/divider/save.js` - Save component with divider element
- [X] T114 [P] [US1] Create `src/blocks/divider/editor.scss` - Editor-only styles
- [X] T115 [P] [US1] Create `src/blocks/divider/style.scss` - Frontend styles
- [X] T116 [US1] Create `blocks/divider/block.php` with `magical_blocks_render_divider()` callback

### v1.0 Final Integration

- [X] T117 [US1] Verify all 10 blocks appear in inserter under "Magical Content" category
- [X] T118 [US1] Test all 10 blocks render correctly on frontend
- [X] T119 [US1] Verify on-demand asset loading works for all 10 blocks

**Checkpoint**: User Story 1 complete - 10 fully functional blocks with all customization options (v1.0 MVP)

---

## Phase 4: User Story 2 - Pro Block Upgrade Path (Priority: P2)

**Goal**: Free users see locked Pro blocks with clear upgrade prompts

**Independent Test**: Verify Pro blocks show "Pro" badge in inserter, display placeholder when inserted without license, and fully function when `magical_blocks_has_pro === 'yes'`

**Note**: Basic Pro gating infrastructure built here; full Pro features & sales-ready UI in v1.4

### Pro Gating Infrastructure

- [X] T120 [US2] Create `src/components/pro-placeholder/index.js` - Locked block placeholder component with upgrade CTA
- [X] T121 [P] [US2] Create `src/components/pro-placeholder/style.scss` - Attractive placeholder styling
- [X] T122 [US2] Add `magical_blocks_localize_pro_status()` function to pass Pro status to JavaScript via `wp_localize_script()`
- [X] T123 [US2] Update `magical_blocks_has_pro()` to check constant `MAGICAL_BLOCKS_HAS_PRO` and option fallback
- [X] T124 [US2] Create `magical_blocks_get_pro_block_list()` function returning array of Pro block slugs
- [X] T125 [US2] Add `isPro` property to block.json for Pro blocks

### Pro Badge in Inserter

- [X] T126 [US2] Create `src/common/pro-badge.js` - Filter to add Pro badge icon to block inserter
- [X] T127 [P] [US2] Create `src/common/pro-badge.scss` - Pro badge styling (gold/premium appearance)
- [X] T128 [US2] Register `blocks.registerBlockType` filter to add Pro badge to Pro blocks

### Pro Block Behavior

- [X] T129 [US2] Update block edit.js pattern to wrap content in ProPlaceholder when Pro block + no license
- [X] T130 [US2] Update PHP render callbacks to return placeholder HTML for Pro blocks without license
- [X] T131 [US2] Create `magical_blocks_render_pro_placeholder_frontend()` for frontend Pro placeholder
- [X] T132 [US2] Verify Pro blocks don't load premium assets when license inactive

### Testing Pro Flow

- [X] T133 [US2] Test: Pro badge visible on Pro blocks in inserter
- [X] T134 [US2] Test: Inserting Pro block without license shows placeholder
- [X] T135 [US2] Test: Setting `magical_blocks_has_pro` option to 'yes' unlocks Pro blocks

**Checkpoint**: User Story 2 complete - Basic Pro gating functional

---

## Phase 5: User Story 3 - Admin Panel (Priority: P3) - v1.1

**Goal**: Centralized admin panel to enable/disable blocks and configure settings

**Independent Test**: Access admin panel, toggle blocks, verify disabled blocks don't appear in Block Editor

**✅ MILESTONE v1.1**: This phase builds after v1.0 (10 blocks) is released

### Admin Menu & Page Shell

- [ ] T136 [US3] Create `includes/class-magical-blocks-admin.php` with `magical_blocks_admin_menu()` and `magical_blocks_render_admin_page()`
- [ ] T137 [US3] Register admin menu page under `magical-blocks` slug with dashicon
- [ ] T138 [US3] Create `admin/views/admin-page.php` as React app mount point (`<div id="magical-blocks-admin"></div>`)
- [ ] T139 [US3] Add `magical_blocks_admin_enqueue_scripts()` to load React admin bundle on admin page only

### REST API Endpoints

- [ ] T140 [US3] Create `includes/class-magical-blocks-rest-api.php` with `magical_blocks_register_rest_routes()` method
- [ ] T141 [US3] Implement `GET /wp-json/magical-blocks/v1/settings` endpoint with `magical_blocks_get_settings()` callback
- [ ] T142 [US3] Implement `POST /wp-json/magical-blocks/v1/settings` endpoint with `magical_blocks_update_settings()` callback
- [ ] T143 [US3] Implement `GET /wp-json/magical-blocks/v1/blocks` endpoint with `magical_blocks_get_blocks()` callback
- [ ] T144 [US3] Implement `POST /wp-json/magical-blocks/v1/blocks/{slug}/toggle` endpoint with `magical_blocks_toggle_block()` callback
- [ ] T145 [US3] Implement `GET /wp-json/magical-blocks/v1/license` endpoint with `magical_blocks_get_license()` callback
- [ ] T146 [US3] Implement `POST /wp-json/magical-blocks/v1/license/activate` endpoint with `magical_blocks_activate_license()` callback
- [ ] T147 [US3] Implement `POST /wp-json/magical-blocks/v1/license/deactivate` endpoint with `magical_blocks_deactivate_license()` callback
- [ ] T148 [US3] Implement `GET /wp-json/magical-blocks/v1/dashboard` endpoint with `magical_blocks_get_dashboard()` callback
- [ ] T149 [US3] Add nonce verification and `manage_options` capability check to all admin endpoints

### React Admin SPA

- [ ] T150 [US3] Create `src/admin/index.js` - Admin app entry point with React DOM render
- [ ] T151 [US3] Create `src/admin/App.js` - Main app component with React Router setup
- [ ] T152 [P] [US3] Create `src/admin/styles/variables.scss` - Admin-specific CSS variables (light/dark themes)
- [ ] T153 [P] [US3] Create `src/admin/styles/admin.scss` - Global admin styles

### Admin Layout Components

- [ ] T154 [US3] Create `src/admin/components/Sidebar.js` - Vertical navigation tabs (Dashboard, Blocks, Settings, Pro, Support)
- [ ] T155 [P] [US3] Create `src/admin/components/Header.js` - Admin header with plugin title and theme toggle
- [ ] T156 [P] [US3] Create `src/admin/components/Loader.js` - Loading spinner component
- [ ] T157 [P] [US3] Create `src/admin/components/Notice.js` - Success/error notification component

### Admin Pages

- [ ] T158 [US3] Create `src/admin/pages/Dashboard.js` - Overview with block stats, quick links, announcements
- [ ] T159 [US3] Create `src/admin/pages/Blocks.js` - Block grid with enable/disable toggles
- [ ] T160 [P] [US3] Create `src/admin/components/BlockCard.js` - Individual block card with toggle switch
- [ ] T161 [US3] Create `src/admin/pages/Settings.js` - Plugin settings form (asset loading, common CSS, Font Awesome subset)
- [ ] T162 [US3] Create `src/admin/pages/ProUpgrade.js` - Pro features showcase (placeholder for v1.4)
- [ ] T163 [US3] Create `src/admin/pages/Support.js` - Documentation links, support resources, system info

### Theme Support

- [ ] T164 [US3] Implement light/dark mode toggle in Header.js
- [ ] T165 [US3] Store theme preference via REST API and `magical_blocks_admin_theme` option
- [ ] T166 [US3] Apply theme class to admin container for CSS variable switching

### Block Toggle Functionality

- [ ] T167 [US3] Update `magical_blocks_register_blocks()` to check `enabled_blocks` setting before registration
- [ ] T168 [US3] Test: Disabled block does not appear in Block Editor inserter
- [ ] T169 [US3] Test: Existing disabled block on page shows "Block Disabled" notice in editor

**Checkpoint**: User Story 3 complete - Full admin panel with block management (v1.1)

---

## Phase 6: User Story 4 - Template Library (Priority: P4) - v2.0

**Goal**: Browse and insert pre-designed templates from modal interface

**Independent Test**: Open template library modal, browse categories, preview template, insert into editor

**✅ MILESTONE v2.0**: This phase activates when plugin reaches 50+ blocks

### Template Storage & Data

- [ ] T170 [US4] Create `includes/class-magical-blocks-templates.php` with `magical_blocks_get_templates()`, `magical_blocks_get_template()` methods
- [ ] T171 [US4] Create `templates/` directory structure with category subdirectories (`hero/`, `features/`, `testimonials/`, `pricing/`)
- [ ] T172 [P] [US4] Create template JSON schema and sample template files (3-5 initial templates)
- [ ] T173 [US4] Implement `magical_blocks_load_template_file()` to read and parse template JSON

### Template REST API

- [ ] T174 [US4] Implement `GET /wp-json/magical-blocks/v1/templates` endpoint with pagination and filtering
- [ ] T175 [US4] Implement `GET /wp-json/magical-blocks/v1/templates/{id}` endpoint returning template content
- [ ] T176 [US4] Add Pro template gating - return error for Pro templates without license

### Template Library Modal

- [ ] T177 [US4] Create `src/template-library/index.js` - Template library entry point
- [ ] T178 [US4] Create `src/template-library/TemplateModal.js` - Modal wrapper with header and category sidebar
- [ ] T179 [P] [US4] Create `src/template-library/TemplateCard.js` - Template thumbnail card component
- [ ] T180 [US4] Create `src/template-library/TemplatePreview.js` - Full preview with responsive device switcher
- [ ] T181 [P] [US4] Create `src/template-library/style.scss` - Template library modal styling

### Editor Integration

- [ ] T182 [US4] Add "Template Library" button to editor toolbar via `BlockControls` filter
- [ ] T183 [US4] Implement `magical_blocks_insert_template()` function to insert template blocks at cursor
- [ ] T184 [US4] Handle template insertion with `insertBlocks` from `@wordpress/block-editor`

### Template Features

- [ ] T185 [US4] Implement category filtering in modal
- [ ] T186 [US4] Implement search functionality for templates
- [ ] T187 [US4] Implement responsive preview (desktop/tablet/mobile views)
- [ ] T188 [US4] Add "Pro" badge to Pro-only templates
- [ ] T189 [US4] Show upgrade prompt when attempting to insert Pro template without license

**Checkpoint**: User Story 4 complete - Template library fully functional (v2.0)

---

## Phase 7: User Story 5 - Performance Optimization (Priority: P5)

**Goal**: Pages using Magical Blocks load fast with optimal Core Web Vitals

**Independent Test**: Create page with 3 blocks, verify only those 3 blocks' assets load, not all 50+

### Asset Optimization

- [ ] T190 [US5] Verify `block.json` handles trigger WordPress automatic asset enqueueing only when block present
- [ ] T191 [US5] Audit common.css to ensure it remains under 5KB minified
- [ ] T192 [US5] Split `src/admin/` build from block builds to prevent admin code in frontend
- [ ] T193 [US5] Add production build optimization flags in `webpack.config.js`

### Lazy Loading

- [ ] T194 [US5] Implement lazy loading for Icon Picker modal (load icons-data.js on demand)
- [ ] T195 [US5] Implement lazy loading for Template Library modal components
- [ ] T196 [US5] Use React.lazy() and Suspense for admin page components

### Database & Queries

- [ ] T197 [US5] Audit all `get_option()` calls - consolidate into single `magical_blocks_settings` option where possible
- [ ] T198 [US5] Add transient caching for template library data (`magical_blocks_templates_cache`)
- [ ] T199 [US5] Verify no N+1 query patterns in block rendering

### Build Optimization

- [ ] T200 [US5] Configure webpack for code splitting (vendor chunks for @wordpress/* packages)
- [ ] T201 [US5] Enable CSS minification in production builds
- [ ] T202 [US5] Enable JavaScript minification and tree-shaking
- [ ] T203 [US5] Generate source maps only for development builds
- [ ] T204 [US5] Add bundle analyzer script to monitor build size

### Performance Testing

- [ ] T205 [US5] Test: Page with no blocks loads 0 Magical Blocks assets
- [ ] T206 [US5] Test: Page with 1 block loads only that block's CSS/JS + common.css
- [ ] T207 [US5] Test: Admin panel loads under 2 seconds on standard hosting
- [ ] T208 [US5] Run Lighthouse audit and document Core Web Vitals impact

**Checkpoint**: User Story 5 complete - Performance optimized

---

## Phase 8: v1.0 Release Preparation

**Purpose**: Finalize first release with 10 blocks (MVP)

- [X] T209 Run full PHPCS audit: `composer run phpcs`
- [X] T210 Fix all PHPCS errors and warnings
- [X] T211 Run ESLint audit: `npm run lint:js`
- [X] T212 Fix all ESLint errors and warnings
- [X] T213 [P] Create `readme.txt` for WordPress.org with plugin description, installation, FAQ, changelog
- [X] T214 [P] Create `changelog.md` documenting v1.0.0 features
- [ ] T215 [P] Add plugin screenshots for WordPress.org (editor view, block examples, customization panel)
- [X] T216 Generate final POT file: `npm run build && wp i18n make-pot . languages/magical-blocks.pot`
- [X] T217 Test fresh installation on clean WordPress site
- [X] T218 Test plugin activation/deactivation cycles
- [X] T219 Test all 10 blocks in latest WordPress + Gutenberg plugin
- [X] T220 Create v1.0.0 Git tag
- [X] T221 Generate plugin ZIP: `npm run plugin-zip`
- [X] T222 Run quickstart.md validation - verify all steps work

**✅ v1.0.0 RELEASED**: 10 functional blocks, basic Pro gating, no admin panel

---

## Phase 9: v1.2 - Additional 10 Blocks (20 total)

**Purpose**: Expand block library to 20 blocks

### Block 11: Accordion Block

- [ ] T223 [P] Create `src/blocks/accordion/block.json` with FAQ-style accordion attributes
- [ ] T224 Create `src/blocks/accordion/edit.js` with collapsible item editor
- [ ] T225 Create `src/blocks/accordion/save.js` and `blocks/accordion/block.php`

### Block 12: Tabs Block

- [ ] T226 [P] Create `src/blocks/tabs/block.json` with tab panel attributes
- [ ] T227 Create `src/blocks/tabs/edit.js` with tab navigation editor
- [ ] T228 Create `src/blocks/tabs/save.js` and `blocks/tabs/block.php`

### Block 13: Alert/Notice Block

- [ ] T229 [P] Create `src/blocks/alert/block.json` with alert type, icon, dismissible attributes
- [ ] T230 Create `src/blocks/alert/edit.js` with alert style selector
- [ ] T231 Create `src/blocks/alert/save.js` and `blocks/alert/block.php`

### Block 14: Team Member Block

- [ ] T232 [P] Create `src/blocks/team-member/block.json` with photo, name, role, social links
- [ ] T233 Create `src/blocks/team-member/edit.js` with profile editor
- [ ] T234 Create `src/blocks/team-member/save.js` and `blocks/team-member/block.php`

### Block 15: Pricing Table Block

- [ ] T235 [P] Create `src/blocks/pricing-table/block.json` with price, features list, CTA attributes
- [ ] T236 Create `src/blocks/pricing-table/edit.js` with pricing editor
- [ ] T237 Create `src/blocks/pricing-table/save.js` and `blocks/pricing-table/block.php`

### Block 16: Feature List Block

- [ ] T238 [P] Create `src/blocks/feature-list/block.json` with icon list attributes
- [ ] T239 Create `src/blocks/feature-list/edit.js` with feature item editor
- [ ] T240 Create `src/blocks/feature-list/save.js` and `blocks/feature-list/block.php`

### Block 17: Call to Action Block

- [ ] T241 [P] Create `src/blocks/cta/block.json` with headline, description, button attributes
- [ ] T242 Create `src/blocks/cta/edit.js` with CTA layout options
- [ ] T243 Create `src/blocks/cta/save.js` and `blocks/cta/block.php`

### Block 18: Social Icons Block

- [ ] T244 [P] Create `src/blocks/social-icons/block.json` with platform links, style attributes
- [ ] T245 Create `src/blocks/social-icons/edit.js` with social platform selector
- [ ] T246 Create `src/blocks/social-icons/save.js` and `blocks/social-icons/block.php`

### Block 19: Video Block

- [ ] T247 [P] Create `src/blocks/video/block.json` with embed URL, poster, autoplay attributes
- [ ] T248 Create `src/blocks/video/edit.js` with video embed controls
- [ ] T249 Create `src/blocks/video/save.js` and `blocks/video/block.php`

### Block 20: Google Maps Block

- [ ] T250 [P] Create `src/blocks/google-maps/block.json` with location, zoom, style attributes
- [ ] T251 Create `src/blocks/google-maps/edit.js` with map configuration
- [ ] T252 Create `src/blocks/google-maps/save.js` and `blocks/google-maps/block.php`

### v1.2 Release

- [ ] T253 Test all 20 blocks
- [ ] T254 Update readme.txt and changelog for v1.2.0
- [ ] T255 Create v1.2.0 Git tag

---

## Phase 10: v1.3 - Additional 5 Blocks (25 total)

**Purpose**: Expand block library to 25 blocks

### Block 21: Flip Box Block

- [ ] T256 [P] Create `src/blocks/flip-box/block.json` with front/back content, flip direction
- [ ] T257 Create `src/blocks/flip-box/edit.js` and related files

### Block 22: Image Gallery Block

- [ ] T258 [P] Create `src/blocks/image-gallery/block.json` with grid, masonry, carousel layouts
- [ ] T259 Create `src/blocks/image-gallery/edit.js` and related files

### Block 23: Logo Carousel Block

- [ ] T260 [P] Create `src/blocks/logo-carousel/block.json` with autoplay, speed attributes
- [ ] T261 Create `src/blocks/logo-carousel/edit.js` and related files

### Block 24: Testimonial Carousel Block

- [ ] T262 [P] Create `src/blocks/testimonial-carousel/block.json` with multiple testimonials
- [ ] T263 Create `src/blocks/testimonial-carousel/edit.js` and related files

### Block 25: Star Rating Block

- [ ] T264 [P] Create `src/blocks/star-rating/block.json` with rating value, style attributes
- [ ] T265 Create `src/blocks/star-rating/edit.js` and related files

### v1.3 Release

- [ ] T266 Test all 25 blocks
- [ ] T267 Update readme.txt and changelog for v1.3.0
- [ ] T268 Create v1.3.0 Git tag

---

## Phase 11: v1.4 - Pro Features & Sales Ready

**Purpose**: Implement full Pro gating, advanced features, and sales-ready upgrade UI

**✅ MILESTONE v1.4**: Plugin ready for commercial sales

### Pro License System

- [ ] T269 Create `includes/class-magical-blocks-license.php` with `magical_blocks_validate_license()`, `magical_blocks_activate_license_key()`
- [ ] T270 Implement license key validation against remote server (or placeholder for your licensing system)
- [ ] T271 Add `magical_blocks_license_status` transient for caching license checks
- [ ] T272 Create `magical_blocks_get_license_info()` returning expiry, tier, features

### Advanced Pro Features

- [ ] T273 Add custom CSS field to Pro blocks (`customCSS` attribute)
- [ ] T274 Add advanced animation options to Pro blocks (entrance animations)
- [ ] T275 Add gradient backgrounds to Pro blocks
- [ ] T276 Create Pro-only blocks marker system (certain blocks only work with Pro)

### Upgrade Pro UI

- [ ] T277 Redesign `src/admin/pages/ProUpgrade.js` with feature comparison table
- [ ] T278 Add license activation form with validation feedback
- [ ] T279 Add license deactivation and transfer functionality
- [ ] T280 Add upgrade banners in admin dashboard
- [ ] T281 Add subtle upgrade prompts in block editor for Pro features

### Sales Integration

- [ ] T282 Add `magical_blocks_upgrade_url` filter for affiliate/reseller support
- [ ] T283 Implement upgrade URL tracking with UTM parameters
- [ ] T284 Add "What's in Pro" modal accessible from editor

### Testing Pro Flow

- [ ] T285 Test: License activation enables all Pro features
- [ ] T286 Test: License deactivation properly locks Pro features
- [ ] T287 Test: Expired license shows renewal prompt
- [ ] T288 Test: Pro blocks gracefully degrade without license

### v1.4 Release

- [ ] T289 Full Pro feature documentation
- [ ] T290 Update readme.txt and changelog for v1.4.0
- [ ] T291 Create v1.4.0 Git tag

**✅ v1.4.0 RELEASED**: Sales-ready with Pro upgrade flow

---

## Phase 12: v1.5 - Additional 5 Blocks (30 total)

**Purpose**: Expand to 30 blocks

- [ ] T292 Block 26: Content Timeline Block
- [ ] T293 Block 27: FAQ Schema Block  
- [ ] T294 Block 28: Before/After Image Block
- [ ] T295 Block 29: Countdown Timer Block
- [ ] T296 Block 30: Contact Form Block
- [ ] T297 Test all 30 blocks
- [ ] T298 Create v1.5.0 Git tag

---

## Phase 13: v1.6 - Additional 5 Blocks (35 total)

**Purpose**: Expand to 35 blocks

- [ ] T299 Block 31: Post Grid Block
- [ ] T300 Block 32: Post Carousel Block
- [ ] T301 Block 33: Table of Contents Block
- [ ] T302 Block 34: Breadcrumbs Block
- [ ] T303 Block 35: Author Box Block
- [ ] T304 Test all 35 blocks
- [ ] T305 Create v1.6.0 Git tag

---

## Phase 14: v1.7 - Additional 5 Blocks (40 total)

**Purpose**: Expand to 40 blocks

- [ ] T306 Block 36: Newsletter Signup Block
- [ ] T307 Block 37: Modal/Popup Block
- [ ] T308 Block 38: Lottie Animation Block
- [ ] T309 Block 39: Animated Headline Block
- [ ] T310 Block 40: Dual Heading Block
- [ ] T311 Test all 40 blocks
- [ ] T312 Create v1.7.0 Git tag

---

## Phase 15: v1.8 - Additional 5 Blocks (45 total)

**Purpose**: Expand to 45 blocks

- [ ] T313 Block 41: Icon List Block
- [ ] T314 Block 42: Step Process Block
- [ ] T315 Block 43: Content Toggle Block
- [ ] T316 Block 44: Data Table Block
- [ ] T317 Block 45: Price Menu Block
- [ ] T318 Test all 45 blocks
- [ ] T319 Create v1.8.0 Git tag

---

## Phase 16: v1.9 - Additional 5 Blocks (50 total)

**Purpose**: Reach 50 block milestone for Template Library

- [ ] T320 Block 46: Search Block
- [ ] T321 Block 47: Login Form Block
- [ ] T322 Block 48: Business Hours Block
- [ ] T323 Block 49: Restaurant Menu Block
- [ ] T324 Block 50: Hotspot/Image Map Block
- [ ] T325 Test all 50 blocks
- [ ] T326 Create v1.9.0 Git tag

**✅ 50 BLOCKS ACHIEVED**: Ready for Template Library (v2.0)

---

## Phase 17: Security & Standards Hardening

**Purpose**: Ensure WordPress.org compliance and security best practices

### Security Helpers

- [ ] T327 Create `magical_blocks_sanitize_html_classes()` helper for CSS class sanitization
- [ ] T328 [P] Create `magical_blocks_sanitize_svg()` helper for SVG content sanitization
- [ ] T329 [P] Create `magical_blocks_sanitize_url()` wrapper with additional validation
- [ ] T330 Create `magical_blocks_verify_nonce()` wrapper for consistent nonce verification
- [ ] T331 Create `magical_blocks_check_capability()` wrapper for permission checks

### Output Escaping Audit

- [ ] T332 Audit all `echo` statements - ensure proper escaping (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`)
- [ ] T333 Audit all block render callbacks for proper output escaping
- [ ] T334 Audit REST API responses for proper data sanitization

### Input Sanitization Audit

- [ ] T335 Audit all `$_GET`, `$_POST`, `$_REQUEST` usage - ensure sanitization
- [ ] T336 Audit REST API argument sanitization callbacks
- [ ] T337 Audit `update_option()` calls for proper sanitization

### Direct Access Prevention

- [ ] T338 Add `defined( 'ABSPATH' ) || exit;` to ALL PHP files
- [ ] T339 Verify no PHP files are directly accessible

---

## Phase 18: Documentation

**Purpose**: Developer and user documentation

### Developer Documentation

- [ ] T340 [P] Create `docs/creating-blocks.md` - Step-by-step guide for adding new blocks
- [ ] T341 [P] Create `docs/attributes-reference.md` - Block attribute schema documentation
- [ ] T342 [P] Create `docs/components-reference.md` - Shared component API documentation
- [ ] T343 [P] Create `docs/rest-api.md` - REST API endpoint documentation (expand from contracts/rest-api.md)
- [ ] T344 [P] Create `docs/pro-gating.md` - How to implement Pro features

### User Documentation

- [ ] T345 [P] Create `docs/user-guide.md` - Getting started for end users
- [ ] T346 [P] Create `docs/block-reference.md` - Documentation for each block with screenshots
- [ ] T347 [P] Create `docs/faq.md` - Frequently asked questions

### Code Comments

- [ ] T348 Add PHPDoc blocks to all PHP classes and methods
- [ ] T349 Add JSDoc comments to all JavaScript components and functions

---

## Phase 19: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple areas

- [ ] T350 Implement block deprecation handlers for future updates (empty arrays initially)
- [ ] T351 Add `magical_blocks_version_check()` for upgrade routines
- [ ] T352 Create uninstall.php with `magical_blocks_cleanup_options()` for clean uninstallation
- [ ] T353 Add admin notice for first-time activation with quick start link
- [ ] T354 Implement `magical_blocks_debug_mode()` for development logging
- [ ] T355 Final PHPCS/ESLint pass on entire codebase
- [ ] T356 Test plugin with popular themes (Twenty Twenty-Four, Astra, Kadence)
- [ ] T357 Test plugin with Gutenberg plugin (latest)
- [ ] T358 Run quickstart.md validation - all steps work for new developer

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────────────→ Start immediately
     │
     ▼
Phase 2 (Foundational) ──────────────────────────────────────────────→ BLOCKS all user stories
     │
     ▼
Phase 3 (US1 - 10 Blocks) ───────────────────────────────────────────→ v1.0 MVP
     │
     ├── Phase 4 (US2 - Basic Pro Gating) ───────────────────────────→ Parallel with blocks
     │
     ▼
Phase 8 (v1.0 Release) ──────────────────────────────────────────────→ 10 blocks shipped
     │
     ▼
Phase 5 (US3 - Admin Panel) ─────────────────────────────────────────→ v1.1
     │
     ▼
Phase 9 (v1.2 - 10 more blocks) ─────────────────────────────────────→ 20 blocks
     │
     ▼
Phase 10 (v1.3 - 5 more blocks) ─────────────────────────────────────→ 25 blocks
     │
     ▼
Phase 11 (v1.4 - Pro Features) ──────────────────────────────────────→ Sales Ready
     │
     ▼
Phase 12-16 (v1.5-v1.9 - 5 blocks each) ─────────────────────────────→ 50 blocks
     │
     ▼
Phase 6 (US4 - Template Library) ────────────────────────────────────→ v2.0
     │
     ▼
Phase 7 (US5 - Performance) + Phase 17 (Security) + Phase 18 (Docs) ─→ Ongoing
     │
     ▼
Phase 19 (Polish) ───────────────────────────────────────────────────→ Final phase
```

### User Story Dependencies

| Story | Depends On | Can Start After |
|-------|------------|-----------------|
| US1 (10 Blocks) | Phase 2 (Foundational) | T026 complete |
| US2 (Pro Gating) | US1 (needs blocks to gate) | T119 complete |
| US3 (Admin Panel) | US1, US2 | v1.0 released |
| US4 (Templates) | 50 blocks complete | v1.9 released |
| US5 (Performance) | US1 (needs blocks to optimize) | T119 complete |

### Critical Path to MVP (v1.0 - 10 Blocks)

```
T001 → T002 → T007 → T010 → T011 → T014 → T024 → T026 (Foundation)
                                                    │
                                                    ▼
T027-T040 (Shared Components) ──┬── T041-T047 (Heading Block)
                                ├── T048-T054 (Button Block)
                                ├── T055-T061 (Icon Box Block)
                                ├── T062-T068 (Testimonial Block)
                                ├── T069-T075 (Info Box Block)
                                ├── T082-T088 (Section Block)
                                ├── T089-T095 (Image Box Block)
                                ├── T096-T102 (Counter Block)
                                ├── T103-T109 (Progress Bar Block)
                                └── T110-T116 (Divider Block)
                                                    │
                                                    ▼
T117-T119 (Integration) → T209-T222 (Release Prep) → v1.0.0
```

---

## Parallel Execution Examples

### Phase 2 Parallel Tasks (Foundation)

```bash
# Can run simultaneously after T011:
T012 class-magical-blocks-blocks.php
T013 class-magical-blocks-assets.php
T014 functions.php

# Can run simultaneously:
T015 trait-singleton.php
T016 trait-block-attributes.php
T017 trait-responsive.php
T018 trait-pro-gating.php

# Can run simultaneously:
T019 css-variables.scss
T020 mixins.scss
T021 utils.js
T022 constants.js
```

### Phase 3 Parallel Tasks (US1 - 10 Blocks)

```bash
# All block.json files can be created in parallel:
T041, T048, T055, T062, T069, T082, T089, T096, T103, T110

# All index.js files can be created in parallel:
T042, T049, T056, T063, T070, T083, T090, T097, T104, T111

# All SCSS files can be created in parallel (20 files total)
```

### Multi-Developer Strategy

```
Developer A: Phase 2 (Foundation) → Phase 3 (Blocks 1-5)
Developer B: Phase 3 (Blocks 6-10) → Phase 4 (Pro Gating)
Developer C: Phase 5 (Admin Panel) after v1.0 → Phase 9 (v1.2 blocks)
```

---

## Implementation Strategy

### MVP First (v1.0.0 - 10 Blocks)

1. ✅ Complete Phase 1: Setup
2. ✅ Complete Phase 2: Foundational (CRITICAL)
3. ✅ Complete Phase 3: User Story 1 (10 blocks)
4. ✅ Complete Phase 4: Basic Pro Gating
5. ✅ Complete Phase 8: v1.0 Release Preparation
6. **SHIP v1.0.0** - 10 functional blocks, basic Pro gating, no admin panel

### Release Roadmap

| Version | Blocks | Key Features | Phase |
|---------|--------|--------------|-------|
| v1.0.0 | 10 | MVP - Core blocks, basic Pro gating | 1-4, 8 |
| v1.1.0 | 10 | Admin Panel (React SPA) | 5 |
| v1.2.0 | 20 | +10 blocks | 9 |
| v1.3.0 | 25 | +5 blocks | 10 |
| v1.4.0 | 25 | **Pro Features & Sales Ready** | 11 |
| v1.5.0 | 30 | +5 blocks | 12 |
| v1.6.0 | 35 | +5 blocks | 13 |
| v1.7.0 | 40 | +5 blocks | 14 |
| v1.8.0 | 45 | +5 blocks | 15 |
| v1.9.0 | 50 | +5 blocks (Template Library ready) | 16 |
| v2.0.0 | 50+ | **Template Library** | 6, 7 |

### Quality Gates

- **Before v1.0.0**: All 10 blocks work in editor + frontend, PHPCS clean
- **Before v1.1.0**: Admin Panel fully functional
- **Before v1.4.0**: Pro licensing system tested and secure
- **Before v2.0.0**: 50+ blocks registered, Template Library tested

---

## Notes

- **ALL PHP** functions, classes, traits, hooks use `magical_blocks_` prefix
- **CSS classes** use `mgb-` prefix (e.g., `.mgb-heading`, `.mgb-button`)
- **JavaScript global** is `magicalBlocksData`
- **REST namespace** is `magical-blocks/v1`
- **Block namespace** is `magical-blocks/` (e.g., `magical-blocks/heading`)
- [P] tasks = different files, no dependencies, can run in parallel
- [USx] label = maps task to specific user story
- Commit after each task or logical group
- Run `npm run build` after JavaScript/SCSS changes
- Run `composer run phpcs` before commits to catch issues early

### Version Milestones Summary

| Milestone | Blocks | Key Deliverable |
|-----------|--------|-----------------|
| **v1.0** | 10 | MVP with core blocks |
| **v1.1** | 10 | Admin Panel |
| **v1.2** | 20 | Expanded library |
| **v1.3** | 25 | More blocks |
| **v1.4** | 25 | **PRO FEATURES & SALES READY** |
| **v1.5-v1.9** | 30-50 | +5 blocks each |
| **v2.0** | 50+ | **TEMPLATE LIBRARY** |

### Total Task Count: 358

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | T001-T009 | Setup |
| 2 | T010-T026 | Foundational |
| 3 | T027-T119 | US1 - 10 Blocks (v1.0) |
| 4 | T120-T135 | US2 - Pro Gating |
| 5 | T136-T169 | US3 - Admin Panel (v1.1) |
| 6 | T170-T189 | US4 - Template Library (v2.0) |
| 7 | T190-T208 | US5 - Performance |
| 8 | T209-T222 | v1.0 Release |
| 9 | T223-T255 | v1.2 (+10 blocks) |
| 10 | T256-T268 | v1.3 (+5 blocks) |
| 11 | T269-T291 | v1.4 (Pro Features) |
| 12-16 | T292-T326 | v1.5-v1.9 (+25 blocks) |
| 17 | T327-T339 | Security |
| 18 | T340-T349 | Documentation |
| 19 | T350-T358 | Polish |
