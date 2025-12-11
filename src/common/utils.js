/**
 * JavaScript Utilities for Magical Blocks
 *
 * Common helper functions used across all blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

/**
 * Generate a unique block ID.
 *
 * @param {string} prefix - Prefix for the ID (default: 'mgb').
 * @return {string} Unique block ID.
 */
export const generateBlockId = ( prefix = 'mgb' ) => {
	const random = Math.random().toString( 36 ).substring( 2, 10 );
	return `${ prefix }-${ random }`;
};

/**
 * Combine class names, filtering out falsy values.
 *
 * @param {...(string|Object|Array)} classes - Class names to combine.
 * @return {string} Combined class names.
 */
export const classNames = ( ...classes ) => {
	return classes
		.flat()
		.filter( ( cls ) => {
			if ( typeof cls === 'string' ) {
				return cls.trim() !== '';
			}
			if ( typeof cls === 'object' && cls !== null ) {
				return Object.entries( cls )
					.filter( ( [ , value ] ) => value )
					.map( ( [ key ] ) => key );
			}
			return false;
		} )
		.flat()
		.join( ' ' );
};

/**
 * Convert spacing object to CSS value.
 *
 * @param {Object} spacing - Spacing object with top, right, bottom, left.
 * @param {string} unit    - CSS unit (default: 'px').
 * @return {string} CSS value.
 */
export const spacingToCSS = ( spacing, unit = 'px' ) => {
	if ( ! spacing || typeof spacing !== 'object' ) {
		return '';
	}

	const { top = 0, right = 0, bottom = 0, left = 0 } = spacing;

	if ( top === 0 && right === 0 && bottom === 0 && left === 0 ) {
		return '';
	}

	return `${ top }${ unit } ${ right }${ unit } ${ bottom }${ unit } ${ left }${ unit }`;
};

/**
 * Convert box shadow object to CSS value.
 *
 * @param {Object} shadow - Shadow object.
 * @return {string} CSS value.
 */
export const shadowToCSS = ( shadow ) => {
	if ( ! shadow || typeof shadow !== 'object' ) {
		return '';
	}

	const {
		horizontal = 0,
		vertical = 0,
		blur = 0,
		spread = 0,
		color = '',
		inset = false,
	} = shadow;

	if ( ! color || ( horizontal === 0 && vertical === 0 && blur === 0 && spread === 0 ) ) {
		return '';
	}

	const insetStr = inset ? 'inset ' : '';
	return `${ insetStr }${ horizontal }px ${ vertical }px ${ blur }px ${ spread }px ${ color }`;
};

/**
 * Get responsive value based on device.
 *
 * @param {Object} values  - Object with desktop, tablet, mobile values.
 * @param {string} device  - Current device (desktop, tablet, mobile).
 * @param {*}      fallback - Fallback value.
 * @return {*} Value for the device.
 */
export const getResponsiveValue = ( values, device = 'desktop', fallback = '' ) => {
	if ( ! values || typeof values !== 'object' ) {
		return fallback;
	}

	// Try to get value for the specific device, fall back to desktop, then fallback.
	if ( device === 'mobile' ) {
		return values.mobile ?? values.tablet ?? values.desktop ?? fallback;
	}

	if ( device === 'tablet' ) {
		return values.tablet ?? values.desktop ?? fallback;
	}

	return values.desktop ?? fallback;
};

/**
 * Check if a value is empty (null, undefined, empty string, or empty object/array).
 *
 * @param {*} value - Value to check.
 * @return {boolean} True if empty.
 */
export const isEmpty = ( value ) => {
	if ( value === null || value === undefined ) {
		return true;
	}

	if ( typeof value === 'string' ) {
		return value.trim() === '';
	}

	if ( Array.isArray( value ) ) {
		return value.length === 0;
	}

	if ( typeof value === 'object' ) {
		return Object.keys( value ).length === 0;
	}

	return false;
};

/**
 * Deep merge objects.
 *
 * @param {Object} target - Target object.
 * @param {Object} source - Source object.
 * @return {Object} Merged object.
 */
export const deepMerge = ( target, source ) => {
	const output = { ...target };

	if ( isObject( target ) && isObject( source ) ) {
		Object.keys( source ).forEach( ( key ) => {
			if ( isObject( source[ key ] ) ) {
				if ( ! ( key in target ) ) {
					output[ key ] = source[ key ];
				} else {
					output[ key ] = deepMerge( target[ key ], source[ key ] );
				}
			} else {
				output[ key ] = source[ key ];
			}
		} );
	}

	return output;
};

/**
 * Check if value is a plain object.
 *
 * @param {*} item - Value to check.
 * @return {boolean} True if plain object.
 */
const isObject = ( item ) => {
	return item && typeof item === 'object' && ! Array.isArray( item );
};

/**
 * Debounce function execution.
 *
 * @param {Function} func  - Function to debounce.
 * @param {number}   wait  - Wait time in milliseconds.
 * @return {Function} Debounced function.
 */
export const debounce = ( func, wait = 300 ) => {
	let timeout;

	return ( ...args ) => {
		clearTimeout( timeout );
		timeout = setTimeout( () => func( ...args ), wait );
	};
};

/**
 * Get CSS variable value.
 *
 * @param {string} name    - Variable name (without --).
 * @param {string} fallback - Fallback value.
 * @return {string} CSS variable value.
 */
export const getCSSVariable = ( name, fallback = '' ) => {
	if ( typeof window === 'undefined' ) {
		return fallback;
	}

	const value = getComputedStyle( document.documentElement )
		.getPropertyValue( `--${ name }` )
		.trim();

	return value || fallback;
};

/**
 * Convert hex color to rgba.
 *
 * @param {string} hex   - Hex color value.
 * @param {number} alpha - Alpha value (0-1).
 * @return {string} RGBA color value.
 */
export const hexToRgba = ( hex, alpha = 1 ) => {
	if ( ! hex ) {
		return '';
	}

	// Remove # if present.
	hex = hex.replace( '#', '' );

	// Handle shorthand hex.
	if ( hex.length === 3 ) {
		hex = hex
			.split( '' )
			.map( ( char ) => char + char )
			.join( '' );
	}

	const r = parseInt( hex.substring( 0, 2 ), 16 );
	const g = parseInt( hex.substring( 2, 4 ), 16 );
	const b = parseInt( hex.substring( 4, 6 ), 16 );

	return `rgba(${ r }, ${ g }, ${ b }, ${ alpha })`;
};

/**
 * Sanitize HTML string (basic sanitization for display).
 *
 * @param {string} html - HTML string to sanitize.
 * @return {string} Sanitized HTML.
 */
export const sanitizeHTML = ( html ) => {
	const div = document.createElement( 'div' );
	div.textContent = html;
	return div.innerHTML;
};

export default {
	generateBlockId,
	classNames,
	spacingToCSS,
	shadowToCSS,
	getResponsiveValue,
	isEmpty,
	deepMerge,
	debounce,
	getCSSVariable,
	hexToRgba,
	sanitizeHTML,
};
