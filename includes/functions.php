<?php
/**
 * Global helper functions for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Check if Pro version is active.
 *
 * @return bool True if Pro is active, false otherwise.
 */
function magical_blocks_has_pro() {
	// Check for license constant (set by license validation).
	if ( defined( 'MAGICAL_BLOCKS_HAS_PRO' ) ) {
		return 'yes' === MAGICAL_BLOCKS_HAS_PRO;
	}

	// Check option (alternative storage).
	return 'yes' === get_option( 'magical_blocks_has_pro', 'no' );
}

/**
 * Get plugin settings.
 *
 * @param string|null $key     Optional. Specific setting key to retrieve.
 * @param mixed       $default Optional. Default value if key not found.
 * @return mixed Settings array or specific setting value.
 */
function magical_blocks_get_settings( $key = null, $default = null ) {
	$defaults = array(
		'enabled_blocks'     => array( 'all' ),
		'disabled_blocks'    => array(),
		'show_pro_blocks'    => true,
		'asset_loading'      => 'auto',
		'common_css_enabled' => true,
	);

	$settings = get_option( 'magical_blocks_settings', array() );
	$settings = wp_parse_args( $settings, $defaults );

	if ( null === $key ) {
		return $settings;
	}

	return isset( $settings[ $key ] ) ? $settings[ $key ] : $default;
}

/**
 * Update plugin settings.
 *
 * @param array $new_settings Settings to update.
 * @return bool True on success, false on failure.
 */
function magical_blocks_update_settings( $new_settings ) {
	$current = magical_blocks_get_settings();
	$updated = wp_parse_args( $new_settings, $current );

	return update_option( 'magical_blocks_settings', $updated );
}

/**
 * Check if a block is enabled.
 *
 * @param string $block_slug Block slug (e.g., 'heading', 'button').
 * @return bool True if enabled, false otherwise.
 */
function magical_blocks_is_block_enabled( $block_slug ) {
	$enabled  = magical_blocks_get_settings( 'enabled_blocks', array( 'all' ) );
	$disabled = magical_blocks_get_settings( 'disabled_blocks', array() );

	// If specifically disabled, return false.
	if ( in_array( $block_slug, $disabled, true ) ) {
		return false;
	}

	// If 'all' is in enabled list, return true.
	if ( in_array( 'all', $enabled, true ) ) {
		return true;
	}

	// Check if specifically enabled.
	return in_array( $block_slug, $enabled, true );
}

/**
 * Sanitize HTML classes.
 *
 * @param string|array $classes CSS class(es) to sanitize.
 * @return string Sanitized CSS classes.
 */
function magical_blocks_sanitize_html_classes( $classes ) {
	if ( is_array( $classes ) ) {
		$classes = implode( ' ', $classes );
	}

	$classes = explode( ' ', $classes );
	$classes = array_map( 'sanitize_html_class', $classes );
	$classes = array_filter( $classes );

	return implode( ' ', $classes );
}

/**
 * Sanitize SVG content.
 *
 * @param string $svg SVG content to sanitize.
 * @return string Sanitized SVG.
 */
function magical_blocks_sanitize_svg( $svg ) {
	$allowed_tags = array(
		'svg'      => array(
			'class'       => true,
			'aria-hidden' => true,
			'aria-label'  => true,
			'role'        => true,
			'xmlns'       => true,
			'width'       => true,
			'height'      => true,
			'viewbox'     => true,
			'fill'        => true,
		),
		'g'        => array(
			'fill' => true,
		),
		'title'    => array(
			'title' => true,
		),
		'path'     => array(
			'd'               => true,
			'fill'            => true,
			'fill-rule'       => true,
			'clip-rule'       => true,
			'stroke'          => true,
			'stroke-width'    => true,
			'stroke-linecap'  => true,
			'stroke-linejoin' => true,
		),
		'circle'   => array(
			'cx'   => true,
			'cy'   => true,
			'r'    => true,
			'fill' => true,
		),
		'rect'     => array(
			'x'      => true,
			'y'      => true,
			'width'  => true,
			'height' => true,
			'rx'     => true,
			'ry'     => true,
			'fill'   => true,
		),
		'polygon'  => array(
			'points' => true,
			'fill'   => true,
		),
		'polyline' => array(
			'points' => true,
			'fill'   => true,
			'stroke' => true,
		),
		'line'     => array(
			'x1'     => true,
			'y1'     => true,
			'x2'     => true,
			'y2'     => true,
			'stroke' => true,
		),
	);

	return wp_kses( $svg, $allowed_tags );
}

/**
 * Sanitize URL with additional validation.
 *
 * @param string $url URL to sanitize.
 * @return string Sanitized URL.
 */
function magical_blocks_sanitize_url( $url ) {
	$url = esc_url_raw( $url );

	// Additional validation for allowed protocols.
	$allowed_protocols = array( 'http', 'https', 'mailto', 'tel' );
	$protocol          = wp_parse_url( $url, PHP_URL_SCHEME );

	if ( $protocol && ! in_array( $protocol, $allowed_protocols, true ) ) {
		return '';
	}

	return $url;
}

/**
 * Generate unique block ID.
 *
 * @param string $prefix Optional. Prefix for the ID.
 * @return string Unique block ID.
 */
function magical_blocks_generate_block_id( $prefix = 'mgb' ) {
	return $prefix . '-' . substr( md5( uniqid( wp_rand(), true ) ), 0, 8 );
}

/**
 * Get list of Pro blocks.
 *
 * @return array Array of Pro block slugs.
 */
function magical_blocks_get_pro_block_list() {
	/**
	 * Filter the list of Pro blocks.
	 *
	 * @param array $pro_blocks Array of Pro block slugs.
	 */
	return apply_filters(
		'magical_blocks_pro_blocks',
		array(
			// Pro blocks will be added in v1.4.
		)
	);
}

/**
 * Check if a block is a Pro block.
 *
 * @param string $block_slug Block slug to check.
 * @return bool True if Pro block, false otherwise.
 */
function magical_blocks_is_pro_block( $block_slug ) {
	$pro_blocks = magical_blocks_get_pro_block_list();
	return in_array( $block_slug, $pro_blocks, true );
}

/**
 * Render Pro placeholder for frontend.
 *
 * Use this function in block render callbacks when the block
 * is a Pro block but the user doesn't have a Pro license.
 *
 * @param string $block_name Block display name.
 * @param string $block_slug Block slug.
 * @param array  $attributes Block attributes.
 * @return string Placeholder HTML.
 */
function magical_blocks_render_pro_placeholder_frontend( $block_name, $block_slug, $attributes = array() ) {
	$upgrade_url = admin_url( 'admin.php?page=magical-blocks-pro' );

	/**
	 * Filter the Pro upgrade URL.
	 *
	 * @param string $upgrade_url Default upgrade URL.
	 * @param string $block_slug  Block slug.
	 */
	$upgrade_url = apply_filters( 'magical_blocks_upgrade_url', $upgrade_url, $block_slug );

	// Only show placeholder in admin/preview contexts, not on frontend
	if ( ! is_admin() && ! defined( 'REST_REQUEST' ) ) {
		// On actual frontend, Pro blocks without license show nothing
		return '';
	}

	$block_id = ! empty( $attributes['blockId'] ) ? esc_attr( $attributes['blockId'] ) : '';

	$output = '<div class="mgb-pro-placeholder-frontend' . ( $block_id ? ' ' . $block_id : '' ) . '">';
	$output .= '<div class="mgb-pro-placeholder-frontend__content">';
	$output .= '<span class="mgb-pro-placeholder-frontend__badge">' . esc_html__( 'PRO', 'magical-blocks' ) . '</span>';
	$output .= '<h4 class="mgb-pro-placeholder-frontend__title">';
	$output .= sprintf(
		/* translators: %s: Block name */
		esc_html__( '%s is a Pro Feature', 'magical-blocks' ),
		esc_html( $block_name )
	);
	$output .= '</h4>';
	$output .= '<p class="mgb-pro-placeholder-frontend__description">';
	$output .= esc_html__( 'Upgrade to Magical Blocks Pro to use this block.', 'magical-blocks' );
	$output .= '</p>';
	$output .= '</div>';
	$output .= '</div>';

	return $output;
}

/**
 * Check if a Pro block should render content.
 *
 * Helper function for render callbacks to determine if the full
 * block should render or if a placeholder should be shown instead.
 *
 * @param string $block_slug Block slug.
 * @return bool True if block should render, false if placeholder.
 */
function magical_blocks_should_render_pro( $block_slug ) {
	// If not a Pro block, always render
	if ( ! magical_blocks_is_pro_block( $block_slug ) ) {
		return true;
	}

	// If Pro is active, render
	return magical_blocks_has_pro();
}

/**
 * Get all registered blocks.
 *
 * @return array Array of block data.
 */
function magical_blocks_get_block_list() {
	$blocks = array(
		'heading'      => array(
			'title'       => __( 'Heading', 'magical-blocks' ),
			'description' => __( 'Advanced heading with typography controls.', 'magical-blocks' ),
			'icon'        => 'heading',
			'category'    => 'magical-blocks-content',
			'is_pro'      => false,
		),
		'button'       => array(
			'title'       => __( 'Button', 'magical-blocks' ),
			'description' => __( 'Customizable button with hover effects.', 'magical-blocks' ),
			'icon'        => 'button',
			'category'    => 'magical-blocks-content',
			'is_pro'      => false,
		),
		'icon-box'     => array(
			'title'       => __( 'Icon Box', 'magical-blocks' ),
			'description' => __( 'Icon + heading + description box.', 'magical-blocks' ),
			'icon'        => 'admin-customizer',
			'category'    => 'magical-blocks-content',
			'is_pro'      => false,
		),
		'testimonial'  => array(
			'title'       => __( 'Testimonial', 'magical-blocks' ),
			'description' => __( 'Customer testimonial card.', 'magical-blocks' ),
			'icon'        => 'format-quote',
			'category'    => 'magical-blocks-content',
			'is_pro'      => false,
		),
		'info-box'     => array(
			'title'       => __( 'Info Box', 'magical-blocks' ),
			'description' => __( 'Information box with icon and content.', 'magical-blocks' ),
			'icon'        => 'info',
			'category'    => 'magical-blocks-content',
			'is_pro'      => false,
		),
		'section'      => array(
			'title'       => __( 'Section', 'magical-blocks' ),
			'description' => __( 'Container section with nested blocks.', 'magical-blocks' ),
			'icon'        => 'columns',
			'category'    => 'magical-blocks-layout',
			'is_pro'      => false,
		),
		'image-box'    => array(
			'title'       => __( 'Image Box', 'magical-blocks' ),
			'description' => __( 'Image with text overlay or side content.', 'magical-blocks' ),
			'icon'        => 'format-image',
			'category'    => 'magical-blocks-media',
			'is_pro'      => false,
		),
		'counter'      => array(
			'title'       => __( 'Counter', 'magical-blocks' ),
			'description' => __( 'Animated number counter.', 'magical-blocks' ),
			'icon'        => 'performance',
			'category'    => 'magical-blocks-content',
			'is_pro'      => false,
		),
		'progress-bar' => array(
			'title'       => __( 'Progress Bar', 'magical-blocks' ),
			'description' => __( 'Animated progress indicator.', 'magical-blocks' ),
			'icon'        => 'chart-bar',
			'category'    => 'magical-blocks-content',
			'is_pro'      => false,
		),
		'divider'      => array(
			'title'       => __( 'Divider', 'magical-blocks' ),
			'description' => __( 'Decorative separator with multiple styles.', 'magical-blocks' ),
			'icon'        => 'minus',
			'category'    => 'magical-blocks-layout',
			'is_pro'      => false,
		),
	);

	/**
	 * Filter the block list.
	 *
	 * @param array $blocks Array of block data.
	 */
	return apply_filters( 'magical_blocks_block_list', $blocks );
}
