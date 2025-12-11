<?php
/**
 * Container Block - Server-side rendering
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Container block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_container( $attributes, $content, $block ) {
	// Extract attributes with defaults.
	$block_id        = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
	$html_tag        = isset( $attributes['htmlTag'] ) ? $attributes['htmlTag'] : 'div';
	$container_width = isset( $attributes['containerWidth'] ) ? $attributes['containerWidth'] : 'boxed';

	// Layout - Responsive.
	$max_width  = isset( $attributes['maxWidth'] ) ? $attributes['maxWidth'] : array( 'desktop' => '1200px' );
	$min_height = isset( $attributes['minHeight'] ) ? $attributes['minHeight'] : array();

	// Flexbox - Responsive.
	$flex_direction  = isset( $attributes['flexDirection'] ) ? $attributes['flexDirection'] : array( 'desktop' => 'row' );
	$justify_content = isset( $attributes['justifyContent'] ) ? $attributes['justifyContent'] : array( 'desktop' => 'flex-start' );
	$align_items     = isset( $attributes['alignItems'] ) ? $attributes['alignItems'] : array( 'desktop' => 'stretch' );
	$flex_wrap       = isset( $attributes['flexWrap'] ) ? $attributes['flexWrap'] : array( 'desktop' => 'wrap' );
	$column_gap      = isset( $attributes['columnGap'] ) ? $attributes['columnGap'] : array( 'desktop' => '20px' );
	$row_gap         = isset( $attributes['rowGap'] ) ? $attributes['rowGap'] : array( 'desktop' => '20px' );

	// Background.
	$background_color      = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';
	$background_gradient   = isset( $attributes['backgroundGradient'] ) ? $attributes['backgroundGradient'] : '';
	$background_image_url  = isset( $attributes['backgroundImageUrl'] ) ? $attributes['backgroundImageUrl'] : '';
	$background_position   = isset( $attributes['backgroundPosition'] ) ? $attributes['backgroundPosition'] : 'center center';
	$background_size       = isset( $attributes['backgroundSize'] ) ? $attributes['backgroundSize'] : 'cover';
	$background_repeat     = isset( $attributes['backgroundRepeat'] ) ? $attributes['backgroundRepeat'] : 'no-repeat';
	$background_attachment = isset( $attributes['backgroundAttachment'] ) ? $attributes['backgroundAttachment'] : 'scroll';

	// Gradient options.
	$gradient_enabled = isset( $attributes['gradientEnabled'] ) ? $attributes['gradientEnabled'] : false;
	$gradient_color1  = isset( $attributes['gradientColor1'] ) ? $attributes['gradientColor1'] : '#667eea';
	$gradient_color2  = isset( $attributes['gradientColor2'] ) ? $attributes['gradientColor2'] : '#764ba2';
	$gradient_angle   = isset( $attributes['gradientAngle'] ) ? $attributes['gradientAngle'] : 135;

	// Overlay.
	$overlay_color            = isset( $attributes['overlayColor'] ) ? $attributes['overlayColor'] : '';
	$overlay_gradient         = isset( $attributes['overlayGradient'] ) ? $attributes['overlayGradient'] : '';
	$overlay_gradient_enabled = isset( $attributes['overlayGradientEnabled'] ) ? $attributes['overlayGradientEnabled'] : false;
	$overlay_gradient_color1  = isset( $attributes['overlayGradientColor1'] ) ? $attributes['overlayGradientColor1'] : 'rgba(0,0,0,0.7)';
	$overlay_gradient_color2  = isset( $attributes['overlayGradientColor2'] ) ? $attributes['overlayGradientColor2'] : 'rgba(0,0,0,0.3)';
	$overlay_gradient_angle   = isset( $attributes['overlayGradientAngle'] ) ? $attributes['overlayGradientAngle'] : 180;
	$overlay_opacity          = isset( $attributes['overlayOpacity'] ) ? $attributes['overlayOpacity'] : 50;

	// Spacing - Responsive.
	$padding_top    = isset( $attributes['paddingTop'] ) ? $attributes['paddingTop'] : array();
	$padding_right  = isset( $attributes['paddingRight'] ) ? $attributes['paddingRight'] : array();
	$padding_bottom = isset( $attributes['paddingBottom'] ) ? $attributes['paddingBottom'] : array();
	$padding_left   = isset( $attributes['paddingLeft'] ) ? $attributes['paddingLeft'] : array();
	$margin_top     = isset( $attributes['marginTop'] ) ? $attributes['marginTop'] : array();
	$margin_right   = isset( $attributes['marginRight'] ) ? $attributes['marginRight'] : array();
	$margin_bottom  = isset( $attributes['marginBottom'] ) ? $attributes['marginBottom'] : array();
	$margin_left    = isset( $attributes['marginLeft'] ) ? $attributes['marginLeft'] : array();

	// Border.
	$border_style       = isset( $attributes['borderStyle'] ) ? $attributes['borderStyle'] : '';
	$border_width       = isset( $attributes['borderWidth'] ) ? $attributes['borderWidth'] : array();
	$border_color       = isset( $attributes['borderColor'] ) ? $attributes['borderColor'] : '';
	$border_color_hover = isset( $attributes['borderColorHover'] ) ? $attributes['borderColorHover'] : '';
	$border_radius      = isset( $attributes['borderRadius'] ) ? $attributes['borderRadius'] : array();

	// Box Shadow.
	$box_shadow       = isset( $attributes['boxShadow'] ) ? $attributes['boxShadow'] : array( 'enabled' => false );
	$box_shadow_hover = isset( $attributes['boxShadowHover'] ) ? $attributes['boxShadowHover'] : array( 'enabled' => false );

	// Advanced.
	$z_index    = isset( $attributes['zIndex'] ) ? $attributes['zIndex'] : null;
	$overflow   = isset( $attributes['overflow'] ) ? $attributes['overflow'] : '';
	$transition = isset( $attributes['transition'] ) ? $attributes['transition'] : 'all 0.3s ease';

	// Helper function to get responsive value with fallback (for defaults display).
	$get_responsive = function( $attr, $device = 'desktop' ) {
		if ( is_array( $attr ) ) {
			return isset( $attr[ $device ] ) && '' !== $attr[ $device ] ? $attr[ $device ] : ( isset( $attr['desktop'] ) ? $attr['desktop'] : '' );
		}
		return $attr;
	};

	// Helper function to get raw responsive value without fallback (for CSS variable output).
	// This ensures CSS cascade works properly - tablet/mobile values only output if explicitly set.
	$get_raw_responsive = function( $attr, $device = 'desktop' ) {
		if ( is_array( $attr ) ) {
			return isset( $attr[ $device ] ) && '' !== $attr[ $device ] ? $attr[ $device ] : '';
		}
		return 'desktop' === $device ? $attr : '';
	};

	// Helper function to build box shadow.
	$build_box_shadow = function( $shadow ) {
		if ( empty( $shadow['enabled'] ) ) {
			return '';
		}
		$inset      = ! empty( $shadow['inset'] ) ? 'inset ' : '';
		$horizontal = isset( $shadow['horizontal'] ) ? $shadow['horizontal'] : 0;
		$vertical   = isset( $shadow['vertical'] ) ? $shadow['vertical'] : 4;
		$blur       = isset( $shadow['blur'] ) ? $shadow['blur'] : 10;
		$spread     = isset( $shadow['spread'] ) ? $shadow['spread'] : 0;
		$color      = isset( $shadow['color'] ) ? $shadow['color'] : 'rgba(0,0,0,0.15)';
		return "{$inset}{$horizontal}px {$vertical}px {$blur}px {$spread}px {$color}";
	};

	// Helper function to build border radius (with desktop fallback for CSS output).
	$get_border_radius = function( $br, $device = 'desktop' ) {
		$device_br = isset( $br[ $device ] ) ? $br[ $device ] : ( isset( $br['desktop'] ) ? $br['desktop'] : array() );
		if ( empty( $device_br ) || ( empty( $device_br['top'] ) && empty( $device_br['right'] ) && empty( $device_br['bottom'] ) && empty( $device_br['left'] ) ) ) {
			return '';
		}
		$top    = ! empty( $device_br['top'] ) ? $device_br['top'] : '0px';
		$right  = ! empty( $device_br['right'] ) ? $device_br['right'] : '0px';
		$bottom = ! empty( $device_br['bottom'] ) ? $device_br['bottom'] : '0px';
		$left   = ! empty( $device_br['left'] ) ? $device_br['left'] : '0px';
		return "{$top} {$right} {$bottom} {$left}";
	};

	// Helper function to build border radius (raw, without fallback for tablet/mobile CSS variable output).
	$get_raw_border_radius = function( $br, $device = 'desktop' ) {
		$device_br = isset( $br[ $device ] ) ? $br[ $device ] : array();
		if ( empty( $device_br ) || ( empty( $device_br['top'] ) && empty( $device_br['right'] ) && empty( $device_br['bottom'] ) && empty( $device_br['left'] ) ) ) {
			return '';
		}
		$top    = ! empty( $device_br['top'] ) ? $device_br['top'] : '0px';
		$right  = ! empty( $device_br['right'] ) ? $device_br['right'] : '0px';
		$bottom = ! empty( $device_br['bottom'] ) ? $device_br['bottom'] : '0px';
		$left   = ! empty( $device_br['left'] ) ? $device_br['left'] : '0px';
		return "{$top} {$right} {$bottom} {$left}";
	};

	// Build CSS variables.
	$style_vars = array();

	// Layout - Max Width (only for boxed containers).
	if ( 'boxed' === $container_width ) {
		if ( ! empty( $get_raw_responsive( $max_width, 'desktop' ) ) ) {
			$style_vars[] = '--mgb-container-width: ' . esc_attr( $get_raw_responsive( $max_width, 'desktop' ) );
		}
		if ( ! empty( $get_raw_responsive( $max_width, 'tablet' ) ) ) {
			$style_vars[] = '--mgb-container-width-tablet: ' . esc_attr( $get_raw_responsive( $max_width, 'tablet' ) );
		}
		if ( ! empty( $get_raw_responsive( $max_width, 'mobile' ) ) ) {
			$style_vars[] = '--mgb-container-width-mobile: ' . esc_attr( $get_raw_responsive( $max_width, 'mobile' ) );
		}
	}

	// Min height.
	if ( ! empty( $get_raw_responsive( $min_height, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-container-min-height: ' . esc_attr( $get_raw_responsive( $min_height, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $min_height, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-container-min-height-tablet: ' . esc_attr( $get_raw_responsive( $min_height, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $min_height, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-container-min-height-mobile: ' . esc_attr( $get_raw_responsive( $min_height, 'mobile' ) );
	}

	// Flexbox properties.
	$flex_props = array(
		'direction' => $flex_direction,
		'justify'   => $justify_content,
		'align'     => $align_items,
		'wrap'      => $flex_wrap,
	);
	foreach ( $flex_props as $prop => $value ) {
		if ( ! empty( $get_raw_responsive( $value, 'desktop' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}: " . esc_attr( $get_raw_responsive( $value, 'desktop' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'tablet' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}-tablet: " . esc_attr( $get_raw_responsive( $value, 'tablet' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'mobile' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}-mobile: " . esc_attr( $get_raw_responsive( $value, 'mobile' ) );
		}
	}

	// Gap properties.
	$gap_props = array(
		'column-gap' => $column_gap,
		'row-gap'    => $row_gap,
	);
	foreach ( $gap_props as $prop => $value ) {
		if ( ! empty( $get_raw_responsive( $value, 'desktop' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}: " . esc_attr( $get_raw_responsive( $value, 'desktop' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'tablet' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}-tablet: " . esc_attr( $get_raw_responsive( $value, 'tablet' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'mobile' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}-mobile: " . esc_attr( $get_raw_responsive( $value, 'mobile' ) );
		}
	}

	// Background color (only when gradient is not enabled).
	if ( ! empty( $background_color ) && ! $gradient_enabled ) {
		$style_vars[] = '--mgb-container-bg-color: ' . esc_attr( $background_color );
	}
	// Background gradient (from gradient controls or preset).
	if ( $gradient_enabled ) {
		$style_vars[] = '--mgb-container-bg-gradient: linear-gradient(' . intval( $gradient_angle ) . 'deg, ' . esc_attr( $gradient_color1 ) . ', ' . esc_attr( $gradient_color2 ) . ')';
	} elseif ( ! empty( $background_gradient ) ) {
		$style_vars[] = '--mgb-container-bg-gradient: ' . esc_attr( $background_gradient );
	}
	// Background image.
	if ( ! empty( $background_image_url ) ) {
		$style_vars[] = '--mgb-container-bg-image: url(' . esc_url( $background_image_url ) . ')';
		$style_vars[] = '--mgb-container-bg-position: ' . esc_attr( $background_position );
		$style_vars[] = '--mgb-container-bg-size: ' . esc_attr( $background_size );
		$style_vars[] = '--mgb-container-bg-repeat: ' . esc_attr( $background_repeat );
		$style_vars[] = '--mgb-container-bg-attachment: ' . esc_attr( $background_attachment );
	}

	// Overlay.
	if ( ! empty( $overlay_color ) ) {
		$style_vars[] = '--mgb-container-overlay-color: ' . esc_attr( $overlay_color );
	}
	// Overlay gradient (from controls or preset).
	if ( $overlay_gradient_enabled ) {
		$style_vars[] = '--mgb-container-overlay-gradient: linear-gradient(' . intval( $overlay_gradient_angle ) . 'deg, ' . esc_attr( $overlay_gradient_color1 ) . ', ' . esc_attr( $overlay_gradient_color2 ) . ')';
	} elseif ( ! empty( $overlay_gradient ) ) {
		$style_vars[] = '--mgb-container-overlay-gradient: ' . esc_attr( $overlay_gradient );
	}
	if ( ! empty( $overlay_color ) || ! empty( $overlay_gradient ) || $overlay_gradient_enabled ) {
		$style_vars[] = '--mgb-container-overlay-opacity: ' . ( intval( $overlay_opacity ) / 100 );
	}

	// Spacing properties (padding and margin).
	$spacing_props = array(
		'padding-top'    => $padding_top,
		'padding-right'  => $padding_right,
		'padding-bottom' => $padding_bottom,
		'padding-left'   => $padding_left,
		'margin-top'     => $margin_top,
		'margin-right'   => $margin_right,
		'margin-bottom'  => $margin_bottom,
		'margin-left'    => $margin_left,
	);
	foreach ( $spacing_props as $prop => $value ) {
		if ( ! empty( $get_raw_responsive( $value, 'desktop' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}: " . esc_attr( $get_raw_responsive( $value, 'desktop' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'tablet' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}-tablet: " . esc_attr( $get_raw_responsive( $value, 'tablet' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'mobile' ) ) ) {
			$style_vars[] = "--mgb-container-{$prop}-mobile: " . esc_attr( $get_raw_responsive( $value, 'mobile' ) );
		}
	}

	// Border style.
	if ( ! empty( $border_style ) ) {
		$style_vars[] = '--mgb-container-border-style: ' . esc_attr( $border_style );
	}
	// Border width.
	if ( ! empty( $border_width ) && ( ! empty( $border_width['top'] ) || ! empty( $border_width['right'] ) || ! empty( $border_width['bottom'] ) || ! empty( $border_width['left'] ) ) ) {
		$bw_top    = ! empty( $border_width['top'] ) ? $border_width['top'] : '0px';
		$bw_right  = ! empty( $border_width['right'] ) ? $border_width['right'] : '0px';
		$bw_bottom = ! empty( $border_width['bottom'] ) ? $border_width['bottom'] : '0px';
		$bw_left   = ! empty( $border_width['left'] ) ? $border_width['left'] : '0px';
		$style_vars[] = '--mgb-container-border-width: ' . esc_attr( "{$bw_top} {$bw_right} {$bw_bottom} {$bw_left}" );
	}
	// Border color.
	if ( ! empty( $border_color ) ) {
		$style_vars[] = '--mgb-container-border-color: ' . esc_attr( $border_color );
	}
	if ( ! empty( $border_color_hover ) ) {
		$style_vars[] = '--mgb-container-border-color-hover: ' . esc_attr( $border_color_hover );
	}

	// Border radius (desktop uses fallback, tablet/mobile use raw values).
	$br_desktop = $get_border_radius( $border_radius, 'desktop' );
	$br_tablet  = $get_raw_border_radius( $border_radius, 'tablet' );
	$br_mobile  = $get_raw_border_radius( $border_radius, 'mobile' );
	if ( ! empty( $br_desktop ) ) {
		$style_vars[] = '--mgb-container-border-radius: ' . esc_attr( $br_desktop );
	}
	if ( ! empty( $br_tablet ) ) {
		$style_vars[] = '--mgb-container-border-radius-tablet: ' . esc_attr( $br_tablet );
	}
	if ( ! empty( $br_mobile ) ) {
		$style_vars[] = '--mgb-container-border-radius-mobile: ' . esc_attr( $br_mobile );
	}

	// Box shadow.
	$shadow_value = $build_box_shadow( $box_shadow );
	if ( ! empty( $shadow_value ) ) {
		$style_vars[] = '--mgb-container-box-shadow: ' . esc_attr( $shadow_value );
	}
	$shadow_hover_value = $build_box_shadow( $box_shadow_hover );
	if ( ! empty( $shadow_hover_value ) ) {
		$style_vars[] = '--mgb-container-box-shadow-hover: ' . esc_attr( $shadow_hover_value );
	}

	// Advanced.
	if ( null !== $z_index && '' !== $z_index ) {
		$style_vars[] = '--mgb-container-z-index: ' . intval( $z_index );
	}
	if ( ! empty( $overflow ) ) {
		$style_vars[] = '--mgb-container-overflow: ' . esc_attr( $overflow );
	}
	if ( ! empty( $transition ) ) {
		$style_vars[] = '--mgb-container-transition: ' . esc_attr( $transition );
	}

	// Build inline styles string for CSS variables.
	$style_string = ! empty( $style_vars ) ? implode( '; ', $style_vars ) : '';

	// Build block classes.
	$block_classes = array(
		'mgb-container',
		'mgb-container--' . esc_attr( $container_width ),
	);

	if ( ! empty( $block_id ) ) {
		$block_classes[] = 'mgb-block-' . esc_attr( $block_id );
	}

	if ( ! empty( $overlay_color ) || ! empty( $overlay_gradient ) || $overlay_gradient_enabled ) {
		$block_classes[] = 'mgb-container--has-overlay';
	}

	if ( ! empty( $background_image_url ) ) {
		$block_classes[] = 'mgb-container--has-bg-image';
	}

	if ( $gradient_enabled || ! empty( $background_gradient ) ) {
		$block_classes[] = 'mgb-container--has-gradient';
	}

	if ( ! empty( $attributes['className'] ) ) {
		$block_classes[] = esc_attr( $attributes['className'] );
	}

	if ( ! empty( $attributes['align'] ) ) {
		$block_classes[] = 'align' . esc_attr( $attributes['align'] );
	}

	// Validate HTML tag.
	$allowed_tags = array( 'div', 'section', 'header', 'footer', 'article', 'aside', 'main', 'nav' );
	if ( ! in_array( $html_tag, $allowed_tags, true ) ) {
		$html_tag = 'div';
	}

	// Build overlay element.
	$overlay_html = '';
	if ( ! empty( $overlay_color ) || ! empty( $overlay_gradient ) || $overlay_gradient_enabled ) {
		$overlay_html = '<div class="mgb-container__overlay" aria-hidden="true"></div>';
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
		'<%1$s %2$s>%3$s<div class="mgb-container__inner">%4$s</div></%1$s>',
		esc_attr( $html_tag ),
		$wrapper_attributes,
		$overlay_html,
		$content
	);

	return $output;
}
