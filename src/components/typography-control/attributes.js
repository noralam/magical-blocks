/**
 * Typography Control Attributes
 *
 * Shared typography attribute schema for blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

/**
 * Typography attributes (responsive).
 */
export const typographyAttributes = {
	fontFamily: {
		type: 'string',
		default: '',
	},
	fontSize: {
		type: 'number',
	},
	fontSizeTablet: {
		type: 'number',
	},
	fontSizeMobile: {
		type: 'number',
	},
	fontSizeUnit: {
		type: 'string',
		default: 'px',
	},
	fontWeight: {
		type: 'string',
		default: '',
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	lineHeight: {
		type: 'number',
	},
	lineHeightTablet: {
		type: 'number',
	},
	lineHeightMobile: {
		type: 'number',
	},
	letterSpacing: {
		type: 'number',
	},
};

/**
 * Heading typography attributes (for heading-specific blocks).
 */
export const headingTypographyAttributes = {
	...typographyAttributes,
	headingTag: {
		type: 'string',
		default: 'h2',
	},
};

/**
 * Content typography attributes (for body text).
 */
export const contentTypographyAttributes = {
	contentFontFamily: {
		type: 'string',
		default: '',
	},
	contentFontSize: {
		type: 'number',
	},
	contentFontSizeTablet: {
		type: 'number',
	},
	contentFontSizeMobile: {
		type: 'number',
	},
	contentFontSizeUnit: {
		type: 'string',
		default: 'px',
	},
	contentFontWeight: {
		type: 'string',
		default: '',
	},
	contentTextTransform: {
		type: 'string',
		default: '',
	},
	contentLineHeight: {
		type: 'number',
	},
	contentLetterSpacing: {
		type: 'number',
	},
};

export default typographyAttributes;
