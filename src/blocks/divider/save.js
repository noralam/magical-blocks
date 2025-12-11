/**
 * Divider Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { classNames } from '../../common/utils';
import { IconPicker } from '../../components';

export default function save({ attributes }) {
	const {
		style,
		width,
		weight,
		color,
		alignment,
		spacingTop,
		spacingBottom,
		addElement,
		icon,
		iconSize,
		iconColor,
		text,
		textColor,
		textSize,
		elementBackground,
	} = attributes;

	// Build inline styles
	const dividerStyles = {
		'--mgb-divider-width': width || undefined,
		'--mgb-divider-weight': weight || undefined,
		'--mgb-divider-color': color || undefined,
		'--mgb-divider-spacing-top': spacingTop || undefined,
		'--mgb-divider-spacing-bottom': spacingBottom || undefined,
		'--mgb-divider-icon-size': iconSize || undefined,
		'--mgb-divider-icon-color': iconColor || undefined,
		'--mgb-divider-text-color': textColor || undefined,
		'--mgb-divider-text-size': textSize || undefined,
		'--mgb-divider-element-bg': elementBackground || undefined,
	};

	const blockProps = useBlockProps.save({
		className: classNames(
			'mgb-divider',
			`mgb-divider--style-${style}`,
			`mgb-divider--align-${alignment}`,
			addElement !== 'none' && `mgb-divider--has-element`
		),
		style: dividerStyles,
	});

	return (
		<div {...blockProps} role="separator">
			<div className="mgb-divider-line mgb-divider-line--left" aria-hidden="true"></div>
			
			{addElement === 'icon' && (
				<div className="mgb-divider-element" aria-hidden="true">
					<IconPicker.Preview icon={icon} />
				</div>
			)}

			{addElement === 'text' && text && (
				<div className="mgb-divider-element">
					<RichText.Content tagName="span" className="mgb-divider-text" value={text} />
				</div>
			)}

			<div className="mgb-divider-line mgb-divider-line--right" aria-hidden="true"></div>
		</div>
	);
}
