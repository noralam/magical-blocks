<?php
/**
 * Image Box Block - Server-side Render
 *
 * @package Magical_Blocks
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Renders the Image Box block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block markup.
 */
function magical_blocks_render_image_box( $attributes, $content, $block ) {
	// Extract attributes with defaults.
	$block_id     = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
	$image_url    = isset( $attributes['imageUrl'] ) ? $attributes['imageUrl'] : '';
	$image_alt    = isset( $attributes['imageAlt'] ) ? $attributes['imageAlt'] : '';
	$title        = isset( $attributes['title'] ) ? $attributes['title'] : '';
	$description  = isset( $attributes['description'] ) ? $attributes['description'] : '';
	$title_tag    = isset( $attributes['titleTag'] ) ? $attributes['titleTag'] : 'h3';
	$link_url     = isset( $attributes['linkUrl'] ) ? $attributes['linkUrl'] : '';
	$link_text    = isset( $attributes['linkText'] ) ? $attributes['linkText'] : '';
	$link_target  = ! empty( $attributes['linkTarget'] ) ? '_blank' : '_self';
	$layout       = isset( $attributes['layout'] ) ? $attributes['layout'] : 'top';
	$alignment    = isset( $attributes['alignment'] ) ? $attributes['alignment'] : 'left';
	$hover_effect = isset( $attributes['hoverEffect'] ) ? $attributes['hoverEffect'] : 'lift';

	// Colors.
	$title_color       = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '';
	$title_hover_color = isset( $attributes['titleHoverColor'] ) ? $attributes['titleHoverColor'] : '';
	$desc_color        = isset( $attributes['descriptionColor'] ) ? $attributes['descriptionColor'] : '';
	$link_color        = isset( $attributes['linkColor'] ) ? $attributes['linkColor'] : '';
	$link_hover_color  = isset( $attributes['linkHoverColor'] ) ? $attributes['linkHoverColor'] : '';

	// Box styles.
	$box_bg_color      = isset( $attributes['boxBackgroundColor'] ) ? $attributes['boxBackgroundColor'] : '';
	$box_hover_bg      = isset( $attributes['boxHoverBackgroundColor'] ) ? $attributes['boxHoverBackgroundColor'] : '';
	$box_border_color  = isset( $attributes['boxBorderColor'] ) ? $attributes['boxBorderColor'] : '';
	$box_border_hover  = isset( $attributes['boxHoverBorderColor'] ) ? $attributes['boxHoverBorderColor'] : '';
	$box_border_width  = isset( $attributes['boxBorderWidth'] ) ? $attributes['boxBorderWidth'] : '0';
	$box_border_style  = isset( $attributes['boxBorderStyle'] ) ? $attributes['boxBorderStyle'] : 'none';
	$box_border_radius = isset( $attributes['boxBorderRadius'] ) ? $attributes['boxBorderRadius'] : '8';
	$image_object_fit  = isset( $attributes['imageObjectFit'] ) ? $attributes['imageObjectFit'] : 'cover';

	// Object attributes.
	$image_height        = isset( $attributes['imageHeight'] ) ? $attributes['imageHeight'] : array();
	$image_width         = isset( $attributes['imageWidth'] ) ? $attributes['imageWidth'] : array();
	$image_border_radius = isset( $attributes['imageBorderRadius'] ) ? $attributes['imageBorderRadius'] : array();
	$box_shadow          = isset( $attributes['boxShadow'] ) ? $attributes['boxShadow'] : array();
	$box_hover_shadow    = isset( $attributes['boxHoverShadow'] ) ? $attributes['boxHoverShadow'] : array();
	$padding             = isset( $attributes['padding'] ) ? $attributes['padding'] : array();
	$margin              = isset( $attributes['margin'] ) ? $attributes['margin'] : array();
	$content_gap         = isset( $attributes['contentGap'] ) ? $attributes['contentGap'] : array();
	$title_spacing       = isset( $attributes['titleSpacing'] ) ? $attributes['titleSpacing'] : array();
	$title_typography    = isset( $attributes['titleTypography'] ) ? $attributes['titleTypography'] : array();
	$desc_typography     = isset( $attributes['descriptionTypography'] ) ? $attributes['descriptionTypography'] : array();
	$link_typography     = isset( $attributes['linkTypography'] ) ? $attributes['linkTypography'] : array();

	// Helper: Get scalar value from responsive attribute.
	$get_value = function( $attr, $device = 'desktop' ) {
		if ( is_string( $attr ) || is_numeric( $attr ) ) {
			return 'desktop' === $device ? (string) $attr : '';
		}
		if ( is_array( $attr ) && isset( $attr[ $device ] ) ) {
			$val = $attr[ $device ];
			if ( is_string( $val ) || is_numeric( $val ) ) {
				return (string) $val;
			}
		}
		return '';
	};

	// Helper: Build box shadow.
	$build_shadow = function( $shadow ) {
		if ( ! is_array( $shadow ) || empty( $shadow['enable'] ) ) {
			return 'none';
		}
		$h      = isset( $shadow['horizontal'] ) ? (int) $shadow['horizontal'] : 0;
		$v      = isset( $shadow['vertical'] ) ? (int) $shadow['vertical'] : 0;
		$blur   = isset( $shadow['blur'] ) ? (int) $shadow['blur'] : 0;
		$spread = isset( $shadow['spread'] ) ? (int) $shadow['spread'] : 0;
		$color  = isset( $shadow['color'] ) ? $shadow['color'] : 'rgba(0,0,0,0.1)';
		return "{$h}px {$v}px {$blur}px {$spread}px {$color}";
	};

	// Helper: Build spacing string.
	$build_spacing = function( $spacing, $device = 'desktop' ) {
		if ( ! is_array( $spacing ) || ! isset( $spacing[ $device ] ) || ! is_array( $spacing[ $device ] ) ) {
			return '';
		}
		$dev    = $spacing[ $device ];
		$top    = isset( $dev['top'] ) && '' !== $dev['top'] ? $dev['top'] : '0';
		$right  = isset( $dev['right'] ) && '' !== $dev['right'] ? $dev['right'] : '0';
		$bottom = isset( $dev['bottom'] ) && '' !== $dev['bottom'] ? $dev['bottom'] : '0';
		$left   = isset( $dev['left'] ) && '' !== $dev['left'] ? $dev['left'] : '0';
		if ( '0' === $top && '0' === $right && '0' === $bottom && '0' === $left ) {
			return '';
		}
		return "{$top}px {$right}px {$bottom}px {$left}px";
	};

	// Helper: Get typography value.
	$get_typo = function( $typo, $key, $device = 'desktop', $default = '' ) {
		if ( ! is_array( $typo ) || ! isset( $typo[ $key ] ) ) {
			return $default;
		}
		$val = $typo[ $key ];
		if ( is_array( $val ) && isset( $val[ $device ] ) ) {
			return is_scalar( $val[ $device ] ) ? (string) $val[ $device ] : $default;
		}
		if ( is_scalar( $val ) ) {
			return 'desktop' === $device ? (string) $val : '';
		}
		return $default;
	};

	// Build CSS variables.
	$style_vars = array();

	// Box background.
	if ( $box_bg_color ) {
		$style_vars[] = '--mgb-image-box-bg: ' . esc_attr( $box_bg_color );
	}
	if ( $box_hover_bg ) {
		$style_vars[] = '--mgb-image-box-bg-hover: ' . esc_attr( $box_hover_bg );
	}

	// Box border.
	if ( $box_border_color ) {
		$style_vars[] = '--mgb-image-box-border-color: ' . esc_attr( $box_border_color );
	}
	if ( $box_border_hover ) {
		$style_vars[] = '--mgb-image-box-border-hover-color: ' . esc_attr( $box_border_hover );
	}
	if ( 'none' !== $box_border_style ) {
		$style_vars[] = '--mgb-image-box-border-style: ' . esc_attr( $box_border_style );
		$style_vars[] = '--mgb-image-box-border-width: ' . esc_attr( $box_border_width ) . 'px';
	}
	$style_vars[] = '--mgb-image-box-border-radius: ' . esc_attr( $box_border_radius ) . 'px';

	// Box shadow.
	$style_vars[] = '--mgb-image-box-shadow: ' . esc_attr( $build_shadow( $box_shadow ) );
	$style_vars[] = '--mgb-image-box-shadow-hover: ' . esc_attr( $build_shadow( $box_hover_shadow ) );

	// Image height.
	$h_desktop = $get_value( $image_height, 'desktop' );
	$h_tablet  = $get_value( $image_height, 'tablet' );
	$h_mobile  = $get_value( $image_height, 'mobile' );
	if ( $h_desktop ) {
		$style_vars[] = '--mgb-image-box-image-height: ' . esc_attr( $h_desktop ) . 'px';
	}
	if ( $h_tablet ) {
		$style_vars[] = '--mgb-image-box-image-height-tablet: ' . esc_attr( $h_tablet ) . 'px';
	}
	if ( $h_mobile ) {
		$style_vars[] = '--mgb-image-box-image-height-mobile: ' . esc_attr( $h_mobile ) . 'px';
	}

	// Image fit.
	if ( $image_object_fit ) {
		$style_vars[] = '--mgb-image-box-image-fit: ' . esc_attr( $image_object_fit );
	}

	// Image width (for side layouts).
	$w_desktop = $get_value( $image_width, 'desktop' );
	$w_tablet  = $get_value( $image_width, 'tablet' );
	$w_mobile  = $get_value( $image_width, 'mobile' );
	if ( $w_desktop ) {
		$style_vars[] = '--mgb-image-box-image-width: ' . esc_attr( $w_desktop ) . '%';
	}
	if ( $w_tablet ) {
		$style_vars[] = '--mgb-image-box-image-width-tablet: ' . esc_attr( $w_tablet ) . '%';
	}
	if ( $w_mobile ) {
		$style_vars[] = '--mgb-image-box-image-width-mobile: ' . esc_attr( $w_mobile ) . '%';
	}

	// Colors.
	if ( $title_color ) {
		$style_vars[] = '--mgb-image-box-title-color: ' . esc_attr( $title_color );
	}
	if ( $title_hover_color ) {
		$style_vars[] = '--mgb-image-box-title-hover-color: ' . esc_attr( $title_hover_color );
	}
	if ( $desc_color ) {
		$style_vars[] = '--mgb-image-box-desc-color: ' . esc_attr( $desc_color );
	}
	if ( $link_color ) {
		$style_vars[] = '--mgb-image-box-link-color: ' . esc_attr( $link_color );
	}
	if ( $link_hover_color ) {
		$style_vars[] = '--mgb-image-box-link-hover-color: ' . esc_attr( $link_hover_color );
	}

	// Title typography.
	$title_size_d = $get_typo( $title_typography, 'fontSize', 'desktop', '' );
	if ( $title_size_d ) {
		$style_vars[] = '--mgb-image-box-title-size: ' . esc_attr( $title_size_d ) . 'px';
	}
	$title_size_t = $get_typo( $title_typography, 'fontSize', 'tablet', '' );
	if ( $title_size_t ) {
		$style_vars[] = '--mgb-image-box-title-size-tablet: ' . esc_attr( $title_size_t ) . 'px';
	}
	$title_size_m = $get_typo( $title_typography, 'fontSize', 'mobile', '' );
	if ( $title_size_m ) {
		$style_vars[] = '--mgb-image-box-title-size-mobile: ' . esc_attr( $title_size_m ) . 'px';
	}
	$title_weight = $get_typo( $title_typography, 'fontWeight', 'desktop', '' );
	if ( $title_weight ) {
		$style_vars[] = '--mgb-image-box-title-weight: ' . esc_attr( $title_weight );
	}
	$title_lh = $get_typo( $title_typography, 'lineHeight', 'desktop', '' );
	if ( $title_lh ) {
		$style_vars[] = '--mgb-image-box-title-line-height: ' . esc_attr( $title_lh );
	}

	// Description typography.
	$desc_size_d = $get_typo( $desc_typography, 'fontSize', 'desktop', '' );
	if ( $desc_size_d ) {
		$style_vars[] = '--mgb-image-box-desc-size: ' . esc_attr( $desc_size_d ) . 'px';
	}
	$desc_size_t = $get_typo( $desc_typography, 'fontSize', 'tablet', '' );
	if ( $desc_size_t ) {
		$style_vars[] = '--mgb-image-box-desc-size-tablet: ' . esc_attr( $desc_size_t ) . 'px';
	}
	$desc_size_m = $get_typo( $desc_typography, 'fontSize', 'mobile', '' );
	if ( $desc_size_m ) {
		$style_vars[] = '--mgb-image-box-desc-size-mobile: ' . esc_attr( $desc_size_m ) . 'px';
	}
	$desc_weight = $get_typo( $desc_typography, 'fontWeight', 'desktop', '' );
	if ( $desc_weight ) {
		$style_vars[] = '--mgb-image-box-desc-weight: ' . esc_attr( $desc_weight );
	}
	$desc_lh = $get_typo( $desc_typography, 'lineHeight', 'desktop', '' );
	if ( $desc_lh ) {
		$style_vars[] = '--mgb-image-box-desc-line-height: ' . esc_attr( $desc_lh );
	}

	// Link typography.
	$link_size_d = $get_typo( $link_typography, 'fontSize', 'desktop', '' );
	if ( $link_size_d ) {
		$style_vars[] = '--mgb-image-box-link-size: ' . esc_attr( $link_size_d ) . 'px';
	}
	$link_weight = $get_typo( $link_typography, 'fontWeight', 'desktop', '' );
	if ( $link_weight ) {
		$style_vars[] = '--mgb-image-box-link-weight: ' . esc_attr( $link_weight );
	}

	// Padding.
	$pad_desktop = $build_spacing( $padding, 'desktop' );
	$pad_tablet  = $build_spacing( $padding, 'tablet' );
	$pad_mobile  = $build_spacing( $padding, 'mobile' );
	if ( $pad_desktop ) {
		$style_vars[] = '--mgb-image-box-padding: ' . esc_attr( $pad_desktop );
	}
	if ( $pad_tablet ) {
		$style_vars[] = '--mgb-image-box-padding-tablet: ' . esc_attr( $pad_tablet );
	}
	if ( $pad_mobile ) {
		$style_vars[] = '--mgb-image-box-padding-mobile: ' . esc_attr( $pad_mobile );
	}

	// Margin.
	$mar_desktop = $build_spacing( $margin, 'desktop' );
	$mar_tablet  = $build_spacing( $margin, 'tablet' );
	$mar_mobile  = $build_spacing( $margin, 'mobile' );
	if ( $mar_desktop ) {
		$style_vars[] = '--mgb-image-box-margin: ' . esc_attr( $mar_desktop );
	}
	if ( $mar_tablet ) {
		$style_vars[] = '--mgb-image-box-margin-tablet: ' . esc_attr( $mar_tablet );
	}
	if ( $mar_mobile ) {
		$style_vars[] = '--mgb-image-box-margin-mobile: ' . esc_attr( $mar_mobile );
	}

	// Content gap.
	$gap_desktop = $get_value( $content_gap, 'desktop' );
	if ( $gap_desktop ) {
		$style_vars[] = '--mgb-image-box-content-gap: ' . esc_attr( $gap_desktop ) . 'px';
	}

	// Title spacing.
	$ts_desktop = $get_value( $title_spacing, 'desktop' );
	if ( $ts_desktop ) {
		$style_vars[] = '--mgb-image-box-title-margin: ' . esc_attr( $ts_desktop ) . 'px';
	}

	// Build style string.
	$style_string = implode( '; ', $style_vars );

	// Build block classes.
	$block_classes = array(
		'mgb-image-box',
		'mgb-image-box--layout-' . esc_attr( $layout ),
		'mgb-align-' . esc_attr( $alignment ),
	);
	if ( $block_id ) {
		$block_classes[] = 'mgb-image-box-' . esc_attr( $block_id );
	}
	if ( 'none' !== $hover_effect ) {
		$block_classes[] = 'mgb-image-box--hover-' . esc_attr( $hover_effect );
	}
	if ( ! empty( $attributes['className'] ) ) {
		$block_classes[] = esc_attr( $attributes['className'] );
	}

	// Get wrapper attributes.
	$wrapper_args = array(
		'class' => implode( ' ', $block_classes ),
	);
	if ( $style_string ) {
		$wrapper_args['style'] = $style_string;
	}
	$wrapper_attributes = get_block_wrapper_attributes( $wrapper_args );

	// Build image HTML.
	$image_html = '';
	if ( $image_url ) {
		$image_html = sprintf(
			'<div class="mgb-image-box-image"><img src="%s" alt="%s" /></div>',
			esc_url( $image_url ),
			esc_attr( $image_alt )
		);
	}

	// Build title HTML.
	$title_html = '';
	if ( $title ) {
		$title_html = sprintf(
			'<%1$s class="mgb-image-box-title">%2$s</%1$s>',
			esc_attr( $title_tag ),
			wp_kses_post( $title )
		);
	}

	// Build description HTML.
	$desc_html = '';
	if ( $description ) {
		$desc_html = sprintf(
			'<p class="mgb-image-box-description">%s</p>',
			wp_kses_post( $description )
		);
	}

	// Build link HTML.
	$link_html = '';
	if ( $link_url && $link_text ) {
		$rel       = '_blank' === $link_target ? ' rel="noopener noreferrer"' : '';
		$link_html = sprintf(
			'<a href="%s" class="mgb-image-box-link" target="%s"%s>%s</a>',
			esc_url( $link_url ),
			esc_attr( $link_target ),
			$rel,
			wp_kses_post( $link_text )
		);
	}

	// Build content HTML.
	$content_html = sprintf(
		'<div class="mgb-image-box-content">%s%s%s</div>',
		$title_html,
		$desc_html,
		$link_html
	);

	// Build inner HTML.
	$inner_html = sprintf(
		'<div class="mgb-image-box-inner">%s%s</div>',
		$image_html,
		$content_html
	);

	// Build output - wrap in link if URL set but no link text.
	if ( $link_url && ! $link_text ) {
		$rel    = '_blank' === $link_target ? ' rel="noopener noreferrer"' : '';
		$output = sprintf(
			'<div %s><a href="%s" class="mgb-image-box-link-wrapper" target="%s"%s>%s</a></div>',
			$wrapper_attributes,
			esc_url( $link_url ),
			esc_attr( $link_target ),
			$rel,
			$inner_html
		);
	} else {
		$output = sprintf(
			'<div %s>%s</div>',
			$wrapper_attributes,
			$inner_html
		);
	}

	return $output;
}
