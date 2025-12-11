/**
 * Counter Block - Edit Component
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
	TextControl,
	RangeControl,
	SelectControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { generateBlockId, classNames } from '../../common/utils';
import { ColorControl, ResponsiveControl } from '../../components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
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

	// Device state for responsive controls
	const [currentDevice, setCurrentDevice] = useState('desktop');

	// Generate unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: generateBlockId('counter') });
		}
	}, [blockId, setAttributes]);

	// Format number for display
	const formatNumber = (num) => {
		const fixed = num.toFixed(decimalPlaces);
		if (thousandsSeparator) {
			const parts = fixed.split('.');
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
			return parts.join('.');
		}
		return fixed;
	};

	// Helper to get responsive value for display
	const getResponsiveValue = (obj, fallback = '') => {
		if (typeof obj === 'object' && obj !== null) {
			return obj.desktop || fallback;
		}
		return obj || fallback;
	};

	// Build inline styles with responsive CSS variables
	const counterStyles = {
		'--mgb-counter-number-color': numberColor || undefined,
		'--mgb-counter-number-size': numberSize?.desktop || undefined,
		'--mgb-counter-number-size-tablet': numberSize?.tablet || undefined,
		'--mgb-counter-number-size-mobile': numberSize?.mobile || undefined,
		'--mgb-counter-prefix-color': prefixSuffixColor || undefined,
		'--mgb-counter-prefix-size': prefixSuffixSize?.desktop || undefined,
		'--mgb-counter-prefix-size-tablet': prefixSuffixSize?.tablet || undefined,
		'--mgb-counter-prefix-size-mobile': prefixSuffixSize?.mobile || undefined,
		'--mgb-counter-title-color': titleColor || undefined,
		'--mgb-counter-title-size': titleSize?.desktop || undefined,
		'--mgb-counter-title-size-tablet': titleSize?.tablet || undefined,
		'--mgb-counter-title-size-mobile': titleSize?.mobile || undefined,
		'--mgb-counter-alignment': alignment || undefined,
	};

	const blockProps = useBlockProps({
		className: classNames(
			'mgb-counter',
			`mgb-counter--align-${alignment}`,
			`mgb-counter--title-${titlePosition}`
		),
		style: counterStyles,
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
				<PanelBody title={__('Counter Settings', 'magical-blocks')}>
					<RangeControl
						label={__('Start Number', 'magical-blocks')}
						value={startNumber}
						onChange={(value) => setAttributes({ startNumber: value })}
						min={0}
						max={1000000}
					/>

					<RangeControl
						label={__('End Number', 'magical-blocks')}
						value={endNumber}
						onChange={(value) => setAttributes({ endNumber: value })}
						min={0}
						max={1000000}
					/>

					<RangeControl
						label={__('Animation Duration (ms)', 'magical-blocks')}
						value={duration}
						onChange={(value) => setAttributes({ duration: value })}
						min={500}
						max={5000}
						step={100}
					/>

					<TextControl
						label={__('Prefix', 'magical-blocks')}
						value={prefix}
						onChange={(value) => setAttributes({ prefix: value })}
						placeholder={__('$, €, +', 'magical-blocks')}
					/>

					<TextControl
						label={__('Suffix', 'magical-blocks')}
						value={suffix}
						onChange={(value) => setAttributes({ suffix: value })}
						placeholder={__('%, K, +', 'magical-blocks')}
					/>

					<SelectControl
						label={__('Thousands Separator', 'magical-blocks')}
						value={thousandsSeparator}
						options={[
							{ label: __('Comma (1,000)', 'magical-blocks'), value: ',' },
							{ label: __('Period (1.000)', 'magical-blocks'), value: '.' },
							{ label: __('Space (1 000)', 'magical-blocks'), value: ' ' },
							{ label: __('None (1000)', 'magical-blocks'), value: '' },
						]}
						onChange={(value) => setAttributes({ thousandsSeparator: value })}
					/>

					<RangeControl
						label={__('Decimal Places', 'magical-blocks')}
						value={decimalPlaces}
						onChange={(value) => setAttributes({ decimalPlaces: value })}
						min={0}
						max={4}
					/>
				</PanelBody>

				<PanelBody title={__('Title', 'magical-blocks')} initialOpen={false}>
					<SelectControl
						label={__('Title Position', 'magical-blocks')}
						value={titlePosition}
						options={[
							{ label: __('Top', 'magical-blocks'), value: 'top' },
							{ label: __('Bottom', 'magical-blocks'), value: 'bottom' },
						]}
						onChange={(value) => setAttributes({ titlePosition: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Number Style', 'magical-blocks')} initialOpen={false}>
					<ColorControl
						label={__('Number Color', 'magical-blocks')}
						value={numberColor}
						onChange={(value) => setAttributes({ numberColor: value })}
					/>

					<ResponsiveControl
						label={__('Number Size', 'magical-blocks')}
						device={currentDevice}
						onDeviceChange={setCurrentDevice}
					>
						{(device) => (
							<UnitControl
								value={numberSize?.[device] || ''}
								onChange={(value) => setAttributes({
									numberSize: { ...numberSize, [device]: value }
								})}
								units={[
									{ value: 'px', label: 'px' },
									{ value: 'em', label: 'em' },
									{ value: 'rem', label: 'rem' },
								]}
							/>
						)}
					</ResponsiveControl>
				</PanelBody>

				<PanelBody title={__('Prefix/Suffix Style', 'magical-blocks')} initialOpen={false}>
					<ColorControl
						label={__('Prefix/Suffix Color', 'magical-blocks')}
						value={prefixSuffixColor}
						onChange={(value) => setAttributes({ prefixSuffixColor: value })}
					/>

					<ResponsiveControl
						label={__('Prefix/Suffix Size', 'magical-blocks')}
						device={currentDevice}
						onDeviceChange={setCurrentDevice}
					>
						{(device) => (
							<UnitControl
								value={prefixSuffixSize?.[device] || ''}
								onChange={(value) => setAttributes({
									prefixSuffixSize: { ...prefixSuffixSize, [device]: value }
								})}
								units={[
									{ value: 'px', label: 'px' },
									{ value: 'em', label: 'em' },
									{ value: 'rem', label: 'rem' },
								]}
							/>
						)}
					</ResponsiveControl>
				</PanelBody>

				<PanelBody title={__('Title Style', 'magical-blocks')} initialOpen={false}>
					<ColorControl
						label={__('Title Color', 'magical-blocks')}
						value={titleColor}
						onChange={(value) => setAttributes({ titleColor: value })}
					/>

					<ResponsiveControl
						label={__('Title Size', 'magical-blocks')}
						device={currentDevice}
						onDeviceChange={setCurrentDevice}
					>
						{(device) => (
							<UnitControl
								value={titleSize?.[device] || ''}
								onChange={(value) => setAttributes({
									titleSize: { ...titleSize, [device]: value }
								})}
								units={[
									{ value: 'px', label: 'px' },
									{ value: 'em', label: 'em' },
									{ value: 'rem', label: 'rem' },
								]}
							/>
						)}
					</ResponsiveControl>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{titlePosition === 'top' && (
					<RichText
						tagName="div"
						className="mgb-counter-title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Counter Title', 'magical-blocks')}
					/>
				)}

				<div className="mgb-counter-number-wrapper">
					{prefix && <span className="mgb-counter-prefix">{prefix}</span>}
					<span className="mgb-counter-number">{formatNumber(endNumber)}</span>
					{suffix && <span className="mgb-counter-suffix">{suffix}</span>}
				</div>

				{titlePosition === 'bottom' && (
					<RichText
						tagName="div"
						className="mgb-counter-title"
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Counter Title', 'magical-blocks')}
					/>
				)}
			</div>
		</>
	);
}
