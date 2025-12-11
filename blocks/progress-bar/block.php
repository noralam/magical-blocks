<?php
/**
 * Progress Bar Block - Server-side rendering
 *
 * @package Starter_Developer_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Progress Bar block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_progress_bar( $attributes, $content, $block ) {
	$title               = isset( $attributes['title'] ) ? $attributes['title'] : '';
	$percentage          = isset( $attributes['percentage'] ) ? $attributes['percentage'] : 75;
	$show_percentage     = isset( $attributes['showPercentage'] ) ? $attributes['showPercentage'] : true;
	$percentage_position = isset( $attributes['percentagePosition'] ) ? $attributes['percentagePosition'] : 'inside';
	$animation_duration  = isset( $attributes['animationDuration'] ) ? $attributes['animationDuration'] : 1500;
	$striped             = isset( $attributes['striped'] ) ? $attributes['striped'] : false;
	$animated            = isset( $attributes['animated'] ) ? $attributes['animated'] : false;

	// Build CSS variables from attributes.
	$style_vars = array();

	$bar_color = ! empty( $attributes['barGradient'] ) ? $attributes['barGradient'] : ( ! empty( $attributes['barColor'] ) ? $attributes['barColor'] : '' );
	if ( ! empty( $bar_color ) ) {
		$style_vars[] = '--mgb-progress-bar-color: ' . esc_attr( $bar_color );
	}

	if ( ! empty( $attributes['backgroundColor'] ) ) {
		$style_vars[] = '--mgb-progress-bg-color: ' . esc_attr( $attributes['backgroundColor'] );
	}

	// Handle responsive barHeight (it's an object with desktop, tablet, mobile).
	if ( ! empty( $attributes['barHeight'] ) ) {
		$bar_height = $attributes['barHeight'];
		if ( is_array( $bar_height ) ) {
			if ( ! empty( $bar_height['desktop'] ) ) {
				$style_vars[] = '--mgb-progress-height: ' . esc_attr( $bar_height['desktop'] );
			}
			if ( ! empty( $bar_height['tablet'] ) ) {
				$style_vars[] = '--mgb-progress-height-tablet: ' . esc_attr( $bar_height['tablet'] );
			}
			if ( ! empty( $bar_height['mobile'] ) ) {
				$style_vars[] = '--mgb-progress-height-mobile: ' . esc_attr( $bar_height['mobile'] );
			}
		} else {
			$style_vars[] = '--mgb-progress-height: ' . esc_attr( $bar_height );
		}
	}

	if ( ! empty( $attributes['borderRadius'] ) ) {
		$style_vars[] = '--mgb-progress-radius: ' . esc_attr( $attributes['borderRadius'] );
	}

	if ( ! empty( $attributes['titleColor'] ) ) {
		$style_vars[] = '--mgb-progress-title-color: ' . esc_attr( $attributes['titleColor'] );
	}

	if ( ! empty( $attributes['percentageColor'] ) ) {
		$style_vars[] = '--mgb-progress-percentage-color: ' . esc_attr( $attributes['percentageColor'] );
	}

	$style_vars[] = '--mgb-progress-value: ' . intval( $percentage ) . '%';
	$style_vars[] = '--mgb-progress-duration: ' . intval( $animation_duration ) . 'ms';

	// Build inline styles string for CSS variables.
	$style_string = implode( '; ', $style_vars );

	// Build block classes.
	$block_classes = array(
		'mgb-progress-bar',
		'mgb-progress-bar--percentage-' . esc_attr( $percentage_position ),
	);

	if ( $striped ) {
		$block_classes[] = 'mgb-progress-bar--striped';
	}

	if ( $animated ) {
		$block_classes[] = 'mgb-progress-bar--animated';
	}

	if ( ! empty( $attributes['className'] ) ) {
		$block_classes[] = esc_attr( $attributes['className'] );
	}

	// Build title HTML.
	$title_html = '';
	if ( ! empty( $title ) ) {
		$title_html = sprintf(
			'<span class="mgb-progress-bar-title">%s</span>',
			wp_kses_post( $title )
		);
	}

	// Build percentage HTML for different positions.
	$percentage_title_html = '';
	$percentage_above_html = '';
	$percentage_inside_html = '';

	if ( $show_percentage ) {
		$percentage_text = sprintf(
			'<span class="mgb-progress-bar-percentage">%d%%</span>',
			intval( $percentage )
		);

		switch ( $percentage_position ) {
			case 'title':
				$percentage_title_html = $percentage_text;
				break;
			case 'above':
				$percentage_above_html = sprintf(
					'<div class="mgb-progress-bar-percentage-above">%s</div>',
					$percentage_text
				);
				break;
			case 'inside':
			default:
				$percentage_inside_html = $percentage_text;
				break;
		}
	}

	// Build header HTML.
	$header_html = sprintf(
		'<div class="mgb-progress-bar-header">%s%s</div>',
		$title_html,
		$percentage_title_html
	);

	// Build fill HTML.
	$fill_html = sprintf(
		'<div class="mgb-progress-bar-fill" data-width="%d">%s</div>',
		intval( $percentage ),
		$percentage_inside_html
	);

	// Build track HTML.
	$track_html = sprintf(
		'<div class="mgb-progress-bar-track">%s</div>',
		$fill_html
	);

	// Get wrapper attributes - pass style as part of the attributes to avoid duplicate style attributes.
	$wrapper_args = array(
		'class' => implode( ' ', $block_classes ),
	);
	if ( ! empty( $style_string ) ) {
		$wrapper_args['style'] = $style_string;
	}
	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_args );

	// Build output.
	$output = sprintf(
		'<div %s data-percentage="%d" data-duration="%d">%s%s%s</div>',
		$wrapper_attributes,
		intval( $percentage ),
		intval( $animation_duration ),
		$header_html,
		$percentage_above_html,
		$track_html
	);

	return $output;
}
