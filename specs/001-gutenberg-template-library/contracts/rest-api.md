# REST API Contracts: Magical Blocks & Template Library

**Feature**: `001-gutenberg-template-library`  
**Date**: 2025-12-03  
**Base URL**: `/wp-json/magical-blocks/v1`

## Authentication

All endpoints require WordPress authentication via cookies (admin pages) or nonce verification.

```
X-WP-Nonce: {wp_rest_nonce}
```

## Endpoints

---

### GET /settings

Retrieve all plugin settings.

**Permission**: `manage_options`

**Response 200**:
```json
{
    "enabled_blocks": ["heading", "button", "icon-box", "testimonial", "info-box"],
    "disabled_blocks": [],
    "show_pro_blocks": true,
    "asset_loading": "auto",
    "common_css_enabled": true,
    "font_awesome_subset": "all",
    "admin_theme": "light",
    "version": "1.0.0"
}
```

**Response 403** (insufficient permissions):
```json
{
    "code": "rest_forbidden",
    "message": "Sorry, you are not allowed to access settings.",
    "data": { "status": 403 }
}
```

---

### POST /settings

Update plugin settings.

**Permission**: `manage_options`

**Request Body**:
```json
{
    "enabled_blocks": ["heading", "button"],
    "show_pro_blocks": true,
    "admin_theme": "dark"
}
```

**Response 200**:
```json
{
    "success": true,
    "message": "Settings saved successfully.",
    "settings": {
        "enabled_blocks": ["heading", "button"],
        "disabled_blocks": ["icon-box", "testimonial", "info-box"],
        "show_pro_blocks": true,
        "admin_theme": "dark"
    }
}
```

**Response 400** (validation error):
```json
{
    "code": "invalid_param",
    "message": "Invalid block name: invalid-block",
    "data": { "status": 400 }
}
```

---

### GET /blocks

Retrieve all registered blocks with metadata.

**Permission**: `edit_posts`

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | `all` | Filter: `all`, `enabled`, `disabled`, `pro`, `free` |

**Response 200**:
```json
{
    "blocks": [
        {
            "name": "magical-blocks/heading",
            "slug": "heading",
            "title": "Magical Heading",
            "description": "Advanced heading block with full typography controls",
            "category": "magical-blocks-content",
            "icon": "heading",
            "isPro": false,
            "isEnabled": true,
            "keywords": ["title", "headline", "h1", "h2"]
        },
        {
            "name": "magical-blocks/button",
            "slug": "button",
            "title": "Magical Button",
            "description": "Customizable button with hover effects",
            "category": "magical-blocks-content",
            "icon": "button",
            "isPro": false,
            "isEnabled": true,
            "keywords": ["link", "cta", "action"]
        }
    ],
    "total": 5,
    "enabled_count": 5,
    "disabled_count": 0,
    "pro_count": 0,
    "free_count": 5
}
```

---

### POST /blocks/{slug}/toggle

Enable or disable a specific block.

**Permission**: `manage_options`

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Block slug (e.g., `heading`) |

**Request Body**:
```json
{
    "enabled": false
}
```

**Response 200**:
```json
{
    "success": true,
    "block": {
        "slug": "heading",
        "isEnabled": false
    },
    "message": "Block disabled successfully."
}
```

**Response 404** (block not found):
```json
{
    "code": "block_not_found",
    "message": "Block 'invalid-block' not found.",
    "data": { "status": 404 }
}
```

---

### GET /license

Retrieve license status.

**Permission**: `manage_options`

**Response 200**:
```json
{
    "has_pro": false,
    "license_key": "",
    "license_status": "inactive",
    "expiry_date": null,
    "features": {
        "pro_blocks": false,
        "pro_templates": false,
        "custom_css": false,
        "priority_support": false
    }
}
```

---

### POST /license/activate

Activate a Pro license.

**Permission**: `manage_options`

**Request Body**:
```json
{
    "license_key": "XXXXX-XXXXX-XXXXX-XXXXX"
}
```

**Response 200**:
```json
{
    "success": true,
    "message": "License activated successfully.",
    "license": {
        "has_pro": true,
        "license_status": "active",
        "expiry_date": "2026-12-03",
        "features": {
            "pro_blocks": true,
            "pro_templates": true,
            "custom_css": true,
            "priority_support": true
        }
    }
}
```

**Response 400** (invalid license):
```json
{
    "code": "invalid_license",
    "message": "The license key is invalid or has expired.",
    "data": { "status": 400 }
}
```

---

### POST /license/deactivate

Deactivate the current license.

**Permission**: `manage_options`

**Response 200**:
```json
{
    "success": true,
    "message": "License deactivated successfully.",
    "license": {
        "has_pro": false,
        "license_status": "inactive"
    }
}
```

---

### GET /templates (v2.0)

Retrieve all available templates.

**Permission**: `edit_posts`

**Query Parameters**:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | `all` | Filter by category slug |
| `type` | string | `all` | Filter: `all`, `free`, `pro` |
| `search` | string | - | Search term |
| `page` | number | `1` | Page number |
| `per_page` | number | `12` | Items per page |

**Response 200**:
```json
{
    "templates": [
        {
            "id": "hero-centered-001",
            "name": "hero-centered",
            "title": "Centered Hero Section",
            "description": "Full-width hero with centered heading and CTA",
            "category": "hero",
            "isPro": false,
            "preview": "https://example.com/wp-content/plugins/magical-blocks/templates/hero/hero-centered-preview.png",
            "thumbnail": "https://example.com/wp-content/plugins/magical-blocks/templates/hero/hero-centered-thumb.png",
            "blocks_used": ["magical-blocks/section", "magical-blocks/heading", "magical-blocks/button"]
        }
    ],
    "total": 25,
    "pages": 3,
    "current_page": 1,
    "categories": [
        { "slug": "hero", "title": "Hero Sections", "count": 8 },
        { "slug": "features", "title": "Feature Grids", "count": 6 },
        { "slug": "testimonials", "title": "Testimonials", "count": 5 }
    ]
}
```

---

### GET /templates/{id}

Retrieve a single template with content.

**Permission**: `edit_posts`

**Response 200**:
```json
{
    "id": "hero-centered-001",
    "name": "hero-centered",
    "title": "Centered Hero Section",
    "description": "Full-width hero with centered heading and CTA button",
    "category": "hero",
    "isPro": false,
    "preview": "https://example.com/.../hero-centered-preview.png",
    "content": "<!-- wp:magical-blocks/section -->\n<!-- wp:magical-blocks/heading {\"align\":\"center\"} -->\n...",
    "blocks_used": ["magical-blocks/section", "magical-blocks/heading", "magical-blocks/button"]
}
```

**Response 403** (Pro template without license):
```json
{
    "code": "pro_required",
    "message": "This template requires a Pro license.",
    "data": { 
        "status": 403,
        "upgrade_url": "/wp-admin/admin.php?page=magical-blocks-pro"
    }
}
```

---

### GET /dashboard

Retrieve dashboard summary data.

**Permission**: `manage_options`

**Response 200**:
```json
{
    "plugin_version": "1.0.0",
    "wp_version": "6.4.2",
    "php_version": "8.1.0",
    "blocks": {
        "total": 5,
        "enabled": 5,
        "disabled": 0,
        "pro": 0,
        "free": 5
    },
    "templates": {
        "total": 0,
        "available_at": 50
    },
    "license": {
        "has_pro": false,
        "status": "inactive"
    },
    "quick_links": {
        "documentation": "https://docs.magical-blocks.com",
        "support": "https://support.magical-blocks.com",
        "changelog": "https://magical-blocks.com/changelog"
    },
    "announcements": [
        {
            "id": 1,
            "title": "Welcome to Magical Blocks!",
            "content": "Get started by adding blocks to your pages.",
            "type": "info",
            "dismissible": true
        }
    ]
}
```

---

## Error Response Format

All errors follow WordPress REST API conventions:

```json
{
    "code": "error_code",
    "message": "Human-readable error message",
    "data": {
        "status": 400,
        "params": {
            "field_name": "Validation error message"
        }
    }
}
```

**Common Error Codes**:
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `rest_forbidden` | 403 | User lacks required capability |
| `rest_no_route` | 404 | Endpoint not found |
| `invalid_param` | 400 | Request parameter validation failed |
| `block_not_found` | 404 | Requested block doesn't exist |
| `pro_required` | 403 | Feature requires Pro license |
| `invalid_license` | 400 | License key validation failed |

---

## PHP Implementation Reference

```php
// includes/class-magical-blocks-rest-api.php

class Magical_Blocks_REST_API {
    
    const NAMESPACE = 'magical-blocks/v1';
    
    public function magical_blocks_register_routes() {
        
        // Settings
        register_rest_route( self::NAMESPACE, '/settings', array(
            array(
                'methods'             => WP_REST_Server::READABLE,
                'callback'            => array( $this, 'magical_blocks_get_settings' ),
                'permission_callback' => array( $this, 'magical_blocks_admin_permission' ),
            ),
            array(
                'methods'             => WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'magical_blocks_update_settings' ),
                'permission_callback' => array( $this, 'magical_blocks_admin_permission' ),
                'args'                => $this->magical_blocks_get_settings_args(),
            ),
        ) );
        
        // Blocks
        register_rest_route( self::NAMESPACE, '/blocks', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( $this, 'magical_blocks_get_blocks' ),
            'permission_callback' => array( $this, 'magical_blocks_editor_permission' ),
        ) );
        
        // Block toggle
        register_rest_route( self::NAMESPACE, '/blocks/(?P<slug>[a-z0-9-]+)/toggle', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( $this, 'magical_blocks_toggle_block' ),
            'permission_callback' => array( $this, 'magical_blocks_admin_permission' ),
            'args'                => array(
                'slug' => array(
                    'required'          => true,
                    'validate_callback' => array( $this, 'magical_blocks_validate_block_slug' ),
                ),
                'enabled' => array(
                    'type'     => 'boolean',
                    'required' => true,
                ),
            ),
        ) );
    }
    
    public function magical_blocks_admin_permission() {
        return current_user_can( 'manage_options' );
    }
    
    public function magical_blocks_editor_permission() {
        return current_user_can( 'edit_posts' );
    }
}
```
