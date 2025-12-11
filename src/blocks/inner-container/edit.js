/**
 * Inner Container Block - Edit Component
 *
 * A flexible inner container designed for nesting inside Container blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	ToggleControl,
	TextControl,
	Flex,
	FlexItem,
	TabPanel,
	Button,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { link as linkIcon, linkOff } from '@wordpress/icons';

import { generateBlockId, classNames } from '../../common/utils';
import { ColorControl, ResponsiveControl } from '../../components';

/**
 * Edit component for the Inner Container block.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		width,
		minWidth,
		maxWidth,
		minHeight,
		flexGrow,
		flexShrink,
		flexDirection,
		justifyContent,
		alignItems,
		flexWrap,
		gap,
		backgroundColor,
		backgroundGradient,
		gradientEnabled,
		gradientColor1,
		gradientColor2,
		gradientAngle,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingLinked,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		marginLinked,
		borderStyle,
		borderWidth,
		borderColor,
		borderRadius,
		boxShadow,
	} = attributes;

	// Generate unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: generateBlockId('inner-container') });
		}
	}, [blockId, setAttributes]);

	// Helper to get responsive value (with desktop fallback for UI display)
	const getResponsiveValue = (attr, device = 'desktop') => {
		return attr?.[device] || attr?.desktop || '';
	};

	// Helper to get raw responsive value (without fallback, for CSS output)
	const getRawResponsiveValue = (attr, device = 'desktop') => {
		return attr?.[device] || '';
	};

	// Helper to set responsive value
	const setResponsiveValue = (attrName, value, device = 'desktop') => {
		const currentAttr = attributes[attrName] || {};
		setAttributes({
			[attrName]: {
				...currentAttr,
				[device]: value,
			},
		});
	};

	// Build box shadow string
	const buildBoxShadow = (shadow) => {
		if (!shadow?.enabled) return undefined;
		const inset = shadow.inset ? 'inset ' : '';
		return `${inset}${shadow.horizontal}px ${shadow.vertical}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
	};

	// Build border radius string (with fallback for UI, without for CSS output)
	const getBorderRadiusValue = (device = 'desktop', raw = false) => {
		// For raw mode (CSS output), only use the specific device value
		// For UI mode, fallback to desktop
		const br = raw ? borderRadius?.[device] : (borderRadius?.[device] || borderRadius?.desktop);
		if (!br || (!br.top && !br.right && !br.bottom && !br.left)) return undefined;
		return `${br.top || '0px'} ${br.right || '0px'} ${br.bottom || '0px'} ${br.left || '0px'}`;
	};

	// Build inline styles with CSS variables
	const containerStyles = {
		// Size
		'--mgb-inner-width': getRawResponsiveValue(width) || undefined,
		'--mgb-inner-width-tablet': getRawResponsiveValue(width, 'tablet') || undefined,
		'--mgb-inner-width-mobile': getRawResponsiveValue(width, 'mobile') || undefined,
		'--mgb-inner-min-width': getRawResponsiveValue(minWidth) || undefined,
		'--mgb-inner-min-width-tablet': getRawResponsiveValue(minWidth, 'tablet') || undefined,
		'--mgb-inner-min-width-mobile': getRawResponsiveValue(minWidth, 'mobile') || undefined,
		'--mgb-inner-max-width': getRawResponsiveValue(maxWidth) || undefined,
		'--mgb-inner-max-width-tablet': getRawResponsiveValue(maxWidth, 'tablet') || undefined,
		'--mgb-inner-max-width-mobile': getRawResponsiveValue(maxWidth, 'mobile') || undefined,
		'--mgb-inner-min-height': getRawResponsiveValue(minHeight) || undefined,
		'--mgb-inner-min-height-tablet': getRawResponsiveValue(minHeight, 'tablet') || undefined,
		'--mgb-inner-min-height-mobile': getRawResponsiveValue(minHeight, 'mobile') || undefined,
		
		// Flex child properties
		'--mgb-inner-flex-grow': getRawResponsiveValue(flexGrow) || undefined,
		'--mgb-inner-flex-grow-tablet': getRawResponsiveValue(flexGrow, 'tablet') || undefined,
		'--mgb-inner-flex-grow-mobile': getRawResponsiveValue(flexGrow, 'mobile') || undefined,
		'--mgb-inner-flex-shrink': getRawResponsiveValue(flexShrink) || undefined,
		'--mgb-inner-flex-shrink-tablet': getRawResponsiveValue(flexShrink, 'tablet') || undefined,
		'--mgb-inner-flex-shrink-mobile': getRawResponsiveValue(flexShrink, 'mobile') || undefined,
		
		// Flexbox (as parent)
		'--mgb-inner-direction': getRawResponsiveValue(flexDirection) || undefined,
		'--mgb-inner-direction-tablet': getRawResponsiveValue(flexDirection, 'tablet') || undefined,
		'--mgb-inner-direction-mobile': getRawResponsiveValue(flexDirection, 'mobile') || undefined,
		'--mgb-inner-justify': getRawResponsiveValue(justifyContent) || undefined,
		'--mgb-inner-justify-tablet': getRawResponsiveValue(justifyContent, 'tablet') || undefined,
		'--mgb-inner-justify-mobile': getRawResponsiveValue(justifyContent, 'mobile') || undefined,
		'--mgb-inner-align': getRawResponsiveValue(alignItems) || undefined,
		'--mgb-inner-align-tablet': getRawResponsiveValue(alignItems, 'tablet') || undefined,
		'--mgb-inner-align-mobile': getRawResponsiveValue(alignItems, 'mobile') || undefined,
		'--mgb-inner-wrap': getRawResponsiveValue(flexWrap) || undefined,
		'--mgb-inner-wrap-tablet': getRawResponsiveValue(flexWrap, 'tablet') || undefined,
		'--mgb-inner-wrap-mobile': getRawResponsiveValue(flexWrap, 'mobile') || undefined,
		'--mgb-inner-gap': getRawResponsiveValue(gap) || undefined,
		'--mgb-inner-gap-tablet': getRawResponsiveValue(gap, 'tablet') || undefined,
		'--mgb-inner-gap-mobile': getRawResponsiveValue(gap, 'mobile') || undefined,
		
		// Background
		'--mgb-inner-bg-color': backgroundColor || undefined,
		'--mgb-inner-bg-gradient': gradientEnabled 
			? `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
			: backgroundGradient || undefined,
		
		// Padding
		'--mgb-inner-padding-top': getRawResponsiveValue(paddingTop) || undefined,
		'--mgb-inner-padding-top-tablet': getRawResponsiveValue(paddingTop, 'tablet') || undefined,
		'--mgb-inner-padding-top-mobile': getRawResponsiveValue(paddingTop, 'mobile') || undefined,
		'--mgb-inner-padding-right': getRawResponsiveValue(paddingRight) || undefined,
		'--mgb-inner-padding-right-tablet': getRawResponsiveValue(paddingRight, 'tablet') || undefined,
		'--mgb-inner-padding-right-mobile': getRawResponsiveValue(paddingRight, 'mobile') || undefined,
		'--mgb-inner-padding-bottom': getRawResponsiveValue(paddingBottom) || undefined,
		'--mgb-inner-padding-bottom-tablet': getRawResponsiveValue(paddingBottom, 'tablet') || undefined,
		'--mgb-inner-padding-bottom-mobile': getRawResponsiveValue(paddingBottom, 'mobile') || undefined,
		'--mgb-inner-padding-left': getRawResponsiveValue(paddingLeft) || undefined,
		'--mgb-inner-padding-left-tablet': getRawResponsiveValue(paddingLeft, 'tablet') || undefined,
		'--mgb-inner-padding-left-mobile': getRawResponsiveValue(paddingLeft, 'mobile') || undefined,
		
		// Margin
		'--mgb-inner-margin-top': getRawResponsiveValue(marginTop) || undefined,
		'--mgb-inner-margin-top-tablet': getRawResponsiveValue(marginTop, 'tablet') || undefined,
		'--mgb-inner-margin-top-mobile': getRawResponsiveValue(marginTop, 'mobile') || undefined,
		'--mgb-inner-margin-right': getRawResponsiveValue(marginRight) || undefined,
		'--mgb-inner-margin-right-tablet': getRawResponsiveValue(marginRight, 'tablet') || undefined,
		'--mgb-inner-margin-right-mobile': getRawResponsiveValue(marginRight, 'mobile') || undefined,
		'--mgb-inner-margin-bottom': getRawResponsiveValue(marginBottom) || undefined,
		'--mgb-inner-margin-bottom-tablet': getRawResponsiveValue(marginBottom, 'tablet') || undefined,
		'--mgb-inner-margin-bottom-mobile': getRawResponsiveValue(marginBottom, 'mobile') || undefined,
		'--mgb-inner-margin-left': getRawResponsiveValue(marginLeft) || undefined,
		'--mgb-inner-margin-left-tablet': getRawResponsiveValue(marginLeft, 'tablet') || undefined,
		'--mgb-inner-margin-left-mobile': getRawResponsiveValue(marginLeft, 'mobile') || undefined,
		
		// Border
		'--mgb-inner-border-style': borderStyle || undefined,
		'--mgb-inner-border-width': borderWidth?.top || borderWidth?.right || borderWidth?.bottom || borderWidth?.left
			? `${borderWidth.top || '0px'} ${borderWidth.right || '0px'} ${borderWidth.bottom || '0px'} ${borderWidth.left || '0px'}`
			: undefined,
		'--mgb-inner-border-color': borderColor || undefined,
		'--mgb-inner-border-radius': getBorderRadiusValue('desktop'),
		'--mgb-inner-border-radius-tablet': getBorderRadiusValue('tablet', true),
		'--mgb-inner-border-radius-mobile': getBorderRadiusValue('mobile', true),
		
		// Box Shadow
		'--mgb-inner-box-shadow': buildBoxShadow(boxShadow),
	};

	const blockProps = useBlockProps({
		className: classNames(
			'mgb-inner-container',
			blockId && `mgb-block-${blockId}`,
		),
		style: containerStyles,
	});

	// Linked spacing handler (for both padding and margin)
	const handleLinkedSpacing = (type, value, device) => {
		const isLinked = type === 'padding' ? paddingLinked : marginLinked;
		const prefix = type === 'padding' ? 'padding' : 'margin';
		
		if (isLinked) {
			setAttributes({
				[`${prefix}Top`]: { ...attributes[`${prefix}Top`], [device]: value },
				[`${prefix}Right`]: { ...attributes[`${prefix}Right`], [device]: value },
				[`${prefix}Bottom`]: { ...attributes[`${prefix}Bottom`], [device]: value },
				[`${prefix}Left`]: { ...attributes[`${prefix}Left`], [device]: value },
			});
		}
	};

	// Layout Tab
	const renderLayoutTab = () => (
		<>
			<PanelBody title={__('Size', 'magical-blocks')} initialOpen={true}>
				<ResponsiveControl label={__('Width', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(width, device)}
							onChange={(value) => setResponsiveValue('width', value, device)}
							units={[
								{ value: '%', label: '%' },
								{ value: 'px', label: 'px' },
								{ value: 'vw', label: 'vw' },
							]}
							placeholder={__('Auto', 'magical-blocks')}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Min Width', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(minWidth, device)}
							onChange={(value) => setResponsiveValue('minWidth', value, device)}
							units={[
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
							]}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Max Width', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(maxWidth, device)}
							onChange={(value) => setResponsiveValue('maxWidth', value, device)}
							units={[
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
							]}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Min Height', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(minHeight, device)}
							onChange={(value) => setResponsiveValue('minHeight', value, device)}
							units={[
								{ value: 'px', label: 'px' },
								{ value: 'vh', label: 'vh' },
							]}
						/>
					)}
				</ResponsiveControl>
			</PanelBody>

			<PanelBody title={__('Flex Child', 'magical-blocks')} initialOpen={false}>
				<p className="components-base-control__help" style={{ marginBottom: '16px' }}>
					{__('Control how this container behaves as a flex child.', 'magical-blocks')}
				</p>

				<ResponsiveControl label={__('Flex Grow', 'magical-blocks')}>
					{(device) => (
						<RangeControl
							value={parseInt(getResponsiveValue(flexGrow, device)) || 1}
							onChange={(value) => setResponsiveValue('flexGrow', String(value), device)}
							min={0}
							max={10}
							step={1}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Flex Shrink', 'magical-blocks')}>
					{(device) => (
						<RangeControl
							value={parseInt(getResponsiveValue(flexShrink, device)) || 1}
							onChange={(value) => setResponsiveValue('flexShrink', String(value), device)}
							min={0}
							max={10}
							step={1}
						/>
					)}
				</ResponsiveControl>
			</PanelBody>

			<PanelBody title={__('Content Layout', 'magical-blocks')} initialOpen={false}>
				<ResponsiveControl label={__('Direction', 'magical-blocks')}>
					{(device) => (
						<SelectControl
							value={getResponsiveValue(flexDirection, device)}
							options={[
								{ label: __('Column', 'magical-blocks'), value: 'column' },
								{ label: __('Row', 'magical-blocks'), value: 'row' },
								{ label: __('Column Reverse', 'magical-blocks'), value: 'column-reverse' },
								{ label: __('Row Reverse', 'magical-blocks'), value: 'row-reverse' },
							]}
							onChange={(value) => setResponsiveValue('flexDirection', value, device)}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Justify Content', 'magical-blocks')}>
					{(device) => (
						<SelectControl
							value={getResponsiveValue(justifyContent, device)}
							options={[
								{ label: __('Start', 'magical-blocks'), value: 'flex-start' },
								{ label: __('Center', 'magical-blocks'), value: 'center' },
								{ label: __('End', 'magical-blocks'), value: 'flex-end' },
								{ label: __('Space Between', 'magical-blocks'), value: 'space-between' },
								{ label: __('Space Around', 'magical-blocks'), value: 'space-around' },
								{ label: __('Space Evenly', 'magical-blocks'), value: 'space-evenly' },
							]}
							onChange={(value) => setResponsiveValue('justifyContent', value, device)}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Align Items', 'magical-blocks')}>
					{(device) => (
						<SelectControl
							value={getResponsiveValue(alignItems, device)}
							options={[
								{ label: __('Stretch', 'magical-blocks'), value: 'stretch' },
								{ label: __('Start', 'magical-blocks'), value: 'flex-start' },
								{ label: __('Center', 'magical-blocks'), value: 'center' },
								{ label: __('End', 'magical-blocks'), value: 'flex-end' },
								{ label: __('Baseline', 'magical-blocks'), value: 'baseline' },
							]}
							onChange={(value) => setResponsiveValue('alignItems', value, device)}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Wrap', 'magical-blocks')}>
					{(device) => (
						<SelectControl
							value={getResponsiveValue(flexWrap, device)}
							options={[
								{ label: __('No Wrap', 'magical-blocks'), value: 'nowrap' },
								{ label: __('Wrap', 'magical-blocks'), value: 'wrap' },
								{ label: __('Wrap Reverse', 'magical-blocks'), value: 'wrap-reverse' },
							]}
							onChange={(value) => setResponsiveValue('flexWrap', value, device)}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Gap', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(gap, device)}
							onChange={(value) => setResponsiveValue('gap', value, device)}
							units={[
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
								{ value: 'em', label: 'em' },
							]}
						/>
					)}
				</ResponsiveControl>
			</PanelBody>
		</>
	);

	// Style Tab
	const renderStyleTab = () => (
		<>
			<PanelBody title={__('Background', 'magical-blocks')} initialOpen={true}>
				<ToggleControl
					label={__('Enable Gradient', 'magical-blocks')}
					checked={gradientEnabled}
					onChange={(value) => setAttributes({ gradientEnabled: value })}
				/>
				
				{gradientEnabled ? (
					<>
						<ColorControl
							label={__('Gradient Color 1', 'magical-blocks')}
							value={gradientColor1}
							onChange={(value) => setAttributes({ gradientColor1: value })}
						/>
						<ColorControl
							label={__('Gradient Color 2', 'magical-blocks')}
							value={gradientColor2}
							onChange={(value) => setAttributes({ gradientColor2: value })}
						/>
						<RangeControl
							label={__('Gradient Angle', 'magical-blocks')}
							value={gradientAngle}
							onChange={(value) => setAttributes({ gradientAngle: value })}
							min={0}
							max={360}
						/>
					</>
				) : (
					<>
						<ColorControl
							label={__('Background Color', 'magical-blocks')}
							value={backgroundColor}
							onChange={(value) => setAttributes({ backgroundColor: value })}
						/>
						<TextControl
							label={__('CSS Gradient', 'magical-blocks')}
							value={backgroundGradient}
							onChange={(value) => setAttributes({ backgroundGradient: value })}
							placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
							help={__('Enter a CSS gradient value', 'magical-blocks')}
						/>
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Spacing', 'magical-blocks')} initialOpen={false}>
				<div className="mgb-spacing-section">
					<Flex align="center" justify="space-between">
						<span className="mgb-spacing-label">{__('Padding', 'magical-blocks')}</span>
						<Button
							icon={paddingLinked ? linkIcon : linkOff}
							label={paddingLinked ? __('Unlink', 'magical-blocks') : __('Link', 'magical-blocks')}
							onClick={() => setAttributes({ paddingLinked: !paddingLinked })}
							isPressed={paddingLinked}
							isSmall
						/>
					</Flex>
					
					<ResponsiveControl label="">
						{(device) => (
							<Flex gap={2} wrap>
								<FlexItem>
									<UnitControl
										label={__('Top', 'magical-blocks')}
										value={getResponsiveValue(paddingTop, device)}
										onChange={(value) => {
											setResponsiveValue('paddingTop', value, device);
											handleLinkedSpacing('padding', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }]}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Right', 'magical-blocks')}
										value={getResponsiveValue(paddingRight, device)}
										onChange={(value) => {
											setResponsiveValue('paddingRight', value, device);
											handleLinkedSpacing('padding', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }]}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Bottom', 'magical-blocks')}
										value={getResponsiveValue(paddingBottom, device)}
										onChange={(value) => {
											setResponsiveValue('paddingBottom', value, device);
											handleLinkedSpacing('padding', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }]}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Left', 'magical-blocks')}
										value={getResponsiveValue(paddingLeft, device)}
										onChange={(value) => {
											setResponsiveValue('paddingLeft', value, device);
											handleLinkedSpacing('padding', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }]}
									/>
								</FlexItem>
							</Flex>
						)}
					</ResponsiveControl>
				</div>

				<div className="mgb-spacing-section">
					<Flex align="center" justify="space-between">
						<span className="mgb-spacing-label">{__('Margin', 'magical-blocks')}</span>
						<Button
							icon={marginLinked ? linkIcon : linkOff}
							label={marginLinked ? __('Unlink', 'magical-blocks') : __('Link', 'magical-blocks')}
							onClick={() => setAttributes({ marginLinked: !marginLinked })}
							isPressed={marginLinked}
							isSmall
						/>
					</Flex>
					
					<ResponsiveControl label="">
						{(device) => (
							<Flex gap={2} wrap>
								<FlexItem>
									<UnitControl
										label={__('Top', 'magical-blocks')}
										value={getResponsiveValue(marginTop, device)}
										onChange={(value) => {
											setResponsiveValue('marginTop', value, device);
											handleLinkedSpacing('margin', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, { value: 'auto', label: 'auto' }]}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Right', 'magical-blocks')}
										value={getResponsiveValue(marginRight, device)}
										onChange={(value) => {
											setResponsiveValue('marginRight', value, device);
											handleLinkedSpacing('margin', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, { value: 'auto', label: 'auto' }]}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Bottom', 'magical-blocks')}
										value={getResponsiveValue(marginBottom, device)}
										onChange={(value) => {
											setResponsiveValue('marginBottom', value, device);
											handleLinkedSpacing('margin', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, { value: 'auto', label: 'auto' }]}
									/>
								</FlexItem>
								<FlexItem>
									<UnitControl
										label={__('Left', 'magical-blocks')}
										value={getResponsiveValue(marginLeft, device)}
										onChange={(value) => {
											setResponsiveValue('marginLeft', value, device);
											handleLinkedSpacing('margin', value, device);
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, { value: 'auto', label: 'auto' }]}
									/>
								</FlexItem>
							</Flex>
						)}
					</ResponsiveControl>
				</div>
			</PanelBody>

			<PanelBody title={__('Border', 'magical-blocks')} initialOpen={false}>
				<SelectControl
					label={__('Border Style', 'magical-blocks')}
					value={borderStyle}
					options={[
						{ label: __('None', 'magical-blocks'), value: '' },
						{ label: __('Solid', 'magical-blocks'), value: 'solid' },
						{ label: __('Dashed', 'magical-blocks'), value: 'dashed' },
						{ label: __('Dotted', 'magical-blocks'), value: 'dotted' },
					]}
					onChange={(value) => setAttributes({ borderStyle: value })}
				/>

				{borderStyle && (
					<>
						<Flex wrap>
							<FlexItem style={{ width: '48%' }}>
								<UnitControl
									label={__('Top', 'magical-blocks')}
									value={borderWidth?.top || ''}
									onChange={(value) => setAttributes({ borderWidth: { ...borderWidth, top: value } })}
									units={[{ value: 'px', label: 'px' }]}
								/>
							</FlexItem>
							<FlexItem style={{ width: '48%' }}>
								<UnitControl
									label={__('Right', 'magical-blocks')}
									value={borderWidth?.right || ''}
									onChange={(value) => setAttributes({ borderWidth: { ...borderWidth, right: value } })}
									units={[{ value: 'px', label: 'px' }]}
								/>
							</FlexItem>
							<FlexItem style={{ width: '48%' }}>
								<UnitControl
									label={__('Bottom', 'magical-blocks')}
									value={borderWidth?.bottom || ''}
									onChange={(value) => setAttributes({ borderWidth: { ...borderWidth, bottom: value } })}
									units={[{ value: 'px', label: 'px' }]}
								/>
							</FlexItem>
							<FlexItem style={{ width: '48%' }}>
								<UnitControl
									label={__('Left', 'magical-blocks')}
									value={borderWidth?.left || ''}
									onChange={(value) => setAttributes({ borderWidth: { ...borderWidth, left: value } })}
									units={[{ value: 'px', label: 'px' }]}
								/>
							</FlexItem>
						</Flex>

						<ColorControl
							label={__('Border Color', 'magical-blocks')}
							value={borderColor}
							onChange={(value) => setAttributes({ borderColor: value })}
						/>
					</>
				)}

				<ResponsiveControl label={__('Border Radius', 'magical-blocks')}>
					{(device) => {
						const deviceRadius = borderRadius?.[device] || borderRadius?.desktop || {};
						return (
							<Flex wrap>
								<FlexItem style={{ width: '48%' }}>
									<UnitControl
										label={__('Top Left', 'magical-blocks')}
										value={deviceRadius.top || ''}
										onChange={(value) => {
											const currentDevice = borderRadius?.[device] || {};
											setAttributes({
												borderRadius: {
													...borderRadius,
													[device]: { ...currentDevice, top: value }
												}
											});
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }]}
									/>
								</FlexItem>
								<FlexItem style={{ width: '48%' }}>
									<UnitControl
										label={__('Top Right', 'magical-blocks')}
										value={deviceRadius.right || ''}
										onChange={(value) => {
											const currentDevice = borderRadius?.[device] || {};
											setAttributes({
												borderRadius: {
													...borderRadius,
													[device]: { ...currentDevice, right: value }
												}
											});
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }]}
									/>
								</FlexItem>
								<FlexItem style={{ width: '48%' }}>
									<UnitControl
										label={__('Bottom Right', 'magical-blocks')}
										value={deviceRadius.bottom || ''}
										onChange={(value) => {
											const currentDevice = borderRadius?.[device] || {};
											setAttributes({
												borderRadius: {
													...borderRadius,
													[device]: { ...currentDevice, bottom: value }
												}
											});
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }]}
									/>
								</FlexItem>
								<FlexItem style={{ width: '48%' }}>
									<UnitControl
										label={__('Bottom Left', 'magical-blocks')}
										value={deviceRadius.left || ''}
										onChange={(value) => {
											const currentDevice = borderRadius?.[device] || {};
											setAttributes({
												borderRadius: {
													...borderRadius,
													[device]: { ...currentDevice, left: value }
												}
											});
										}}
										units={[{ value: 'px', label: 'px' }, { value: '%', label: '%' }]}
									/>
								</FlexItem>
							</Flex>
						);
					}}
				</ResponsiveControl>
			</PanelBody>

			<PanelBody title={__('Box Shadow', 'magical-blocks')} initialOpen={false}>
				<ToggleControl
					label={__('Enable Box Shadow', 'magical-blocks')}
					checked={boxShadow?.enabled || false}
					onChange={(value) => setAttributes({ boxShadow: { ...boxShadow, enabled: value } })}
				/>

				{boxShadow?.enabled && (
					<>
						<RangeControl
							label={__('Horizontal', 'magical-blocks')}
							value={boxShadow.horizontal}
							onChange={(value) => setAttributes({ boxShadow: { ...boxShadow, horizontal: value } })}
							min={-50}
							max={50}
						/>
						<RangeControl
							label={__('Vertical', 'magical-blocks')}
							value={boxShadow.vertical}
							onChange={(value) => setAttributes({ boxShadow: { ...boxShadow, vertical: value } })}
							min={-50}
							max={50}
						/>
						<RangeControl
							label={__('Blur', 'magical-blocks')}
							value={boxShadow.blur}
							onChange={(value) => setAttributes({ boxShadow: { ...boxShadow, blur: value } })}
							min={0}
							max={100}
						/>
						<RangeControl
							label={__('Spread', 'magical-blocks')}
							value={boxShadow.spread}
							onChange={(value) => setAttributes({ boxShadow: { ...boxShadow, spread: value } })}
							min={-50}
							max={50}
						/>
						<ColorControl
							label={__('Shadow Color', 'magical-blocks')}
							value={boxShadow.color}
							onChange={(value) => setAttributes({ boxShadow: { ...boxShadow, color: value } })}
						/>
						<ToggleControl
							label={__('Inset', 'magical-blocks')}
							checked={boxShadow.inset}
							onChange={(value) => setAttributes({ boxShadow: { ...boxShadow, inset: value } })}
						/>
					</>
				)}
			</PanelBody>
		</>
	);

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="mgb-tab-panel"
					activeClass="is-active"
					tabs={[
						{ name: 'layout', title: __('Layout', 'magical-blocks') },
						{ name: 'style', title: __('Style', 'magical-blocks') },
					]}
				>
					{(tab) => {
						if (tab.name === 'layout') {
							return renderLayoutTab();
						}
						return renderStyleTab();
					}}
				</TabPanel>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
				/>
			</div>
		</>
	);
}
