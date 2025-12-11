<?php
/**
 * Inner Container Block - Server-side rendering
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Renders the Inner Container block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the block content.
 */
function magical_blocks_render_inner_container( $attributes, $content, $block ) {
	// Extract attributes with defaults.
	$block_id = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';

	// Size - Responsive.
	$width      = isset( $attributes['width'] ) ? $attributes['width'] : array();
	$min_width  = isset( $attributes['minWidth'] ) ? $attributes['minWidth'] : array();
	$max_width  = isset( $attributes['maxWidth'] ) ? $attributes['maxWidth'] : array();
	$min_height = isset( $attributes['minHeight'] ) ? $attributes['minHeight'] : array();

	// Flex child.
	$flex_grow   = isset( $attributes['flexGrow'] ) ? $attributes['flexGrow'] : array( 'desktop' => '1' );
	$flex_shrink = isset( $attributes['flexShrink'] ) ? $attributes['flexShrink'] : array( 'desktop' => '1' );

	// Flex parent.
	$flex_direction  = isset( $attributes['flexDirection'] ) ? $attributes['flexDirection'] : array( 'desktop' => 'column' );
	$justify_content = isset( $attributes['justifyContent'] ) ? $attributes['justifyContent'] : array( 'desktop' => 'flex-start' );
	$align_items     = isset( $attributes['alignItems'] ) ? $attributes['alignItems'] : array( 'desktop' => 'stretch' );
	$flex_wrap       = isset( $attributes['flexWrap'] ) ? $attributes['flexWrap'] : array( 'desktop' => 'nowrap' );
	$gap             = isset( $attributes['gap'] ) ? $attributes['gap'] : array( 'desktop' => '10px' );

	// Background.
	$background_color    = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';
	$background_gradient = isset( $attributes['backgroundGradient'] ) ? $attributes['backgroundGradient'] : '';

	// Gradient options.
	$gradient_enabled = isset( $attributes['gradientEnabled'] ) ? $attributes['gradientEnabled'] : false;
	$gradient_color1  = isset( $attributes['gradientColor1'] ) ? $attributes['gradientColor1'] : '#667eea';
	$gradient_color2  = isset( $attributes['gradientColor2'] ) ? $attributes['gradientColor2'] : '#764ba2';
	$gradient_angle   = isset( $attributes['gradientAngle'] ) ? $attributes['gradientAngle'] : 135;

	// Padding.
	$padding_top    = isset( $attributes['paddingTop'] ) ? $attributes['paddingTop'] : array();
	$padding_right  = isset( $attributes['paddingRight'] ) ? $attributes['paddingRight'] : array();
	$padding_bottom = isset( $attributes['paddingBottom'] ) ? $attributes['paddingBottom'] : array();
	$padding_left   = isset( $attributes['paddingLeft'] ) ? $attributes['paddingLeft'] : array();

	// Margin.
	$margin_top    = isset( $attributes['marginTop'] ) ? $attributes['marginTop'] : array();
	$margin_right  = isset( $attributes['marginRight'] ) ? $attributes['marginRight'] : array();
	$margin_bottom = isset( $attributes['marginBottom'] ) ? $attributes['marginBottom'] : array();
	$margin_left   = isset( $attributes['marginLeft'] ) ? $attributes['marginLeft'] : array();

	// Border.
	$border_style  = isset( $attributes['borderStyle'] ) ? $attributes['borderStyle'] : '';
	$border_width  = isset( $attributes['borderWidth'] ) ? $attributes['borderWidth'] : array();
	$border_color  = isset( $attributes['borderColor'] ) ? $attributes['borderColor'] : '';
	$border_radius = isset( $attributes['borderRadius'] ) ? $attributes['borderRadius'] : array();

	// Box Shadow.
	$box_shadow = isset( $attributes['boxShadow'] ) ? $attributes['boxShadow'] : array( 'enabled' => false );

	// Helper function to get responsive value (with desktop fallback for UI display).
	$get_responsive = function( $attr, $device = 'desktop' ) {
		if ( is_array( $attr ) ) {
			return isset( $attr[ $device ] ) && '' !== $attr[ $device ] ? $attr[ $device ] : ( isset( $attr['desktop'] ) ? $attr['desktop'] : '' );
		}
		return $attr;
	};

	// Helper function to get raw responsive value (without fallback, for CSS variable output).
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
		$color      = isset( $shadow['color'] ) ? $shadow['color'] : 'rgba(0,0,0,0.1)';
		return "{$inset}{$horizontal}px {$vertical}px {$blur}px {$spread}px {$color}";
	};

	// Helper function to build border radius (with desktop fallback for display).
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

	// Helper function to build border radius (raw, without fallback for CSS variable output).
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

	// Width.
	if ( ! empty( $get_raw_responsive( $width, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-inner-width: ' . esc_attr( $get_raw_responsive( $width, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $width, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-inner-width-tablet: ' . esc_attr( $get_raw_responsive( $width, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $width, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-inner-width-mobile: ' . esc_attr( $get_raw_responsive( $width, 'mobile' ) );
	}

	// Min/Max Width.
	if ( ! empty( $get_raw_responsive( $min_width, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-inner-min-width: ' . esc_attr( $get_raw_responsive( $min_width, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $min_width, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-inner-min-width-tablet: ' . esc_attr( $get_raw_responsive( $min_width, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $min_width, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-inner-min-width-mobile: ' . esc_attr( $get_raw_responsive( $min_width, 'mobile' ) );
	}
	if ( ! empty( $get_raw_responsive( $max_width, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-inner-max-width: ' . esc_attr( $get_raw_responsive( $max_width, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $max_width, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-inner-max-width-tablet: ' . esc_attr( $get_raw_responsive( $max_width, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $max_width, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-inner-max-width-mobile: ' . esc_attr( $get_raw_responsive( $max_width, 'mobile' ) );
	}

	// Min Height.
	if ( ! empty( $get_raw_responsive( $min_height, 'desktop' ) ) ) {
		$style_vars[] = '--mgb-inner-min-height: ' . esc_attr( $get_raw_responsive( $min_height, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $min_height, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-inner-min-height-tablet: ' . esc_attr( $get_raw_responsive( $min_height, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $min_height, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-inner-min-height-mobile: ' . esc_attr( $get_raw_responsive( $min_height, 'mobile' ) );
	}

	// Flex child.
	if ( ! empty( $get_raw_responsive( $flex_grow, 'desktop' ) ) && '1' !== $get_raw_responsive( $flex_grow, 'desktop' ) ) {
		$style_vars[] = '--mgb-inner-flex-grow: ' . esc_attr( $get_raw_responsive( $flex_grow, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $flex_grow, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-inner-flex-grow-tablet: ' . esc_attr( $get_raw_responsive( $flex_grow, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $flex_grow, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-inner-flex-grow-mobile: ' . esc_attr( $get_raw_responsive( $flex_grow, 'mobile' ) );
	}
	if ( ! empty( $get_raw_responsive( $flex_shrink, 'desktop' ) ) && '1' !== $get_raw_responsive( $flex_shrink, 'desktop' ) ) {
		$style_vars[] = '--mgb-inner-flex-shrink: ' . esc_attr( $get_raw_responsive( $flex_shrink, 'desktop' ) );
	}
	if ( ! empty( $get_raw_responsive( $flex_shrink, 'tablet' ) ) ) {
		$style_vars[] = '--mgb-inner-flex-shrink-tablet: ' . esc_attr( $get_raw_responsive( $flex_shrink, 'tablet' ) );
	}
	if ( ! empty( $get_raw_responsive( $flex_shrink, 'mobile' ) ) ) {
		$style_vars[] = '--mgb-inner-flex-shrink-mobile: ' . esc_attr( $get_raw_responsive( $flex_shrink, 'mobile' ) );
	}

	// Flex parent (direction, justify, align, wrap, gap).
	$flex_props = array(
		'direction' => $flex_direction,
		'justify'   => $justify_content,
		'align'     => $align_items,
		'wrap'      => $flex_wrap,
		'gap'       => $gap,
	);
	foreach ( $flex_props as $prop => $value ) {
		if ( ! empty( $get_raw_responsive( $value, 'desktop' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}: " . esc_attr( $get_raw_responsive( $value, 'desktop' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'tablet' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}-tablet: " . esc_attr( $get_raw_responsive( $value, 'tablet' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'mobile' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}-mobile: " . esc_attr( $get_raw_responsive( $value, 'mobile' ) );
		}
	}

	// Background.
	if ( ! empty( $background_color ) ) {
		$style_vars[] = '--mgb-inner-bg-color: ' . esc_attr( $background_color );
	}
	// Dynamic gradient (from gradient controls).
	if ( $gradient_enabled ) {
		$style_vars[] = '--mgb-inner-bg-gradient: linear-gradient(' . intval( $gradient_angle ) . 'deg, ' . esc_attr( $gradient_color1 ) . ', ' . esc_attr( $gradient_color2 ) . ')';
	} elseif ( ! empty( $background_gradient ) ) {
		$style_vars[] = '--mgb-inner-bg-gradient: ' . esc_attr( $background_gradient );
	}

	// Padding.
	$padding_props = array(
		'padding-top'    => $padding_top,
		'padding-right'  => $padding_right,
		'padding-bottom' => $padding_bottom,
		'padding-left'   => $padding_left,
	);
	foreach ( $padding_props as $prop => $value ) {
		if ( ! empty( $get_raw_responsive( $value, 'desktop' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}: " . esc_attr( $get_raw_responsive( $value, 'desktop' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'tablet' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}-tablet: " . esc_attr( $get_raw_responsive( $value, 'tablet' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'mobile' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}-mobile: " . esc_attr( $get_raw_responsive( $value, 'mobile' ) );
		}
	}

	// Margin.
	$margin_props = array(
		'margin-top'    => $margin_top,
		'margin-right'  => $margin_right,
		'margin-bottom' => $margin_bottom,
		'margin-left'   => $margin_left,
	);
	foreach ( $margin_props as $prop => $value ) {
		if ( ! empty( $get_raw_responsive( $value, 'desktop' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}: " . esc_attr( $get_raw_responsive( $value, 'desktop' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'tablet' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}-tablet: " . esc_attr( $get_raw_responsive( $value, 'tablet' ) );
		}
		if ( ! empty( $get_raw_responsive( $value, 'mobile' ) ) ) {
			$style_vars[] = "--mgb-inner-{$prop}-mobile: " . esc_attr( $get_raw_responsive( $value, 'mobile' ) );
		}
	}

	// Border.
	if ( ! empty( $border_style ) ) {
		$style_vars[] = '--mgb-inner-border-style: ' . esc_attr( $border_style );
	}
	if ( ! empty( $border_width ) && ( ! empty( $border_width['top'] ) || ! empty( $border_width['right'] ) || ! empty( $border_width['bottom'] ) || ! empty( $border_width['left'] ) ) ) {
		$bw_top    = ! empty( $border_width['top'] ) ? $border_width['top'] : '0px';
		$bw_right  = ! empty( $border_width['right'] ) ? $border_width['right'] : '0px';
		$bw_bottom = ! empty( $border_width['bottom'] ) ? $border_width['bottom'] : '0px';
		$bw_left   = ! empty( $border_width['left'] ) ? $border_width['left'] : '0px';
		$style_vars[] = '--mgb-inner-border-width: ' . esc_attr( "{$bw_top} {$bw_right} {$bw_bottom} {$bw_left}" );
	}
	if ( ! empty( $border_color ) ) {
		$style_vars[] = '--mgb-inner-border-color: ' . esc_attr( $border_color );
	}

	// Border radius.
	$br_value = $get_border_radius( $border_radius, 'desktop' );
	if ( ! empty( $br_value ) ) {
		$style_vars[] = '--mgb-inner-border-radius: ' . esc_attr( $br_value );
	}
	$br_tablet = $get_raw_border_radius( $border_radius, 'tablet' );
	if ( ! empty( $br_tablet ) ) {
		$style_vars[] = '--mgb-inner-border-radius-tablet: ' . esc_attr( $br_tablet );
	}
	$br_mobile = $get_raw_border_radius( $border_radius, 'mobile' );
	if ( ! empty( $br_mobile ) ) {
		$style_vars[] = '--mgb-inner-border-radius-mobile: ' . esc_attr( $br_mobile );
	}

	// Box shadow.
	$shadow_value = $build_box_shadow( $box_shadow );
	if ( ! empty( $shadow_value ) ) {
		$style_vars[] = '--mgb-inner-box-shadow: ' . esc_attr( $shadow_value );
	}

	// Build inline styles string for CSS variables.
	$style_string = ! empty( $style_vars ) ? implode( '; ', $style_vars ) : '';

	// Build block classes.
	$block_classes = array( 'mgb-inner-container' );

	if ( ! empty( $block_id ) ) {
		$block_classes[] = 'mgb-block-' . esc_attr( $block_id );
	}

	if ( ! empty( $attributes['className'] ) ) {
		$block_classes[] = esc_attr( $attributes['className'] );
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
		'<div %1$s>%2$s</div>',
		$wrapper_attributes,
		$content
	);

	return $output;
}
