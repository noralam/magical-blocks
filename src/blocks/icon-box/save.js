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

	const blockProps = useBlockProps.save( {
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

	const content = (
		<div className="mgb-icon-box-inner">
			<div className="mgb-icon-box-icon">
				{ iconSvg && (
					<span
						className="mgb-icon-box-icon-svg"
						dangerouslySetInnerHTML={ { __html: iconSvg } }
					/>
				) }
			</div>
			<div className="mgb-icon-box-content">
				{ title && (
					<RichText.Content
						tagName={ TitleTag }
						className="mgb-icon-box-title"
						value={ title }
					/>
				) }
				{ description && (
					<RichText.Content
						tagName="p"
						className="mgb-icon-box-description"
						value={ description }
					/>
				) }
			</div>
		</div>
	);

	return (
		<div { ...blockProps }>
			{ linkUrl ? (
				<a
					href={ linkUrl }
					className="mgb-icon-box-link"
					target={ linkTarget ? '_blank' : undefined }
					rel={ linkTarget ? 'noopener noreferrer' : undefined }
				>
					{ content }
				</a>
			) : (
				content
			) }
		</div>
	);
}
