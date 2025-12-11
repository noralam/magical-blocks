/**
 * Section Block - Save Component
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { classNames } from '../../common/utils';

export default function save({ attributes }) {
	const {
		contentWidth,
		maxWidth,
		minHeight,
		verticalAlignment,
		horizontalAlignment,
		backgroundColor,
		backgroundGradient,
		backgroundImageUrl,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat,
		backgroundAttachment,
		overlayColor,
		overlayOpacity,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
		marginTop,
		marginBottom,
		borderRadius,
		boxShadow,
		htmlTag,
	} = attributes;

	// Build inline styles
	const sectionStyles = {
		'--mgb-section-bg-color': backgroundColor || undefined,
		'--mgb-section-bg-gradient': backgroundGradient || undefined,
		'--mgb-section-bg-image': backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
		'--mgb-section-bg-position': backgroundPosition || undefined,
		'--mgb-section-bg-size': backgroundSize || undefined,
		'--mgb-section-bg-repeat': backgroundRepeat || undefined,
		'--mgb-section-bg-attachment': backgroundAttachment || undefined,
		'--mgb-section-overlay-color': overlayColor || undefined,
		'--mgb-section-overlay-opacity': overlayOpacity !== undefined ? overlayOpacity / 100 : undefined,
		'--mgb-section-padding-top': paddingTop || undefined,
		'--mgb-section-padding-bottom': paddingBottom || undefined,
		'--mgb-section-padding-left': paddingLeft || undefined,
		'--mgb-section-padding-right': paddingRight || undefined,
		'--mgb-section-margin-top': marginTop || undefined,
		'--mgb-section-margin-bottom': marginBottom || undefined,
		'--mgb-section-border-radius': borderRadius || undefined,
		'--mgb-section-box-shadow': boxShadow || undefined,
		'--mgb-section-max-width': contentWidth === 'boxed' ? maxWidth : undefined,
		'--mgb-section-min-height': minHeight || undefined,
	};

	const blockProps = useBlockProps.save({
		className: classNames(
			'mgb-section',
			`mgb-section--valign-${verticalAlignment}`,
			`mgb-section--halign-${horizontalAlignment}`,
			contentWidth === 'boxed' && 'mgb-section--boxed',
			backgroundImageUrl && 'mgb-section--has-bg-image',
			overlayColor && 'mgb-section--has-overlay'
		),
		style: sectionStyles,
	});

	// Use dynamic tag
	const Tag = htmlTag || 'section';

	return (
		<Tag {...blockProps}>
			{overlayColor && <div className="mgb-section-overlay" aria-hidden="true" />}
			<div className="mgb-section-inner">
				<InnerBlocks.Content />
			</div>
		</Tag>
	);
}
