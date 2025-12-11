/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { classNames } from '../../common/utils';
import { getIconSvg } from '../../components/icon-picker/icons-data';

/**
 * Save component
 */
export default function save( { attributes } ) {
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

	const blockProps = useBlockProps.save( {
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
		<div { ...blockProps }>
			<div className="mgb-info-box-inner">
				<div className="mgb-info-box-icon">
					{ icon && getIconSvg( icon ) && (
						<span
							className="mgb-info-box-icon-svg"
							dangerouslySetInnerHTML={ { __html: getIconSvg( icon ) } }
						/>
					) }
				</div>
				<div className="mgb-info-box-content">
					{ title && (
						<RichText.Content
							tagName={ TitleTag }
							className="mgb-info-box-title"
							value={ title }
						/>
					) }
					{ content && (
						<RichText.Content
							tagName="p"
							className="mgb-info-box-text"
							value={ content }
						/>
					) }
					{ showLink && linkText && (
						<div className="mgb-info-box-link-wrapper">
							{ linkUrl ? (
								<a
									href={ linkUrl }
									className="mgb-info-box-link"
									target={ linkTarget ? '_blank' : undefined }
									rel={ linkTarget ? 'noopener noreferrer' : undefined }
								>
									{ linkText }
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
										<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
									</svg>
								</a>
							) : (
								<span className="mgb-info-box-link">
									{ linkText }
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
										<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
									</svg>
								</span>
							) }
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
