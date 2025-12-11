<?php
/**
 * Counter Block - Server-side rendering
 *
 * @package Starter_Developer_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Counter block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_counter( $attributes, $content, $block ) {
	$start_number        = isset( $attributes['startNumber'] ) ? $attributes['startNumber'] : 0;
	$end_number          = isset( $attributes['endNumber'] ) ? $attributes['endNumber'] : 100;
	$duration            = isset( $attributes['duration'] ) ? $attributes['duration'] : 2000;
	$prefix              = isset( $attributes['prefix'] ) ? $attributes['prefix'] : '';
	$suffix              = isset( $attributes['suffix'] ) ? $attributes['suffix'] : '';
	$title               = isset( $attributes['title'] ) ? $attributes['title'] : '';
	$title_position      = isset( $attributes['titlePosition'] ) ? $attributes['titlePosition'] : 'bottom';
	$thousands_separator = isset( $attributes['thousandsSeparator'] ) ? $attributes['thousandsSeparator'] : ',';
	$decimal_places      = isset( $attributes['decimalPlaces'] ) ? $attributes['decimalPlaces'] : 0;
	$alignment           = isset( $attributes['alignment'] ) ? $attributes['alignment'] : 'center';

	// Build CSS variables from attributes.
	$style_vars = array();

	if ( ! empty( $attributes['numberColor'] ) ) {
		$style_vars[] = '--mgb-counter-number-color: ' . esc_attr( $attributes['numberColor'] );
	}

	// Handle responsive numberSize (it's an object with desktop, tablet, mobile).
	if ( ! empty( $attributes['numberSize'] ) ) {
		$number_size = $attributes['numberSize'];
		if ( is_array( $number_size ) ) {
			if ( ! empty( $number_size['desktop'] ) ) {
				$style_vars[] = '--mgb-counter-number-size: ' . esc_attr( $number_size['desktop'] );
			}
			if ( ! empty( $number_size['tablet'] ) ) {
				$style_vars[] = '--mgb-counter-number-size-tablet: ' . esc_attr( $number_size['tablet'] );
			}
			if ( ! empty( $number_size['mobile'] ) ) {
				$style_vars[] = '--mgb-counter-number-size-mobile: ' . esc_attr( $number_size['mobile'] );
			}
		} else {
			$style_vars[] = '--mgb-counter-number-size: ' . esc_attr( $number_size );
		}
	}

	if ( ! empty( $attributes['prefixSuffixColor'] ) ) {
		$style_vars[] = '--mgb-counter-prefix-color: ' . esc_attr( $attributes['prefixSuffixColor'] );
	}

	// Handle responsive prefixSuffixSize (it's an object with desktop, tablet, mobile).
	if ( ! empty( $attributes['prefixSuffixSize'] ) ) {
		$prefix_suffix_size = $attributes['prefixSuffixSize'];
		if ( is_array( $prefix_suffix_size ) ) {
			if ( ! empty( $prefix_suffix_size['desktop'] ) ) {
				$style_vars[] = '--mgb-counter-prefix-size: ' . esc_attr( $prefix_suffix_size['desktop'] );
			}
			if ( ! empty( $prefix_suffix_size['tablet'] ) ) {
				$style_vars[] = '--mgb-counter-prefix-size-tablet: ' . esc_attr( $prefix_suffix_size['tablet'] );
			}
			if ( ! empty( $prefix_suffix_size['mobile'] ) ) {
				$style_vars[] = '--mgb-counter-prefix-size-mobile: ' . esc_attr( $prefix_suffix_size['mobile'] );
			}
		} else {
			$style_vars[] = '--mgb-counter-prefix-size: ' . esc_attr( $prefix_suffix_size );
		}
	}

	if ( ! empty( $attributes['titleColor'] ) ) {
		$style_vars[] = '--mgb-counter-title-color: ' . esc_attr( $attributes['titleColor'] );
	}

	// Handle responsive titleSize (it's an object with desktop, tablet, mobile).
	if ( ! empty( $attributes['titleSize'] ) ) {
		$title_size = $attributes['titleSize'];
		if ( is_array( $title_size ) ) {
			if ( ! empty( $title_size['desktop'] ) ) {
				$style_vars[] = '--mgb-counter-title-size: ' . esc_attr( $title_size['desktop'] );
			}
			if ( ! empty( $title_size['tablet'] ) ) {
				$style_vars[] = '--mgb-counter-title-size-tablet: ' . esc_attr( $title_size['tablet'] );
			}
			if ( ! empty( $title_size['mobile'] ) ) {
				$style_vars[] = '--mgb-counter-title-size-mobile: ' . esc_attr( $title_size['mobile'] );
			}
		} else {
			$style_vars[] = '--mgb-counter-title-size: ' . esc_attr( $title_size );
		}
	}

	// Build inline styles string for CSS variables.
	$style_string = ! empty( $style_vars ) ? implode( '; ', $style_vars ) : '';

	// Build block classes.
	$block_classes = array(
		'mgb-counter',
		'mgb-counter--align-' . esc_attr( $alignment ),
		'mgb-counter--title-' . esc_attr( $title_position ),
	);

	if ( ! empty( $attributes['className'] ) ) {
		$block_classes[] = esc_attr( $attributes['className'] );
	}

	// Build title HTML.
	$title_html = '';
	if ( ! empty( $title ) ) {
		$title_html = sprintf(
			'<div class="mgb-counter-title">%s</div>',
			wp_kses_post( $title )
		);
	}

	// Build prefix HTML.
	$prefix_html = '';
	if ( ! empty( $prefix ) ) {
		$prefix_html = sprintf(
			'<span class="mgb-counter-prefix">%s</span>',
			esc_html( $prefix )
		);
	}

	// Build suffix HTML.
	$suffix_html = '';
	if ( ! empty( $suffix ) ) {
		$suffix_html = sprintf(
			'<span class="mgb-counter-suffix">%s</span>',
			esc_html( $suffix )
		);
	}

	// Build number HTML.
	$number_html = sprintf(
		'<span class="mgb-counter-number" data-value="%s">%s</span>',
		esc_attr( $end_number ),
		esc_html( $start_number )
	);

	// Build number wrapper.
	$number_wrapper = sprintf(
		'<div class="mgb-counter-number-wrapper">%s%s%s</div>',
		$prefix_html,
		$number_html,
		$suffix_html
	);

	// Data attributes.
	$data_attrs = sprintf(
		' data-start="%s" data-end="%s" data-duration="%s" data-separator="%s" data-decimals="%s"',
		esc_attr( $start_number ),
		esc_attr( $end_number ),
		esc_attr( $duration ),
		esc_attr( $thousands_separator ),
		esc_attr( $decimal_places )
	);

	// Get wrapper attributes - pass style as part of the attributes to avoid duplicate style attributes.
	$wrapper_args = array(
		'class' => implode( ' ', $block_classes ),
	);
	if ( ! empty( $style_string ) ) {
		$wrapper_args['style'] = $style_string;
	}
	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_args );

	// Build output based on title position.
	if ( 'top' === $title_position ) {
		$output = sprintf(
			'<div %s%s>%s%s</div>',
			$wrapper_attributes,
			$data_attrs,
			$title_html,
			$number_wrapper
		);
	} else {
		$output = sprintf(
			'<div %s%s>%s%s</div>',
			$wrapper_attributes,
			$data_attrs,
			$number_wrapper,
			$title_html
		);
	}

	return $output;
}
