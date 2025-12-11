/**
 * Progress Bar Block - Save Component
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { classNames } from '../../common/utils';

export default function save({ attributes }) {
	const {
		title,
		percentage,
		showPercentage,
		percentagePosition,
		barHeight,
		barColor,
		barGradient,
		backgroundColor,
		titleColor,
		percentageColor,
		borderRadius,
		animationDuration,
		striped,
		animated,
	} = attributes;

	// Build inline styles
	const progressStyles = {
		'--mgb-progress-bar-color': barGradient || barColor || undefined,
		'--mgb-progress-bg-color': backgroundColor || undefined,
		'--mgb-progress-height': barHeight || undefined,
		'--mgb-progress-radius': borderRadius || undefined,
		'--mgb-progress-title-color': titleColor || undefined,
		'--mgb-progress-percentage-color': percentageColor || undefined,
		'--mgb-progress-value': `${percentage}%`,
		'--mgb-progress-duration': `${animationDuration}ms`,
	};

	const blockProps = useBlockProps.save({
		className: classNames(
			'mgb-progress-bar',
			`mgb-progress-bar--percentage-${percentagePosition}`,
			striped && 'mgb-progress-bar--striped',
			animated && 'mgb-progress-bar--animated'
		),
		style: progressStyles,
	});

	return (
		<div {...blockProps} data-percentage={percentage} data-duration={animationDuration}>
			<div className="mgb-progress-bar-header">
				{title && (
					<RichText.Content
						tagName="span"
						className="mgb-progress-bar-title"
						value={title}
					/>
				)}

				{showPercentage && percentagePosition === 'title' && (
					<span className="mgb-progress-bar-percentage">{percentage}%</span>
				)}
			</div>

			{showPercentage && percentagePosition === 'above' && (
				<div className="mgb-progress-bar-percentage-above">
					<span className="mgb-progress-bar-percentage">{percentage}%</span>
				</div>
			)}

			<div className="mgb-progress-bar-track">
				<div className="mgb-progress-bar-fill" data-width={percentage}>
					{showPercentage && percentagePosition === 'inside' && (
						<span className="mgb-progress-bar-percentage">{percentage}%</span>
					)}
				</div>
			</div>
		</div>
	);
}
