/**
 * Inner Container Block - Save Component
 *
 * This block uses PHP server-side rendering for the frontend output.
 * The save function only needs to return the inner blocks content,
 * as the PHP render callback (magical_blocks_render_inner_container) handles
 * the full container markup with all CSS variables for dynamic styling.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
	// Return only inner blocks content.
	// PHP render callback handles the container wrapper with all dynamic styles.
	return <InnerBlocks.Content />;
}
