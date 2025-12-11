/**
 * Progress Bar Block
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import edit from './edit';
import save from './save';
import metadata from './block.json';

import './editor.scss';
import './style.scss';

// Custom progress bar icon
const progressIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
		<path d="M4 12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v0z" fill="none" stroke="currentColor" strokeWidth="1.5" />
		<path d="M6 10h8a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z" fill="currentColor" />
	</svg>
);

registerBlockType(metadata.name, {
	...metadata,
	icon: progressIcon,
	edit,
	save,
});
