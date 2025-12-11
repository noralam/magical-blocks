/**
 * Counter Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { classNames } from '../../common/utils';

export default function save({ attributes }) {
	const {
		startNumber,
		endNumber,
		duration,
		prefix,
		suffix,
		title,
		titlePosition,
		thousandsSeparator,
		decimalPlaces,
		numberColor,
		numberSize,
		prefixSuffixColor,
		prefixSuffixSize,
		titleColor,
		titleSize,
		alignment,
	} = attributes;

	// Build inline styles
	const counterStyles = {
		'--mgb-counter-number-color': numberColor || undefined,
		'--mgb-counter-number-size': numberSize || undefined,
		'--mgb-counter-prefix-color': prefixSuffixColor || undefined,
		'--mgb-counter-prefix-size': prefixSuffixSize || undefined,
		'--mgb-counter-title-color': titleColor || undefined,
		'--mgb-counter-title-size': titleSize || undefined,
		'--mgb-counter-alignment': alignment || undefined,
	};

	const blockProps = useBlockProps.save({
		className: classNames(
			'mgb-counter',
			`mgb-counter--align-${alignment}`,
			`mgb-counter--title-${titlePosition}`
		),
		style: counterStyles,
	});

	// Data attributes for frontend animation
	const dataAttrs = {
		'data-start': startNumber,
		'data-end': endNumber,
		'data-duration': duration,
		'data-separator': thousandsSeparator,
		'data-decimals': decimalPlaces,
	};

	return (
		<div {...blockProps} {...dataAttrs}>
			{titlePosition === 'top' && title && (
				<RichText.Content tagName="div" className="mgb-counter-title" value={title} />
			)}

			<div className="mgb-counter-number-wrapper">
				{prefix && <span className="mgb-counter-prefix">{prefix}</span>}
				<span className="mgb-counter-number" data-value={endNumber}>
					{startNumber}
				</span>
				{suffix && <span className="mgb-counter-suffix">{suffix}</span>}
			</div>

			{titlePosition === 'bottom' && title && (
				<RichText.Content tagName="div" className="mgb-counter-title" value={title} />
			)}
		</div>
	);
}
