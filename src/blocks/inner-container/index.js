/**
 * Inner Container Block
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

// Block icon
const icon = (
	<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
		<rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
	</svg>
);

registerBlockType(metadata.name, {
	icon,
	edit: Edit,
	save: Save,
});
