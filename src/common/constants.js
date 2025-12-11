/**
 * Constants for Magical Blocks
 *
 * Shared constants used across all blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

/**
 * Breakpoints for responsive design.
 */
export const BREAKPOINTS = {
	mobile: 767,
	tablet: 1024,
	desktop: 1025,
};

/**
 * Device types.
 */
export const DEVICES = {
	DESKTOP: 'desktop',
	TABLET: 'tablet',
	MOBILE: 'mobile',
};

/**
 * Default spacing values.
 */
export const DEFAULT_SPACING = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};

/**
 * Default box shadow values.
 */
export const DEFAULT_BOX_SHADOW = {
	horizontal: 0,
	vertical: 0,
	blur: 0,
	spread: 0,
	color: '',
	inset: false,
};

/**
 * Font weight options.
 */
export const FONT_WEIGHTS = [
	{ label: '100 - Thin', value: '100' },
	{ label: '200 - Extra Light', value: '200' },
	{ label: '300 - Light', value: '300' },
	{ label: '400 - Normal', value: '400' },
	{ label: '500 - Medium', value: '500' },
	{ label: '600 - Semi Bold', value: '600' },
	{ label: '700 - Bold', value: '700' },
	{ label: '800 - Extra Bold', value: '800' },
	{ label: '900 - Black', value: '900' },
];

/**
 * Text transform options.
 */
export const TEXT_TRANSFORMS = [
	{ label: 'None', value: 'none' },
	{ label: 'Uppercase', value: 'uppercase' },
	{ label: 'Lowercase', value: 'lowercase' },
	{ label: 'Capitalize', value: 'capitalize' },
];

/**
 * Font style options.
 */
export const FONT_STYLES = [
	{ label: 'Normal', value: 'normal' },
	{ label: 'Italic', value: 'italic' },
	{ label: 'Oblique', value: 'oblique' },
];

/**
 * Text decoration options.
 */
export const TEXT_DECORATIONS = [
	{ label: 'None', value: 'none' },
	{ label: 'Underline', value: 'underline' },
	{ label: 'Overline', value: 'overline' },
	{ label: 'Line Through', value: 'line-through' },
];

/**
 * Text alignment options.
 */
export const TEXT_ALIGNMENTS = [
	{ label: 'Left', value: 'left' },
	{ label: 'Center', value: 'center' },
	{ label: 'Right', value: 'right' },
	{ label: 'Justify', value: 'justify' },
];

/**
 * Border style options.
 */
export const BORDER_STYLES = [
	{ label: 'None', value: 'none' },
	{ label: 'Solid', value: 'solid' },
	{ label: 'Dashed', value: 'dashed' },
	{ label: 'Dotted', value: 'dotted' },
	{ label: 'Double', value: 'double' },
	{ label: 'Groove', value: 'groove' },
	{ label: 'Ridge', value: 'ridge' },
];

/**
 * Size unit options.
 */
export const SIZE_UNITS = [
	{ label: 'px', value: 'px' },
	{ label: '%', value: '%' },
	{ label: 'em', value: 'em' },
	{ label: 'rem', value: 'rem' },
	{ label: 'vw', value: 'vw' },
	{ label: 'vh', value: 'vh' },
];

/**
 * Heading levels.
 */
export const HEADING_LEVELS = [
	{ label: 'H1', value: 1 },
	{ label: 'H2', value: 2 },
	{ label: 'H3', value: 3 },
	{ label: 'H4', value: 4 },
	{ label: 'H5', value: 5 },
	{ label: 'H6', value: 6 },
];

/**
 * Link targets.
 */
export const LINK_TARGETS = [
	{ label: 'Same Window', value: '_self' },
	{ label: 'New Window', value: '_blank' },
];

/**
 * Default preset colors for color pickers.
 */
export const PRESET_COLORS = [
	{ name: 'Primary', color: '#5c6bc0' },
	{ name: 'Secondary', color: '#26a69a' },
	{ name: 'Dark', color: '#333333' },
	{ name: 'Light', color: '#f5f5f5' },
	{ name: 'White', color: '#ffffff' },
	{ name: 'Black', color: '#000000' },
	{ name: 'Success', color: '#4caf50' },
	{ name: 'Warning', color: '#ff9800' },
	{ name: 'Error', color: '#f44336' },
	{ name: 'Info', color: '#2196f3' },
];

/**
 * CSS variable names.
 */
export const CSS_VARS = {
	primary: '--mgb-primary',
	secondary: '--mgb-secondary',
	text: '--mgb-text',
	textLight: '--mgb-text-light',
	background: '--mgb-background',
	border: '--mgb-border',
	spacingSm: '--mgb-spacing-sm',
	spacingMd: '--mgb-spacing-md',
	spacingLg: '--mgb-spacing-lg',
	radiusSm: '--mgb-radius-sm',
	radiusMd: '--mgb-radius-md',
	radiusLg: '--mgb-radius-lg',
};

/**
 * Block categories.
 */
export const BLOCK_CATEGORIES = {
	CONTENT: 'magical-blocks-content',
	LAYOUT: 'magical-blocks-layout',
	INTERACTIVE: 'magical-blocks-interactive',
	MEDIA: 'magical-blocks-media',
};

/**
 * Animation options (future feature).
 */
export const ANIMATIONS = [
	{ label: 'None', value: 'none' },
	{ label: 'Fade In', value: 'fadeIn' },
	{ label: 'Fade In Up', value: 'fadeInUp' },
	{ label: 'Fade In Down', value: 'fadeInDown' },
	{ label: 'Fade In Left', value: 'fadeInLeft' },
	{ label: 'Fade In Right', value: 'fadeInRight' },
	{ label: 'Zoom In', value: 'zoomIn' },
	{ label: 'Bounce In', value: 'bounceIn' },
	{ label: 'Slide In Up', value: 'slideInUp' },
	{ label: 'Slide In Down', value: 'slideInDown' },
];

export default {
	BREAKPOINTS,
	DEVICES,
	DEFAULT_SPACING,
	DEFAULT_BOX_SHADOW,
	FONT_WEIGHTS,
	TEXT_TRANSFORMS,
	FONT_STYLES,
	TEXT_DECORATIONS,
	TEXT_ALIGNMENTS,
	BORDER_STYLES,
	SIZE_UNITS,
	HEADING_LEVELS,
	LINK_TARGETS,
	PRESET_COLORS,
	CSS_VARS,
	BLOCK_CATEGORIES,
	ANIMATIONS,
};
