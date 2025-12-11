# Quickstart Guide: Magical Blocks & Template Library

**Feature**: `001-gutenberg-template-library`  
**Date**: 2025-12-03  
**Purpose**: Get development environment running quickly

## Prerequisites

- WordPress 6.0+ installed locally (Laragon, LocalWP, MAMP, etc.)
- PHP 8.0+
- Node.js 18+ and npm
- Composer (for WPCS)
- Git

## Quick Setup (5 minutes)

### 1. Clone and Install

```bash
# Navigate to WordPress plugins directory
cd /path/to/wordpress/wp-content/plugins/magical-blocks

# Install PHP dependencies (WPCS)
composer install

# Install Node dependencies
npm install
```

### 2. Start Development Build

```bash
# Start webpack in watch mode
npm start
```

This compiles:
- `src/blocks/*` → `build/blocks/*`
- `src/components/*` → `build/components/*`
- `src/admin/*` → `build/admin/*`
- SCSS → CSS

### 3. Activate Plugin

1. Go to WordPress Admin → Plugins
2. Find "Magical Blocks" and click "Activate"
3. Open any page/post in Block Editor
4. Search for "Magical" in block inserter

## Development Commands

```bash
# Development (watch mode)
npm start

# Production build
npm run build

# JavaScript linting
npm run lint:js

# CSS linting
npm run lint:css

# Auto-fix linting issues
npm run lint:js -- --fix

# PHP linting (WPCS)
composer run phpcs

# PHP auto-fix
composer run phpcbf

# Generate POT file for translations
npm run build && wp i18n make-pot . languages/magical-blocks.pot --domain=magical-blocks

# Create plugin ZIP
npm run plugin-zip
```

## Creating a New Block (Step-by-Step)

### Step 1: Create Block Directory Structure

```bash
# Create directories
mkdir -p src/blocks/my-block
mkdir -p blocks/my-block
```

### Step 2: Create block.json

```json
// src/blocks/my-block/block.json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "magical-blocks/my-block",
    "version": "1.0.0",
    "title": "My Block",
    "category": "magical-blocks-content",
    "icon": "star-filled",
    "description": "A custom block description.",
    "keywords": ["custom", "example"],
    "supports": {
        "html": false,
        "align": ["wide", "full"]
    },
    "textdomain": "magical-blocks",
    "attributes": {
        "content": {
            "type": "string",
            "default": ""
        },
        "blockId": {
            "type": "string",
            "default": ""
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "render": "file:../../../blocks/my-block/block.php"
}
```

### Step 3: Create index.js (Entry Point)

```javascript
// src/blocks/my-block/index.js
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import './editor.scss';
import './style.scss';

registerBlockType( metadata.name, {
    edit: Edit,
    save,
} );
```

### Step 4: Create edit.js (Editor Component)

```javascript
// src/blocks/my-block/edit.js
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
    const { content, blockId } = attributes;
    
    // Generate unique block ID
    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: `mgb-${ clientId.slice( 0, 8 ) }` } );
        }
    }, [ blockId, clientId, setAttributes ] );
    
    const blockProps = useBlockProps( {
        className: 'mgb-my-block',
    } );
    
    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'magical-blocks' ) }>
                    <TextControl
                        label={ __( 'Content', 'magical-blocks' ) }
                        value={ content }
                        onChange={ ( value ) => setAttributes( { content: value } ) }
                    />
                </PanelBody>
            </InspectorControls>
            
            <div { ...blockProps }>
                <RichText
                    tagName="p"
                    value={ content }
                    onChange={ ( value ) => setAttributes( { content: value } ) }
                    placeholder={ __( 'Enter content...', 'magical-blocks' ) }
                />
            </div>
        </>
    );
}
```

### Step 5: Create save.js (Saved Output)

```javascript
// src/blocks/my-block/save.js
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
    const { content, blockId } = attributes;
    
    const blockProps = useBlockProps.save( {
        className: 'mgb-my-block',
        id: blockId,
    } );
    
    return (
        <div { ...blockProps }>
            <RichText.Content tagName="p" value={ content } />
        </div>
    );
}
```

### Step 6: Create PHP Render (Optional Dynamic)

```php
<?php
// blocks/my-block/block.php
defined( 'ABSPATH' ) || exit;

/**
 * Render callback for magical-blocks/my-block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string Rendered block HTML.
 */
function magical_blocks_render_my_block( $attributes, $content, $block ) {
    $block_id = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
    $text     = isset( $attributes['content'] ) ? $attributes['content'] : '';
    
    $wrapper_attributes = get_block_wrapper_attributes( array(
        'class' => 'mgb-my-block',
        'id'    => esc_attr( $block_id ),
    ) );
    
    ob_start();
    ?>
    <div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
        <p><?php echo esc_html( $text ); ?></p>
    </div>
    <?php
    return ob_get_clean();
}
```

### Step 7: Create SCSS Files

```scss
// src/blocks/my-block/editor.scss
.mgb-my-block {
    // Editor-only styles
    border: 1px dashed var(--mgb-border);
    padding: var(--mgb-spacing-md);
}

// src/blocks/my-block/style.scss
.mgb-my-block {
    // Frontend + editor styles
    padding: var(--mgb-spacing-md);
    
    p {
        margin: 0;
        font-size: var(--mgb-font-size-base);
        color: var(--mgb-text);
    }
}
```

### Step 8: Register Block in PHP

Add to `includes/class-magical-blocks-blocks.php`:

```php
$blocks = array(
    'heading',
    'button',
    'icon-box',
    'testimonial',
    'info-box',
    'my-block', // Add new block
);
```

### Step 9: Build and Test

```bash
npm run build
```

Then refresh the Block Editor and search for "My Block".

## File Structure After Setup

```text
magical-blocks/
├── magical-blocks.php          ✓ Main plugin file
├── package.json                ✓ Already exists
├── composer.json               ✓ Add for WPCS
│
├── includes/
│   ├── class-magical-blocks.php
│   ├── class-magical-blocks-loader.php
│   ├── class-magical-blocks-blocks.php
│   ├── class-magical-blocks-assets.php
│   ├── functions.php
│   └── traits/
│       ├── trait-magical-blocks-singleton.php
│       └── trait-magical-blocks-block-attributes.php
│
├── blocks/
│   ├── heading/
│   │   └── block.php
│   ├── button/
│   │   └── block.php
│   └── ... (5 blocks for v1.0)
│
├── src/
│   ├── blocks/
│   │   ├── heading/
│   │   │   ├── block.json
│   │   │   ├── index.js
│   │   │   ├── edit.js
│   │   │   ├── save.js
│   │   │   ├── editor.scss
│   │   │   └── style.scss
│   │   └── ... (5 blocks for v1.0)
│   │
│   ├── components/
│   │   ├── icon-picker/
│   │   ├── color-control/
│   │   ├── spacing-control/
│   │   ├── typography-control/
│   │   └── responsive-control/
│   │
│   └── common/
│       ├── css-variables.scss
│       └── utils.js
│
├── build/                      (generated)
│
├── assets/
│   └── css/
│       └── common.css
│
└── languages/
    └── magical-blocks.pot
```

## Verify Installation

Run these commands to verify setup:

```bash
# Check Node dependencies
npm list @wordpress/scripts

# Check PHP dependencies
composer show squizlabs/php_codesniffer

# Verify build works
npm run build

# Check for PHP errors
composer run phpcs -- --standard=WordPress src/

# Verify plugin loads
wp plugin list | grep magical-blocks
```

## Common Issues

### Build fails with "Module not found"

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### WPCS not found

```bash
# Ensure composer dependencies installed
composer install

# Verify phpcs is in path
./vendor/bin/phpcs --version
```

### Block not appearing in editor

1. Check browser console for JavaScript errors
2. Verify `block.json` syntax is valid
3. Ensure block is registered in `class-magical-blocks-blocks.php`
4. Clear WordPress cache: Settings → Permalinks → Save

### Styles not loading

1. Verify SCSS compiles without errors
2. Check `block.json` has correct `style` and `editorStyle` paths
3. Run `npm run build` to regenerate assets

## Next Steps

1. ✅ Set up development environment
2. ✅ Create first block structure
3. → Implement 5 initial blocks (see tasks.md)
4. → Add shared components (icon picker, controls)
5. → Implement Pro gating logic
6. → Prepare for WordPress.org submission
