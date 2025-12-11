/**
 * Magical Heading Block
 *
 * Advanced heading block with typography controls and styling options.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { registerBlockType } from '@wordpress/blocks';
import { heading as icon } from '@wordpress/icons';

import metadata from './block.json';
import Edit from './edit';
import save from './save';

import './style.scss';
import './editor.scss';

/**
 * Register the Heading block.
 */
registerBlockType( metadata.name, {
	icon: {
		src: icon,
		foreground: '#7c3aed',
	},
	edit: Edit,
	save,
} );
