/**
 * Typography Control Component
 *
 * Shared typography settings for blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	RangeControl,
	__experimentalNumberControl as NumberControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	ButtonGroup,
	Dropdown,
	Popover,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { settings, reset, desktop, tablet, mobile } from '@wordpress/icons';
import { FONT_WEIGHTS, BREAKPOINTS } from '@common/constants';

import './style.scss';

/**
 * Device icons mapping
 */
const DEVICE_ICONS = {
	desktop,
	tablet,
	mobile,
};

/**
 * Typography Control Component.
 *
 * Supports two usage patterns:
 * 1. Object pattern: value={typographyObject} onChange={handler}
 * 2. Individual props: fontFamily, onFontFamilyChange, fontSize, onFontSizeChange, etc.
 *
 * Note: When using object pattern, fontSize can be either:
 * - A simple number/string: 20 or "20"
 * - A responsive object: { desktop: "20", tablet: "18", mobile: "16" }
 *
 * @param {Object}   props                  Component props.
 * @param {string}   props.label            Control label.
 * @param {Object}   props.value            Typography object (for object pattern).
 * @param {Function} props.onChange         Change handler (for object pattern).
 * @param {string}   props.fontFamily       Current font family.
 * @param {Function} props.onFontFamilyChange Font family change handler.
 * @param {number}   props.fontSize         Current font size.
 * @param {Function} props.onFontSizeChange Font size change handler.
 * @param {string}   props.fontSizeUnit     Font size unit.
 * @param {Function} props.onFontSizeUnitChange Font size unit change handler.
 * @param {string}   props.fontWeight       Current font weight.
 * @param {Function} props.onFontWeightChange Font weight change handler.
 * @param {string}   props.textTransform    Current text transform.
 * @param {Function} props.onTextTransformChange Text transform change handler.
 * @param {number}   props.lineHeight       Current line height.
 * @param {Function} props.onLineHeightChange Line height change handler.
 * @param {number}   props.letterSpacing    Current letter spacing.
 * @param {Function} props.onLetterSpacingChange Letter spacing change handler.
 * @param {Function} props.onReset          Reset handler.
 * @return {JSX.Element} The Typography Control component.
 */
const TypographyControl = ( {
	label = __( 'Typography', 'magical-blocks' ),
	// Object pattern props
	value,
	onChange,
	// Individual props pattern
	fontFamily: fontFamilyProp = '',
	onFontFamilyChange: onFontFamilyChangeProp,
	fontSize: fontSizeProp,
	onFontSizeChange: onFontSizeChangeProp,
	fontSizeTablet: fontSizeTabletProp,
	onFontSizeTabletChange: onFontSizeTabletChangeProp,
	fontSizeMobile: fontSizeMobileProp,
	onFontSizeMobileChange: onFontSizeMobileChangeProp,
	fontSizeUnit: fontSizeUnitProp = 'px',
	onFontSizeUnitChange: onFontSizeUnitChangeProp,
	fontWeight: fontWeightProp = '',
	onFontWeightChange: onFontWeightChangeProp,
	textTransform: textTransformProp = '',
	onTextTransformChange: onTextTransformChangeProp,
	lineHeight: lineHeightProp,
	onLineHeightChange: onLineHeightChangeProp,
	lineHeightTablet: lineHeightTabletProp,
	onLineHeightTabletChange: onLineHeightTabletChangeProp,
	lineHeightMobile: lineHeightMobileProp,
	onLineHeightMobileChange: onLineHeightMobileChangeProp,
	letterSpacing: letterSpacingProp,
	onLetterSpacingChange: onLetterSpacingChangeProp,
	onReset,
} ) => {
	// Device state for responsive font size
	const [ currentDevice, setCurrentDevice ] = useState( 'desktop' );
	
	// Determine if using object pattern (value/onChange) or individual props
	const useObjectPattern = typeof onChange === 'function';
	
	// Helper to check if fontSize is responsive
	const isResponsiveFontSize = ( fontSizeData ) => {
		return fontSizeData && typeof fontSizeData === 'object' && fontSizeData.desktop !== undefined;
	};
	
	// Helper to extract fontSize value for current device (object pattern)
	const getFontSizeValueFromObject = ( fontSizeData, device = 'desktop' ) => {
		if ( isResponsiveFontSize( fontSizeData ) ) {
			return parseInt( fontSizeData[ device ], 10 ) || undefined;
		}
		// Simple value format
		return fontSizeData ? parseInt( fontSizeData, 10 ) : undefined;
	};
	
	// Get font size value for current device (supports both patterns)
	const getCurrentFontSize = () => {
		if ( useObjectPattern ) {
			return getFontSizeValueFromObject( value?.fontSize, currentDevice );
		}
		// Individual props pattern - use device-specific props
		if ( currentDevice === 'tablet' ) {
			return fontSizeTabletProp;
		}
		if ( currentDevice === 'mobile' ) {
			return fontSizeMobileProp;
		}
		return fontSizeProp;
	};
	
	// Get line height for current device (supports both patterns)
	const getCurrentLineHeight = () => {
		if ( useObjectPattern ) {
			return value?.lineHeight;
		}
		// Individual props pattern
		if ( currentDevice === 'tablet' ) {
			return lineHeightTabletProp;
		}
		if ( currentDevice === 'mobile' ) {
			return lineHeightMobileProp;
		}
		return lineHeightProp;
	};
	
	// Extract values - prefer object pattern if available
	const fontFamily = useObjectPattern ? ( value?.fontFamily || '' ) : fontFamilyProp;
	const fontSize = getCurrentFontSize();
	const fontSizeUnit = useObjectPattern ? ( value?.fontSizeUnit || 'px' ) : fontSizeUnitProp;
	const fontWeight = useObjectPattern ? ( value?.fontWeight || '' ) : fontWeightProp;
	const textTransform = useObjectPattern ? ( value?.textTransform || '' ) : textTransformProp;
	const lineHeight = getCurrentLineHeight();
	const letterSpacing = useObjectPattern ? value?.letterSpacing : letterSpacingProp;
	
	// Create handlers that work with both patterns
	const handleChange = ( key, newValue ) => {
		if ( useObjectPattern ) {
			onChange( { ...value, [ key ]: newValue } );
		}
	};
	
	// Special handler for fontSize that handles responsive structure
	const handleFontSizeChange = ( newValue ) => {
		if ( useObjectPattern ) {
			if ( isResponsiveFontSize( value?.fontSize ) ) {
				// Update only the current device value
				onChange( { 
					...value, 
					fontSize: {
						...value.fontSize,
						[ currentDevice ]: String( newValue || '' ),
					}
				} );
			} else {
				// Convert to responsive format when using object pattern
				const currentVal = value?.fontSize ? parseInt( value.fontSize, 10 ) : 16;
				onChange( { 
					...value, 
					fontSize: {
						desktop: currentDevice === 'desktop' ? String( newValue || '' ) : String( currentVal ),
						tablet: currentDevice === 'tablet' ? String( newValue || '' ) : String( Math.round( currentVal * 0.9 ) ),
						mobile: currentDevice === 'mobile' ? String( newValue || '' ) : String( Math.round( currentVal * 0.85 ) ),
					}
				} );
			}
		} else {
			// Individual props pattern - call the appropriate handler based on device
			if ( currentDevice === 'tablet' && onFontSizeTabletChangeProp ) {
				onFontSizeTabletChangeProp( newValue );
			} else if ( currentDevice === 'mobile' && onFontSizeMobileChangeProp ) {
				onFontSizeMobileChangeProp( newValue );
			} else if ( onFontSizeChangeProp ) {
				onFontSizeChangeProp( newValue );
			}
		}
	};
	
	// Handler for line height that supports responsive
	const handleLineHeightChange = ( newValue ) => {
		if ( useObjectPattern ) {
			handleChange( 'lineHeight', newValue );
		} else {
			if ( currentDevice === 'tablet' && onLineHeightTabletChangeProp ) {
				onLineHeightTabletChangeProp( newValue );
			} else if ( currentDevice === 'mobile' && onLineHeightMobileChangeProp ) {
				onLineHeightMobileChangeProp( newValue );
			} else if ( onLineHeightChangeProp ) {
				onLineHeightChangeProp( newValue );
			}
		}
	};
	
	const onFontFamilyChange = useObjectPattern 
		? ( newValue ) => handleChange( 'fontFamily', newValue )
		: onFontFamilyChangeProp;
	const onFontSizeChange = handleFontSizeChange;
	const onFontSizeUnitChange = useObjectPattern
		? ( newValue ) => handleChange( 'fontSizeUnit', newValue )
		: onFontSizeUnitChangeProp;
	const onFontWeightChange = useObjectPattern
		? ( newValue ) => handleChange( 'fontWeight', newValue )
		: onFontWeightChangeProp;
	const onTextTransformChange = useObjectPattern
		? ( newValue ) => handleChange( 'textTransform', newValue )
		: onTextTransformChangeProp;
	const onLineHeightChange = handleLineHeightChange;
	const onLetterSpacingChange = useObjectPattern
		? ( newValue ) => handleChange( 'letterSpacing', newValue )
		: onLetterSpacingChangeProp;
	
	// For object pattern, always show all controls
	const showFontFamily = useObjectPattern || onFontFamilyChangeProp;
	const showFontSize = useObjectPattern || onFontSizeChangeProp;
	const showFontSizeUnit = useObjectPattern || onFontSizeUnitChangeProp;
	const showFontWeight = useObjectPattern || onFontWeightChangeProp;
	const showTextTransform = useObjectPattern || onTextTransformChangeProp;
	const showLineHeight = useObjectPattern || onLineHeightChangeProp;
	const showLetterSpacing = useObjectPattern || onLetterSpacingChangeProp;
	const fontSizeUnits = [ 'px', 'em', 'rem', '%', 'vw' ];
	
	const textTransformOptions = [
		{ label: __( 'Default', 'magical-blocks' ), value: '' },
		{ label: __( 'None', 'magical-blocks' ), value: 'none' },
		{ label: __( 'Uppercase', 'magical-blocks' ), value: 'uppercase' },
		{ label: __( 'Lowercase', 'magical-blocks' ), value: 'lowercase' },
		{ label: __( 'Capitalize', 'magical-blocks' ), value: 'capitalize' },
	];

	const fontWeightOptions = [
		{ label: __( 'Default', 'magical-blocks' ), value: '' },
		...FONT_WEIGHTS,
	];

	const systemFonts = [
		{ label: __( 'Default', 'magical-blocks' ), value: '' },
		{ label: __( 'System Stack', 'magical-blocks' ), value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
		{ label: 'Arial', value: 'Arial, sans-serif' },
		{ label: 'Georgia', value: 'Georgia, serif' },
		{ label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
		{ label: 'Courier New', value: '"Courier New", Courier, monospace' },
		{ label: 'Verdana', value: 'Verdana, sans-serif' },
		{ label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
		{ label: 'Impact', value: 'Impact, sans-serif' },
		{ label: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
	];

	// Device switcher buttons for responsive font size
	const deviceButtons = [ 'desktop', 'tablet', 'mobile' ].map( ( device ) => (
		<Button
			key={ device }
			icon={ DEVICE_ICONS[ device ] }
			isPressed={ currentDevice === device }
			onClick={ () => setCurrentDevice( device ) }
			label={ device.charAt( 0 ).toUpperCase() + device.slice( 1 ) }
			className="mgb-typography-control__device-btn"
		/>
	) );

	return (
		<div className="mgb-typography-control">
			<div className="mgb-typography-control__header">
				<span className="mgb-typography-control__label">{ label }</span>
				{ onReset && (
					<Button
						icon={ reset }
						label={ __( 'Reset', 'magical-blocks' ) }
						onClick={ onReset }
						isSmall
						className="mgb-typography-control__reset"
					/>
				) }
			</div>

			<div className="mgb-typography-control__content">
				{ showFontFamily && (
					<SelectControl
						label={ __( 'Font Family', 'magical-blocks' ) }
						value={ fontFamily }
						options={ systemFonts }
						onChange={ onFontFamilyChange }
						__nextHasNoMarginBottom
					/>
				) }

				{ showFontSize && (
					<div className="mgb-typography-control__size">
						<div className="mgb-typography-control__size-header">
							<span className="mgb-typography-control__size-label">{ __( 'Size', 'magical-blocks' ) }</span>
							<ButtonGroup className="mgb-typography-control__device-buttons">
								{ deviceButtons }
							</ButtonGroup>
						</div>
						<Flex align="flex-end">
							<FlexBlock>
								<NumberControl
									value={ fontSize }
									onChange={ ( val ) => onFontSizeChange( val ? parseInt( val, 10 ) : undefined ) }
									min={ 0 }
									max={ fontSizeUnit === 'px' ? 200 : 20 }
									step={ fontSizeUnit === 'px' ? 1 : 0.1 }
									placeholder={ currentDevice !== 'desktop' ? __( 'Inherit', 'magical-blocks' ) : '' }
								/>
							</FlexBlock>
							{ showFontSizeUnit && (
								<FlexItem>
									<ButtonGroup className="mgb-typography-control__unit-group">
										{ fontSizeUnits.map( ( unit ) => (
											<Button
												key={ unit }
												isSmall
												isPrimary={ fontSizeUnit === unit }
												onClick={ () => onFontSizeUnitChange( unit ) }
											>
												{ unit }
											</Button>
										) ) }
									</ButtonGroup>
								</FlexItem>
							) }
						</Flex>
					</div>
				) }

				<Flex gap={ 4 }>
					{ showFontWeight && (
						<FlexBlock>
							<SelectControl
								label={ __( 'Weight', 'magical-blocks' ) }
								value={ fontWeight }
								options={ fontWeightOptions }
								onChange={ onFontWeightChange }
								__nextHasNoMarginBottom
							/>
						</FlexBlock>
					) }

					{ showTextTransform && (
						<FlexBlock>
							<SelectControl
								label={ __( 'Transform', 'magical-blocks' ) }
								value={ textTransform }
								options={ textTransformOptions }
								onChange={ onTextTransformChange }
								__nextHasNoMarginBottom
							/>
						</FlexBlock>
					) }
				</Flex>

				<Flex gap={ 4 }>
					{ showLineHeight && (
						<FlexBlock>
							<NumberControl
								label={ __( 'Line Height', 'magical-blocks' ) }
								value={ lineHeight }
								onChange={ ( val ) => onLineHeightChange( val ? parseFloat( val ) : undefined ) }
								min={ 0 }
								max={ 5 }
								step={ 0.1 }
							/>
						</FlexBlock>
					) }

					{ showLetterSpacing && (
						<FlexBlock>
							<NumberControl
								label={ __( 'Letter Spacing (px)', 'magical-blocks' ) }
								value={ letterSpacing }
								onChange={ ( val ) => onLetterSpacingChange( val ? parseFloat( val ) : undefined ) }
								min={ -5 }
								max={ 20 }
								step={ 0.1 }
							/>
						</FlexBlock>
					) }
				</Flex>
			</div>
		</div>
	);
};

export default TypographyControl;
