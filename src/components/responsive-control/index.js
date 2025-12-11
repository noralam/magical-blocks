/**
 * Responsive Control Component
 *
 * Device-specific settings toggle for blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button, Tooltip, BaseControl } from '@wordpress/components';
import { desktop, tablet, mobile } from '@wordpress/icons';
import { useState, useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { BREAKPOINTS } from '@common/constants';

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
 * Responsive Control Component.
 *
 * Can be used in two ways:
 * 1. As device buttons only (no children)
 * 2. As a wrapper with label and responsive content (children as function)
 *
 * @param {Object}   props              Component props.
 * @param {string}   props.label        Label for the control.
 * @param {string}   props.device       Current device.
 * @param {Function} props.onDeviceChange Device change handler.
 * @param {boolean}  props.hideLabel    Whether to hide the label.
 * @param {string}   props.className    Additional CSS classes.
 * @param {Function} props.children     Render function receiving current device.
 * @return {JSX.Element} The Responsive Control component.
 */
const ResponsiveControl = ( {
	label,
	device: controlledDevice,
	onDeviceChange,
	hideLabel = false,
	className = '',
	children,
} ) => {
	// Local state for uncontrolled usage
	const [ localDevice, setLocalDevice ] = useState( 'desktop' );
	
	// Determine if controlled or uncontrolled
	const isControlled = controlledDevice !== undefined && onDeviceChange !== undefined;
	const currentDevice = isControlled ? controlledDevice : localDevice;

	/**
	 * Handle device change.
	 *
	 * @param {string} newDevice The new device.
	 */
	const handleDeviceChange = ( newDevice ) => {
		if ( isControlled ) {
			onDeviceChange( newDevice );
		} else {
			setLocalDevice( newDevice );
		}
	};

	// Device buttons component
	const DeviceButtons = () => (
		<ButtonGroup className="mgb-responsive-control__buttons">
			{ Object.keys( deviceIcons ).map( ( deviceKey ) => (
				<Tooltip key={ deviceKey } text={ deviceLabels[ deviceKey ] }>
					<Button
						icon={ deviceIcons[ deviceKey ] }
						isPrimary={ currentDevice === deviceKey }
						onClick={ () => handleDeviceChange( deviceKey ) }
						aria-label={ deviceLabels[ deviceKey ] }
						className={ `mgb-responsive-control__button mgb-responsive-control__button--${ deviceKey }` }
					/>
				</Tooltip>
			) ) }
		</ButtonGroup>
	);

	// If children is a function, render as a wrapper with label
	if ( typeof children === 'function' ) {
		return (
			<div className={ `mgb-responsive-control-wrapper ${ className }`.trim() }>
				<div className="mgb-responsive-control-header">
					{ label && (
						<span className="mgb-responsive-control__field-label">
							{ label }
						</span>
					) }
					<DeviceButtons />
				</div>
				<div className="mgb-responsive-control__content">
					{ children( currentDevice ) }
				</div>
			</div>
		);
	}

	// Original behavior: just device buttons
	return (
		<div className={ `mgb-responsive-control ${ className }`.trim() }>
			{ ! hideLabel && (
				<span className="mgb-responsive-control__label">
					{ __( 'Responsive', 'magical-blocks' ) }
				</span>
			) }
			<DeviceButtons />
		</div>
	);
};

/**
 * Responsive Tabs Component.
 *
 * Wraps content with device-specific rendering.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.children   Render function receiving current device.
 * @param {string}   props.device     Current device (controlled).
 * @param {Function} props.onDeviceChange Device change handler.
 * @return {JSX.Element} The Responsive Tabs component.
 */
export const ResponsiveTabs = ( {
	children,
	device: controlledDevice,
	onDeviceChange,
} ) => {
	const [ localDevice, setLocalDevice ] = useState( 'desktop' );
	const isControlled = controlledDevice !== undefined && onDeviceChange !== undefined;
	const currentDevice = isControlled ? controlledDevice : localDevice;

	const handleDeviceChange = ( newDevice ) => {
		if ( isControlled ) {
			onDeviceChange( newDevice );
		} else {
			setLocalDevice( newDevice );
		}
	};

	return (
		<div className="mgb-responsive-tabs">
			<ResponsiveControl
				device={ currentDevice }
				onDeviceChange={ handleDeviceChange }
			/>
			<div className="mgb-responsive-tabs__content" data-device={ currentDevice }>
				{ typeof children === 'function' ? children( currentDevice ) : children }
			</div>
		</div>
	);
};

/**
 * Get responsive attribute name.
 *
 * @param {string} attributeName Base attribute name.
 * @param {string} device        Current device.
 * @return {string} The device-specific attribute name.
 */
export const getResponsiveAttributeName = ( attributeName, device ) => {
	if ( device === 'desktop' ) {
		return attributeName;
	}
	return `${ attributeName }${ device.charAt( 0 ).toUpperCase() + device.slice( 1 ) }`;
};

/**
 * Get responsive value.
 *
 * Falls back to desktop value if device-specific value is not set.
 *
 * @param {Object} attributes    Block attributes.
 * @param {string} attributeName Base attribute name.
 * @param {string} device        Current device.
 * @return {*} The attribute value.
 */
export const getResponsiveValue = ( attributes, attributeName, device ) => {
	const deviceAttrName = getResponsiveAttributeName( attributeName, device );
	const value = attributes[ deviceAttrName ];
	
	// Fallback to desktop value if device-specific value is undefined
	if ( value === undefined && device !== 'desktop' ) {
		return attributes[ attributeName ];
	}
	
	return value;
};

export default ResponsiveControl;
