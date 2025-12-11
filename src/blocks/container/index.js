/**
 * Container Block - Entry Point
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import metadata from './block.json';
import Edit from './edit';
import Save from './save';

import './style.scss';
import './editor.scss';

/**
 * Container block icon
 */
const icon = (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h4v4H7V7zm0 6h4v4H7v-4zm6-6h4v4h-4V7zm0 6h4v4h-4v-4z" />
	</svg>
);

/**
 * Register the Container block
 */
registerBlockType(metadata.name, {
	icon,
	edit: Edit,
	save: Save,
});
