<?php
/**
 * Section Block - Server-side rendering
 *
 * @package Starter_Developer_Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Section block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_section( $attributes, $content, $block ) {
	// Helper function to get raw responsive value (without fallback, for CSS variable output).
	// This ensures CSS cascade works properly - tablet/mobile values only output if explicitly set.
	$get_raw_responsive = function( $attr, $device = 'desktop' ) {
		if ( is_array( $attr ) ) {
			return isset( $attr[ $device ] ) && '' !== $attr[ $device ] ? $attr[ $device ] : '';
		}
		return 'desktop' === $device ? $attr : '';
	};

	$content_width        = isset( $attributes['contentWidth'] ) ? $attributes['contentWidth'] : 'full';
	$max_width            = isset( $attributes['maxWidth'] ) ? $attributes['maxWidth'] : '1200px';
	$min_height           = isset( $attributes['minHeight'] ) ? $attributes['minHeight'] : '';
	$vertical_alignment   = isset( $attributes['verticalAlignment'] ) ? $attributes['verticalAlignment'] : 'top';
	$horizontal_alignment = isset( $attributes['horizontalAlignment'] ) ? $attributes['horizontalAlignment'] : 'center';
	$background_color     = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';
	$background_image_url = isset( $attributes['backgroundImageUrl'] ) ? $attributes['backgroundImageUrl'] : '';
	$background_position  = isset( $attributes['backgroundPosition'] ) ? $attributes['backgroundPosition'] : 'center center';
	$background_size      = isset( $attributes['backgroundSize'] ) ? $attributes['backgroundSize'] : 'cover';
	$background_repeat    = isset( $attributes['backgroundRepeat'] ) ? $attributes['backgroundRepeat'] : 'no-repeat';
	$background_attachment = isset( $attributes['backgroundAttachment'] ) ? $attributes['backgroundAttachment'] : 'scroll';
	$overlay_color        = isset( $attributes['overlayColor'] ) ? $attributes['overlayColor'] : '';
	$overlay_opacity      = isset( $attributes['overlayOpacity'] ) ? $attributes['overlayOpacity'] : 50;
	$border_radius        = isset( $attributes['borderRadius'] ) ? $attributes['borderRadius'] : '';
	$html_tag             = isset( $attributes['htmlTag'] ) ? $attributes['htmlTag'] : 'section';

	// Responsive spacing attributes.
	$padding_top    = isset( $attributes['paddingTop'] ) ? $attributes['paddingTop'] : array( 'desktop' => '60px' );
	$padding_bottom = isset( $attributes['paddingBottom'] ) ? $attributes['paddingBottom'] : array( 'desktop' => '60px' );
	$padding_left   = isset( $attributes['paddingLeft'] ) ? $attributes['paddingLeft'] : array( 'desktop' => '20px' );
	$padding_right  = isset( $attributes['paddingRight'] ) ? $attributes['paddingRight'] : array( 'desktop' => '20px' );
	$margin_top     = isset( $attributes['marginTop'] ) ? $attributes['marginTop'] : array();
	$margin_bottom  = isset( $attributes['marginBottom'] ) ? $attributes['marginBottom'] : array();

	// Build CSS variables from attributes.
	$style_vars = array();

	if ( ! empty( $background_color ) ) {
		$style_vars[] = '--mgb-section-bg-color: ' . esc_attr( $background_color );
	}

	if ( ! empty( $background_image_url ) ) {
		$style_vars[] = '--mgb-section-bg-image: url(' . esc_url( $background_image_url ) . ')';
		$style_vars[] = '--mgb-section-bg-position: ' . esc_attr( $background_position );
		$style_vars[] = '--mgb-section-bg-size: ' . esc_attr( $background_size );
		$style_vars[] = '--mgb-section-bg-repeat: ' . esc_attr( $background_repeat );
		$style_vars[] = '--mgb-section-bg-attachment: ' . esc_attr( $background_attachment );
	}

	if ( ! empty( $overlay_color ) ) {
		$style_vars[] = '--mgb-section-overlay-color: ' . esc_attr( $overlay_color );
		$style_vars[] = '--mgb-section-overlay-opacity: ' . ( intval( $overlay_opacity ) / 100 );
	}

	// Padding - Desktop.
	if ( ! empty( $get_raw_responsive( $padding_top, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-section-padding-top: ' . esc_attr( $get_raw_responsive( $padding_top, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_bottom, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-section-padding-bottom: ' . esc_attr( $get_raw_responsive( $padding_bottom, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_left, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-section-padding-left: ' . esc_attr( $get_raw_responsive( $padding_left, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_right, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-section-padding-right: ' . esc_attr( $get_raw_responsive( $padding_right, 'desktop' ) );
	}

	// Padding - Tablet.
	if ( ! empty( $get_raw_responsive( $padding_top, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-section-padding-top-tablet: ' . esc_attr( $get_raw_responsive( $padding_top, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_bottom, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-section-padding-bottom-tablet: ' . esc_attr( $get_raw_responsive( $padding_bottom, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_left, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-section-padding-left-tablet: ' . esc_attr( $get_raw_responsive( $padding_left, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_right, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-section-padding-right-tablet: ' . esc_attr( $get_raw_responsive( $padding_right, 'tablet' ) );
	}

	// Padding - Mobile.
	if ( ! empty( $get_raw_responsive( $padding_top, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-section-padding-top-mobile: ' . esc_attr( $get_raw_responsive( $padding_top, 'mobile' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_bottom, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-section-padding-bottom-mobile: ' . esc_attr( $get_raw_responsive( $padding_bottom, 'mobile' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_left, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-section-padding-left-mobile: ' . esc_attr( $get_raw_responsive( $padding_left, 'mobile' ) );
	}
	if ( ! empty( $get_raw_responsive( $padding_right, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-section-padding-right-mobile: ' . esc_attr( $get_raw_responsive( $padding_right, 'mobile' ) );
	}

	// Margin - Desktop.
	if ( ! empty( $get_raw_responsive( $margin_top, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-section-margin-top: ' . esc_attr( $get_raw_responsive( $margin_top, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $margin_bottom, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-section-margin-bottom: ' . esc_attr( $get_raw_responsive( $margin_bottom, 'desktop' ) );
	}

	// Margin - Tablet.
	if ( ! empty( $get_raw_responsive( $margin_top, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-section-margin-top-tablet: ' . esc_attr( $get_raw_responsive( $margin_top, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $margin_bottom, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-section-margin-bottom-tablet: ' . esc_attr( $get_raw_responsive( $margin_bottom, 'tablet' ) );
	}

	// Margin - Mobile.
	if ( ! empty( $get_raw_responsive( $margin_top, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-section-margin-top-mobile: ' . esc_attr( $get_raw_responsive( $margin_top, 'mobile' ) );
	}
	if ( ! empty( $get_raw_responsive( $margin_bottom, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-section-margin-bottom-mobile: ' . esc_attr( $get_raw_responsive( $margin_bottom, 'mobile' ) );
	}

	if ( ! empty( $border_radius ) ) {
		$style_vars[] = '--mgb-section-border-radius: ' . esc_attr( $border_radius );
	}

	if ( 'boxed' === $content_width && ! empty( $max_width ) ) {
		$style_vars[] = '--mgb-section-max-width: ' . esc_attr( $max_width );
	}

	if ( ! empty( $min_height ) ) {
		$style_vars[] = '--mgb-section-min-height: ' . esc_attr( $min_height );
	}

	// Build inline styles string for CSS variables.
	$style_string = ! empty( $style_vars ) ? implode( '; ', $style_vars ) : '';

	// Build block classes.
	$block_classes = array(
		'mgb-section',
		'mgb-section--valign-' . esc_attr( $vertical_alignment ),
		'mgb-section--halign-' . esc_attr( $horizontal_alignment ),
	);

	if ( 'boxed' === $content_width ) {
		$block_classes[] = 'mgb-section--boxed';
	}

	if ( ! empty( $background_image_url ) ) {
		$block_classes[] = 'mgb-section--has-bg-image';
	}

	if ( ! empty( $overlay_color ) ) {
		$block_classes[] = 'mgb-section--has-overlay';
	}

	if ( ! empty( $attributes['className'] ) ) {
		$block_classes[] = esc_attr( $attributes['className'] );
	}

	if ( ! empty( $attributes['align'] ) ) {
		$block_classes[] = 'align' . esc_attr( $attributes['align'] );
	}

	// Validate HTML tag.
	$allowed_tags = array( 'section', 'div', 'header', 'footer', 'article', 'aside', 'main' );
	if ( ! in_array( $html_tag, $allowed_tags, true ) ) {
		$html_tag = 'section';
	}

	// Build overlay element.
	$overlay_html = '';
	if ( ! empty( $overlay_color ) ) {
		$overlay_html = '<div class="mgb-section-overlay" aria-hidden="true"></div>';
	}

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
		'<%1$s %2$s>%3$s<div class="mgb-section-inner">%4$s</div></%1$s>',
		esc_attr( $html_tag ),
		$wrapper_attributes,
		$overlay_html,
		$content
	);

	return $output;
}
