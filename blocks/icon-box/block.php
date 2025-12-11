<?php
/**
 * Icon Box Block Server-Side Render
 *
 * @package Magical_Blocks
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Renders the Icon Box block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the icon box block markup.
 */
function magical_blocks_render_icon_box( $attributes, $content, $block ) {
	// This block uses save.js for rendering, so we return the saved content.
	return $content;
}
