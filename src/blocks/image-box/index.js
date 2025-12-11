/**
 * Image Box Block
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { image as imageIcon } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import metadata from './block.json';

import './editor.scss';
import './style.scss';

registerBlockType(metadata.name, {
	...metadata,
	icon: imageIcon,
	edit,
	save,
});
