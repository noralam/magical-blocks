# Feature Specification: Magical Blocks & Template Library

**Feature Branch**: `001-gutenberg-template-library`  
**Created**: 2025-12-03  
**Status**: Draft  
**Input**: User description: "Build a WordPress plugin with 50+ Gutenberg blocks, template library, React admin panel, Free/Pro gating, following WordPress coding standards"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add and Customize a Block (Priority: P1)

As a WordPress content creator, I want to add a Gutenberg block from Magical Blocks to my page and customize every visual aspect so that I can create professional designs without writing code.

**Why this priority**: This is the core functionality - without blocks that users can add and customize, the plugin has no value. Every other feature builds upon this foundation.

**Independent Test**: Can be fully tested by installing the plugin, adding any available block to a page, and verifying all customization options work in the Block Editor. Delivers immediate value by enabling visual content creation.

**Acceptance Scenarios**:

1. **Given** the plugin is activated, **When** I open the Block Editor and search for "Magical", **Then** I see all available Magical Blocks listed in the block inserter with clear icons and labels.

2. **Given** I have inserted a Magical Block, **When** I select the block, **Then** the Inspector Panel displays organized customization sections for content, styling, and layout.

3. **Given** I am editing a block's style options, **When** I change colors, spacing, typography, or select an icon, **Then** the changes render immediately in the editor preview.

4. **Given** I have customized a block, **When** I save and view the page on the frontend, **Then** the block displays exactly as configured in the editor with proper styling.

5. **Given** I am using a Free block, **When** I access all its customization options, **Then** all options are fully functional without restrictions.

---

### User Story 2 - Pro Block Upgrade Path (Priority: P2)

As a WordPress user evaluating Pro features, I want to see locked Pro blocks with clear upgrade prompts so that I understand the value of upgrading and can make an informed decision.

**Why this priority**: Revenue generation through Pro upgrades is essential for plugin sustainability. Users need to discover Pro features naturally while using Free blocks.

**Independent Test**: Can be tested by ensuring Pro blocks appear in the inserter with a "Pro" badge, display a locked placeholder when inserted (when not licensed), and show upgrade information.

**Acceptance Scenarios**:

1. **Given** I am a Free user, **When** I browse blocks in the inserter, **Then** Pro blocks are visible with a clear "Pro" badge distinguishing them from Free blocks.

2. **Given** I am a Free user, **When** I insert a Pro block, **Then** the block displays an attractive "Pro Required" placeholder with upgrade information instead of the actual block content.

3. **Given** a Pro license is activated (`magical_blocks_has_pro === 'yes'`), **When** I insert a Pro block, **Then** the block is fully functional with all features unlocked.

4. **Given** I am viewing a page with a Pro block as a Free user, **When** the page loads, **Then** no Pro functionality executes and no premium assets load.

---

### User Story 3 - Manage Blocks via Admin Panel (Priority: P3)

As a site administrator, I want a centralized admin panel to enable/disable blocks and configure plugin settings so that I can optimize the plugin for my specific needs.

**Why this priority**: Admin control improves user experience by reducing clutter and provides site optimization capabilities. Required after reaching 10 blocks when management becomes necessary.

**Independent Test**: Can be tested by accessing the admin panel, toggling blocks on/off, and verifying disabled blocks no longer appear in the Block Editor.

**Acceptance Scenarios**:

1. **Given** the plugin has 10+ blocks, **When** I navigate to Magical Blocks in the admin menu, **Then** I see a modern React-powered admin interface with organized navigation.

2. **Given** I am on the Blocks management section, **When** I toggle a block off, **Then** that block no longer appears in the Gutenberg block inserter.

3. **Given** I have made changes to settings, **When** I click Save, **Then** settings persist and a success notification confirms the save.

4. **Given** I am viewing the Dashboard section, **When** the page loads, **Then** I see an overview of enabled blocks, plugin status, and quick links to documentation.

---

### User Story 4 - Insert Pre-designed Templates (Priority: P4)

As a content creator, I want to browse and insert pre-designed templates so that I can quickly create professional page layouts without building from scratch.

**Why this priority**: Template library significantly accelerates user workflow but requires 50+ blocks to be meaningful. This is the major milestone feature that differentiates the plugin.

**Independent Test**: Can be tested by opening the template library modal, browsing categories, previewing a template, and inserting it into the editor.

**Acceptance Scenarios**:

1. **Given** the plugin has 50+ blocks, **When** I click the Template Library button in the editor toolbar, **Then** a modern modal opens displaying categorized templates.

2. **Given** I am browsing templates, **When** I filter by category, **Then** only templates in that category display, with smooth filtering transitions.

3. **Given** I have selected a template, **When** I click the preview button, **Then** I see responsive previews showing desktop, tablet, and mobile views.

4. **Given** I want to use a template, **When** I click "Insert", **Then** the template's blocks are inserted at my cursor position in the editor.

---

### User Story 5 - Optimized Page Performance (Priority: P5)

As a site owner, I want pages using Magical Blocks to load fast so that my Core Web Vitals scores remain high and user experience is not degraded.

**Why this priority**: Performance directly impacts SEO and user experience. Poor performance would make users uninstall the plugin regardless of features.

**Independent Test**: Can be tested by creating a page with various blocks and measuring that only the CSS/JS for used blocks loads, not assets for unused blocks.

**Acceptance Scenarios**:

1. **Given** a page uses only 3 specific blocks, **When** the page loads on the frontend, **Then** only CSS and JS for those 3 blocks are enqueued (plus minimal common assets).

2. **Given** a page uses no Magical Blocks, **When** the page loads, **Then** no Magical Blocks assets are enqueued at all.

3. **Given** I have 50 blocks available, **When** I use only 2 blocks on a page, **Then** the additional 48 blocks' assets do not load.

---

### Edge Cases

- What happens when a user downgrades from Pro to Free while having Pro blocks on pages?
  - *Pro blocks display gracefully degraded placeholder on frontend; editor shows "Pro Required" notice*
- What happens when a block is disabled in admin but already exists on published pages?
  - *Existing block content remains visible on frontend; editor shows "Block Disabled" notice with option to convert*
- What happens when template library is accessed before 50 blocks are available?
  - *Feature is hidden; admin shows roadmap progress toward template library unlock*
- What happens when block customization data becomes invalid after an update?
  - *Block uses deprecation API to migrate old attributes; falls back to defaults if migration fails*

## Requirements *(mandatory)*

### Functional Requirements

**Block System**:
- **FR-001**: Plugin MUST provide native Gutenberg blocks using WordPress Block API with `block.json` metadata
- **FR-002**: Each block MUST include comprehensive customization options for content, styling, layout, and responsive behavior
- **FR-003**: Blocks MUST support Font Awesome icon selection via a searchable icon picker component
- **FR-004**: Block styling controls MUST include colors, typography, spacing, borders, shadows, and hover states
- **FR-005**: Blocks MUST provide responsive controls allowing different settings per device breakpoint (desktop, tablet, mobile)

**Pro/Free Architecture**:
- **FR-006**: Pro blocks MUST be gated by a centralized `magical_blocks_has_pro()` function checking `magical_blocks_has_pro === 'yes'`
- **FR-007**: Locked Pro blocks MUST display an informative placeholder in the editor with upgrade path information
- **FR-008**: Pro blocks MUST NOT execute premium functionality or load premium assets when locked

**Asset Loading**:
- **FR-009**: Plugin MUST load block CSS and JS only when the specific block is present on the page
- **FR-010**: Plugin MAY load a minimal common CSS file (under 5KB) for shared CSS variables and utilities
- **FR-011**: Plugin MUST NOT load any assets on pages without Magical Blocks

**Admin Panel** (activated at 10+ blocks):
- **FR-012**: Admin panel MUST be built with React using `@wordpress/scripts` as a single-page application
- **FR-013**: Admin panel MUST include sections: Dashboard, Blocks Management, Settings, Pro Upgrade, Support
- **FR-014**: Admin panel MUST allow enabling/disabling individual blocks
- **FR-015**: Admin panel MUST support light and dark mode themes

**Template Library** (activated at 50+ blocks):
- **FR-016**: Template library MUST provide a modal interface accessible from the Block Editor toolbar
- **FR-017**: Templates MUST be organized by categories with filtering capability
- **FR-018**: Template preview MUST show responsive views (desktop, tablet, mobile)
- **FR-019**: Template insertion MUST place all template blocks at the current cursor position

**Security & Standards**:
- **FR-020**: All output MUST be escaped using appropriate WordPress functions (`esc_html()`, `esc_attr()`, `esc_url()`, etc.)
- **FR-021**: All input MUST be sanitized using appropriate WordPress functions
- **FR-022**: All AJAX/REST requests MUST verify nonces and capability checks
- **FR-023**: All user-facing strings MUST be translatable using `__()`, `_e()`, or `@wordpress/i18n`

**Update Safety**:
- **FR-024**: Block attribute changes MUST use WordPress deprecation API for backward compatibility
- **FR-025**: Plugin updates MUST NOT break existing block content on published pages

### Key Entities

- **Block**: A self-contained Gutenberg block with unique identifier, category, customization schema, and assets. Can be Free or Pro tier. Has enabled/disabled state.

- **Block Category**: Grouping for blocks in the inserter (e.g., "Content", "Layout", "Media", "Interactive"). Each block belongs to one primary category.

- **Template**: Pre-designed combination of blocks forming a layout pattern. Has name, category, preview images, and serialized block content. Can be Free or Pro tier.

- **Template Category**: Grouping for templates (e.g., "Hero Sections", "Feature Grids", "Testimonials", "Pricing Tables").

- **Plugin Settings**: Global configuration including enabled/disabled blocks, license status, admin UI preferences, performance settings.

- **License Status**: Pro activation state derived from `magical_blocks_has_pro` constant/option, determining feature availability.

## Success Criteria *(mandatory)*

### Measurable Outcomes

**Core Functionality**:
- **SC-001**: Users can add and fully customize any available block within 2 minutes of first use
- **SC-002**: Block customization changes render in the editor preview within 100ms of user input
- **SC-003**: 100% of user-facing text strings are translatable

**Performance**:
- **SC-004**: Pages using Magical Blocks load only the assets for blocks present on that page
- **SC-005**: Common/shared CSS file size remains under 5KB minified
- **SC-006**: Admin panel initial load completes within 2 seconds on standard hosting

**Pro/Free Experience**:
- **SC-007**: Pro blocks are clearly identifiable in the block inserter via visual badge
- **SC-008**: Free users can preview Pro block capabilities through informative locked placeholders
- **SC-009**: Pro license activation unlocks all Pro features within one page refresh

**Reliability**:
- **SC-010**: Plugin updates preserve all existing block content and settings
- **SC-011**: 100% of PHP files prevent direct access
- **SC-012**: 100% of form submissions and AJAX requests verify nonces

**Milestones**:
- **SC-013**: Initial release delivers 5 fully functional, customizable blocks
- **SC-014**: Admin panel launches when block count reaches 10
- **SC-015**: Template library launches when block count reaches 50

## Assumptions

- WordPress 6.0+ is the minimum supported version (for modern Block API features)
- Users have basic familiarity with the Gutenberg Block Editor
- Pro license validation will use a constant or option value (`magical_blocks_has_pro`)
- Font Awesome icons will be loaded selectively (not the entire library)
- Templates will be stored as serialized block content, not requiring external API
- The React admin panel uses `@wordpress/scripts` build tooling already configured in the project
