<?php
/**
 * Block attributes trait for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Trait Magical_Blocks_Block_Attributes_Trait
 *
 * Provides shared block attribute schemas.
 */
trait Magical_Blocks_Block_Attributes_Trait {

	/**
	 * Get typography attributes.
	 *
	 * @return array Typography attribute schema.
	 */
	protected function magical_blocks_get_typography_attributes() {
		return array(
			'fontFamily'      => array(
				'type'    => 'string',
				'default' => '',
			),
			'fontSize'        => array(
				'type'    => 'number',
				'default' => 16,
			),
			'fontSizeTablet'  => array(
				'type'    => 'number',
				'default' => 16,
			),
			'fontSizeMobile'  => array(
				'type'    => 'number',
				'default' => 16,
			),
			'fontSizeUnit'    => array(
				'type'    => 'string',
				'default' => 'px',
			),
			'fontWeight'      => array(
				'type'    => 'string',
				'default' => '400',
			),
			'textTransform'   => array(
				'type'    => 'string',
				'default' => 'none',
			),
			'fontStyle'       => array(
				'type'    => 'string',
				'default' => 'normal',
			),
			'textDecoration'  => array(
				'type'    => 'string',
				'default' => 'none',
			),
			'lineHeight'      => array(
				'type'    => 'number',
				'default' => 1.5,
			),
			'letterSpacing'   => array(
				'type'    => 'number',
				'default' => 0,
			),
		);
	}

	/**
	 * Get spacing attributes.
	 *
	 * @return array Spacing attribute schema.
	 */
	protected function magical_blocks_get_spacing_attributes() {
		$default_spacing = array(
			'top'    => 0,
			'right'  => 0,
			'bottom' => 0,
			'left'   => 0,
		);

		return array(
			'padding'          => array(
				'type'    => 'object',
				'default' => $default_spacing,
			),
			'paddingTablet'    => array(
				'type'    => 'object',
				'default' => $default_spacing,
			),
			'paddingMobile'    => array(
				'type'    => 'object',
				'default' => $default_spacing,
			),
			'paddingUnit'      => array(
				'type'    => 'string',
				'default' => 'px',
			),
			'margin'           => array(
				'type'    => 'object',
				'default' => $default_spacing,
			),
			'marginTablet'     => array(
				'type'    => 'object',
				'default' => $default_spacing,
			),
			'marginMobile'     => array(
				'type'    => 'object',
				'default' => $default_spacing,
			),
			'marginUnit'       => array(
				'type'    => 'string',
				'default' => 'px',
			),
		);
	}

	/**
	 * Get color attributes.
	 *
	 * @return array Color attribute schema.
	 */
	protected function magical_blocks_get_color_attributes() {
		return array(
			'textColor'            => array(
				'type'    => 'string',
				'default' => '',
			),
			'backgroundColor'      => array(
				'type'    => 'string',
				'default' => '',
			),
			'borderColor'          => array(
				'type'    => 'string',
				'default' => '',
			),
			'hoverTextColor'       => array(
				'type'    => 'string',
				'default' => '',
			),
			'hoverBackgroundColor' => array(
				'type'    => 'string',
				'default' => '',
			),
			'hoverBorderColor'     => array(
				'type'    => 'string',
				'default' => '',
			),
		);
	}

	/**
	 * Get border attributes.
	 *
	 * @return array Border attribute schema.
	 */
	protected function magical_blocks_get_border_attributes() {
		return array(
			'borderWidth'  => array(
				'type'    => 'number',
				'default' => 0,
			),
			'borderStyle'  => array(
				'type'    => 'string',
				'default' => 'solid',
			),
			'borderRadius' => array(
				'type'    => 'number',
				'default' => 0,
			),
		);
	}

	/**
	 * Get box shadow attributes.
	 *
	 * @return array Box shadow attribute schema.
	 */
	protected function magical_blocks_get_shadow_attributes() {
		return array(
			'boxShadow' => array(
				'type'    => 'object',
				'default' => array(
					'horizontal' => 0,
					'vertical'   => 0,
					'blur'       => 0,
					'spread'     => 0,
					'color'      => '',
					'inset'      => false,
				),
			),
		);
	}

	/**
	 * Get common block attributes.
	 *
	 * @return array Common attribute schema.
	 */
	protected function magical_blocks_get_common_attributes() {
		return array(
			'blockId'         => array(
				'type'    => 'string',
				'default' => '',
			),
			'className'       => array(
				'type'    => 'string',
				'default' => '',
			),
			'customCSS'       => array(
				'type'    => 'string',
				'default' => '',
			),
			'hideOnDesktop'   => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'hideOnTablet'    => array(
				'type'    => 'boolean',
				'default' => false,
			),
			'hideOnMobile'    => array(
				'type'    => 'boolean',
				'default' => false,
			),
		);
	}

	/**
	 * Merge multiple attribute schemas.
	 *
	 * @param array ...$schemas Attribute schemas to merge.
	 * @return array Merged attributes.
	 */
	protected function magical_blocks_merge_attributes( ...$schemas ) {
		$merged = array();
		foreach ( $schemas as $schema ) {
			$merged = array_merge( $merged, $schema );
		}
		return $merged;
	}
}
