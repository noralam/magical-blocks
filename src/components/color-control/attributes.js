/**
 * Color Control Attributes
 *
 * Shared color attribute schema for blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

/**
 * Base color attributes.
 */
export const colorAttributes = {
	textColor: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		type: 'string',
		default: '',
	},
	borderColor: {
		type: 'string',
		default: '',
	},
};

/**
 * Hover color attributes.
 */
export const hoverColorAttributes = {
	hoverTextColor: {
		type: 'string',
		default: '',
	},
	hoverBackgroundColor: {
		type: 'string',
		default: '',
	},
	hoverBorderColor: {
		type: 'string',
		default: '',
	},
};

/**
 * Combined color attributes (base + hover).
 */
export const fullColorAttributes = {
	...colorAttributes,
	...hoverColorAttributes,
};

export default colorAttributes;
