# Research: Magical Blocks & Template Library

**Feature**: `001-gutenberg-template-library`  
**Date**: 2025-12-03  
**Purpose**: Resolve technical unknowns and establish best practices

## Research Tasks Completed

### 1. WordPress Block API Best Practices

**Decision**: Use `block.json` metadata with PHP render callbacks for dynamic blocks

**Rationale**:
- WordPress 6.0+ fully supports `block.json` for all block metadata
- Server-side rendering via `render_callback` enables PHP escaping and dynamic content
- `viewScript`, `editorScript`, `style`, `editorStyle` handles in `block.json` enable automatic on-demand loading
- Aligns with WordPress Core block patterns (e.g., core/paragraph, core/heading)

**Alternatives Considered**:
- Static `save.js` rendering: Rejected - limits dynamic features, harder to add PHP-based Pro gating
- `register_block_type()` without `block.json`: Rejected - deprecated pattern, harder to maintain

**Implementation Pattern**:
```php
// blocks/heading/block.php
function magical_blocks_render_heading( $attributes, $content, $block ) {
    $wrapper_attributes = get_block_wrapper_attributes( array(
        'class' => 'mgb-heading',
    ) );
    
    return sprintf(
        '<div %1$s><h2 class="mgb-heading__title">%2$s</h2></div>',
        $wrapper_attributes,
        esc_html( $attributes['content'] ?? '' )
    );
}
```

---

### 2. On-Demand Asset Loading Strategy

**Decision**: Use `block.json` asset handles + `render_block_{$block_name}` filter for conditional CSS

**Rationale**:
- WordPress automatically enqueues `style` and `viewScript` from `block.json` only when block is present
- Additional frontend CSS can be conditionally loaded via `render_block` filter
- No need for content parsing - WordPress handles detection internally

**Alternatives Considered**:
- Global CSS bundle: Rejected - violates Constitution Principle IV (On-Demand Loading)
- Manual content parsing: Rejected - complex, error-prone, already handled by WordPress

**Implementation Pattern**:
```json
// src/blocks/heading/block.json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "magical-blocks/heading",
    "style": "file:./style-index.css",
    "editorStyle": "file:./index.css",
    "editorScript": "file:./index.js",
    "viewScript": "file:./view.js",
    "render": "file:./render.php"
}
```

---

### 3. Pro/Free Gating Implementation

**Decision**: Centralized PHP function + JavaScript filter for editor-side gating

**Rationale**:
- Single source of truth: `magical_blocks_has_pro()` PHP function
- JavaScript receives Pro status via `wp_localize_script()` 
- Editor displays ProPlaceholder component when Pro block inserted without license
- Frontend renders nothing or placeholder via PHP render callback check

**Alternatives Considered**:
- Separate Pro plugin: Rejected - Constitution Principle V requires single-plugin distribution
- JavaScript-only gating: Rejected - security risk, can be bypassed client-side

**Implementation Pattern**:
```php
// includes/functions.php
function magical_blocks_has_pro() {
    // Check for license constant (set by license validation)
    if ( defined( 'MAGICAL_BLOCKS_HAS_PRO' ) ) {
        return MAGICAL_BLOCKS_HAS_PRO === 'yes';
    }
    
    // Check option (alternative storage)
    return get_option( 'magical_blocks_has_pro', 'no' ) === 'yes';
}

// For JavaScript access
function magical_blocks_localize_pro_status() {
    wp_localize_script( 'magical-blocks-editor', 'magicalBlocksData', array(
        'hasPro' => magical_blocks_has_pro(),
        'proBlocks' => magical_blocks_get_pro_block_list(),
        'upgradeUrl' => admin_url( 'admin.php?page=magical-blocks-pro' ),
    ) );
}
```

---

### 4. Font Awesome Integration Strategy

**Decision**: Custom icon picker component with selective SVG loading

**Rationale**:
- Full Font Awesome CSS is 80KB+ - too heavy for on-demand loading
- SVG icons can be inlined or loaded individually
- Searchable picker component provides good UX
- Only load icons actually used on the page

**Alternatives Considered**:
- Full Font Awesome CDN: Rejected - performance impact, external dependency
- @wordpress/icons only: Rejected - limited icon set, user expectation is Font Awesome
- Icon font subset: Considered - still requires font file, SVG more flexible

**Implementation Pattern**:
```javascript
// src/components/icon-picker/icons-data.js
export const fontAwesomeIcons = [
    { name: 'fa-home', svg: '<svg>...</svg>', category: 'solid' },
    { name: 'fa-user', svg: '<svg>...</svg>', category: 'solid' },
    // ... curated list of ~500 most-used icons
];

// Icon rendered as inline SVG, not font
```

---

### 5. Responsive Controls Architecture

**Decision**: Attribute suffix pattern (`_desktop`, `_tablet`, `_mobile`) with CSS variable output

**Rationale**:
- WordPress Block API supports structured attributes
- CSS custom properties enable responsive values without media queries in saved HTML
- Editor controls show device tabs for each responsive setting

**Alternatives Considered**:
- Single attribute with object value: More complex attribute handling
- Media queries in inline styles: Bloats saved HTML, harder to override

**Implementation Pattern**:
```javascript
// Attribute definition
attributes: {
    fontSize_desktop: { type: 'number', default: 24 },
    fontSize_tablet: { type: 'number', default: 20 },
    fontSize_mobile: { type: 'number', default: 16 },
}

// CSS output via PHP
function magical_blocks_generate_responsive_css( $block_id, $attribute, $property ) {
    return sprintf(
        '.mgb-%1$s { --%2$s-desktop: %3$s; --%2$s-tablet: %4$s; --%2$s-mobile: %5$s; }',
        esc_attr( $block_id ),
        esc_attr( $property ),
        esc_attr( $attribute['desktop'] ),
        esc_attr( $attribute['tablet'] ),
        esc_attr( $attribute['mobile'] )
    );
}
```

---

### 6. React Admin SPA Architecture

**Decision**: Single entry point with React Router for navigation, REST API for data

**Rationale**:
- `@wordpress/scripts` provides optimized React build
- WordPress admin page serves as shell, React takes over container
- REST API endpoints prefixed with `magical-blocks/v1/`
- Settings stored via Options API

**Alternatives Considered**:
- Multiple PHP admin pages: Rejected - poor UX, not modern
- iframe-based admin: Rejected - complex, poor integration
- Gutenberg-based admin: Considered - but SPA provides better control

**Implementation Pattern**:
```php
// includes/class-magical-blocks-admin.php
function magical_blocks_admin_menu() {
    add_menu_page(
        __( 'Magical Blocks', 'magical-blocks' ),
        __( 'Magical Blocks', 'magical-blocks' ),
        'manage_options',
        'magical-blocks',
        'magical_blocks_render_admin_page',
        'dashicons-block-default',
        58
    );
}

function magical_blocks_render_admin_page() {
    echo '<div id="magical-blocks-admin"></div>';
}
```

---

### 7. Template Library Storage Format

**Decision**: JSON files stored in plugin `/templates/` directory with category subdirectories

**Rationale**:
- No database dependency - templates ship with plugin
- Easy to add/update templates in releases
- JSON format stores serialized block content
- Future: Remote templates via REST API for Pro users

**Alternatives Considered**:
- Database storage: More complex, requires migration
- External CDN: Dependency, requires connectivity
- PHP arrays: Less portable than JSON

**Implementation Pattern**:
```json
// templates/hero/hero-centered.json
{
    "name": "hero-centered",
    "title": "Centered Hero",
    "category": "hero",
    "isPro": false,
    "preview": "hero-centered.png",
    "content": "<!-- wp:magical-blocks/heading -->...<!-- /wp:magical-blocks/heading -->"
}
```

---

### 8. CSS Variables System

**Decision**: Root-level CSS custom properties for colors, spacing, typography with block-specific overrides

**Rationale**:
- Centralized design tokens enable consistent theming
- Easy to override at block level
- Supports future dark mode via CSS custom property reassignment
- Small file size (under 5KB for common.css)

**Alternatives Considered**:
- Sass variables only: Not runtime-changeable
- CSS-in-JS: Additional dependency, SSR complexity
- Inline styles only: Repetitive, harder to maintain

**Implementation Pattern**:
```css
/* src/common/css-variables.scss */
:root {
    /* Colors */
    --mgb-primary: #5C6BC0;
    --mgb-secondary: #26A69A;
    --mgb-text: #333333;
    --mgb-text-light: #666666;
    --mgb-background: #ffffff;
    --mgb-border: #e0e0e0;
    
    /* Spacing */
    --mgb-spacing-xs: 4px;
    --mgb-spacing-sm: 8px;
    --mgb-spacing-md: 16px;
    --mgb-spacing-lg: 24px;
    --mgb-spacing-xl: 32px;
    
    /* Typography */
    --mgb-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --mgb-font-size-sm: 14px;
    --mgb-font-size-base: 16px;
    --mgb-font-size-lg: 18px;
    --mgb-font-size-xl: 24px;
    
    /* Border radius */
    --mgb-radius-sm: 4px;
    --mgb-radius-md: 8px;
    --mgb-radius-lg: 12px;
}
```

---

### 9. WordPress REST API Endpoint Design

**Decision**: Namespaced endpoints under `magical-blocks/v1/` with standard CRUD patterns

**Rationale**:
- WordPress REST API is the standard for admin SPA communication
- Proper permission callbacks ensure security
- JSON responses work seamlessly with React
- Versioned namespace allows future API changes

**Alternatives Considered**:
- Admin-ajax.php: Older pattern, less structured
- GraphQL: Overkill for this use case, additional dependency
- Custom PHP endpoints: Non-standard, harder to maintain

**Implementation Pattern**:
```php
// includes/class-magical-blocks-rest-api.php
function magical_blocks_register_rest_routes() {
    register_rest_route( 'magical-blocks/v1', '/settings', array(
        'methods'             => 'GET',
        'callback'            => 'magical_blocks_get_settings',
        'permission_callback' => function() {
            return current_user_can( 'manage_options' );
        },
    ) );
    
    register_rest_route( 'magical-blocks/v1', '/settings', array(
        'methods'             => 'POST',
        'callback'            => 'magical_blocks_update_settings',
        'permission_callback' => function() {
            return current_user_can( 'manage_options' );
        },
        'args' => array(
            'enabled_blocks' => array(
                'type' => 'array',
                'sanitize_callback' => 'magical_blocks_sanitize_block_list',
            ),
        ),
    ) );
}
```

---

### 10. Block Deprecation Strategy

**Decision**: Version-based deprecation array with migration functions

**Rationale**:
- WordPress Block API has built-in deprecation support
- Old saved content transforms automatically on page edit
- Prevents "This block contains unexpected content" errors
- Maintains backward compatibility per Constitution Principle VIII

**Alternatives Considered**:
- No deprecation (breaking changes): Violates constitution, breaks user sites
- Manual migration script: User-unfriendly, error-prone

**Implementation Pattern**:
```javascript
// src/blocks/heading/deprecated.js
const v1 = {
    attributes: {
        text: { type: 'string' }, // Old attribute name
    },
    migrate( attributes ) {
        return {
            content: attributes.text, // Map to new attribute name
        };
    },
    save( { attributes } ) {
        return <h2>{ attributes.text }</h2>;
    },
};

export default [ v1 ];
```

---

## Technology Stack Summary

| Layer | Technology | Version |
|-------|------------|---------|
| Language (Server) | PHP | 8.0+ |
| Language (Client) | JavaScript ES6+ | via Babel |
| Build Tool | @wordpress/scripts | 31.1.0 |
| Block Framework | WordPress Block API | v3 |
| Admin UI | React | 18.x (via WP) |
| Styling | SCSS → CSS | Custom only |
| Linting (PHP) | WPCS | 3.x |
| Linting (JS) | ESLint | via wp-scripts |
| Icons | Font Awesome SVG subset | 6.x |
| Testing | PHPUnit, Jest | via WP test suite |

---

## Prefix Reference

All PHP identifiers use `magical_blocks_` prefix:

| Type | Pattern | Example |
|------|---------|---------|
| Functions | `magical_blocks_*` | `magical_blocks_render_heading()` |
| Classes | `Magical_Blocks_*` | `class Magical_Blocks_Loader` |
| Traits | `Magical_Blocks_*_Trait` | `trait Magical_Blocks_Singleton_Trait` |
| Hooks (actions) | `magical_blocks_*` | `do_action( 'magical_blocks_init' )` |
| Hooks (filters) | `magical_blocks_*` | `apply_filters( 'magical_blocks_pro_blocks', $blocks )` |
| Options | `magical_blocks_*` | `get_option( 'magical_blocks_settings' )` |
| Transients | `magical_blocks_*` | `get_transient( 'magical_blocks_license_status' )` |
| REST namespace | `magical-blocks/v1` | `/wp-json/magical-blocks/v1/settings` |
| Block namespace | `magical-blocks/*` | `magical-blocks/heading` |
| CSS prefix | `mgb-*` | `.mgb-heading`, `.mgb-button` |
| JS global | `magicalBlocksData` | `window.magicalBlocksData.hasPro` |
