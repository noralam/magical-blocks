# Data Model: Magical Blocks & Template Library

**Feature**: `001-gutenberg-template-library`  
**Date**: 2025-12-03  
**Purpose**: Define entities, attributes, and relationships

## Entity Definitions

### 1. Block

A self-contained Gutenberg block providing specific functionality with full customization options.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | ✅ | Unique block identifier (e.g., `magical-blocks/heading`) |
| `title` | string | ✅ | Human-readable name (translatable) |
| `description` | string | ✅ | Block purpose description (translatable) |
| `category` | string | ✅ | Block category slug (e.g., `magical-blocks-content`) |
| `icon` | string/object | ✅ | Dashicon name or SVG |
| `keywords` | array | ❌ | Search keywords for block inserter |
| `isPro` | boolean | ✅ | Whether block requires Pro license |
| `isEnabled` | boolean | ✅ | Whether block is enabled by admin |
| `attributes` | object | ✅ | Block attribute schema |
| `supports` | object | ❌ | WordPress block supports |
| `deprecated` | array | ❌ | Previous versions for migration |

**State Transitions**:
- Enabled → Disabled (admin toggle)
- Disabled → Enabled (admin toggle)
- Free → Pro (never changes, defined at creation)

**Validation Rules**:
- `name` must be unique and match pattern `magical-blocks/{slug}`
- `category` must be a registered block category
- `attributes` must define types and defaults for all configurable properties

---

### 2. Block Category

Grouping mechanism for organizing blocks in the inserter.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | ✅ | Unique identifier (e.g., `magical-blocks-content`) |
| `title` | string | ✅ | Display name (translatable) |
| `icon` | string | ❌ | Category icon |

**Predefined Categories**:
```php
$categories = array(
    array(
        'slug'  => 'magical-blocks-content',
        'title' => __( 'Magical Content', 'magical-blocks' ),
    ),
    array(
        'slug'  => 'magical-blocks-layout',
        'title' => __( 'Magical Layout', 'magical-blocks' ),
    ),
    array(
        'slug'  => 'magical-blocks-interactive',
        'title' => __( 'Magical Interactive', 'magical-blocks' ),
    ),
    array(
        'slug'  => 'magical-blocks-media',
        'title' => __( 'Magical Media', 'magical-blocks' ),
    ),
);
```

---

### 3. Block Attributes (Common Schema)

Standard attributes shared across most blocks for consistent customization.

#### Content Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `content` | string | `''` | Main text content |
| `icon` | object | `null` | Selected Font Awesome icon |
| `linkUrl` | string | `''` | Link destination URL |
| `linkTarget` | string | `'_self'` | Link target (`_self`, `_blank`) |

#### Typography Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `fontFamily` | string | `''` | Font family (empty = inherit) |
| `fontSize_desktop` | number | block-specific | Font size for desktop |
| `fontSize_tablet` | number | block-specific | Font size for tablet |
| `fontSize_mobile` | number | block-specific | Font size for mobile |
| `fontWeight` | string | `'400'` | Font weight (100-900) |
| `textTransform` | string | `'none'` | Text transform |
| `lineHeight` | number | `1.5` | Line height multiplier |
| `letterSpacing` | number | `0` | Letter spacing (px) |

#### Color Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `textColor` | string | `''` | Text color (hex/rgb) |
| `backgroundColor` | string | `''` | Background color |
| `borderColor` | string | `''` | Border color |
| `hoverTextColor` | string | `''` | Text color on hover |
| `hoverBackgroundColor` | string | `''` | Background on hover |

#### Spacing Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `padding_desktop` | object | `{top:0,right:0,bottom:0,left:0}` | Padding (desktop) |
| `padding_tablet` | object | `{...}` | Padding (tablet) |
| `padding_mobile` | object | `{...}` | Padding (mobile) |
| `margin_desktop` | object | `{top:0,right:0,bottom:0,left:0}` | Margin (desktop) |
| `margin_tablet` | object | `{...}` | Margin (tablet) |
| `margin_mobile` | object | `{...}` | Margin (mobile) |

#### Border Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `borderWidth` | number | `0` | Border width (px) |
| `borderStyle` | string | `'solid'` | Border style |
| `borderRadius` | number | `0` | Border radius (px) |

#### Shadow Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `boxShadow` | object | `null` | Box shadow settings |
| `boxShadow.horizontal` | number | `0` | X offset |
| `boxShadow.vertical` | number | `0` | Y offset |
| `boxShadow.blur` | number | `0` | Blur radius |
| `boxShadow.spread` | number | `0` | Spread radius |
| `boxShadow.color` | string | `''` | Shadow color |

#### Advanced Attributes
| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `blockId` | string | auto-generated | Unique instance ID |
| `customCSS` | string | `''` | Custom CSS (Pro only) |
| `animation` | string | `'none'` | Entrance animation |

---

### 4. Plugin Settings

Global configuration stored in WordPress options.

| Option Key | Type | Default | Description |
|------------|------|---------|-------------|
| `magical_blocks_settings` | object | `{}` | Main settings object |
| `magical_blocks_enabled_blocks` | array | `['all']` | List of enabled block slugs |
| `magical_blocks_has_pro` | string | `'no'` | Pro license status |
| `magical_blocks_license_key` | string | `''` | License key (encrypted) |
| `magical_blocks_version` | string | `'1.0.0'` | Installed version |
| `magical_blocks_admin_theme` | string | `'light'` | Admin color scheme |

**Settings Object Structure**:
```php
$settings = array(
    'enabled_blocks'      => array( 'heading', 'button', 'icon-box' ),
    'disabled_blocks'     => array(),
    'show_pro_blocks'     => true,  // Show Pro blocks in inserter
    'asset_loading'       => 'auto', // auto, manual
    'common_css_enabled'  => true,
    'font_awesome_subset' => 'all', // all, solid, regular, brands
);
```

---

### 5. Template (v2.0)

Pre-designed block combination for quick page building.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Unique template identifier |
| `name` | string | ✅ | URL-friendly slug |
| `title` | string | ✅ | Display title (translatable) |
| `description` | string | ❌ | Template description |
| `category` | string | ✅ | Template category slug |
| `isPro` | boolean | ✅ | Pro-only template |
| `preview` | string | ✅ | Preview image filename |
| `thumbnail` | string | ✅ | Thumbnail image filename |
| `content` | string | ✅ | Serialized block content |
| `blocks_used` | array | ✅ | List of block names used |
| `version` | string | ✅ | Template version |

**Template JSON Structure**:
```json
{
    "id": "hero-centered-001",
    "name": "hero-centered",
    "title": "Centered Hero Section",
    "description": "Full-width hero with centered heading and CTA button",
    "category": "hero",
    "isPro": false,
    "preview": "hero-centered-preview.png",
    "thumbnail": "hero-centered-thumb.png",
    "content": "<!-- wp:magical-blocks/section -->\n<!-- wp:magical-blocks/heading {\"align\":\"center\"} -->\n<h2 class=\"mgb-heading\">Welcome</h2>\n<!-- /wp:magical-blocks/heading -->\n<!-- wp:magical-blocks/button {\"align\":\"center\"} -->\n<!-- /wp:magical-blocks/button -->\n<!-- /wp:magical-blocks/section -->",
    "blocks_used": ["magical-blocks/section", "magical-blocks/heading", "magical-blocks/button"],
    "version": "1.0.0"
}
```

---

### 6. Template Category (v2.0)

Grouping for template library organization.

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | ✅ | Unique identifier |
| `title` | string | ✅ | Display name (translatable) |
| `icon` | string | ❌ | Category icon |
| `count` | number | computed | Number of templates |

**Predefined Template Categories**:
```php
$template_categories = array(
    'hero'         => __( 'Hero Sections', 'magical-blocks' ),
    'features'     => __( 'Feature Grids', 'magical-blocks' ),
    'testimonials' => __( 'Testimonials', 'magical-blocks' ),
    'pricing'      => __( 'Pricing Tables', 'magical-blocks' ),
    'cta'          => __( 'Call to Action', 'magical-blocks' ),
    'team'         => __( 'Team Members', 'magical-blocks' ),
    'faq'          => __( 'FAQ Sections', 'magical-blocks' ),
    'contact'      => __( 'Contact Forms', 'magical-blocks' ),
    'footer'       => __( 'Footer Layouts', 'magical-blocks' ),
    'full-page'    => __( 'Full Pages', 'magical-blocks' ),
);
```

---

## Entity Relationships

```text
┌─────────────────┐     ┌─────────────────┐
│  Block Category │────<│     Block       │
│  (1)            │     │  (many)         │
└─────────────────┘     └─────────────────┘
                              │
                              │ uses
                              ▼
┌─────────────────┐     ┌─────────────────┐
│ Template Category│────<│    Template     │
│  (1)            │     │  (many)         │
└─────────────────┘     └─────────────────┘
                              │
                              │ blocks_used
                              ▼
                        ┌─────────────────┐
                        │  Block (refs)   │
                        └─────────────────┘

┌─────────────────┐
│ Plugin Settings │ (singleton)
│  - enabled_blocks: Block[]
│  - license_status: string
│  - admin_theme: string
└─────────────────┘
```

---

## Storage Locations

| Entity | Storage | Location |
|--------|---------|----------|
| Block Definition | PHP/JSON | `src/blocks/{name}/block.json` |
| Block PHP | PHP | `blocks/{name}/block.php` |
| Block Enabled State | Options API | `magical_blocks_settings['enabled_blocks']` |
| Plugin Settings | Options API | `magical_blocks_settings` |
| License Status | Options API | `magical_blocks_has_pro` |
| Template Definition | JSON File | `templates/{category}/{name}.json` |
| Template Category | PHP Constant | `includes/class-magical-blocks-templates.php` |

---

## Initial Blocks (v1.0.0)

| # | Block Name | Category | Pro | Description |
|---|------------|----------|-----|-------------|
| 1 | `heading` | content | No | Advanced heading with typography controls |
| 2 | `button` | content | No | Customizable button with hover effects |
| 3 | `icon-box` | content | No | Icon + heading + description box |
| 4 | `testimonial` | content | No | Customer testimonial card |
| 5 | `info-box` | content | No | Information box with icon and content |

---

## Attribute Inheritance via Traits

Blocks share common attributes through PHP traits:

```php
// includes/traits/trait-magical-blocks-block-attributes.php
trait Magical_Blocks_Block_Attributes_Trait {
    
    protected function magical_blocks_get_typography_attributes() {
        return array(
            'fontFamily'       => array( 'type' => 'string', 'default' => '' ),
            'fontSize_desktop' => array( 'type' => 'number', 'default' => 16 ),
            'fontSize_tablet'  => array( 'type' => 'number', 'default' => 16 ),
            'fontSize_mobile'  => array( 'type' => 'number', 'default' => 16 ),
            // ... more typography attributes
        );
    }
    
    protected function magical_blocks_get_spacing_attributes() {
        return array(
            'padding_desktop' => array(
                'type'    => 'object',
                'default' => array( 'top' => 0, 'right' => 0, 'bottom' => 0, 'left' => 0 ),
            ),
            // ... more spacing attributes
        );
    }
    
    protected function magical_blocks_get_color_attributes() {
        return array(
            'textColor'       => array( 'type' => 'string', 'default' => '' ),
            'backgroundColor' => array( 'type' => 'string', 'default' => '' ),
            // ... more color attributes
        );
    }
}
```

---

## JavaScript Attribute Merging

```javascript
// src/blocks/heading/attributes.js
import { typographyAttributes } from '../../components/typography-control/attributes';
import { spacingAttributes } from '../../components/spacing-control/attributes';
import { colorAttributes } from '../../components/color-control/attributes';

export default {
    // Block-specific
    content: {
        type: 'string',
        default: '',
    },
    level: {
        type: 'number',
        default: 2,
    },
    
    // Merged from shared components
    ...typographyAttributes,
    ...spacingAttributes,
    ...colorAttributes,
};
```
