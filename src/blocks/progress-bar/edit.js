/**
 * Progress Bar Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { generateBlockId, classNames } from '../../common/utils';
import { ColorControl, ResponsiveControl } from '../../components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
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

	// Device state for responsive controls
	const [currentDevice, setCurrentDevice] = useState('desktop');

	// Generate unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: generateBlockId('progress-bar') });
		}
	}, [blockId, setAttributes]);

	// Build inline styles with responsive CSS variables
	const progressStyles = {
		'--mgb-progress-bar-color': barGradient || barColor || undefined,
		'--mgb-progress-bg-color': backgroundColor || undefined,
		'--mgb-progress-height': barHeight?.desktop || undefined,
		'--mgb-progress-height-tablet': barHeight?.tablet || undefined,
		'--mgb-progress-height-mobile': barHeight?.mobile || undefined,
		'--mgb-progress-radius': borderRadius || undefined,
		'--mgb-progress-title-color': titleColor || undefined,
		'--mgb-progress-percentage-color': percentageColor || undefined,
		'--mgb-progress-value': `${percentage}%`,
	};

	const blockProps = useBlockProps({
		className: classNames(
			'mgb-progress-bar',
			`mgb-progress-bar--percentage-${percentagePosition}`,
			striped && 'mgb-progress-bar--striped',
			animated && 'mgb-progress-bar--animated'
		),
		style: progressStyles,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Progress Settings', 'magical-blocks')}>
					<RangeControl
						label={__('Percentage', 'magical-blocks')}
						value={percentage}
						onChange={(value) => setAttributes({ percentage: value })}
						min={0}
						max={100}
					/>

					<ToggleControl
						label={__('Show Percentage', 'magical-blocks')}
						checked={showPercentage}
						onChange={(value) => setAttributes({ showPercentage: value })}
					/>

					{showPercentage && (
						<SelectControl
							label={__('Percentage Position', 'magical-blocks')}
							value={percentagePosition}
							options={[
								{ label: __('Inside Bar', 'magical-blocks'), value: 'inside' },
								{ label: __('Above Bar', 'magical-blocks'), value: 'above' },
								{ label: __('After Title', 'magical-blocks'), value: 'title' },
							]}
							onChange={(value) => setAttributes({ percentagePosition: value })}
						/>
					)}
				</PanelBody>

				<PanelBody title={__('Bar Style', 'magical-blocks')} initialOpen={false}>
					<ResponsiveControl
						label={__('Bar Height', 'magical-blocks')}
						device={currentDevice}
						onDeviceChange={setCurrentDevice}
					>
						{(device) => (
							<UnitControl
								value={barHeight?.[device] || ''}
								onChange={(value) => setAttributes({
									barHeight: { ...barHeight, [device]: value }
								})}
								units={[
									{ value: 'px', label: 'px' },
									{ value: 'em', label: 'em' },
								]}
							/>
						)}
					</ResponsiveControl>

					<UnitControl
						label={__('Border Radius', 'magical-blocks')}
						value={borderRadius}
						onChange={(value) => setAttributes({ borderRadius: value })}
					/>

					<ToggleControl
						label={__('Striped', 'magical-blocks')}
						checked={striped}
						onChange={(value) => setAttributes({ striped: value })}
					/>

					{striped && (
						<ToggleControl
							label={__('Animated Stripes', 'magical-blocks')}
							checked={animated}
							onChange={(value) => setAttributes({ animated: value })}
						/>
					)}

					<RangeControl
						label={__('Animation Duration (ms)', 'magical-blocks')}
						value={animationDuration}
						onChange={(value) => setAttributes({ animationDuration: value })}
						min={500}
						max={3000}
						step={100}
					/>
				</PanelBody>

				<PanelBody title={__('Colors', 'magical-blocks')} initialOpen={false}>
					<ColorControl
						label={__('Bar Color', 'magical-blocks')}
						value={barColor}
						onChange={(value) => setAttributes({ barColor: value })}
					/>

					<ColorControl
						label={__('Background Color', 'magical-blocks')}
						value={backgroundColor}
						onChange={(value) => setAttributes({ backgroundColor: value })}
					/>

					<ColorControl
						label={__('Title Color', 'magical-blocks')}
						value={titleColor}
						onChange={(value) => setAttributes({ titleColor: value })}
					/>

					<ColorControl
						label={__('Percentage Color', 'magical-blocks')}
						value={percentageColor}
						onChange={(value) => setAttributes({ percentageColor: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mgb-progress-bar-header">
					<RichText
						tagName="span"
						className="mgb-progress-bar-title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Skill Name', 'magical-blocks')}
					/>

					{showPercentage && percentagePosition === 'title' && (
						<span className="mgb-progress-bar-percentage">{percentage}%</span>
					)}
				</div>

				{showPercentage && percentagePosition === 'above' && (
					<div className="mgb-progress-bar-percentage-above">
						<span className="mgb-progress-bar-percentage" style={{ left: `${percentage}%` }}>
							{percentage}%
						</span>
					</div>
				)}

				<div className="mgb-progress-bar-track">
					<div
						className="mgb-progress-bar-fill"
						style={{ width: `${percentage}%` }}
					>
						{showPercentage && percentagePosition === 'inside' && (
							<span className="mgb-progress-bar-percentage">{percentage}%</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
