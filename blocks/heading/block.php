<?php
/**
 * Magical Heading Block - Server-side Render
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Heading block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_heading( $attributes, $content, $block ) {
	// Extract attributes with defaults.
	$block_id           = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
	$heading_content    = isset( $attributes['content'] ) ? $attributes['content'] : '';
	$heading_tag        = isset( $attributes['headingTag'] ) ? $attributes['headingTag'] : 'h2';
	$text_align         = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : '';
	$text_align_tablet  = isset( $attributes['textAlignTablet'] ) ? $attributes['textAlignTablet'] : '';
	$text_align_mobile  = isset( $attributes['textAlignMobile'] ) ? $attributes['textAlignMobile'] : '';

	// Typography.
	$font_family         = isset( $attributes['fontFamily'] ) ? $attributes['fontFamily'] : '';
	$font_size           = isset( $attributes['fontSize'] ) ? $attributes['fontSize'] : '';
	$font_size_tablet    = isset( $attributes['fontSizeTablet'] ) ? $attributes['fontSizeTablet'] : '';
	$font_size_mobile    = isset( $attributes['fontSizeMobile'] ) ? $attributes['fontSizeMobile'] : '';
	$font_size_unit      = isset( $attributes['fontSizeUnit'] ) ? $attributes['fontSizeUnit'] : 'px';
	$font_weight         = isset( $attributes['fontWeight'] ) ? $attributes['fontWeight'] : '';
	$text_transform      = isset( $attributes['textTransform'] ) ? $attributes['textTransform'] : '';
	$line_height         = isset( $attributes['lineHeight'] ) ? $attributes['lineHeight'] : '';
	$line_height_tablet  = isset( $attributes['lineHeightTablet'] ) ? $attributes['lineHeightTablet'] : '';
	$line_height_mobile  = isset( $attributes['lineHeightMobile'] ) ? $attributes['lineHeightMobile'] : '';
	$letter_spacing      = isset( $attributes['letterSpacing'] ) ? $attributes['letterSpacing'] : '';

	// Colors.
	$text_color       = isset( $attributes['textColor'] ) ? $attributes['textColor'] : '';
	$text_color_hover = isset( $attributes['textColorHover'] ) ? $attributes['textColorHover'] : '';
	$background_color = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';

	// Spacing.
	$padding      = isset( $attributes['padding'] ) ? $attributes['padding'] : array();
	$padding_unit = isset( $attributes['paddingUnit'] ) ? $attributes['paddingUnit'] : 'px';
	$margin       = isset( $attributes['margin'] ) ? $attributes['margin'] : array();
	$margin_unit  = isset( $attributes['marginUnit'] ) ? $attributes['marginUnit'] : 'px';

	// Separator.
	$separator_enabled    = isset( $attributes['separatorEnabled'] ) ? $attributes['separatorEnabled'] : false;
	$separator_position   = isset( $attributes['separatorPosition'] ) ? $attributes['separatorPosition'] : 'bottom';
	$separator_style      = isset( $attributes['separatorStyle'] ) ? $attributes['separatorStyle'] : 'solid';
	$separator_width      = isset( $attributes['separatorWidth'] ) ? $attributes['separatorWidth'] : 50;
	$separator_width_unit = isset( $attributes['separatorWidthUnit'] ) ? $attributes['separatorWidthUnit'] : '%';
	$separator_height     = isset( $attributes['separatorHeight'] ) ? $attributes['separatorHeight'] : 2;
	$separator_color      = isset( $attributes['separatorColor'] ) ? $attributes['separatorColor'] : '';
	$separator_spacing    = isset( $attributes['separatorSpacing'] ) ? $attributes['separatorSpacing'] : 10;

	// Validate heading tag.
	$allowed_tags = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span' );
	if ( ! in_array( $heading_tag, $allowed_tags, true ) ) {
		$heading_tag = 'h2';
	}

	// Build classes.
	$classes = array(
		'mgb-heading',
		'mgb-heading--' . $heading_tag,
	);

	if ( $text_align ) {
		$classes[] = 'mgb-heading--align-' . $text_align;
	}

	if ( $separator_enabled ) {
		$classes[] = 'mgb-heading--has-separator';
		$classes[] = 'mgb-heading--separator-' . $separator_position;
	}

	if ( $block_id ) {
		$classes[] = 'mgb-block-' . $block_id;
	}

	// Build CSS variables.
	$style_vars = array();

	if ( $font_family ) {
		$style_vars[] = '--mgb-heading-font-family: ' . esc_attr( $font_family );
	}
	if ( $font_size ) {
		$style_vars[] = '--mgb-heading-font-size: ' . esc_attr( $font_size ) . esc_attr( $font_size_unit );
	}
	if ( $font_weight ) {
		$style_vars[] = '--mgb-heading-font-weight: ' . esc_attr( $font_weight );
	}
	if ( $text_transform ) {
		$style_vars[] = '--mgb-heading-text-transform: ' . esc_attr( $text_transform );
	}
	if ( $line_height ) {
		$style_vars[] = '--mgb-heading-line-height: ' . esc_attr( $line_height );
	}
	if ( $letter_spacing ) {
		$style_vars[] = '--mgb-heading-letter-spacing: ' . esc_attr( $letter_spacing ) . 'px';
	}
	if ( $text_color ) {
		$style_vars[] = '--mgb-heading-color: ' . esc_attr( $text_color );
	}
	if ( $text_color_hover ) {
		$style_vars[] = '--mgb-heading-color-hover: ' . esc_attr( $text_color_hover );
	}
	if ( $background_color ) {
		$style_vars[] = '--mgb-heading-bg-color: ' . esc_attr( $background_color );
	}

	// Padding CSS vars.
	if ( is_array( $padding ) ) {
		if ( ! empty( $padding['top'] ) ) {
			$style_vars[] = '--mgb-heading-padding-top: ' . esc_attr( $padding['top'] ) . esc_attr( $padding_unit );
		}
		if ( ! empty( $padding['right'] ) ) {
			$style_vars[] = '--mgb-heading-padding-right: ' . esc_attr( $padding['right'] ) . esc_attr( $padding_unit );
		}
		if ( ! empty( $padding['bottom'] ) ) {
			$style_vars[] = '--mgb-heading-padding-bottom: ' . esc_attr( $padding['bottom'] ) . esc_attr( $padding_unit );
		}
		if ( ! empty( $padding['left'] ) ) {
			$style_vars[] = '--mgb-heading-padding-left: ' . esc_attr( $padding['left'] ) . esc_attr( $padding_unit );
		}
	}

	// Margin CSS vars.
	if ( is_array( $margin ) ) {
		if ( ! empty( $margin['top'] ) ) {
			$style_vars[] = '--mgb-heading-margin-top: ' . esc_attr( $margin['top'] ) . esc_attr( $margin_unit );
		}
		if ( ! empty( $margin['right'] ) ) {
			$style_vars[] = '--mgb-heading-margin-right: ' . esc_attr( $margin['right'] ) . esc_attr( $margin_unit );
		}
		if ( ! empty( $margin['bottom'] ) ) {
			$style_vars[] = '--mgb-heading-margin-bottom: ' . esc_attr( $margin['bottom'] ) . esc_attr( $margin_unit );
		}
		if ( ! empty( $margin['left'] ) ) {
			$style_vars[] = '--mgb-heading-margin-left: ' . esc_attr( $margin['left'] ) . esc_attr( $margin_unit );
		}
	}

	// Separator CSS vars.
	if ( $separator_enabled ) {
		$style_vars[] = '--mgb-heading-separator-width: ' . esc_attr( $separator_width ) . esc_attr( $separator_width_unit );
		$style_vars[] = '--mgb-heading-separator-height: ' . esc_attr( $separator_height ) . 'px';
		if ( $separator_color ) {
			$style_vars[] = '--mgb-heading-separator-color: ' . esc_attr( $separator_color );
		}
		$style_vars[] = '--mgb-heading-separator-spacing: ' . esc_attr( $separator_spacing ) . 'px';
	}

	// Responsive CSS vars.
	if ( $font_size_tablet ) {
		$style_vars[] = '--mgb-heading-font-size-tablet: ' . esc_attr( $font_size_tablet ) . esc_attr( $font_size_unit );
	}
	if ( $font_size_mobile ) {
		$style_vars[] = '--mgb-heading-font-size-mobile: ' . esc_attr( $font_size_mobile ) . esc_attr( $font_size_unit );
	}
	if ( $line_height_tablet ) {
		$style_vars[] = '--mgb-heading-line-height-tablet: ' . esc_attr( $line_height_tablet );
	}
	if ( $line_height_mobile ) {
		$style_vars[] = '--mgb-heading-line-height-mobile: ' . esc_attr( $line_height_mobile );
	}

	// Build inline styles string for CSS variables.
	$style_string = ! empty( $style_vars ) ? implode( '; ', $style_vars ) : '';

	// Get wrapper attributes - pass style as part of the attributes to avoid duplicate style attributes.
	$wrapper_args = array(
		'class' => implode( ' ', $classes ),
	);
	if ( ! empty( $style_string ) ) {
		$wrapper_args['style'] = $style_string;
	}
	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_args );

	// Build separator HTML.
	$separator_html = '';
	if ( $separator_enabled ) {
		$separator_html = '<span class="mgb-heading__separator"></span>';
	}

	// Build heading HTML.
	$heading_html = sprintf(
		'<%1$s class="mgb-heading__text">%2$s</%1$s>',
		esc_html( $heading_tag ),
		wp_kses_post( $heading_content )
	);

	// Build output based on separator position.
	if ( $separator_enabled && 'top' === $separator_position ) {
		$inner_html = $separator_html . $heading_html;
	} elseif ( $separator_enabled && 'bottom' === $separator_position ) {
		$inner_html = $heading_html . $separator_html;
	} else {
		$inner_html = $heading_html;
	}

	$output = sprintf(
		'<div %s>%s</div>',
		$wrapper_attributes,
		$inner_html
	);

	return $output;
}
