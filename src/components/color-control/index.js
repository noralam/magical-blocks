/**
 * Color Control Component
 *
 * Color picker with preset colors and custom input.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	ColorPalette,
	ColorPicker,
	Popover,
	Button,
	__experimentalHStack as HStack,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { PRESET_COLORS } from '@common/constants';
import './style.scss';

/**
 * Color Control Component.
 *
 * @param {Object}   props           - Component props.
 * @param {string}   props.label     - Control label.
 * @param {string}   props.value     - Current color value.
 * @param {Function} props.onChange  - Change handler.
 * @param {Array}    props.colors    - Custom preset colors.
 * @param {boolean}  props.clearable - Whether color can be cleared.
 * @return {JSX.Element} Color control component.
 */
const ColorControl = ( {
	label = __( 'Color', 'magical-blocks' ),
	value = '',
	onChange,
	colors = PRESET_COLORS,
	clearable = true,
} ) => {
	const [ isOpen, setIsOpen ] = useState( false );

	const handleColorChange = ( newColor ) => {
		onChange( newColor );
	};

	const handleClear = () => {
		onChange( '' );
		setIsOpen( false );
	};

	return (
		<div className="mgb-color-control">
			<HStack className="mgb-color-control__header">
				<span className="mgb-color-control__label">{ label }</span>
				<Button
					className="mgb-color-control__indicator"
					onClick={ () => setIsOpen( ! isOpen ) }
					style={ {
						backgroundColor: value || 'transparent',
						borderColor: value ? 'transparent' : '#ddd',
					} }
					aria-label={ __( 'Select color', 'magical-blocks' ) }
				/>
			</HStack>

			{ isOpen && (
				<Popover
					className="mgb-color-control__popover"
					onClose={ () => setIsOpen( false ) }
					position="bottom center"
				>
					<div className="mgb-color-control__content">
						<ColorPalette
							colors={ colors }
							value={ value }
							onChange={ handleColorChange }
							clearable={ false }
						/>

						<div className="mgb-color-control__picker">
							<ColorPicker
								color={ value }
								onChange={ handleColorChange }
								enableAlpha
							/>
						</div>

						{ clearable && value && (
							<Button
								className="mgb-color-control__clear"
								variant="secondary"
								isSmall
								onClick={ handleClear }
							>
								{ __( 'Clear', 'magical-blocks' ) }
							</Button>
						) }
					</div>
				</Popover>
			) }
		</div>
	);
};

export default ColorControl;
