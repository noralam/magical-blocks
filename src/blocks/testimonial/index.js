/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Styles
 */
import './style.scss';

/**
 * Icon for the block
 */
const icon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
		<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
	</svg>
);

/**
 * Register the block
 */
registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save,
} );
