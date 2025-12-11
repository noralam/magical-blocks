/**
 * Spacing Control Attributes
 *
 * Shared spacing attribute schema for blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { DEFAULT_SPACING } from '@common/constants';

/**
 * Padding attributes (responsive).
 */
export const paddingAttributes = {
	padding: {
		type: 'object',
		default: DEFAULT_SPACING,
	},
	paddingTablet: {
		type: 'object',
		default: DEFAULT_SPACING,
	},
	paddingMobile: {
		type: 'object',
		default: DEFAULT_SPACING,
	},
	paddingUnit: {
		type: 'string',
		default: 'px',
	},
};

/**
 * Margin attributes (responsive).
 */
export const marginAttributes = {
	margin: {
		type: 'object',
		default: DEFAULT_SPACING,
	},
	marginTablet: {
		type: 'object',
		default: DEFAULT_SPACING,
	},
	marginMobile: {
		type: 'object',
		default: DEFAULT_SPACING,
	},
	marginUnit: {
		type: 'string',
		default: 'px',
	},
};

/**
 * Combined spacing attributes (padding + margin).
 */
export const spacingAttributes = {
	...paddingAttributes,
	...marginAttributes,
};

export default spacingAttributes;
