/**
 * Shared Components Index
 *
 * Central export for all shared editor components.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

// Controls
export { default as ColorControl } from './color-control';
export { colorAttributes, hoverColorAttributes } from './color-control/attributes';

export { default as SpacingControl } from './spacing-control';
export { paddingAttributes, marginAttributes, spacingAttributes } from './spacing-control/attributes';

export { default as TypographyControl } from './typography-control';
export { typographyAttributes, headingTypographyAttributes, contentTypographyAttributes } from './typography-control/attributes';

export { default as ResponsiveControl, ResponsiveTabs, getResponsiveAttributeName, getResponsiveValue } from './responsive-control';

export { default as IconPicker } from './icon-picker';
export { iconCategories, getIconSvg, getIconsByCategory, searchIcons } from './icon-picker/icons-data';

export { default as ProPlaceholder, ProBadge, isProFeature, withProGating } from './pro-placeholder';
