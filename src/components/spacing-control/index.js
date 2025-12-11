/**
 * Spacing Control Component
 *
 * Padding/margin control with linked/unlinked values and responsive support.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	__experimentalBoxControl as BoxControl,
	SelectControl,
	ButtonGroup,
	Button,
	Tooltip,
} from '@wordpress/components';
import { desktop, tablet, mobile } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { SIZE_UNITS, DEFAULT_SPACING } from '@common/constants';
import './style.scss';

/**
 * Device icons mapping.
 */
const deviceIcons = {
	desktop,
	tablet,
	mobile,
};

/**
 * Device labels mapping.
 */
const deviceLabels = {
	desktop: __( 'Desktop', 'magical-blocks' ),
	tablet: __( 'Tablet', 'magical-blocks' ),
	mobile: __( 'Mobile', 'magical-blocks' ),
};

/**
 * Spacing Control Component.
 *
 * @param {Object}   props              - Component props.
 * @param {string}   props.label        - Control label.
 * @param {Object}   props.value        - Current spacing values (can be flat or responsive object).
 * @param {Function} props.onChange     - Change handler.
 * @param {string}   props.unit         - CSS unit.
 * @param {Function} props.onUnitChange - Unit change handler.
 * @param {Array}    props.units        - Available units.
 * @param {boolean}  props.responsive   - Enable responsive controls.
 * @return {JSX.Element} Spacing control component.
 */
const SpacingControl = ( {
	label = __( 'Spacing', 'magical-blocks' ),
	value = DEFAULT_SPACING,
	onChange,
	unit = 'px',
	onUnitChange,
	units = SIZE_UNITS,
	responsive = true,
} ) => {
	const [ currentDevice, setCurrentDevice ] = useState( 'desktop' );

	// Check if value is responsive format (has desktop/tablet/mobile keys)
	const isResponsiveValue = value && ( value.desktop || value.tablet || value.mobile );

	// Get value for current device
	const getDeviceValue = ( device ) => {
		if ( isResponsiveValue ) {
			return value[ device ] || value.desktop || DEFAULT_SPACING;
		}
		return value || DEFAULT_SPACING;
	};

	const currentValue = getDeviceValue( currentDevice );

	// Ensure value has all required properties.
	const normalizedValue = {
		top: currentValue?.top ?? 0,
		right: currentValue?.right ?? 0,
		bottom: currentValue?.bottom ?? 0,
		left: currentValue?.left ?? 0,
	};

	// Convert to BoxControl format (with units).
	const boxControlValue = {
		top: `${ normalizedValue.top }${ unit }`,
		right: `${ normalizedValue.right }${ unit }`,
		bottom: `${ normalizedValue.bottom }${ unit }`,
		left: `${ normalizedValue.left }${ unit }`,
	};

	const handleChange = ( newValue ) => {
		// Extract numeric values from BoxControl.
		const parsed = {
			top: String( parseInt( newValue?.top, 10 ) || 0 ),
			right: String( parseInt( newValue?.right, 10 ) || 0 ),
			bottom: String( parseInt( newValue?.bottom, 10 ) || 0 ),
			left: String( parseInt( newValue?.left, 10 ) || 0 ),
		};

		if ( responsive && isResponsiveValue ) {
			// Update only the current device value
			onChange( {
				...value,
				[ currentDevice ]: parsed,
			} );
		} else if ( responsive ) {
			// Convert to responsive format
			onChange( {
				desktop: parsed,
				tablet: parsed,
				mobile: parsed,
			} );
		} else {
			onChange( parsed );
		}
	};

	return (
		<div className="mgb-spacing-control">
			{ responsive && (
				<div className="mgb-spacing-control__header">
					<span className="mgb-spacing-control__label">{ label }</span>
					<ButtonGroup className="mgb-spacing-control__devices">
						{ Object.keys( deviceIcons ).map( ( deviceKey ) => (
							<Tooltip key={ deviceKey } text={ deviceLabels[ deviceKey ] }>
								<Button
									icon={ deviceIcons[ deviceKey ] }
									isPrimary={ currentDevice === deviceKey }
									onClick={ () => setCurrentDevice( deviceKey ) }
									aria-label={ deviceLabels[ deviceKey ] }
									className={ `mgb-spacing-control__device-btn mgb-spacing-control__device-btn--${ deviceKey }` }
								/>
							</Tooltip>
						) ) }
					</ButtonGroup>
				</div>
			) }
			<BoxControl
				label={ responsive ? '' : label }
				values={ boxControlValue }
				onChange={ handleChange }
				units={ units.map( ( u ) => ( {
					value: u.value,
					label: u.label,
					a11yLabel: u.label,
				} ) ) }
				splitOnAxis={ false }
			/>

			{ onUnitChange && (
				<SelectControl
					label={ __( 'Unit', 'magical-blocks' ) }
					value={ unit }
					options={ units }
					onChange={ onUnitChange }
					className="mgb-spacing-control__unit"
				/>
			) }
		</div>
	);
};

export default SpacingControl;
