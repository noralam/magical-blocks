/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { classNames } from '../../common/utils';

/**
 * Star Rating Component
 */
const StarRating = ( { rating, color = '#ffc107' } ) => {
	const stars = [];
	for ( let i = 1; i <= 5; i++ ) {
		const filled = i <= rating;
		stars.push(
			<svg
				key={ i }
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="16"
				height="16"
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
const QuoteIcon = ( { color = '#4b1ab3' } ) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill={ color }
		className="mgb-testimonial-quote-icon"
	>
		<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
	</svg>
);

/**
 * Save component
 */
export default function save( { attributes } ) {
	const {
		blockId,
		content,
		authorName,
		authorRole,
		avatarUrl,
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

	const blockProps = useBlockProps.save( {
		className: classNames(
			'mgb-testimonial',
			`mgb-testimonial-${ blockId }`,
			`mgb-testimonial-layout-${ layout }`,
			`mgb-align-${ alignment }`
		),
		style: inlineStyles,
	} );

	return (
		<div { ...blockProps }>
			{ showQuoteIcon && <QuoteIcon color={ quoteIconColor } /> }

			<div className="mgb-testimonial-content-wrapper">
				{ content && (
					<RichText.Content
						tagName="blockquote"
						className="mgb-testimonial-content"
						value={ content }
					/>
				) }
			</div>

			{ showRating && <StarRating rating={ rating } color={ ratingColor } /> }

			<div className="mgb-testimonial-author">
				{ avatarUrl && (
					<div className="mgb-testimonial-avatar">
						<img src={ avatarUrl } alt={ authorName } />
					</div>
				) }
				<div className="mgb-testimonial-author-info">
					{ authorName && (
						<RichText.Content
							tagName="cite"
							className="mgb-testimonial-author-name"
							value={ authorName }
						/>
					) }
					{ authorRole && (
						<RichText.Content
							tagName="span"
							className="mgb-testimonial-author-role"
							value={ authorRole }
						/>
					) }
				</div>
			</div>
		</div>
	);
}
