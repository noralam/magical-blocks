/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
	TabPanel,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { generateBlockId, classNames } from '../../common/utils';
import ColorControl from '../../components/color-control';
import TypographyControl from '../../components/typography-control';
import SpacingControl from '../../components/spacing-control';
import ResponsiveControl from '../../components/responsive-control';
import IconPicker from '../../components/icon-picker';
import { getIconSvg } from '../../components/icon-picker/icons-data';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Edit component
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		blockId,
		icon,
		iconType,
		title,
		description,
		titleTag,
		iconPosition,
		alignment,
		iconSize,
		iconColor,
		iconHoverColor,
		iconBackgroundColor,
		iconBackgroundHoverColor,
		iconBorderRadius,
		iconPadding,
		titleColor,
		titleHoverColor,
		descriptionColor,
		titleTypography,
		descriptionTypography,
		boxBackgroundColor,
		boxHoverBackgroundColor,
		boxBorderColor,
		boxHoverBorderColor,
		boxBorderWidth,
		boxBorderRadius,
		boxShadow,
		boxHoverShadow,
		padding,
		margin,
		titleSpacing,
		descriptionSpacing,
		hoverAnimation,
		linkUrl,
		linkTarget,
	} = attributes;

	// Generate unique block ID
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: generateBlockId( clientId ) } );
		}
	}, [ blockId, clientId, setAttributes ] );

	// Build inline styles
	const getBoxShadowStyle = ( shadow ) => {
		if ( ! shadow?.enable ) return 'none';
		return `${ shadow.horizontal }px ${ shadow.vertical }px ${ shadow.blur }px ${ shadow.spread }px ${ shadow.color }`;
	};

	const inlineStyles = {
		'--mgb-icon-box-icon-size': `${ iconSize?.desktop || 48 }px`,
		'--mgb-icon-box-icon-size-tablet': `${ iconSize?.tablet || 40 }px`,
		'--mgb-icon-box-icon-size-mobile': `${ iconSize?.mobile || 36 }px`,
		'--mgb-icon-box-icon-color': iconColor,
		'--mgb-icon-box-icon-hover-color': iconHoverColor || iconColor,
		'--mgb-icon-box-icon-bg': iconBackgroundColor || 'transparent',
		'--mgb-icon-box-icon-bg-hover': iconBackgroundHoverColor || iconBackgroundColor || 'transparent',
		'--mgb-icon-box-icon-radius': iconBorderRadius,
		'--mgb-icon-box-icon-padding': `${ iconPadding?.top || 16 }px ${ iconPadding?.right || 16 }px ${ iconPadding?.bottom || 16 }px ${ iconPadding?.left || 16 }px`,
		'--mgb-icon-box-title-color': titleColor,
		'--mgb-icon-box-title-hover-color': titleHoverColor || titleColor,
		'--mgb-icon-box-desc-color': descriptionColor,
		'--mgb-icon-box-title-size': `${ titleTypography?.fontSize?.desktop || 20 }px`,
		'--mgb-icon-box-title-size-tablet': `${ titleTypography?.fontSize?.tablet || 18 }px`,
		'--mgb-icon-box-title-size-mobile': `${ titleTypography?.fontSize?.mobile || 16 }px`,
		'--mgb-icon-box-title-weight': titleTypography?.fontWeight || '600',
		'--mgb-icon-box-title-line-height': titleTypography?.lineHeight || '1.4',
		'--mgb-icon-box-title-spacing': titleTypography?.letterSpacing ? `${ titleTypography.letterSpacing }px` : '0',
		'--mgb-icon-box-title-transform': titleTypography?.textTransform || 'none',
		'--mgb-icon-box-desc-size': `${ descriptionTypography?.fontSize?.desktop || 16 }px`,
		'--mgb-icon-box-desc-size-tablet': `${ descriptionTypography?.fontSize?.tablet || 15 }px`,
		'--mgb-icon-box-desc-size-mobile': `${ descriptionTypography?.fontSize?.mobile || 14 }px`,
		'--mgb-icon-box-desc-weight': descriptionTypography?.fontWeight || '400',
		'--mgb-icon-box-desc-line-height': descriptionTypography?.lineHeight || '1.6',
		'--mgb-icon-box-desc-spacing': descriptionTypography?.letterSpacing ? `${ descriptionTypography.letterSpacing }px` : '0',
		'--mgb-icon-box-desc-transform': descriptionTypography?.textTransform || 'none',
		'--mgb-icon-box-bg': boxBackgroundColor || 'transparent',
		'--mgb-icon-box-bg-hover': boxHoverBackgroundColor || boxBackgroundColor || 'transparent',
		'--mgb-icon-box-border-color': boxBorderColor || 'transparent',
		'--mgb-icon-box-border-hover-color': boxHoverBorderColor || boxBorderColor || 'transparent',
		'--mgb-icon-box-border-width': `${ boxBorderWidth || 0 }px`,
		'--mgb-icon-box-border-radius': `${ boxBorderRadius || 8 }px`,
		'--mgb-icon-box-shadow': getBoxShadowStyle( boxShadow ),
		'--mgb-icon-box-shadow-hover': getBoxShadowStyle( boxHoverShadow ),
		// Responsive padding
		'--mgb-icon-box-padding': `${ padding?.desktop?.top || 30 }px ${ padding?.desktop?.right || 30 }px ${ padding?.desktop?.bottom || 30 }px ${ padding?.desktop?.left || 30 }px`,
		'--mgb-icon-box-padding-tablet': `${ padding?.tablet?.top || 24 }px ${ padding?.tablet?.right || 24 }px ${ padding?.tablet?.bottom || 24 }px ${ padding?.tablet?.left || 24 }px`,
		'--mgb-icon-box-padding-mobile': `${ padding?.mobile?.top || 20 }px ${ padding?.mobile?.right || 20 }px ${ padding?.mobile?.bottom || 20 }px ${ padding?.mobile?.left || 20 }px`,
		// Responsive margin
		'--mgb-icon-box-margin': `${ margin?.desktop?.top || 0 }px ${ margin?.desktop?.right || 0 }px ${ margin?.desktop?.bottom || 0 }px ${ margin?.desktop?.left || 0 }px`,
		'--mgb-icon-box-margin-tablet': `${ margin?.tablet?.top || 0 }px ${ margin?.tablet?.right || 0 }px ${ margin?.tablet?.bottom || 0 }px ${ margin?.tablet?.left || 0 }px`,
		'--mgb-icon-box-margin-mobile': `${ margin?.mobile?.top || 0 }px ${ margin?.mobile?.right || 0 }px ${ margin?.mobile?.bottom || 0 }px ${ margin?.mobile?.left || 0 }px`,
		// Responsive spacing
		'--mgb-icon-box-title-margin': `${ titleSpacing?.desktop || titleSpacing || 16 }px`,
		'--mgb-icon-box-title-margin-tablet': `${ titleSpacing?.tablet || titleSpacing?.desktop || titleSpacing || 14 }px`,
		'--mgb-icon-box-title-margin-mobile': `${ titleSpacing?.mobile || titleSpacing?.desktop || titleSpacing || 12 }px`,
		'--mgb-icon-box-desc-margin': `${ descriptionSpacing?.desktop || descriptionSpacing || 12 }px`,
		'--mgb-icon-box-desc-margin-tablet': `${ descriptionSpacing?.tablet || descriptionSpacing?.desktop || descriptionSpacing || 10 }px`,
		'--mgb-icon-box-desc-margin-mobile': `${ descriptionSpacing?.mobile || descriptionSpacing?.desktop || descriptionSpacing || 8 }px`,
	};

	if ( titleTypography?.fontFamily ) {
		inlineStyles[ '--mgb-icon-box-title-family' ] = titleTypography.fontFamily;
	}
	if ( descriptionTypography?.fontFamily ) {
		inlineStyles[ '--mgb-icon-box-desc-family' ] = descriptionTypography.fontFamily;
	}

	const blockProps = useBlockProps( {
		className: classNames(
			'mgb-icon-box',
			`mgb-icon-box-${ blockId }`,
			`mgb-icon-position-${ iconPosition }`,
			`mgb-align-${ alignment }`,
			hoverAnimation !== 'none' && `mgb-hover-${ hoverAnimation }`
		),
		style: inlineStyles,
	} );

	const TitleTag = titleTag;

	// Get icon SVG
	const iconSvg = icon ? getIconSvg( icon ) : null;

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="mgb-inspector-tabs"
					activeClass="is-active"
					tabs={ [
						{ name: 'content', title: __( 'Content', 'magical-blocks' ) },
						{ name: 'style', title: __( 'Style', 'magical-blocks' ) },
						{ name: 'advanced', title: __( 'Advanced', 'magical-blocks' ) },
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'content' ) {
							return (
								<>
									<PanelBody title={ __( 'Icon', 'magical-blocks' ) }>
										<IconPicker
											value={ icon }
											iconType={ iconType }
											onChange={ ( newIcon ) => setAttributes( { icon: newIcon } ) }
											onTypeChange={ ( newType ) => setAttributes( { iconType: newType } ) }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Content', 'magical-blocks' ) } initialOpen={ false }>
										<SelectControl
											label={ __( 'Title Tag', 'magical-blocks' ) }
											value={ titleTag }
											options={ [
												{ label: 'H1', value: 'h1' },
												{ label: 'H2', value: 'h2' },
												{ label: 'H3', value: 'h3' },
												{ label: 'H4', value: 'h4' },
												{ label: 'H5', value: 'h5' },
												{ label: 'H6', value: 'h6' },
												{ label: 'Div', value: 'div' },
												{ label: 'Span', value: 'span' },
											] }
											onChange={ ( value ) => setAttributes( { titleTag: value } ) }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Layout', 'magical-blocks' ) } initialOpen={ false }>
										<SelectControl
											label={ __( 'Icon Position', 'magical-blocks' ) }
											value={ iconPosition }
											options={ [
												{ label: __( 'Top', 'magical-blocks' ), value: 'top' },
												{ label: __( 'Left', 'magical-blocks' ), value: 'left' },
												{ label: __( 'Right', 'magical-blocks' ), value: 'right' },
											] }
											onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
										/>
										<SelectControl
											label={ __( 'Alignment', 'magical-blocks' ) }
											value={ alignment }
											options={ [
												{ label: __( 'Left', 'magical-blocks' ), value: 'left' },
												{ label: __( 'Center', 'magical-blocks' ), value: 'center' },
												{ label: __( 'Right', 'magical-blocks' ), value: 'right' },
											] }
											onChange={ ( value ) => setAttributes( { alignment: value } ) }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Link', 'magical-blocks' ) } initialOpen={ false }>
										<TextControl
											label={ __( 'Link URL', 'magical-blocks' ) }
											value={ linkUrl }
											onChange={ ( value ) => setAttributes( { linkUrl: value } ) }
											placeholder="https://"
										/>
										<ToggleControl
											label={ __( 'Open in New Tab', 'magical-blocks' ) }
											checked={ linkTarget }
											onChange={ ( value ) => setAttributes( { linkTarget: value } ) }
										/>
									</PanelBody>
								</>
							);
						}

						if ( tab.name === 'style' ) {
							return (
								<>
									<PanelBody title={ __( 'Icon Style', 'magical-blocks' ) }>
										<ResponsiveControl label={ __( 'Icon Size', 'magical-blocks' ) }>
											{ ( device ) => (
												<RangeControl
													value={ parseInt( iconSize?.[ device ] || iconSize?.desktop || 48 ) }
													onChange={ ( value ) =>
														setAttributes( {
															iconSize: {
																...iconSize,
																[ device ]: String( value ),
															},
														} )
													}
													min={ 16 }
													max={ 200 }
												/>
											) }
										</ResponsiveControl>
										<ColorControl
											label={ __( 'Icon Color', 'magical-blocks' ) }
											value={ iconColor }
											onChange={ ( value ) => setAttributes( { iconColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Icon Hover Color', 'magical-blocks' ) }
											value={ iconHoverColor }
											onChange={ ( value ) => setAttributes( { iconHoverColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Background Color', 'magical-blocks' ) }
											value={ iconBackgroundColor }
											onChange={ ( value ) => setAttributes( { iconBackgroundColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Background Hover Color', 'magical-blocks' ) }
											value={ iconBackgroundHoverColor }
											onChange={ ( value ) => setAttributes( { iconBackgroundHoverColor: value } ) }
										/>
										<TextControl
											label={ __( 'Border Radius', 'magical-blocks' ) }
											value={ iconBorderRadius }
											onChange={ ( value ) => setAttributes( { iconBorderRadius: value } ) }
											help={ __( 'Use px, %, or any CSS value', 'magical-blocks' ) }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Title Style', 'magical-blocks' ) } initialOpen={ false }>
										<TypographyControl
											value={ titleTypography }
											onChange={ ( value ) => setAttributes( { titleTypography: value } ) }
										/>
										<ColorControl
											label={ __( 'Title Color', 'magical-blocks' ) }
											value={ titleColor }
											onChange={ ( value ) => setAttributes( { titleColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Title Hover Color', 'magical-blocks' ) }
											value={ titleHoverColor }
											onChange={ ( value ) => setAttributes( { titleHoverColor: value } ) }
										/>
										<ResponsiveControl label={ __( 'Title Spacing', 'magical-blocks' ) }>
											{ ( device ) => (
												<RangeControl
													value={ parseInt( titleSpacing?.[ device ] || titleSpacing?.desktop || titleSpacing || 16 ) }
													onChange={ ( value ) =>
														setAttributes( {
															titleSpacing: {
																...( typeof titleSpacing === 'object' ? titleSpacing : { desktop: titleSpacing, tablet: titleSpacing, mobile: titleSpacing } ),
																[ device ]: String( value ),
															},
														} )
													}
													min={ 0 }
													max={ 100 }
												/>
											) }
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={ __( 'Description Style', 'magical-blocks' ) } initialOpen={ false }>
										<TypographyControl
											value={ descriptionTypography }
											onChange={ ( value ) => setAttributes( { descriptionTypography: value } ) }
										/>
										<ColorControl
											label={ __( 'Description Color', 'magical-blocks' ) }
											value={ descriptionColor }
											onChange={ ( value ) => setAttributes( { descriptionColor: value } ) }
										/>
										<ResponsiveControl label={ __( 'Description Spacing', 'magical-blocks' ) }>
											{ ( device ) => (
												<RangeControl
													value={ parseInt( descriptionSpacing?.[ device ] || descriptionSpacing?.desktop || descriptionSpacing || 12 ) }
													onChange={ ( value ) =>
														setAttributes( {
															descriptionSpacing: {
																...( typeof descriptionSpacing === 'object' ? descriptionSpacing : { desktop: descriptionSpacing, tablet: descriptionSpacing, mobile: descriptionSpacing } ),
																[ device ]: String( value ),
															},
														} )
													}
													min={ 0 }
													max={ 100 }
												/>
											) }
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={ __( 'Box Style', 'magical-blocks' ) } initialOpen={ false }>
										<ColorControl
											label={ __( 'Background Color', 'magical-blocks' ) }
											value={ boxBackgroundColor }
											onChange={ ( value ) => setAttributes( { boxBackgroundColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Background Hover Color', 'magical-blocks' ) }
											value={ boxHoverBackgroundColor }
											onChange={ ( value ) => setAttributes( { boxHoverBackgroundColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Border Color', 'magical-blocks' ) }
											value={ boxBorderColor }
											onChange={ ( value ) => setAttributes( { boxBorderColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Border Hover Color', 'magical-blocks' ) }
											value={ boxHoverBorderColor }
											onChange={ ( value ) => setAttributes( { boxHoverBorderColor: value } ) }
										/>
										<RangeControl
											label={ __( 'Border Width', 'magical-blocks' ) }
											value={ parseInt( boxBorderWidth ) }
											onChange={ ( value ) => setAttributes( { boxBorderWidth: String( value ) } ) }
											min={ 0 }
											max={ 10 }
										/>
										<RangeControl
											label={ __( 'Border Radius', 'magical-blocks' ) }
											value={ parseInt( boxBorderRadius ) }
											onChange={ ( value ) => setAttributes( { boxBorderRadius: String( value ) } ) }
											min={ 0 }
											max={ 100 }
										/>
									</PanelBody>
								</>
							);
						}

						if ( tab.name === 'advanced' ) {
							return (
								<>
									<PanelBody title={ __( 'Spacing', 'magical-blocks' ) }>
										<SpacingControl
											label={ __( 'Padding', 'magical-blocks' ) }
											value={ padding }
											onChange={ ( value ) => setAttributes( { padding: value } ) }
										/>
										<SpacingControl
											label={ __( 'Margin', 'magical-blocks' ) }
											value={ margin }
											onChange={ ( value ) => setAttributes( { margin: value } ) }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Animation', 'magical-blocks' ) } initialOpen={ false }>
										<SelectControl
											label={ __( 'Hover Animation', 'magical-blocks' ) }
											value={ hoverAnimation }
											options={ [
												{ label: __( 'None', 'magical-blocks' ), value: 'none' },
												{ label: __( 'Grow', 'magical-blocks' ), value: 'grow' },
												{ label: __( 'Shrink', 'magical-blocks' ), value: 'shrink' },
												{ label: __( 'Float', 'magical-blocks' ), value: 'float' },
												{ label: __( 'Sink', 'magical-blocks' ), value: 'sink' },
											] }
											onChange={ ( value ) => setAttributes( { hoverAnimation: value } ) }
										/>
									</PanelBody>
								</>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="mgb-icon-box-inner">
					<div className="mgb-icon-box-icon">
						{ iconSvg ? (
							<span
								className="mgb-icon-box-icon-svg"
								dangerouslySetInnerHTML={ { __html: iconSvg } }
							/>
						) : (
							<IconPicker
								value={ icon }
								onChange={ ( newIcon ) => setAttributes( { icon: newIcon } ) }
							/>
						) }
					</div>
					<div className="mgb-icon-box-content">
						<RichText
							tagName={ TitleTag }
							className="mgb-icon-box-title"
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder={ __( 'Icon Box Title', 'magical-blocks' ) }
						/>
						<RichText
							tagName="p"
							className="mgb-icon-box-description"
							value={ description }
							onChange={ ( value ) => setAttributes( { description: value } ) }
							placeholder={ __( 'Add description...', 'magical-blocks' ) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
