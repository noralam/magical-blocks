/**
 * Pro Badge for Block Inserter
 *
 * Adds a "Pro" badge to Pro blocks in the block inserter.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { createElement, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Check if a block is a Pro block.
 *
 * @param {string} blockName The full block name (e.g., 'magical-blocks/advanced-slider').
 * @return {boolean} Whether the block is a Pro block.
 */
const isProBlock = ( blockName ) => {
	const proBlocks = window.magicalBlocksData?.proBlocks || [];
	const shortName = blockName.replace( 'magical-blocks/', '' );
	return proBlocks.includes( shortName );
};

/**
 * Check if Pro is active.
 *
 * @return {boolean} Whether Pro license is active.
 */
const hasProLicense = () => {
	return window.magicalBlocksData?.hasPro === true;
};

/**
 * Filter block settings to add Pro badge to description.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 * @return {Object} Modified block settings.
 */
const addProBadgeToBlockSettings = ( settings, name ) => {
	// Only modify Magical Blocks Pro blocks
	if ( ! name.startsWith( 'magical-blocks/' ) || ! isProBlock( name ) ) {
		return settings;
	}

	// Don't add badge if Pro is active
	if ( hasProLicense() ) {
		return settings;
	}

	return {
		...settings,
		title: settings.title,
		// Add Pro indicator to description
		description: settings.description
			? `${ settings.description } (Pro)`
			: __( 'Pro Feature', 'magical-blocks' ),
		// Add keywords for searchability
		keywords: [
			...( settings.keywords || [] ),
			'pro',
			'premium',
		],
	};
};

/**
 * Add Pro badge icon to block in inserter.
 *
 * This filter modifies the block icon to show a Pro indicator.
 */
const addProBadgeToIcon = createHigherOrderComponent( ( BlockIcon ) => {
	return ( props ) => {
		const { block } = props;

		// Check if this is a Pro block
		if ( ! block?.name?.startsWith( 'magical-blocks/' ) || ! isProBlock( block.name ) ) {
			return createElement( BlockIcon, props );
		}

		// Don't show badge if Pro is active
		if ( hasProLicense() ) {
			return createElement( BlockIcon, props );
		}

		// Wrap icon with Pro badge
		return createElement(
			'div',
			{ className: 'mgb-pro-block-icon-wrapper' },
			createElement( BlockIcon, props ),
			createElement(
				'span',
				{ className: 'mgb-pro-block-icon-badge' },
				'PRO'
			)
		);
	};
}, 'addProBadgeToIcon' );

/**
 * Initialize Pro badge filters.
 */
const initProBadge = () => {
	// Add Pro badge to block settings
	addFilter(
		'blocks.registerBlockType',
		'magical-blocks/pro-badge-settings',
		addProBadgeToBlockSettings
	);

	// Note: Icon modification requires additional hooks that may vary by WP version.
	// The CSS-based approach in pro-badge.scss provides consistent styling.
};

// Initialize when DOM is ready
if ( typeof document !== 'undefined' ) {
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initProBadge );
	} else {
		initProBadge();
	}
}

export { isProBlock, hasProLicense, initProBadge };
