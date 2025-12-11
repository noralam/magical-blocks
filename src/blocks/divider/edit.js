/**
 * Divider Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	AlignmentToolbar,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { generateBlockId, classNames } from '../../common/utils';
import { ColorControl, IconPicker, ResponsiveControl } from '../../components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
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

	// Device state for responsive controls
	const [currentDevice, setCurrentDevice] = useState('desktop');

	// Generate unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: generateBlockId('divider') });
		}
	}, [blockId, setAttributes]);

	// Build inline styles with responsive CSS variables
	const dividerStyles = {
		'--mgb-divider-width': width || undefined,
		'--mgb-divider-weight': weight || undefined,
		'--mgb-divider-color': color || undefined,
		'--mgb-divider-spacing-top': spacingTop?.desktop || undefined,
		'--mgb-divider-spacing-top-tablet': spacingTop?.tablet || undefined,
		'--mgb-divider-spacing-top-mobile': spacingTop?.mobile || undefined,
		'--mgb-divider-spacing-bottom': spacingBottom?.desktop || undefined,
		'--mgb-divider-spacing-bottom-tablet': spacingBottom?.tablet || undefined,
		'--mgb-divider-spacing-bottom-mobile': spacingBottom?.mobile || undefined,
		'--mgb-divider-icon-size': iconSize?.desktop || undefined,
		'--mgb-divider-icon-size-tablet': iconSize?.tablet || undefined,
		'--mgb-divider-icon-size-mobile': iconSize?.mobile || undefined,
		'--mgb-divider-icon-color': iconColor || undefined,
		'--mgb-divider-text-color': textColor || undefined,
		'--mgb-divider-text-size': textSize?.desktop || undefined,
		'--mgb-divider-text-size-tablet': textSize?.tablet || undefined,
		'--mgb-divider-text-size-mobile': textSize?.mobile || undefined,
		'--mgb-divider-element-bg': elementBackground || undefined,
	};

	const blockProps = useBlockProps({
		className: classNames(
			'mgb-divider',
			`mgb-divider--style-${style}`,
			`mgb-divider--align-${alignment}`,
			addElement !== 'none' && `mgb-divider--has-element`
		),
		style: dividerStyles,
	});

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={(value) => setAttributes({ alignment: value || 'center' })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Divider Style', 'magical-blocks')}>
					<SelectControl
						label={__('Style', 'magical-blocks')}
						value={style}
						options={[
							{ label: __('Solid', 'magical-blocks'), value: 'solid' },
							{ label: __('Dashed', 'magical-blocks'), value: 'dashed' },
							{ label: __('Dotted', 'magical-blocks'), value: 'dotted' },
							{ label: __('Double', 'magical-blocks'), value: 'double' },
							{ label: __('Gradient', 'magical-blocks'), value: 'gradient' },
						]}
						onChange={(value) => setAttributes({ style: value })}
					/>

					<UnitControl
						label={__('Width', 'magical-blocks')}
						value={width}
						onChange={(value) => setAttributes({ width: value })}
						units={[
							{ value: '%', label: '%' },
							{ value: 'px', label: 'px' },
						]}
					/>

					<UnitControl
						label={__('Weight (Thickness)', 'magical-blocks')}
						value={weight}
						onChange={(value) => setAttributes({ weight: value })}
						units={[{ value: 'px', label: 'px' }]}
					/>

					<ColorControl
						label={__('Color', 'magical-blocks')}
						value={color}
						onChange={(value) => setAttributes({ color: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Spacing', 'magical-blocks')} initialOpen={false}>
					<ResponsiveControl
						label={__('Spacing Top', 'magical-blocks')}
						device={currentDevice}
						onDeviceChange={setCurrentDevice}
					>
						{(device) => (
							<UnitControl
								value={spacingTop?.[device] || ''}
								onChange={(value) => setAttributes({
									spacingTop: { ...spacingTop, [device]: value }
								})}
							/>
						)}
					</ResponsiveControl>

					<ResponsiveControl
						label={__('Spacing Bottom', 'magical-blocks')}
						device={currentDevice}
						onDeviceChange={setCurrentDevice}
					>
						{(device) => (
							<UnitControl
								value={spacingBottom?.[device] || ''}
								onChange={(value) => setAttributes({
									spacingBottom: { ...spacingBottom, [device]: value }
								})}
							/>
						)}
					</ResponsiveControl>
				</PanelBody>

				<PanelBody title={__('Element', 'magical-blocks')} initialOpen={false}>
					<SelectControl
						label={__('Add Element', 'magical-blocks')}
						value={addElement}
						options={[
							{ label: __('None', 'magical-blocks'), value: 'none' },
							{ label: __('Icon', 'magical-blocks'), value: 'icon' },
							{ label: __('Text', 'magical-blocks'), value: 'text' },
						]}
						onChange={(value) => setAttributes({ addElement: value })}
					/>

					{addElement === 'icon' && (
						<>
							<IconPicker
								label={__('Icon', 'magical-blocks')}
								value={icon}
								onChange={(value) => setAttributes({ icon: value })}
							/>

							<ResponsiveControl
								label={__('Icon Size', 'magical-blocks')}
								device={currentDevice}
								onDeviceChange={setCurrentDevice}
							>
								{(device) => (
									<UnitControl
										value={iconSize?.[device] || ''}
										onChange={(value) => setAttributes({
											iconSize: { ...iconSize, [device]: value }
										})}
									/>
								)}
							</ResponsiveControl>

							<ColorControl
								label={__('Icon Color', 'magical-blocks')}
								value={iconColor}
								onChange={(value) => setAttributes({ iconColor: value })}
							/>
						</>
					)}

					{addElement === 'text' && (
						<>
							<TextControl
								label={__('Text', 'magical-blocks')}
								value={text}
								onChange={(value) => setAttributes({ text: value })}
							/>

							<ResponsiveControl
								label={__('Text Size', 'magical-blocks')}
								device={currentDevice}
								onDeviceChange={setCurrentDevice}
							>
								{(device) => (
									<UnitControl
										value={textSize?.[device] || ''}
										onChange={(value) => setAttributes({
											textSize: { ...textSize, [device]: value }
										})}
									/>
								)}
							</ResponsiveControl>

							<ColorControl
								label={__('Text Color', 'magical-blocks')}
								value={textColor}
								onChange={(value) => setAttributes({ textColor: value })}
							/>
						</>
					)}

					{addElement !== 'none' && (
						<ColorControl
							label={__('Element Background', 'magical-blocks')}
							value={elementBackground}
							onChange={(value) => setAttributes({ elementBackground: value })}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mgb-divider-line mgb-divider-line--left"></div>
				
				{addElement === 'icon' && (
					<div className="mgb-divider-element">
						<IconPicker.Preview icon={icon} />
					</div>
				)}

				{addElement === 'text' && (
					<div className="mgb-divider-element">
						<RichText
							tagName="span"
							className="mgb-divider-text"
							value={text}
							onChange={(value) => setAttributes({ text: value })}
							placeholder={__('Text…', 'magical-blocks')}
						/>
					</div>
				)}

				<div className="mgb-divider-line mgb-divider-line--right"></div>
			</div>
		</>
	);
}
