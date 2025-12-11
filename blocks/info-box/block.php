<?php
/**
 * Info Box Block - Server-side rendering
 *
 * @package Starter_Developer_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Info Box block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_info_box( $attributes, $content, $block ) {
	// This block uses save.js for rendering, so we return the saved content.
	return $content;
}
