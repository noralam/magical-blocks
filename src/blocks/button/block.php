<?php
/**
 * Magical Button Block - Server-side Render
 *
 * @package Magical_Blocks
 * @since   1.0.0
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Extract attributes with defaults.
$block_id      = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$text          = isset( $attributes['text'] ) ? $attributes['text'] : __( 'Click Me', 'magical-blocks' );
$url           = isset( $attributes['url'] ) ? $attributes['url'] : '';
$link_target   = isset( $attributes['linkTarget'] ) ? $attributes['linkTarget'] : '_self';
$rel           = isset( $attributes['rel'] ) ? $attributes['rel'] : '';
$button_align  = isset( $attributes['buttonAlign'] ) ? $attributes['buttonAlign'] : 'left';
$button_align_tablet = isset( $attributes['buttonAlignTablet'] ) ? $attributes['buttonAlignTablet'] : '';
$button_align_mobile = isset( $attributes['buttonAlignMobile'] ) ? $attributes['buttonAlignMobile'] : '';
$button_size   = isset( $attributes['buttonSize'] ) ? $attributes['buttonSize'] : 'medium';
$button_width  = isset( $attributes['buttonWidth'] ) ? $attributes['buttonWidth'] : 'auto';
$custom_width  = isset( $attributes['customWidth'] ) ? $attributes['customWidth'] : '';
$custom_width_unit = isset( $attributes['customWidthUnit'] ) ? $attributes['customWidthUnit'] : 'px';

// Typography.
$font_family    = isset( $attributes['fontFamily'] ) ? $attributes['fontFamily'] : '';
$font_size      = isset( $attributes['fontSize'] ) ? $attributes['fontSize'] : '';
$font_size_tablet = isset( $attributes['fontSizeTablet'] ) ? $attributes['fontSizeTablet'] : '';
$font_size_mobile = isset( $attributes['fontSizeMobile'] ) ? $attributes['fontSizeMobile'] : '';
$font_size_unit = isset( $attributes['fontSizeUnit'] ) ? $attributes['fontSizeUnit'] : 'px';
$font_weight    = isset( $attributes['fontWeight'] ) ? $attributes['fontWeight'] : '';
$text_transform = isset( $attributes['textTransform'] ) ? $attributes['textTransform'] : '';
$letter_spacing = isset( $attributes['letterSpacing'] ) ? $attributes['letterSpacing'] : '';

// Colors.
$text_color            = isset( $attributes['textColor'] ) ? $attributes['textColor'] : '#ffffff';
$text_color_hover      = isset( $attributes['textColorHover'] ) ? $attributes['textColorHover'] : '';
$background_color      = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '#0073aa';
$background_color_hover = isset( $attributes['backgroundColorHover'] ) ? $attributes['backgroundColorHover'] : '';
$gradient_enabled      = isset( $attributes['gradientEnabled'] ) ? $attributes['gradientEnabled'] : false;
$gradient_color1       = isset( $attributes['gradientColor1'] ) ? $attributes['gradientColor1'] : '#667eea';
$gradient_color2       = isset( $attributes['gradientColor2'] ) ? $attributes['gradientColor2'] : '#764ba2';
$gradient_angle        = isset( $attributes['gradientAngle'] ) ? $attributes['gradientAngle'] : 135;

// Border.
$border_radius      = isset( $attributes['borderRadius'] ) ? $attributes['borderRadius'] : array();
$border_radius_unit = isset( $attributes['borderRadiusUnit'] ) ? $attributes['borderRadiusUnit'] : 'px';
$border_width       = isset( $attributes['borderWidth'] ) ? $attributes['borderWidth'] : 0;
$border_color       = isset( $attributes['borderColor'] ) ? $attributes['borderColor'] : '';
$border_color_hover = isset( $attributes['borderColorHover'] ) ? $attributes['borderColorHover'] : '';
$border_style       = isset( $attributes['borderStyle'] ) ? $attributes['borderStyle'] : 'solid';

// Spacing.
$padding      = isset( $attributes['padding'] ) ? $attributes['padding'] : array();
$padding_tablet = isset( $attributes['paddingTablet'] ) ? $attributes['paddingTablet'] : array();
$padding_mobile = isset( $attributes['paddingMobile'] ) ? $attributes['paddingMobile'] : array();
$padding_unit = isset( $attributes['paddingUnit'] ) ? $attributes['paddingUnit'] : 'px';
$margin       = isset( $attributes['margin'] ) ? $attributes['margin'] : array();
$margin_unit  = isset( $attributes['marginUnit'] ) ? $attributes['marginUnit'] : 'px';

// Box shadow.
$box_shadow            = isset( $attributes['boxShadow'] ) ? $attributes['boxShadow'] : false;
$box_shadow_horizontal = isset( $attributes['boxShadowHorizontal'] ) ? $attributes['boxShadowHorizontal'] : 0;
$box_shadow_vertical   = isset( $attributes['boxShadowVertical'] ) ? $attributes['boxShadowVertical'] : 4;
$box_shadow_blur       = isset( $attributes['boxShadowBlur'] ) ? $attributes['boxShadowBlur'] : 10;
$box_shadow_spread     = isset( $attributes['boxShadowSpread'] ) ? $attributes['boxShadowSpread'] : 0;
$box_shadow_color      = isset( $attributes['boxShadowColor'] ) ? $attributes['boxShadowColor'] : 'rgba(0,0,0,0.2)';

// Icon.
$icon_enabled  = isset( $attributes['iconEnabled'] ) ? $attributes['iconEnabled'] : false;
$icon          = isset( $attributes['icon'] ) ? $attributes['icon'] : '';
$icon_position = isset( $attributes['iconPosition'] ) ? $attributes['iconPosition'] : 'left';
$icon_size     = isset( $attributes['iconSize'] ) ? $attributes['iconSize'] : 16;
$icon_spacing  = isset( $attributes['iconSpacing'] ) ? $attributes['iconSpacing'] : 8;

// Hover effect.
$hover_effect = isset( $attributes['hoverEffect'] ) ? $attributes['hoverEffect'] : 'none';

// Build wrapper classes.
$wrapper_classes = array(
	'mgb-button-wrapper',
	'mgb-button-wrapper--align-' . $button_align,
);

if ( $block_id ) {
	$wrapper_classes[] = 'mgb-block-' . $block_id;
}

// Build button classes.
$button_classes = array(
	'mgb-button',
	'mgb-button--size-' . $button_size,
);

if ( 'full' === $button_width ) {
	$button_classes[] = 'mgb-button--full-width';
}

if ( 'none' !== $hover_effect ) {
	$button_classes[] = 'mgb-button--hover-' . $hover_effect;
}

if ( $icon_enabled && $icon ) {
	$button_classes[] = 'mgb-button--has-icon';
	$button_classes[] = 'mgb-button--icon-' . $icon_position;
}

// Build button inline styles.
$button_styles = array();

if ( $font_family ) {
	$button_styles[] = 'font-family:' . esc_attr( $font_family );
}
if ( $font_size ) {
	$button_styles[] = 'font-size:' . esc_attr( $font_size ) . esc_attr( $font_size_unit );
}
if ( $font_weight ) {
	$button_styles[] = 'font-weight:' . esc_attr( $font_weight );
}
if ( $text_transform ) {
	$button_styles[] = 'text-transform:' . esc_attr( $text_transform );
}
if ( $letter_spacing ) {
	$button_styles[] = 'letter-spacing:' . esc_attr( $letter_spacing ) . 'px';
}
if ( $text_color ) {
	$button_styles[] = 'color:' . esc_attr( $text_color );
}

// Background.
if ( $gradient_enabled ) {
	$button_styles[] = 'background:linear-gradient(' . esc_attr( $gradient_angle ) . 'deg,' . esc_attr( $gradient_color1 ) . ',' . esc_attr( $gradient_color2 ) . ')';
} elseif ( $background_color ) {
	$button_styles[] = 'background-color:' . esc_attr( $background_color );
}

// Border radius.
if ( ! empty( $border_radius ) ) {
	$br_top    = isset( $border_radius['top'] ) ? $border_radius['top'] : 0;
	$br_right  = isset( $border_radius['right'] ) ? $border_radius['right'] : 0;
	$br_bottom = isset( $border_radius['bottom'] ) ? $border_radius['bottom'] : 0;
	$br_left   = isset( $border_radius['left'] ) ? $border_radius['left'] : 0;
	$button_styles[] = 'border-radius:' . esc_attr( $br_top ) . $border_radius_unit . ' ' . esc_attr( $br_right ) . $border_radius_unit . ' ' . esc_attr( $br_bottom ) . $border_radius_unit . ' ' . esc_attr( $br_left ) . $border_radius_unit;
}

// Border.
if ( $border_width ) {
	$button_styles[] = 'border-width:' . esc_attr( $border_width ) . 'px';
	$button_styles[] = 'border-style:' . esc_attr( $border_style );
	if ( $border_color ) {
		$button_styles[] = 'border-color:' . esc_attr( $border_color );
	}
}

// Padding.
if ( ! empty( $padding['top'] ) || ! empty( $padding['right'] ) || ! empty( $padding['bottom'] ) || ! empty( $padding['left'] ) ) {
	$p_top    = ! empty( $padding['top'] ) ? $padding['top'] : 0;
	$p_right  = ! empty( $padding['right'] ) ? $padding['right'] : 0;
	$p_bottom = ! empty( $padding['bottom'] ) ? $padding['bottom'] : 0;
	$p_left   = ! empty( $padding['left'] ) ? $padding['left'] : 0;
	$button_styles[] = 'padding:' . esc_attr( $p_top ) . $padding_unit . ' ' . esc_attr( $p_right ) . $padding_unit . ' ' . esc_attr( $p_bottom ) . $padding_unit . ' ' . esc_attr( $p_left ) . $padding_unit;
}

// Box shadow.
if ( $box_shadow ) {
	$button_styles[] = 'box-shadow:' . esc_attr( $box_shadow_horizontal ) . 'px ' . esc_attr( $box_shadow_vertical ) . 'px ' . esc_attr( $box_shadow_blur ) . 'px ' . esc_attr( $box_shadow_spread ) . 'px ' . esc_attr( $box_shadow_color );
}

// Custom width.
if ( 'custom' === $button_width && $custom_width ) {
	$button_styles[] = 'width:' . esc_attr( $custom_width ) . esc_attr( $custom_width_unit );
}

$button_style_attr = ! empty( $button_styles ) ? ' style="' . esc_attr( implode( ';', $button_styles ) ) . '"' : '';

// Generate dynamic styles for hover.
$dynamic_styles = '';

if ( $block_id ) {
	if ( $text_color_hover ) {
		$dynamic_styles .= '.mgb-block-' . esc_attr( $block_id ) . ' .mgb-button:hover{color:' . esc_attr( $text_color_hover ) . '}';
	}
	if ( $background_color_hover && ! $gradient_enabled ) {
		$dynamic_styles .= '.mgb-block-' . esc_attr( $block_id ) . ' .mgb-button:hover{background-color:' . esc_attr( $background_color_hover ) . '}';
	}
	if ( $border_color_hover && $border_width ) {
		$dynamic_styles .= '.mgb-block-' . esc_attr( $block_id ) . ' .mgb-button:hover{border-color:' . esc_attr( $border_color_hover ) . '}';
	}

	// Responsive styles - Tablet.
	$tablet_styles = '';

	// Tablet alignment.
	if ( $button_align_tablet ) {
		$align_map = array(
			'left'   => 'flex-start',
			'center' => 'center',
			'right'  => 'flex-end',
		);
		$tablet_styles .= 'justify-content:' . esc_attr( $align_map[ $button_align_tablet ] ) . ';';
	}

	// Tablet font size.
	if ( $font_size_tablet ) {
		$dynamic_styles .= '@media(max-width:991px){.mgb-block-' . esc_attr( $block_id ) . ' .mgb-button{font-size:' . esc_attr( $font_size_tablet ) . esc_attr( $font_size_unit ) . '}}';
	}

	// Tablet padding.
	if ( ! empty( $padding_tablet['top'] ) || ! empty( $padding_tablet['right'] ) || ! empty( $padding_tablet['bottom'] ) || ! empty( $padding_tablet['left'] ) ) {
		$p_top_tablet    = ! empty( $padding_tablet['top'] ) ? $padding_tablet['top'] : 0;
		$p_right_tablet  = ! empty( $padding_tablet['right'] ) ? $padding_tablet['right'] : 0;
		$p_bottom_tablet = ! empty( $padding_tablet['bottom'] ) ? $padding_tablet['bottom'] : 0;
		$p_left_tablet   = ! empty( $padding_tablet['left'] ) ? $padding_tablet['left'] : 0;
		$dynamic_styles .= '@media(max-width:991px){.mgb-block-' . esc_attr( $block_id ) . ' .mgb-button{padding:' . esc_attr( $p_top_tablet ) . $padding_unit . ' ' . esc_attr( $p_right_tablet ) . $padding_unit . ' ' . esc_attr( $p_bottom_tablet ) . $padding_unit . ' ' . esc_attr( $p_left_tablet ) . $padding_unit . '}}';
	}

	if ( $tablet_styles ) {
		$dynamic_styles .= '@media(max-width:991px){.mgb-block-' . esc_attr( $block_id ) . '{' . $tablet_styles . '}}';
	}

	// Responsive styles - Mobile.
	$mobile_styles = '';

	// Mobile alignment.
	if ( $button_align_mobile ) {
		$align_map = array(
			'left'   => 'flex-start',
			'center' => 'center',
			'right'  => 'flex-end',
		);
		$mobile_styles .= 'justify-content:' . esc_attr( $align_map[ $button_align_mobile ] ) . ';';
	}

	// Mobile font size.
	if ( $font_size_mobile ) {
		$dynamic_styles .= '@media(max-width:768px){.mgb-block-' . esc_attr( $block_id ) . ' .mgb-button{font-size:' . esc_attr( $font_size_mobile ) . esc_attr( $font_size_unit ) . '}}';
	}

	// Mobile padding.
	if ( ! empty( $padding_mobile['top'] ) || ! empty( $padding_mobile['right'] ) || ! empty( $padding_mobile['bottom'] ) || ! empty( $padding_mobile['left'] ) ) {
		$p_top_mobile    = ! empty( $padding_mobile['top'] ) ? $padding_mobile['top'] : 0;
		$p_right_mobile  = ! empty( $padding_mobile['right'] ) ? $padding_mobile['right'] : 0;
		$p_bottom_mobile = ! empty( $padding_mobile['bottom'] ) ? $padding_mobile['bottom'] : 0;
		$p_left_mobile   = ! empty( $padding_mobile['left'] ) ? $padding_mobile['left'] : 0;
		$dynamic_styles .= '@media(max-width:768px){.mgb-block-' . esc_attr( $block_id ) . ' .mgb-button{padding:' . esc_attr( $p_top_mobile ) . $padding_unit . ' ' . esc_attr( $p_right_mobile ) . $padding_unit . ' ' . esc_attr( $p_bottom_mobile ) . $padding_unit . ' ' . esc_attr( $p_left_mobile ) . $padding_unit . '}}';
	}

	if ( $mobile_styles ) {
		$dynamic_styles .= '@media(max-width:768px){.mgb-block-' . esc_attr( $block_id ) . '{' . $mobile_styles . '}}';
	}
}

// Output dynamic styles.
if ( $dynamic_styles ) {
	echo '<style>' . $dynamic_styles . '</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

// Build wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $wrapper_classes ),
	)
);

// Icon SVG (would need to be loaded from icons data in production).
$icon_html = '';
if ( $icon_enabled && $icon ) {
	$icon_style = 'width:' . esc_attr( $icon_size ) . 'px;height:' . esc_attr( $icon_size ) . 'px;';
	if ( 'left' === $icon_position ) {
		$icon_style .= 'margin-right:' . esc_attr( $icon_spacing ) . 'px;';
	} else {
		$icon_style .= 'margin-left:' . esc_attr( $icon_spacing ) . 'px;';
	}
	$icon_html = '<span class="mgb-button__icon" data-icon="' . esc_attr( $icon ) . '" style="' . esc_attr( $icon_style ) . '"></span>';
}

// Determine button tag and attributes.
$button_tag   = $url ? 'a' : 'span';
$button_attrs = '';
if ( $url ) {
	$button_attrs .= ' href="' . esc_url( $url ) . '"';
	if ( '_blank' === $link_target ) {
		$button_attrs .= ' target="_blank"';
	}
	if ( $rel ) {
		$button_attrs .= ' rel="' . esc_attr( $rel ) . '"';
	}
}

// Build output.
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<<?php echo esc_html( $button_tag ); ?> class="<?php echo esc_attr( implode( ' ', $button_classes ) ); ?>"<?php echo $button_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?><?php echo $button_style_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<?php if ( $icon_enabled && $icon && 'left' === $icon_position ) : ?>
			<?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php endif; ?>
		<span class="mgb-button__text"><?php echo wp_kses_post( $text ); ?></span>
		<?php if ( $icon_enabled && $icon && 'right' === $icon_position ) : ?>
			<?php echo $icon_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		<?php endif; ?>
	</<?php echo esc_html( $button_tag ); ?>>
</div>
