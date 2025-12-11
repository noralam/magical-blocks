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
		content,
		titleTag,
		linkText,
		linkUrl,
		linkTarget,
		showLink,
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
		contentColor,
		linkColor,
		linkHoverColor,
		titleTypography,
		contentTypography,
		linkTypography,
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
		iconSpacing,
		titleSpacing,
		contentSpacing,
		hoverAnimation,
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
		'--mgb-info-box-icon-size': `${ iconSize?.desktop || 50 }px`,
		'--mgb-info-box-icon-size-tablet': `${ iconSize?.tablet || 45 }px`,
		'--mgb-info-box-icon-size-mobile': `${ iconSize?.mobile || 40 }px`,
		'--mgb-info-box-icon-color': iconColor,
		'--mgb-info-box-icon-hover-color': iconHoverColor || iconColor,
		'--mgb-info-box-icon-bg': iconBackgroundColor || '#4b1ab3',
		'--mgb-info-box-icon-bg-hover': iconBackgroundHoverColor || iconBackgroundColor || '#4b1ab3',
		'--mgb-info-box-icon-radius': iconBorderRadius,
		'--mgb-info-box-icon-padding': `${ iconPadding || 20 }px`,
		'--mgb-info-box-title-color': titleColor,
		'--mgb-info-box-title-hover-color': titleHoverColor || titleColor,
		'--mgb-info-box-content-color': contentColor,
		'--mgb-info-box-link-color': linkColor,
		'--mgb-info-box-link-hover-color': linkHoverColor || linkColor,
		'--mgb-info-box-title-size': `${ titleTypography?.fontSize?.desktop || 22 }px`,
		'--mgb-info-box-title-size-tablet': `${ titleTypography?.fontSize?.tablet || 20 }px`,
		'--mgb-info-box-title-size-mobile': `${ titleTypography?.fontSize?.mobile || 18 }px`,
		'--mgb-info-box-title-weight': titleTypography?.fontWeight || '600',
		'--mgb-info-box-title-line-height': titleTypography?.lineHeight || '1.3',
		'--mgb-info-box-title-spacing': titleTypography?.letterSpacing ? `${ titleTypography.letterSpacing }px` : '0',
		'--mgb-info-box-title-transform': titleTypography?.textTransform || 'none',
		'--mgb-info-box-content-size': `${ contentTypography?.fontSize?.desktop || 16 }px`,
		'--mgb-info-box-content-size-tablet': `${ contentTypography?.fontSize?.tablet || 15 }px`,
		'--mgb-info-box-content-size-mobile': `${ contentTypography?.fontSize?.mobile || 14 }px`,
		'--mgb-info-box-content-weight': contentTypography?.fontWeight || '400',
		'--mgb-info-box-content-line-height': contentTypography?.lineHeight || '1.6',
		'--mgb-info-box-content-spacing': contentTypography?.letterSpacing ? `${ contentTypography.letterSpacing }px` : '0',
		'--mgb-info-box-content-transform': contentTypography?.textTransform || 'none',
		'--mgb-info-box-link-size': `${ linkTypography?.fontSize?.desktop || 15 }px`,
		'--mgb-info-box-link-weight': linkTypography?.fontWeight || '600',
		'--mgb-info-box-link-transform': linkTypography?.textTransform || 'none',
		'--mgb-info-box-bg': boxBackgroundColor || '#ffffff',
		'--mgb-info-box-bg-hover': boxHoverBackgroundColor || boxBackgroundColor || '#ffffff',
		'--mgb-info-box-border-color': boxBorderColor || '#e0e0e0',
		'--mgb-info-box-border-hover-color': boxHoverBorderColor || boxBorderColor || '#e0e0e0',
		'--mgb-info-box-border-width': `${ boxBorderWidth || 1 }px`,
		'--mgb-info-box-border-radius': `${ boxBorderRadius || 12 }px`,
		'--mgb-info-box-shadow': getBoxShadowStyle( boxShadow ),
		'--mgb-info-box-shadow-hover': getBoxShadowStyle( boxHoverShadow ),
		// Responsive padding
		'--mgb-info-box-padding': `${ padding?.desktop?.top || 40 }px ${ padding?.desktop?.right || 30 }px ${ padding?.desktop?.bottom || 40 }px ${ padding?.desktop?.left || 30 }px`,
		'--mgb-info-box-padding-tablet': `${ padding?.tablet?.top || 30 }px ${ padding?.tablet?.right || 24 }px ${ padding?.tablet?.bottom || 30 }px ${ padding?.tablet?.left || 24 }px`,
		'--mgb-info-box-padding-mobile': `${ padding?.mobile?.top || 24 }px ${ padding?.mobile?.right || 20 }px ${ padding?.mobile?.bottom || 24 }px ${ padding?.mobile?.left || 20 }px`,
		// Responsive margin
		'--mgb-info-box-margin': `${ margin?.desktop?.top || 0 }px ${ margin?.desktop?.right || 0 }px ${ margin?.desktop?.bottom || 0 }px ${ margin?.desktop?.left || 0 }px`,
		'--mgb-info-box-margin-tablet': `${ margin?.tablet?.top || 0 }px ${ margin?.tablet?.right || 0 }px ${ margin?.tablet?.bottom || 0 }px ${ margin?.tablet?.left || 0 }px`,
		'--mgb-info-box-margin-mobile': `${ margin?.mobile?.top || 0 }px ${ margin?.mobile?.right || 0 }px ${ margin?.mobile?.bottom || 0 }px ${ margin?.mobile?.left || 0 }px`,
		// Responsive spacing
		'--mgb-info-box-icon-margin': `${ iconSpacing?.desktop || iconSpacing || 20 }px`,
		'--mgb-info-box-icon-margin-tablet': `${ iconSpacing?.tablet || iconSpacing?.desktop || iconSpacing || 18 }px`,
		'--mgb-info-box-icon-margin-mobile': `${ iconSpacing?.mobile || iconSpacing?.desktop || iconSpacing || 16 }px`,
		'--mgb-info-box-title-margin': `${ titleSpacing?.desktop || titleSpacing || 16 }px`,
		'--mgb-info-box-title-margin-tablet': `${ titleSpacing?.tablet || titleSpacing?.desktop || titleSpacing || 14 }px`,
		'--mgb-info-box-title-margin-mobile': `${ titleSpacing?.mobile || titleSpacing?.desktop || titleSpacing || 12 }px`,
		'--mgb-info-box-content-margin': `${ contentSpacing?.desktop || contentSpacing || 16 }px`,
		'--mgb-info-box-content-margin-tablet': `${ contentSpacing?.tablet || contentSpacing?.desktop || contentSpacing || 14 }px`,
		'--mgb-info-box-content-margin-mobile': `${ contentSpacing?.mobile || contentSpacing?.desktop || contentSpacing || 12 }px`,
	};

	if ( titleTypography?.fontFamily ) {
		inlineStyles[ '--mgb-info-box-title-family' ] = titleTypography.fontFamily;
	}
	if ( contentTypography?.fontFamily ) {
		inlineStyles[ '--mgb-info-box-content-family' ] = contentTypography.fontFamily;
	}
	if ( linkTypography?.fontFamily ) {
		inlineStyles[ '--mgb-info-box-link-family' ] = linkTypography.fontFamily;
	}

	const blockProps = useBlockProps( {
		className: classNames(
			'mgb-info-box',
			`mgb-info-box-${ blockId }`,
			`mgb-icon-position-${ iconPosition }`,
			`mgb-align-${ alignment }`,
			hoverAnimation !== 'none' && `mgb-hover-${ hoverAnimation }`
		),
		style: inlineStyles,
	} );

	const TitleTag = titleTag;

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
											] }
											onChange={ ( value ) => setAttributes( { titleTag: value } ) }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Link', 'magical-blocks' ) } initialOpen={ false }>
										<ToggleControl
											label={ __( 'Show Link', 'magical-blocks' ) }
											checked={ showLink }
											onChange={ ( value ) => setAttributes( { showLink: value } ) }
										/>
										{ showLink && (
											<>
												<TextControl
													label={ __( 'Link Text', 'magical-blocks' ) }
													value={ linkText }
													onChange={ ( value ) => setAttributes( { linkText: value } ) }
												/>
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
											</>
										) }
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
													value={ parseInt( iconSize?.[ device ] || iconSize?.desktop || 50 ) }
													onChange={ ( value ) =>
														setAttributes( {
															iconSize: {
																...iconSize,
																[ device ]: String( value ),
															},
														} )
													}
													min={ 20 }
													max={ 150 }
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
										/>
										<RangeControl
											label={ __( 'Padding', 'magical-blocks' ) }
											value={ parseInt( iconPadding ) }
											onChange={ ( value ) => setAttributes( { iconPadding: String( value ) } ) }
											min={ 0 }
											max={ 60 }
										/>
										<ResponsiveControl label={ __( 'Icon Spacing', 'magical-blocks' ) }>
											{ ( device ) => (
												<RangeControl
													value={ parseInt( iconSpacing?.[ device ] || iconSpacing?.desktop || iconSpacing || 20 ) }
													onChange={ ( value ) =>
														setAttributes( {
															iconSpacing: {
																...( typeof iconSpacing === 'object' ? iconSpacing : { desktop: iconSpacing, tablet: iconSpacing, mobile: iconSpacing } ),
																[ device ]: String( value ),
															},
														} )
													}
													min={ 0 }
													max={ 60 }
												/>
											) }
										</ResponsiveControl>
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
													max={ 60 }
												/>
											) }
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={ __( 'Content Style', 'magical-blocks' ) } initialOpen={ false }>
										<TypographyControl
											value={ contentTypography }
											onChange={ ( value ) => setAttributes( { contentTypography: value } ) }
										/>
										<ColorControl
											label={ __( 'Content Color', 'magical-blocks' ) }
											value={ contentColor }
											onChange={ ( value ) => setAttributes( { contentColor: value } ) }
										/>
										<ResponsiveControl label={ __( 'Content Spacing', 'magical-blocks' ) }>
											{ ( device ) => (
												<RangeControl
													value={ parseInt( contentSpacing?.[ device ] || contentSpacing?.desktop || contentSpacing || 16 ) }
													onChange={ ( value ) =>
														setAttributes( {
															contentSpacing: {
																...( typeof contentSpacing === 'object' ? contentSpacing : { desktop: contentSpacing, tablet: contentSpacing, mobile: contentSpacing } ),
																[ device ]: String( value ),
															},
														} )
													}
													min={ 0 }
													max={ 60 }
												/>
											) }
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={ __( 'Link Style', 'magical-blocks' ) } initialOpen={ false }>
										<TypographyControl
											value={ linkTypography }
											onChange={ ( value ) => setAttributes( { linkTypography: value } ) }
										/>
										<ColorControl
											label={ __( 'Link Color', 'magical-blocks' ) }
											value={ linkColor }
											onChange={ ( value ) => setAttributes( { linkColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Link Hover Color', 'magical-blocks' ) }
											value={ linkHoverColor }
											onChange={ ( value ) => setAttributes( { linkHoverColor: value } ) }
										/>
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
											max={ 50 }
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
				<div className="mgb-info-box-inner">
					<div className="mgb-info-box-icon">
						{ icon && getIconSvg( icon ) ? (
							<span
								className="mgb-info-box-icon-svg"
								dangerouslySetInnerHTML={ { __html: getIconSvg( icon ) } }
							/>
						) : (
							<IconPicker
								value={ icon }
								onChange={ ( newIcon ) => setAttributes( { icon: newIcon } ) }
							/>
						) }
					</div>
					<div className="mgb-info-box-content">
						<RichText
							tagName={ TitleTag }
							className="mgb-info-box-title"
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder={ __( 'Info Box Title', 'magical-blocks' ) }
						/>
						<RichText
							tagName="p"
							className="mgb-info-box-text"
							value={ content }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							placeholder={ __( 'Add content...', 'magical-blocks' ) }
						/>
						{ showLink && (
							<div className="mgb-info-box-link-wrapper">
								<RichText
									tagName="span"
									className="mgb-info-box-link"
									value={ linkText }
									onChange={ ( value ) => setAttributes( { linkText: value } ) }
									placeholder={ __( 'Learn More', 'magical-blocks' ) }
								/>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
									<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
								</svg>
							</div>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
