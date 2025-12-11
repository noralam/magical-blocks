<?php
/**
 * Responsive CSS generation trait for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Trait Magical_Blocks_Responsive_Trait
 *
 * Provides responsive CSS generation utilities.
 */
trait Magical_Blocks_Responsive_Trait {

	/**
	 * Breakpoints for responsive design.
	 *
	 * @var array
	 */
	protected $breakpoints = array(
		'tablet' => 1024,
		'mobile' => 767,
	);

	/**
	 * Generate responsive CSS for a property.
	 *
	 * @param string $selector    CSS selector.
	 * @param string $property    CSS property.
	 * @param mixed  $desktop     Desktop value.
	 * @param mixed  $tablet      Tablet value.
	 * @param mixed  $mobile      Mobile value.
	 * @param string $unit        CSS unit (optional).
	 * @return string Generated CSS.
	 */
	protected function magical_blocks_generate_responsive_css( $selector, $property, $desktop, $tablet = null, $mobile = null, $unit = '' ) {
		$css = '';

		// Desktop (default).
		if ( '' !== $desktop && null !== $desktop ) {
			$css .= sprintf(
				'%s { %s: %s%s; }',
				$selector,
				$property,
				$desktop,
				$unit
			);
		}

		// Tablet.
		if ( null !== $tablet && '' !== $tablet && $tablet !== $desktop ) {
			$css .= sprintf(
				'@media (max-width: %dpx) { %s { %s: %s%s; } }',
				$this->breakpoints['tablet'],
				$selector,
				$property,
				$tablet,
				$unit
			);
		}

		// Mobile.
		if ( null !== $mobile && '' !== $mobile && $mobile !== $tablet ) {
			$css .= sprintf(
				'@media (max-width: %dpx) { %s { %s: %s%s; } }',
				$this->breakpoints['mobile'],
				$selector,
				$property,
				$mobile,
				$unit
			);
		}

		return $css;
	}

	/**
	 * Generate responsive spacing CSS (padding/margin).
	 *
	 * @param string $selector CSS selector.
	 * @param string $property 'padding' or 'margin'.
	 * @param array  $desktop  Desktop spacing values.
	 * @param array  $tablet   Tablet spacing values.
	 * @param array  $mobile   Mobile spacing values.
	 * @param string $unit     CSS unit.
	 * @return string Generated CSS.
	 */
	protected function magical_blocks_generate_spacing_css( $selector, $property, $desktop, $tablet = null, $mobile = null, $unit = 'px' ) {
		$css = '';

		// Desktop.
		if ( ! empty( $desktop ) && is_array( $desktop ) ) {
			$value = $this->magical_blocks_format_spacing_value( $desktop, $unit );
			if ( $value ) {
				$css .= sprintf( '%s { %s: %s; }', $selector, $property, $value );
			}
		}

		// Tablet.
		if ( ! empty( $tablet ) && is_array( $tablet ) ) {
			$value = $this->magical_blocks_format_spacing_value( $tablet, $unit );
			if ( $value ) {
				$css .= sprintf(
					'@media (max-width: %dpx) { %s { %s: %s; } }',
					$this->breakpoints['tablet'],
					$selector,
					$property,
					$value
				);
			}
		}

		// Mobile.
		if ( ! empty( $mobile ) && is_array( $mobile ) ) {
			$value = $this->magical_blocks_format_spacing_value( $mobile, $unit );
			if ( $value ) {
				$css .= sprintf(
					'@media (max-width: %dpx) { %s { %s: %s; } }',
					$this->breakpoints['mobile'],
					$selector,
					$property,
					$value
				);
			}
		}

		return $css;
	}

	/**
	 * Format spacing values (top, right, bottom, left) into CSS shorthand.
	 *
	 * @param array  $values Spacing values array.
	 * @param string $unit   CSS unit.
	 * @return string Formatted spacing value.
	 */
	protected function magical_blocks_format_spacing_value( $values, $unit = 'px' ) {
		if ( ! is_array( $values ) ) {
			return '';
		}

		$top    = isset( $values['top'] ) ? $values['top'] : 0;
		$right  = isset( $values['right'] ) ? $values['right'] : 0;
		$bottom = isset( $values['bottom'] ) ? $values['bottom'] : 0;
		$left   = isset( $values['left'] ) ? $values['left'] : 0;

		// Check if all values are 0.
		if ( 0 === $top && 0 === $right && 0 === $bottom && 0 === $left ) {
			return '';
		}

		return sprintf(
			'%s%s %s%s %s%s %s%s',
			$top,
			$unit,
			$right,
			$unit,
			$bottom,
			$unit,
			$left,
			$unit
		);
	}

	/**
	 * Generate typography CSS.
	 *
	 * @param string $selector   CSS selector.
	 * @param array  $typography Typography attributes.
	 * @return string Generated CSS.
	 */
	protected function magical_blocks_generate_typography_css( $selector, $typography ) {
		$css = '';

		$styles = array();

		if ( ! empty( $typography['fontFamily'] ) ) {
			$styles[] = sprintf( 'font-family: %s', esc_attr( $typography['fontFamily'] ) );
		}

		if ( ! empty( $typography['fontWeight'] ) ) {
			$styles[] = sprintf( 'font-weight: %s', esc_attr( $typography['fontWeight'] ) );
		}

		if ( ! empty( $typography['fontStyle'] ) && 'normal' !== $typography['fontStyle'] ) {
			$styles[] = sprintf( 'font-style: %s', esc_attr( $typography['fontStyle'] ) );
		}

		if ( ! empty( $typography['textTransform'] ) && 'none' !== $typography['textTransform'] ) {
			$styles[] = sprintf( 'text-transform: %s', esc_attr( $typography['textTransform'] ) );
		}

		if ( ! empty( $typography['textDecoration'] ) && 'none' !== $typography['textDecoration'] ) {
			$styles[] = sprintf( 'text-decoration: %s', esc_attr( $typography['textDecoration'] ) );
		}

		if ( ! empty( $typography['lineHeight'] ) ) {
			$styles[] = sprintf( 'line-height: %s', floatval( $typography['lineHeight'] ) );
		}

		if ( ! empty( $typography['letterSpacing'] ) ) {
			$styles[] = sprintf( 'letter-spacing: %spx', floatval( $typography['letterSpacing'] ) );
		}

		if ( ! empty( $styles ) ) {
			$css .= sprintf( '%s { %s; }', $selector, implode( '; ', $styles ) );
		}

		// Responsive font size.
		$unit = ! empty( $typography['fontSizeUnit'] ) ? $typography['fontSizeUnit'] : 'px';
		$css .= $this->magical_blocks_generate_responsive_css(
			$selector,
			'font-size',
			! empty( $typography['fontSize'] ) ? $typography['fontSize'] : null,
			! empty( $typography['fontSizeTablet'] ) ? $typography['fontSizeTablet'] : null,
			! empty( $typography['fontSizeMobile'] ) ? $typography['fontSizeMobile'] : null,
			$unit
		);

		return $css;
	}

	/**
	 * Generate box shadow CSS.
	 *
	 * @param string $selector CSS selector.
	 * @param array  $shadow   Box shadow attributes.
	 * @return string Generated CSS.
	 */
	protected function magical_blocks_generate_shadow_css( $selector, $shadow ) {
		if ( empty( $shadow ) || ! is_array( $shadow ) ) {
			return '';
		}

		$h      = isset( $shadow['horizontal'] ) ? intval( $shadow['horizontal'] ) : 0;
		$v      = isset( $shadow['vertical'] ) ? intval( $shadow['vertical'] ) : 0;
		$blur   = isset( $shadow['blur'] ) ? intval( $shadow['blur'] ) : 0;
		$spread = isset( $shadow['spread'] ) ? intval( $shadow['spread'] ) : 0;
		$color  = isset( $shadow['color'] ) ? $shadow['color'] : '';
		$inset  = ! empty( $shadow['inset'] ) ? 'inset ' : '';

		if ( empty( $color ) || ( 0 === $h && 0 === $v && 0 === $blur && 0 === $spread ) ) {
			return '';
		}

		return sprintf(
			'%s { box-shadow: %s%dpx %dpx %dpx %dpx %s; }',
			$selector,
			$inset,
			$h,
			$v,
			$blur,
			$spread,
			esc_attr( $color )
		);
	}

	/**
	 * Generate CSS variables for responsive values.
	 *
	 * @param string $block_id Block ID for scoping.
	 * @param string $name     CSS variable name.
	 * @param mixed  $desktop  Desktop value.
	 * @param mixed  $tablet   Tablet value.
	 * @param mixed  $mobile   Mobile value.
	 * @param string $unit     CSS unit.
	 * @return string Generated CSS.
	 */
	protected function magical_blocks_generate_css_variables( $block_id, $name, $desktop, $tablet = null, $mobile = null, $unit = '' ) {
		$css      = '';
		$selector = '.mgb-' . esc_attr( $block_id );

		// Desktop.
		if ( '' !== $desktop && null !== $desktop ) {
			$css .= sprintf(
				'%s { --%s: %s%s; }',
				$selector,
				esc_attr( $name ),
				$desktop,
				$unit
			);
		}

		// Tablet.
		if ( null !== $tablet && '' !== $tablet ) {
			$css .= sprintf(
				'@media (max-width: %dpx) { %s { --%s: %s%s; } }',
				$this->breakpoints['tablet'],
				$selector,
				esc_attr( $name ),
				$tablet,
				$unit
			);
		}

		// Mobile.
		if ( null !== $mobile && '' !== $mobile ) {
			$css .= sprintf(
				'@media (max-width: %dpx) { %s { --%s: %s%s; } }',
				$this->breakpoints['mobile'],
				$selector,
				esc_attr( $name ),
				$mobile,
				$unit
			);
		}

		return $css;
	}
}
