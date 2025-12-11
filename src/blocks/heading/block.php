<?php
/**
 * Magical Heading Block - Server-side Render
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
$block_id           = isset( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$content            = isset( $attributes['content'] ) ? $attributes['content'] : '';
$heading_tag        = isset( $attributes['headingTag'] ) ? $attributes['headingTag'] : 'h2';
$text_align         = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : '';
$text_align_tablet  = isset( $attributes['textAlignTablet'] ) ? $attributes['textAlignTablet'] : '';
$text_align_mobile  = isset( $attributes['textAlignMobile'] ) ? $attributes['textAlignMobile'] : '';

// Typography.
$font_family     = isset( $attributes['fontFamily'] ) ? $attributes['fontFamily'] : '';
$font_size       = isset( $attributes['fontSize'] ) ? $attributes['fontSize'] : '';
$font_size_tablet = isset( $attributes['fontSizeTablet'] ) ? $attributes['fontSizeTablet'] : '';
$font_size_mobile = isset( $attributes['fontSizeMobile'] ) ? $attributes['fontSizeMobile'] : '';
$font_size_unit  = isset( $attributes['fontSizeUnit'] ) ? $attributes['fontSizeUnit'] : 'px';
$font_weight     = isset( $attributes['fontWeight'] ) ? $attributes['fontWeight'] : '';
$text_transform  = isset( $attributes['textTransform'] ) ? $attributes['textTransform'] : '';
$line_height     = isset( $attributes['lineHeight'] ) ? $attributes['lineHeight'] : '';
$letter_spacing  = isset( $attributes['letterSpacing'] ) ? $attributes['letterSpacing'] : '';

// Colors.
$text_color       = isset( $attributes['textColor'] ) ? $attributes['textColor'] : '';
$text_color_hover = isset( $attributes['textColorHover'] ) ? $attributes['textColorHover'] : '';
$background_color = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : '';
$highlight_color  = isset( $attributes['highlightColor'] ) ? $attributes['highlightColor'] : '';

// Spacing.
$padding      = isset( $attributes['padding'] ) ? $attributes['padding'] : array();
$padding_unit = isset( $attributes['paddingUnit'] ) ? $attributes['paddingUnit'] : 'px';
$margin       = isset( $attributes['margin'] ) ? $attributes['margin'] : array();
$margin_unit  = isset( $attributes['marginUnit'] ) ? $attributes['marginUnit'] : 'px';

// Separator.
$separator_enabled  = isset( $attributes['separatorEnabled'] ) ? $attributes['separatorEnabled'] : false;
$separator_position = isset( $attributes['separatorPosition'] ) ? $attributes['separatorPosition'] : 'bottom';
$separator_style    = isset( $attributes['separatorStyle'] ) ? $attributes['separatorStyle'] : 'solid';
$separator_width    = isset( $attributes['separatorWidth'] ) ? $attributes['separatorWidth'] : 50;
$separator_width_unit = isset( $attributes['separatorWidthUnit'] ) ? $attributes['separatorWidthUnit'] : '%';
$separator_height   = isset( $attributes['separatorHeight'] ) ? $attributes['separatorHeight'] : 2;
$separator_color    = isset( $attributes['separatorColor'] ) ? $attributes['separatorColor'] : '';
$separator_spacing  = isset( $attributes['separatorSpacing'] ) ? $attributes['separatorSpacing'] : 10;

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

// Build heading inline styles.
$heading_styles = array();

if ( $font_family ) {
	$heading_styles[] = 'font-family:' . esc_attr( $font_family );
}
if ( $font_size ) {
	$heading_styles[] = 'font-size:' . esc_attr( $font_size ) . esc_attr( $font_size_unit );
}
if ( $font_weight ) {
	$heading_styles[] = 'font-weight:' . esc_attr( $font_weight );
}
if ( $text_transform ) {
	$heading_styles[] = 'text-transform:' . esc_attr( $text_transform );
}
if ( $line_height ) {
	$heading_styles[] = 'line-height:' . esc_attr( $line_height );
}
if ( $letter_spacing ) {
	$heading_styles[] = 'letter-spacing:' . esc_attr( $letter_spacing ) . 'px';
}
if ( $text_color ) {
	$heading_styles[] = 'color:' . esc_attr( $text_color );
}
if ( $background_color ) {
	$heading_styles[] = 'background-color:' . esc_attr( $background_color );
}

// Padding.
if ( ! empty( $padding['top'] ) ) {
	$heading_styles[] = 'padding-top:' . esc_attr( $padding['top'] ) . esc_attr( $padding_unit );
}
if ( ! empty( $padding['right'] ) ) {
	$heading_styles[] = 'padding-right:' . esc_attr( $padding['right'] ) . esc_attr( $padding_unit );
}
if ( ! empty( $padding['bottom'] ) ) {
	$heading_styles[] = 'padding-bottom:' . esc_attr( $padding['bottom'] ) . esc_attr( $padding_unit );
}
if ( ! empty( $padding['left'] ) ) {
	$heading_styles[] = 'padding-left:' . esc_attr( $padding['left'] ) . esc_attr( $padding_unit );
}

// Margin.
if ( ! empty( $margin['top'] ) ) {
	$heading_styles[] = 'margin-top:' . esc_attr( $margin['top'] ) . esc_attr( $margin_unit );
}
if ( ! empty( $margin['right'] ) ) {
	$heading_styles[] = 'margin-right:' . esc_attr( $margin['right'] ) . esc_attr( $margin_unit );
}
if ( ! empty( $margin['bottom'] ) ) {
	$heading_styles[] = 'margin-bottom:' . esc_attr( $margin['bottom'] ) . esc_attr( $margin_unit );
}
if ( ! empty( $margin['left'] ) ) {
	$heading_styles[] = 'margin-left:' . esc_attr( $margin['left'] ) . esc_attr( $margin_unit );
}

$heading_style_attr = ! empty( $heading_styles ) ? ' style="' . esc_attr( implode( ';', $heading_styles ) ) . '"' : '';

// Build separator inline styles.
$separator_styles = array();
if ( $separator_enabled ) {
	$separator_styles[] = 'width:' . esc_attr( $separator_width ) . esc_attr( $separator_width_unit );
	$separator_styles[] = 'height:' . esc_attr( $separator_height ) . 'px';
	if ( $separator_color ) {
		$separator_styles[] = 'background-color:' . esc_attr( $separator_color );
	}
	if ( 'solid' !== $separator_style ) {
		$separator_styles[] = 'border-style:' . esc_attr( $separator_style );
	}
}
$separator_style_attr = ! empty( $separator_styles ) ? ' style="' . esc_attr( implode( ';', $separator_styles ) ) . '"' : '';

// Build wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $classes ),
	)
);

// Generate dynamic styles for hover and responsive.
$dynamic_styles = '';

// Hover color.
if ( $text_color_hover && $block_id ) {
	$dynamic_styles .= '.mgb-block-' . esc_attr( $block_id ) . ':hover .mgb-heading__text{color:' . esc_attr( $text_color_hover ) . '}';
}

// Responsive styles.
if ( $font_size_tablet && $block_id ) {
	$dynamic_styles .= '@media(max-width:991px){.mgb-block-' . esc_attr( $block_id ) . ' .mgb-heading__text{font-size:' . esc_attr( $font_size_tablet ) . esc_attr( $font_size_unit ) . '}}';
}
if ( $font_size_mobile && $block_id ) {
	$dynamic_styles .= '@media(max-width:767px){.mgb-block-' . esc_attr( $block_id ) . ' .mgb-heading__text{font-size:' . esc_attr( $font_size_mobile ) . esc_attr( $font_size_unit ) . '}}';
}
if ( $text_align_tablet && $block_id ) {
	$dynamic_styles .= '@media(max-width:991px){.mgb-block-' . esc_attr( $block_id ) . '{text-align:' . esc_attr( $text_align_tablet ) . '}}';
}
if ( $text_align_mobile && $block_id ) {
	$dynamic_styles .= '@media(max-width:767px){.mgb-block-' . esc_attr( $block_id ) . '{text-align:' . esc_attr( $text_align_mobile ) . '}}';
}

// Output dynamic styles.
if ( $dynamic_styles ) {
	echo '<style>' . $dynamic_styles . '</style>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

// Build output.
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $separator_enabled && 'top' === $separator_position ) : ?>
		<span class="mgb-heading__separator"<?php echo $separator_style_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>></span>
	<?php endif; ?>
	
	<<?php echo esc_html( $heading_tag ); ?> class="mgb-heading__text"<?php echo $heading_style_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
		<?php echo wp_kses_post( $content ); ?>
	</<?php echo esc_html( $heading_tag ); ?>>
	
	<?php if ( $separator_enabled && 'bottom' === $separator_position ) : ?>
		<span class="mgb-heading__separator"<?php echo $separator_style_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>></span>
	<?php endif; ?>
</div>
