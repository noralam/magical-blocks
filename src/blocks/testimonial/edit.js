/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
	TextControl,
	Button,
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

/**
 * Editor styles
 */
import './editor.scss';

/**
 * Star Rating Component
 */
const StarRating = ( { rating, color = '#ffc107', size = 16 } ) => {
	const stars = [];
	for ( let i = 1; i <= 5; i++ ) {
		const filled = i <= rating;
		stars.push(
			<svg
				key={ i }
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width={ size }
				height={ size }
				fill={ filled ? color : '#e0e0e0' }
			>
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
		);
	}
	return <div className="mgb-testimonial-rating">{ stars }</div>;
};

/**
 * Quote Icon Component
 */
const QuoteIcon = ( { color = '#4b1ab3', size = 40 } ) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width={ size }
		height={ size }
		fill={ color }
		className="mgb-testimonial-quote-icon"
	>
		<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
	</svg>
);

/**
 * Edit component
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		blockId,
		content,
		authorName,
		authorRole,
		avatarUrl,
		avatarId,
		rating,
		showRating,
		showQuoteIcon,
		layout,
		alignment,
		avatarSize,
		avatarBorderRadius,
		avatarBorderWidth,
		avatarBorderColor,
		contentColor,
		authorNameColor,
		authorRoleColor,
		ratingColor,
		quoteIconColor,
		quoteIconSize,
		contentTypography,
		authorNameTypography,
		authorRoleTypography,
		boxBackgroundColor,
		boxBorderColor,
		boxBorderWidth,
		boxBorderRadius,
		boxShadow,
		padding,
		margin,
		contentSpacing,
		authorSpacing,
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
		'--mgb-testimonial-content-color': contentColor,
		'--mgb-testimonial-content-size': `${ contentTypography?.fontSize?.desktop || 18 }px`,
		'--mgb-testimonial-content-size-tablet': `${ contentTypography?.fontSize?.tablet || 16 }px`,
		'--mgb-testimonial-content-size-mobile': `${ contentTypography?.fontSize?.mobile || 15 }px`,
		'--mgb-testimonial-content-weight': contentTypography?.fontWeight || '400',
		'--mgb-testimonial-content-style': contentTypography?.fontStyle || 'italic',
		'--mgb-testimonial-content-line-height': contentTypography?.lineHeight || '1.7',
		'--mgb-testimonial-content-spacing': contentTypography?.letterSpacing ? `${ contentTypography.letterSpacing }px` : '0',
		'--mgb-testimonial-content-transform': contentTypography?.textTransform || 'none',
		'--mgb-testimonial-author-name-color': authorNameColor,
		'--mgb-testimonial-author-name-size': `${ authorNameTypography?.fontSize?.desktop || 18 }px`,
		'--mgb-testimonial-author-name-size-tablet': `${ authorNameTypography?.fontSize?.tablet || 16 }px`,
		'--mgb-testimonial-author-name-size-mobile': `${ authorNameTypography?.fontSize?.mobile || 15 }px`,
		'--mgb-testimonial-author-name-weight': authorNameTypography?.fontWeight || '600',
		'--mgb-testimonial-author-name-line-height': authorNameTypography?.lineHeight || '1.4',
		'--mgb-testimonial-author-name-transform': authorNameTypography?.textTransform || 'none',
		'--mgb-testimonial-author-role-color': authorRoleColor,
		'--mgb-testimonial-author-role-size': `${ authorRoleTypography?.fontSize?.desktop || 14 }px`,
		'--mgb-testimonial-author-role-size-tablet': `${ authorRoleTypography?.fontSize?.tablet || 13 }px`,
		'--mgb-testimonial-author-role-size-mobile': `${ authorRoleTypography?.fontSize?.mobile || 12 }px`,
		'--mgb-testimonial-author-role-weight': authorRoleTypography?.fontWeight || '400',
		'--mgb-testimonial-author-role-transform': authorRoleTypography?.textTransform || 'none',
		'--mgb-testimonial-rating-color': ratingColor,
		'--mgb-testimonial-quote-color': quoteIconColor,
		'--mgb-testimonial-quote-size': `${ quoteIconSize || 40 }px`,
		'--mgb-testimonial-avatar-size': `${ avatarSize?.desktop || 80 }px`,
		'--mgb-testimonial-avatar-size-tablet': `${ avatarSize?.tablet || 70 }px`,
		'--mgb-testimonial-avatar-size-mobile': `${ avatarSize?.mobile || 60 }px`,
		'--mgb-testimonial-avatar-radius': avatarBorderRadius,
		'--mgb-testimonial-avatar-border-width': `${ avatarBorderWidth || 3 }px`,
		'--mgb-testimonial-avatar-border-color': avatarBorderColor,
		'--mgb-testimonial-bg': boxBackgroundColor || '#ffffff',
		'--mgb-testimonial-border-color': boxBorderColor || '#e0e0e0',
		'--mgb-testimonial-border-width': `${ boxBorderWidth || 1 }px`,
		'--mgb-testimonial-border-radius': `${ boxBorderRadius || 12 }px`,
		'--mgb-testimonial-shadow': getBoxShadowStyle( boxShadow ),
		'--mgb-testimonial-padding': `${ padding?.desktop?.top || 40 }px ${ padding?.desktop?.right || 40 }px ${ padding?.desktop?.bottom || 40 }px ${ padding?.desktop?.left || 40 }px`,
		'--mgb-testimonial-padding-tablet': `${ padding?.tablet?.top || 30 }px ${ padding?.tablet?.right || 30 }px ${ padding?.tablet?.bottom || 30 }px ${ padding?.tablet?.left || 30 }px`,
		'--mgb-testimonial-padding-mobile': `${ padding?.mobile?.top || 24 }px ${ padding?.mobile?.right || 24 }px ${ padding?.mobile?.bottom || 24 }px ${ padding?.mobile?.left || 24 }px`,
		'--mgb-testimonial-margin': `${ margin?.desktop?.top || 0 }px ${ margin?.desktop?.right || 0 }px ${ margin?.desktop?.bottom || 0 }px ${ margin?.desktop?.left || 0 }px`,
		'--mgb-testimonial-margin-tablet': `${ margin?.tablet?.top || 0 }px ${ margin?.tablet?.right || 0 }px ${ margin?.tablet?.bottom || 0 }px ${ margin?.tablet?.left || 0 }px`,
		'--mgb-testimonial-margin-mobile': `${ margin?.mobile?.top || 0 }px ${ margin?.mobile?.right || 0 }px ${ margin?.mobile?.bottom || 0 }px ${ margin?.mobile?.left || 0 }px`,
		'--mgb-testimonial-content-margin': `${ contentSpacing?.desktop || 24 }px`,
		'--mgb-testimonial-content-margin-tablet': `${ contentSpacing?.tablet || 20 }px`,
		'--mgb-testimonial-content-margin-mobile': `${ contentSpacing?.mobile || 16 }px`,
		'--mgb-testimonial-author-margin': `${ authorSpacing?.desktop || 8 }px`,
		'--mgb-testimonial-author-margin-tablet': `${ authorSpacing?.tablet || 6 }px`,
		'--mgb-testimonial-author-margin-mobile': `${ authorSpacing?.mobile || 4 }px`,
	};

	if ( contentTypography?.fontFamily ) {
		inlineStyles[ '--mgb-testimonial-content-family' ] = contentTypography.fontFamily;
	}
	if ( authorNameTypography?.fontFamily ) {
		inlineStyles[ '--mgb-testimonial-author-name-family' ] = authorNameTypography.fontFamily;
	}
	if ( authorRoleTypography?.fontFamily ) {
		inlineStyles[ '--mgb-testimonial-author-role-family' ] = authorRoleTypography.fontFamily;
	}

	const blockProps = useBlockProps( {
		className: classNames(
			'mgb-testimonial',
			`mgb-testimonial-${ blockId }`,
			`mgb-testimonial-layout-${ layout }`,
			`mgb-align-${ alignment }`
		),
		style: inlineStyles,
	} );

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
									<PanelBody title={ __( 'Avatar', 'magical-blocks' ) }>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) =>
													setAttributes( {
														avatarUrl: media.url,
														avatarId: media.id,
													} )
												}
												allowedTypes={ [ 'image' ] }
												value={ avatarId }
												render={ ( { open } ) => (
													<div className="mgb-media-upload">
														{ avatarUrl ? (
															<>
																<img src={ avatarUrl } alt="" />
																<div className="mgb-media-upload-actions">
																	<Button onClick={ open } variant="secondary">
																		{ __( 'Replace', 'magical-blocks' ) }
																	</Button>
																	<Button
																		onClick={ () =>
																			setAttributes( {
																				avatarUrl: '',
																				avatarId: 0,
																			} )
																		}
																		variant="secondary"
																		isDestructive
																	>
																		{ __( 'Remove', 'magical-blocks' ) }
																	</Button>
																</div>
															</>
														) : (
															<Button onClick={ open } variant="secondary">
																{ __( 'Upload Avatar', 'magical-blocks' ) }
															</Button>
														) }
													</div>
												) }
											/>
										</MediaUploadCheck>
									</PanelBody>

									<PanelBody title={ __( 'Rating', 'magical-blocks' ) } initialOpen={ false }>
										<ToggleControl
											label={ __( 'Show Rating', 'magical-blocks' ) }
											checked={ showRating }
											onChange={ ( value ) => setAttributes( { showRating: value } ) }
										/>
										{ showRating && (
											<RangeControl
												label={ __( 'Rating', 'magical-blocks' ) }
												value={ rating }
												onChange={ ( value ) => setAttributes( { rating: value } ) }
												min={ 0 }
												max={ 5 }
												step={ 1 }
											/>
										) }
									</PanelBody>

									<PanelBody title={ __( 'Layout', 'magical-blocks' ) } initialOpen={ false }>
										<SelectControl
											label={ __( 'Layout', 'magical-blocks' ) }
											value={ layout }
											options={ [
												{ label: __( 'Default', 'magical-blocks' ), value: 'default' },
												{ label: __( 'Bubble', 'magical-blocks' ), value: 'bubble' },
												{ label: __( 'Card', 'magical-blocks' ), value: 'card' },
												{ label: __( 'Minimal', 'magical-blocks' ), value: 'minimal' },
											] }
											onChange={ ( value ) => setAttributes( { layout: value } ) }
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
										<ToggleControl
											label={ __( 'Show Quote Icon', 'magical-blocks' ) }
											checked={ showQuoteIcon }
											onChange={ ( value ) => setAttributes( { showQuoteIcon: value } ) }
										/>
									</PanelBody>
								</>
							);
						}

						if ( tab.name === 'style' ) {
							return (
								<>
									<PanelBody title={ __( 'Avatar Style', 'magical-blocks' ) }>
										<ResponsiveControl label={ __( 'Avatar Size', 'magical-blocks' ) }>
											{ ( device ) => (
												<RangeControl
													value={ parseInt( avatarSize?.[ device ] || avatarSize?.desktop || 80 ) }
													onChange={ ( value ) =>
														setAttributes( {
															avatarSize: {
																...avatarSize,
																[ device ]: String( value ),
															},
														} )
													}
													min={ 40 }
													max={ 200 }
												/>
											) }
										</ResponsiveControl>
										<TextControl
											label={ __( 'Border Radius', 'magical-blocks' ) }
											value={ avatarBorderRadius }
											onChange={ ( value ) => setAttributes( { avatarBorderRadius: value } ) }
											help={ __( 'Use px, %, or any CSS value', 'magical-blocks' ) }
										/>
										<RangeControl
											label={ __( 'Border Width', 'magical-blocks' ) }
											value={ parseInt( avatarBorderWidth ) }
											onChange={ ( value ) => setAttributes( { avatarBorderWidth: String( value ) } ) }
											min={ 0 }
											max={ 10 }
										/>
										<ColorControl
											label={ __( 'Border Color', 'magical-blocks' ) }
											value={ avatarBorderColor }
											onChange={ ( value ) => setAttributes( { avatarBorderColor: value } ) }
										/>
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
													value={ parseInt( contentSpacing?.[ device ] || contentSpacing || 24 ) }
													onChange={ ( value ) => setAttributes( {
														contentSpacing: {
															...( typeof contentSpacing === 'object' ? contentSpacing : { desktop: '24', tablet: '20', mobile: '16' } ),
															[ device ]: String( value )
														}
													} ) }
													min={ 0 }
													max={ 100 }
												/>
											) }
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={ __( 'Author Style', 'magical-blocks' ) } initialOpen={ false }>
										<TypographyControl
											label={ __( 'Name Typography', 'magical-blocks' ) }
											value={ authorNameTypography }
											onChange={ ( value ) => setAttributes( { authorNameTypography: value } ) }
										/>
										<ColorControl
											label={ __( 'Name Color', 'magical-blocks' ) }
											value={ authorNameColor }
											onChange={ ( value ) => setAttributes( { authorNameColor: value } ) }
										/>
										<TypographyControl
											label={ __( 'Role Typography', 'magical-blocks' ) }
											value={ authorRoleTypography }
											onChange={ ( value ) => setAttributes( { authorRoleTypography: value } ) }
										/>
										<ColorControl
											label={ __( 'Role Color', 'magical-blocks' ) }
											value={ authorRoleColor }
											onChange={ ( value ) => setAttributes( { authorRoleColor: value } ) }
										/>
										<ResponsiveControl label={ __( 'Author Spacing', 'magical-blocks' ) }>
											{ ( device ) => (
												<RangeControl
													value={ parseInt( authorSpacing?.[ device ] || authorSpacing || 8 ) }
													onChange={ ( value ) => setAttributes( {
														authorSpacing: {
															...( typeof authorSpacing === 'object' ? authorSpacing : { desktop: '8', tablet: '6', mobile: '4' } ),
															[ device ]: String( value )
														}
													} ) }
													min={ 0 }
													max={ 50 }
												/>
											) }
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={ __( 'Rating & Quote Style', 'magical-blocks' ) } initialOpen={ false }>
										<ColorControl
											label={ __( 'Rating Color', 'magical-blocks' ) }
											value={ ratingColor }
											onChange={ ( value ) => setAttributes( { ratingColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Quote Icon Color', 'magical-blocks' ) }
											value={ quoteIconColor }
											onChange={ ( value ) => setAttributes( { quoteIconColor: value } ) }
										/>
										<RangeControl
											label={ __( 'Quote Icon Size', 'magical-blocks' ) }
											value={ parseInt( quoteIconSize ) }
											onChange={ ( value ) => setAttributes( { quoteIconSize: String( value ) } ) }
											min={ 20 }
											max={ 100 }
										/>
									</PanelBody>

									<PanelBody title={ __( 'Box Style', 'magical-blocks' ) } initialOpen={ false }>
										<ColorControl
											label={ __( 'Background Color', 'magical-blocks' ) }
											value={ boxBackgroundColor }
											onChange={ ( value ) => setAttributes( { boxBackgroundColor: value } ) }
										/>
										<ColorControl
											label={ __( 'Border Color', 'magical-blocks' ) }
											value={ boxBorderColor }
											onChange={ ( value ) => setAttributes( { boxBorderColor: value } ) }
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
								</>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ showQuoteIcon && (
					<QuoteIcon color={ quoteIconColor } size={ parseInt( quoteIconSize ) } />
				) }

				<div className="mgb-testimonial-content-wrapper">
					<RichText
						tagName="blockquote"
						className="mgb-testimonial-content"
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						placeholder={ __( 'Add testimonial content...', 'magical-blocks' ) }
					/>
				</div>

				{ showRating && <StarRating rating={ rating } color={ ratingColor } /> }

				<div className="mgb-testimonial-author">
					{ avatarUrl && (
						<div className="mgb-testimonial-avatar">
							<img src={ avatarUrl } alt={ authorName } />
						</div>
					) }
					<div className="mgb-testimonial-author-info">
						<RichText
							tagName="cite"
							className="mgb-testimonial-author-name"
							value={ authorName }
							onChange={ ( value ) => setAttributes( { authorName: value } ) }
							placeholder={ __( 'Author Name', 'magical-blocks' ) }
						/>
						<RichText
							tagName="span"
							className="mgb-testimonial-author-role"
							value={ authorRole }
							onChange={ ( value ) => setAttributes( { authorRole: value } ) }
							placeholder={ __( 'Author Role', 'magical-blocks' ) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
