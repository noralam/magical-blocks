/**
 * Magical Blocks - Block Registration Entry Point
 *
 * This file imports and registers all blocks from the plugin.
 * WordPress automatically enqueues this as the shared editor script.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

/**
 * Import all blocks
 *
 * Each block is self-registering via its own index.js file.
 * Importing them here ensures they're all bundled together.
 */

// Content Blocks
import './heading';
import './button';
import './icon-box';
import './testimonial';
import './info-box';
import './counter';
import './progress-bar';
import './divider';

// Layout Blocks
import './section';
import './container';
import './inner-container';

// Media Blocks
import './image-box';

/**
 * Log initialization for debugging.
 */
if ( process.env.NODE_ENV === 'development' ) {
	// eslint-disable-next-line no-console
	console.log( 'Magical Blocks: All blocks registered successfully.' );
}
