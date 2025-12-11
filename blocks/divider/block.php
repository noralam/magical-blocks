<?php
/**
 * Divider Block - Server-side rendering
 *
 * @package Starter_Developer_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Divider block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_divider( $attributes, $content, $block ) {
	$style           = isset( $attributes['style'] ) ? $attributes['style'] : 'solid';
	$alignment       = isset( $attributes['alignment'] ) ? $attributes['alignment'] : 'center';
	$add_element     = isset( $attributes['addElement'] ) ? $attributes['addElement'] : 'none';
	$icon            = isset( $attributes['icon'] ) ? $attributes['icon'] : 'star';
	$text            = isset( $attributes['text'] ) ? $attributes['text'] : '';

	// Helper function to extract responsive value.
	$get_responsive_value = function( $value, $breakpoint = 'desktop' ) {
		if ( is_array( $value ) ) {
			return isset( $value[ $breakpoint ] ) ? $value[ $breakpoint ] : '';
		}
		return $value;
	};

	// Build CSS variables from attributes.
	$style_vars = array();

	if ( ! empty( $attributes['width'] ) ) {
		$style_vars[] = '--mgb-divider-width: ' . esc_attr( $attributes['width'] );
	}

	if ( ! empty( $attributes['weight'] ) ) {
		$style_vars[] = '--mgb-divider-weight: ' . esc_attr( $attributes['weight'] );
	}

	if ( ! empty( $attributes['color'] ) ) {
		$style_vars[] = '--mgb-divider-color: ' . esc_attr( $attributes['color'] );
	}

	// Handle responsive spacingTop.
	if ( ! empty( $attributes['spacingTop'] ) ) {
		$spacing_top_desktop = $get_responsive_value( $attributes['spacingTop'], 'desktop' );
		$spacing_top_tablet  = $get_responsive_value( $attributes['spacingTop'], 'tablet' );
		$spacing_top_mobile  = $get_responsive_value( $attributes['spacingTop'], 'mobile' );

		if ( $spacing_top_desktop ) {
			$style_vars[] = '--mgb-divider-spacing-top: ' . esc_attr( $spacing_top_desktop );
		}
		if ( $spacing_top_tablet ) {
			$style_vars[] = '--mgb-divider-spacing-top-tablet: ' . esc_attr( $spacing_top_tablet );
		}
		if ( $spacing_top_mobile ) {
			$style_vars[] = '--mgb-divider-spacing-top-mobile: ' . esc_attr( $spacing_top_mobile );
		}
	}

	// Handle responsive spacingBottom.
	if ( ! empty( $attributes['spacingBottom'] ) ) {
		$spacing_bottom_desktop = $get_responsive_value( $attributes['spacingBottom'], 'desktop' );
		$spacing_bottom_tablet  = $get_responsive_value( $attributes['spacingBottom'], 'tablet' );
		$spacing_bottom_mobile  = $get_responsive_value( $attributes['spacingBottom'], 'mobile' );

		if ( $spacing_bottom_desktop ) {
			$style_vars[] = '--mgb-divider-spacing-bottom: ' . esc_attr( $spacing_bottom_desktop );
		}
		if ( $spacing_bottom_tablet ) {
			$style_vars[] = '--mgb-divider-spacing-bottom-tablet: ' . esc_attr( $spacing_bottom_tablet );
		}
		if ( $spacing_bottom_mobile ) {
			$style_vars[] = '--mgb-divider-spacing-bottom-mobile: ' . esc_attr( $spacing_bottom_mobile );
		}
	}

	// Handle responsive iconSize.
	if ( ! empty( $attributes['iconSize'] ) ) {
		$icon_size_desktop = $get_responsive_value( $attributes['iconSize'], 'desktop' );
		$icon_size_tablet  = $get_responsive_value( $attributes['iconSize'], 'tablet' );
		$icon_size_mobile  = $get_responsive_value( $attributes['iconSize'], 'mobile' );

		if ( $icon_size_desktop ) {
			$style_vars[] = '--mgb-divider-icon-size: ' . esc_attr( $icon_size_desktop );
		}
		if ( $icon_size_tablet ) {
			$style_vars[] = '--mgb-divider-icon-size-tablet: ' . esc_attr( $icon_size_tablet );
		}
		if ( $icon_size_mobile ) {
			$style_vars[] = '--mgb-divider-icon-size-mobile: ' . esc_attr( $icon_size_mobile );
		}
	}

	if ( ! empty( $attributes['iconColor'] ) ) {
		$style_vars[] = '--mgb-divider-icon-color: ' . esc_attr( $attributes['iconColor'] );
	}

	if ( ! empty( $attributes['textColor'] ) ) {
		$style_vars[] = '--mgb-divider-text-color: ' . esc_attr( $attributes['textColor'] );
	}

	// Handle responsive textSize.
	if ( ! empty( $attributes['textSize'] ) ) {
		$text_size_desktop = $get_responsive_value( $attributes['textSize'], 'desktop' );
		$text_size_tablet  = $get_responsive_value( $attributes['textSize'], 'tablet' );
		$text_size_mobile  = $get_responsive_value( $attributes['textSize'], 'mobile' );

		if ( $text_size_desktop ) {
			$style_vars[] = '--mgb-divider-text-size: ' . esc_attr( $text_size_desktop );
		}
		if ( $text_size_tablet ) {
			$style_vars[] = '--mgb-divider-text-size-tablet: ' . esc_attr( $text_size_tablet );
		}
		if ( $text_size_mobile ) {
			$style_vars[] = '--mgb-divider-text-size-mobile: ' . esc_attr( $text_size_mobile );
		}
	}

	if ( ! empty( $attributes['elementBackground'] ) ) {
		$style_vars[] = '--mgb-divider-element-bg: ' . esc_attr( $attributes['elementBackground'] );
	}

	// Build inline styles string for CSS variables.
	$style_string = ! empty( $style_vars ) ? implode( '; ', $style_vars ) : '';

	// Build block classes.
	$block_classes = array(
		'mgb-divider',
		'mgb-divider--style-' . esc_attr( $style ),
		'mgb-divider--align-' . esc_attr( $alignment ),
	);

	if ( 'none' !== $add_element ) {
		$block_classes[] = 'mgb-divider--has-element';
	}

	if ( ! empty( $attributes['className'] ) ) {
		$block_classes[] = esc_attr( $attributes['className'] );
	}

	// Build element HTML.
	$element_html = '';
	if ( 'icon' === $add_element && ! empty( $icon ) ) {
		$element_html = sprintf(
			'<div class="mgb-divider-element" aria-hidden="true">%s</div>',
			magical_blocks_get_icon_svg( $icon )
		);
	} elseif ( 'text' === $add_element && ! empty( $text ) ) {
		$element_html = sprintf(
			'<div class="mgb-divider-element"><span class="mgb-divider-text">%s</span></div>',
			wp_kses_post( $text )
		);
	}

	// Get wrapper attributes - pass style as part of the attributes to avoid duplicate style attributes.
	$wrapper_args = array(
		'class' => implode( ' ', $block_classes ),
		'role'  => 'separator',
	);
	if ( ! empty( $style_string ) ) {
		$wrapper_args['style'] = $style_string;
	}
	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_args );

	// Build output.
	$output = sprintf(
		'<div %s><div class="mgb-divider-line mgb-divider-line--left" aria-hidden="true"></div>%s<div class="mgb-divider-line mgb-divider-line--right" aria-hidden="true"></div></div>',
		$wrapper_attributes,
		$element_html
	);

	return $output;
}

/**
 * Get SVG markup for an icon.
 *
 * @param string $icon Icon name.
 * @return string SVG markup.
 */
function magical_blocks_get_icon_svg( $icon ) {
	// Common icons SVG paths.
	$icons = array(
		'star'     => '<svg viewBox="0 0 576 512"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>',
		'heart'    => '<svg viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>',
		'diamond'  => '<svg viewBox="0 0 448 512"><path d="M0 256L224 512 448 256 224 0 0 256z"/></svg>',
		'circle'   => '<svg viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/></svg>',
		'square'   => '<svg viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"/></svg>',
	);

	if ( isset( $icons[ $icon ] ) ) {
		return $icons[ $icon ];
	}

	// Default to circle if icon not found.
	return $icons['circle'];
}
