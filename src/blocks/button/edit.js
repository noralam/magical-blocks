/**
 * Magical Button Block - Edit Component
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
	__experimentalNumberControl as NumberControl,
	ButtonGroup,
	Button,
	Popover,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';

import { generateBlockId, classNames } from '@common/utils';
import ColorControl from '../../components/color-control';
import TypographyControl from '../../components/typography-control';
import SpacingControl from '../../components/spacing-control';
import ResponsiveControl from '../../components/responsive-control';
import IconPicker from '../../components/icon-picker';
import { getIconSvg } from '../../components/icon-picker/icons-data';

/**
 * Edit component for the Button block.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Set attributes function.
 * @param {boolean}  props.isSelected    Whether block is selected.
 * @return {JSX.Element} The edit component.
 */
const Edit = ( { attributes, setAttributes, isSelected } ) => {
	const {
		blockId,
		text,
		url,
		linkTarget,
		rel,
		buttonAlign,
		buttonAlignTablet,
		buttonAlignMobile,
		buttonSize,
		buttonWidth,
		customWidth,
		customWidthUnit,
		fontFamily,
		fontSize,
		fontSizeTablet,
		fontSizeMobile,
		fontSizeUnit,
		fontWeight,
		textTransform,
		letterSpacing,
		textColor,
		textColorHover,
		backgroundColor,
		backgroundColorHover,
		gradientEnabled,
		gradientColor1,
		gradientColor2,
		gradientAngle,
		borderRadius,
		borderRadiusUnit,
		borderWidth,
		borderColor,
		borderStyle,
		padding,
		paddingTablet,
		paddingMobile,
		paddingUnit,
		margin,
		marginUnit,
		boxShadow,
		boxShadowHorizontal,
		boxShadowVertical,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
		iconEnabled,
		icon,
		iconPosition,
		iconSize,
		iconSpacing,
		hoverEffect,
	} = attributes;

	const [ isLinkOpen, setIsLinkOpen ] = useState( false );

	// Generate unique block ID
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: generateBlockId( 'button' ) } );
		}
	}, [ blockId ] );

	// Size presets
	const sizePresets = {
		small: { padding: '8px 16px', fontSize: '13px' },
		medium: { padding: '12px 24px', fontSize: '15px' },
		large: { padding: '16px 32px', fontSize: '17px' },
		xlarge: { padding: '20px 40px', fontSize: '19px' },
	};

	// Build button styles
	const buttonStyles = {
		'--mgb-btn-font-size': fontSize ? `${ fontSize }${ fontSizeUnit }` : undefined,
		'--mgb-btn-font-size-tablet': fontSizeTablet ? `${ fontSizeTablet }${ fontSizeUnit }` : undefined,
		'--mgb-btn-font-size-mobile': fontSizeMobile ? `${ fontSizeMobile }${ fontSizeUnit }` : undefined,
		'--mgb-btn-padding': padding?.top || padding?.right || padding?.bottom || padding?.left
			? `${ padding.top || 0 }${ paddingUnit } ${ padding.right || 0 }${ paddingUnit } ${ padding.bottom || 0 }${ paddingUnit } ${ padding.left || 0 }${ paddingUnit }`
			: undefined,
		'--mgb-btn-padding-tablet': paddingTablet?.top || paddingTablet?.right || paddingTablet?.bottom || paddingTablet?.left
			? `${ paddingTablet.top || 0 }${ paddingUnit } ${ paddingTablet.right || 0 }${ paddingUnit } ${ paddingTablet.bottom || 0 }${ paddingUnit } ${ paddingTablet.left || 0 }${ paddingUnit }`
			: undefined,
		'--mgb-btn-padding-mobile': paddingMobile?.top || paddingMobile?.right || paddingMobile?.bottom || paddingMobile?.left
			? `${ paddingMobile.top || 0 }${ paddingUnit } ${ paddingMobile.right || 0 }${ paddingUnit } ${ paddingMobile.bottom || 0 }${ paddingUnit } ${ paddingMobile.left || 0 }${ paddingUnit }`
			: undefined,
		fontFamily: fontFamily || undefined,
		fontSize: fontSize ? `${ fontSize }${ fontSizeUnit }` : sizePresets[ buttonSize ]?.fontSize,
		fontWeight: fontWeight || undefined,
		textTransform: textTransform || undefined,
		letterSpacing: letterSpacing ? `${ letterSpacing }px` : undefined,
		color: textColor || undefined,
		background: gradientEnabled
			? `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 }, ${ gradientColor2 })`
			: backgroundColor || undefined,
		borderRadius: borderRadius
			? `${ borderRadius.top || 0 }${ borderRadiusUnit } ${ borderRadius.right || 0 }${ borderRadiusUnit } ${ borderRadius.bottom || 0 }${ borderRadiusUnit } ${ borderRadius.left || 0 }${ borderRadiusUnit }`
			: undefined,
		borderWidth: borderWidth ? `${ borderWidth }px` : undefined,
		borderColor: borderColor || undefined,
		borderStyle: borderWidth ? borderStyle : undefined,
		padding: padding?.top || padding?.right || padding?.bottom || padding?.left
			? `${ padding.top || 0 }${ paddingUnit } ${ padding.right || 0 }${ paddingUnit } ${ padding.bottom || 0 }${ paddingUnit } ${ padding.left || 0 }${ paddingUnit }`
			: sizePresets[ buttonSize ]?.padding,
		boxShadow: boxShadow
			? `${ boxShadowHorizontal }px ${ boxShadowVertical }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${ boxShadowColor }`
			: undefined,
		width: buttonWidth === 'custom' && customWidth ? `${ customWidth }${ customWidthUnit }` : buttonWidth === 'full' ? '100%' : undefined,
	};

	// Block props with responsive alignment CSS variables
	const wrapperStyles = {
		'--mgb-btn-align-tablet': buttonAlignTablet || undefined,
		'--mgb-btn-align-mobile': buttonAlignMobile || undefined,
	};

	const blockProps = useBlockProps( {
		className: classNames(
			'mgb-button-wrapper',
			`mgb-button-wrapper--align-${ buttonAlign }`,
			blockId && `mgb-block-${ blockId }`
		),
		style: wrapperStyles,
	} );

	// Icon SVG
	const iconSvg = icon ? getIconSvg( icon ) : null;

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ url ? linkOff : link }
						label={ url ? __( 'Unlink', 'magical-blocks' ) : __( 'Link', 'magical-blocks' ) }
						onClick={ () => {
							if ( url ) {
								setAttributes( { url: '', linkTarget: '_self', rel: '' } );
							} else {
								setIsLinkOpen( true );
							}
						} }
						isPressed={ !! url }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					{ [ 'left', 'center', 'right' ].map( ( align ) => (
						<ToolbarButton
							key={ align }
							icon={ `align-${ align }` }
							label={ __( `Align ${ align }`, 'magical-blocks' ) }
							isPressed={ buttonAlign === align }
							onClick={ () => setAttributes( { buttonAlign: align } ) }
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			{ isLinkOpen && (
				<Popover
					position="bottom center"
					onClose={ () => setIsLinkOpen( false ) }
					focusOnMount="firstElement"
				>
					<LinkControl
						value={ { url, opensInNewTab: linkTarget === '_blank' } }
						onChange={ ( { url: newUrl, opensInNewTab } ) => {
							setAttributes( {
								url: newUrl,
								linkTarget: opensInNewTab ? '_blank' : '_self',
								rel: opensInNewTab ? 'noopener noreferrer' : '',
							} );
						} }
					/>
				</Popover>
			) }

			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'magical-blocks' ) } initialOpen={ true }>
					<ResponsiveControl label={ __( 'Alignment', 'magical-blocks' ) }>
						{ ( device ) => {
							const alignValue = device === 'desktop' ? buttonAlign : device === 'tablet' ? ( buttonAlignTablet || buttonAlign ) : ( buttonAlignMobile || buttonAlignTablet || buttonAlign );
							const alignAttr = device === 'desktop' ? 'buttonAlign' : device === 'tablet' ? 'buttonAlignTablet' : 'buttonAlignMobile';
							return (
								<ButtonGroup>
									{ [ 'left', 'center', 'right' ].map( ( align ) => (
										<Button
											key={ align }
											isPrimary={ alignValue === align }
											isSecondary={ alignValue !== align }
											onClick={ () => setAttributes( { [ alignAttr ]: align } ) }
										>
											{ align.charAt( 0 ).toUpperCase() + align.slice( 1 ) }
										</Button>
									) ) }
								</ButtonGroup>
							);
						} }
					</ResponsiveControl>
					<SelectControl
						label={ __( 'Size', 'magical-blocks' ) }
						value={ buttonSize }
						options={ [
							{ label: __( 'Small', 'magical-blocks' ), value: 'small' },
							{ label: __( 'Medium', 'magical-blocks' ), value: 'medium' },
							{ label: __( 'Large', 'magical-blocks' ), value: 'large' },
							{ label: __( 'Extra Large', 'magical-blocks' ), value: 'xlarge' },
						] }
						onChange={ ( value ) => setAttributes( { buttonSize: value } ) }
					/>
					<SelectControl
						label={ __( 'Width', 'magical-blocks' ) }
						value={ buttonWidth }
						options={ [
							{ label: __( 'Auto', 'magical-blocks' ), value: 'auto' },
							{ label: __( 'Full Width', 'magical-blocks' ), value: 'full' },
							{ label: __( 'Custom', 'magical-blocks' ), value: 'custom' },
						] }
						onChange={ ( value ) => setAttributes( { buttonWidth: value } ) }
					/>
					{ buttonWidth === 'custom' && (
						<NumberControl
							label={ __( 'Custom Width', 'magical-blocks' ) }
							value={ customWidth }
							onChange={ ( value ) => setAttributes( { customWidth: value ? parseInt( value, 10 ) : undefined } ) }
							min={ 50 }
							max={ 1000 }
						/>
					) }
					<SelectControl
						label={ __( 'Hover Effect', 'magical-blocks' ) }
						value={ hoverEffect }
						options={ [
							{ label: __( 'None', 'magical-blocks' ), value: 'none' },
							{ label: __( 'Grow', 'magical-blocks' ), value: 'grow' },
							{ label: __( 'Shrink', 'magical-blocks' ), value: 'shrink' },
							{ label: __( 'Pulse', 'magical-blocks' ), value: 'pulse' },
							{ label: __( 'Float', 'magical-blocks' ), value: 'float' },
							{ label: __( 'Wobble', 'magical-blocks' ), value: 'wobble' },
						] }
						onChange={ ( value ) => setAttributes( { hoverEffect: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'magical-blocks' ) } initialOpen={ false }>
					<ResponsiveControl label={ __( 'Font Size', 'magical-blocks' ) }>
						{ ( device ) => {
							const fontSizeValue = device === 'desktop' ? fontSize : device === 'tablet' ? fontSizeTablet : fontSizeMobile;
							const fontSizeAttr = device === 'desktop' ? 'fontSize' : device === 'tablet' ? 'fontSizeTablet' : 'fontSizeMobile';
							return (
								<RangeControl
									value={ fontSizeValue }
									onChange={ ( value ) => setAttributes( { [ fontSizeAttr ]: value } ) }
									min={ 10 }
									max={ 100 }
									allowReset
								/>
							);
						} }
					</ResponsiveControl>
					<TypographyControl
						fontFamily={ fontFamily }
						onFontFamilyChange={ ( value ) => setAttributes( { fontFamily: value } ) }
						fontSizeUnit={ fontSizeUnit }
						onFontSizeUnitChange={ ( value ) => setAttributes( { fontSizeUnit: value } ) }
						fontWeight={ fontWeight }
						onFontWeightChange={ ( value ) => setAttributes( { fontWeight: value } ) }
						textTransform={ textTransform }
						onTextTransformChange={ ( value ) => setAttributes( { textTransform: value } ) }
						letterSpacing={ letterSpacing }
						onLetterSpacingChange={ ( value ) => setAttributes( { letterSpacing: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'magical-blocks' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Text Color', 'magical-blocks' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Text Hover Color', 'magical-blocks' ) }
						value={ textColorHover }
						onChange={ ( value ) => setAttributes( { textColorHover: value } ) }
					/>
					
					<ToggleControl
						label={ __( 'Enable Gradient', 'magical-blocks' ) }
						checked={ gradientEnabled }
						onChange={ ( value ) => setAttributes( { gradientEnabled: value } ) }
					/>
					
					{ gradientEnabled ? (
						<>
							<ColorControl
								label={ __( 'Gradient Color 1', 'magical-blocks' ) }
								value={ gradientColor1 }
								onChange={ ( value ) => setAttributes( { gradientColor1: value } ) }
							/>
							<ColorControl
								label={ __( 'Gradient Color 2', 'magical-blocks' ) }
								value={ gradientColor2 }
								onChange={ ( value ) => setAttributes( { gradientColor2: value } ) }
							/>
							<RangeControl
								label={ __( 'Gradient Angle', 'magical-blocks' ) }
								value={ gradientAngle }
								onChange={ ( value ) => setAttributes( { gradientAngle: value } ) }
								min={ 0 }
								max={ 360 }
							/>
						</>
					) : (
						<>
							<ColorControl
								label={ __( 'Background Color', 'magical-blocks' ) }
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Background Hover Color', 'magical-blocks' ) }
								value={ backgroundColorHover }
								onChange={ ( value ) => setAttributes( { backgroundColorHover: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Border', 'magical-blocks' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Border Radius', 'magical-blocks' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						unit={ borderRadiusUnit }
						onUnitChange={ ( value ) => setAttributes( { borderRadiusUnit: value } ) }
					/>
					<RangeControl
						label={ __( 'Border Width', 'magical-blocks' ) }
						value={ borderWidth }
						onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
						min={ 0 }
						max={ 10 }
					/>
					{ borderWidth > 0 && (
						<>
							<ColorControl
								label={ __( 'Border Color', 'magical-blocks' ) }
								value={ borderColor }
								onChange={ ( value ) => setAttributes( { borderColor: value } ) }
							/>
							<SelectControl
								label={ __( 'Border Style', 'magical-blocks' ) }
								value={ borderStyle }
								options={ [
									{ label: __( 'Solid', 'magical-blocks' ), value: 'solid' },
									{ label: __( 'Dashed', 'magical-blocks' ), value: 'dashed' },
									{ label: __( 'Dotted', 'magical-blocks' ), value: 'dotted' },
								] }
								onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Spacing', 'magical-blocks' ) } initialOpen={ false }>
					<ResponsiveControl label={ __( 'Padding', 'magical-blocks' ) }>
						{ ( device ) => {
							const paddingValue = device === 'desktop' ? padding : device === 'tablet' ? paddingTablet : paddingMobile;
							const paddingAttr = device === 'desktop' ? 'padding' : device === 'tablet' ? 'paddingTablet' : 'paddingMobile';
							return (
								<SpacingControl
									label=""
									value={ paddingValue }
									onChange={ ( value ) => setAttributes( { [ paddingAttr ]: value } ) }
									unit={ paddingUnit }
									onUnitChange={ ( value ) => setAttributes( { paddingUnit: value } ) }
								/>
							);
						} }
					</ResponsiveControl>
					<SpacingControl
						label={ __( 'Margin', 'magical-blocks' ) }
						value={ margin }
						onChange={ ( value ) => setAttributes( { margin: value } ) }
						unit={ marginUnit }
						onUnitChange={ ( value ) => setAttributes( { marginUnit: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Box Shadow', 'magical-blocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Box Shadow', 'magical-blocks' ) }
						checked={ boxShadow }
						onChange={ ( value ) => setAttributes( { boxShadow: value } ) }
					/>
					{ boxShadow && (
						<>
							<RangeControl
								label={ __( 'Horizontal', 'magical-blocks' ) }
								value={ boxShadowHorizontal }
								onChange={ ( value ) => setAttributes( { boxShadowHorizontal: value } ) }
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Vertical', 'magical-blocks' ) }
								value={ boxShadowVertical }
								onChange={ ( value ) => setAttributes( { boxShadowVertical: value } ) }
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Blur', 'magical-blocks' ) }
								value={ boxShadowBlur }
								onChange={ ( value ) => setAttributes( { boxShadowBlur: value } ) }
								min={ 0 }
								max={ 100 }
							/>
							<RangeControl
								label={ __( 'Spread', 'magical-blocks' ) }
								value={ boxShadowSpread }
								onChange={ ( value ) => setAttributes( { boxShadowSpread: value } ) }
								min={ -50 }
								max={ 50 }
							/>
							<ColorControl
								label={ __( 'Shadow Color', 'magical-blocks' ) }
								value={ boxShadowColor }
								onChange={ ( value ) => setAttributes( { boxShadowColor: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Icon', 'magical-blocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Icon', 'magical-blocks' ) }
						checked={ iconEnabled }
						onChange={ ( value ) => setAttributes( { iconEnabled: value } ) }
					/>
					{ iconEnabled && (
						<>
							<IconPicker
								value={ icon }
								onChange={ ( value ) => setAttributes( { icon: value } ) }
								iconSize={ iconSize }
								onIconSizeChange={ ( value ) => setAttributes( { iconSize: value } ) }
							/>
							<SelectControl
								label={ __( 'Icon Position', 'magical-blocks' ) }
								value={ iconPosition }
								options={ [
									{ label: __( 'Left', 'magical-blocks' ), value: 'left' },
									{ label: __( 'Right', 'magical-blocks' ), value: 'right' },
								] }
								onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
							/>
							<RangeControl
								label={ __( 'Icon Spacing', 'magical-blocks' ) }
								value={ iconSpacing }
								onChange={ ( value ) => setAttributes( { iconSpacing: value } ) }
								min={ 0 }
								max={ 30 }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<span
					className={ classNames(
						'mgb-button',
						`mgb-button--size-${ buttonSize }`,
						buttonWidth === 'full' && 'mgb-button--full-width',
						hoverEffect !== 'none' && `mgb-button--hover-${ hoverEffect }`,
						iconEnabled && icon && `mgb-button--has-icon mgb-button--icon-${ iconPosition }`
					) }
					style={ buttonStyles }
				>
					{ iconEnabled && icon && iconPosition === 'left' && (
						<span
							className="mgb-button__icon"
							style={ { marginRight: `${ iconSpacing }px`, width: iconSize, height: iconSize } }
							dangerouslySetInnerHTML={ { __html: iconSvg } }
						/>
					) }
					<RichText
						tagName="span"
						className="mgb-button__text"
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						placeholder={ __( 'Button text...', 'magical-blocks' ) }
						allowedFormats={ [] }
					/>
					{ iconEnabled && icon && iconPosition === 'right' && (
						<span
							className="mgb-button__icon"
							style={ { marginLeft: `${ iconSpacing }px`, width: iconSize, height: iconSize } }
							dangerouslySetInnerHTML={ { __html: iconSvg } }
						/>
					) }
				</span>
			</div>
		</>
	);
};

export default Edit;
