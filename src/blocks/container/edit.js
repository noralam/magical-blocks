/**
 * Container Block - Edit Component
 *
 * A flexible container block with full layout and design control.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	__experimentalUnitControl as UnitControl,
	ToggleControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
	Flex,
	FlexItem,
	Tooltip,
	TabPanel,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import {
	stretchWide,
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween,
	arrowDown,
	arrowRight,
	link as linkIcon,
	linkOff,
	columns as columnsIcon,
} from '@wordpress/icons';

import { generateBlockId, classNames } from '../../common/utils';
import { ColorControl, ResponsiveControl } from '../../components';

/**
 * Edit component for the Container block.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		htmlTag,
		containerWidth,
		maxWidth,
		minHeight,
		flexDirection,
		justifyContent,
		alignItems,
		flexWrap,
		columnGap,
		rowGap,
		backgroundColor,
		gradientEnabled,
		gradientColor1,
		gradientColor2,
		gradientAngle,
		backgroundGradient,
		backgroundImageUrl,
		backgroundImageId,
		backgroundPosition,
		backgroundSize,
		backgroundRepeat,
		backgroundAttachment,
		overlayColor,
		overlayGradient,
		overlayGradientEnabled,
		overlayGradientColor1,
		overlayGradientColor2,
		overlayGradientAngle,
		overlayOpacity,
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
		borderColorHover,
		borderRadius,
		boxShadow,
		boxShadowHover,
		zIndex,
		overflow,
		transition,
		customCSS,
	} = attributes;

	// Device state for responsive controls
	const [currentDevice, setCurrentDevice] = useState('desktop');

	// Get block editing functions
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const { innerBlockCount } = useSelect(
		(select) => ({
			innerBlockCount: select(blockEditorStore).getBlockCount(clientId),
		}),
		[clientId]
	);

	// Layout presets configuration
	const layoutPresets = [
		{
			name: '1-column',
			label: __('1 Column', 'magical-blocks'),
			icon: (
				<svg width="48" height="32" viewBox="0 0 48 32">
					<rect x="2" y="2" width="44" height="28" fill="currentColor" opacity="0.3" rx="2" />
				</svg>
			),
			columns: 1,
			widths: ['100%'],
		},
		{
			name: '2-equal',
			label: __('2 Columns - Equal', 'magical-blocks'),
			icon: (
				<svg width="48" height="32" viewBox="0 0 48 32">
					<rect x="2" y="2" width="21" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="25" y="2" width="21" height="28" fill="currentColor" opacity="0.3" rx="2" />
				</svg>
			),
			columns: 2,
			widths: ['', ''],
		},
		{
			name: '3-equal',
			label: __('3 Columns - Equal', 'magical-blocks'),
			icon: (
				<svg width="48" height="32" viewBox="0 0 48 32">
					<rect x="2" y="2" width="13" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="17" y="2" width="14" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="33" y="2" width="13" height="28" fill="currentColor" opacity="0.3" rx="2" />
				</svg>
			),
			columns: 3,
			widths: ['', '', ''],
		},
		{
			name: '4-equal',
			label: __('4 Columns - Equal', 'magical-blocks'),
			icon: (
				<svg width="48" height="32" viewBox="0 0 48 32">
					<rect x="2" y="2" width="9" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="13" y="2" width="9" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="24" y="2" width="10" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="36" y="2" width="10" height="28" fill="currentColor" opacity="0.3" rx="2" />
				</svg>
			),
			columns: 4,
			widths: ['', '', '', ''],
		},
		{
			name: '2-sidebar-left',
			label: __('Sidebar Left', 'magical-blocks'),
			icon: (
				<svg width="48" height="32" viewBox="0 0 48 32">
					<rect x="2" y="2" width="14" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="18" y="2" width="28" height="28" fill="currentColor" opacity="0.3" rx="2" />
				</svg>
			),
			columns: 2,
			widths: ['33%', ''],
		},
		{
			name: '2-sidebar-right',
			label: __('Sidebar Right', 'magical-blocks'),
			icon: (
				<svg width="48" height="32" viewBox="0 0 48 32">
					<rect x="2" y="2" width="28" height="28" fill="currentColor" opacity="0.3" rx="2" />
					<rect x="32" y="2" width="14" height="28" fill="currentColor" opacity="0.3" rx="2" />
				</svg>
			),
			columns: 2,
			widths: ['', '33%'],
		},
	];

	// Insert layout preset
	const insertLayoutPreset = (preset) => {
		const innerContainers = preset.widths.map((width) => {
			const attrs = {};
			if (width) {
				attrs.width = { desktop: width, tablet: '', mobile: '' };
				attrs.flexGrow = { desktop: '0', tablet: '', mobile: '' };
			}
			return createBlock('magical-blocks/inner-container', attrs);
		});
		replaceInnerBlocks(clientId, innerContainers, false);
	};

	// Generate unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: generateBlockId('container') });
		}
	}, [blockId, setAttributes]);

	// Helper to get responsive value with desktop fallback (for UI display)
	const getResponsiveValue = (attr, device = 'desktop') => {
		return attr?.[device] || attr?.desktop || '';
	};

	// Helper to get raw responsive value without fallback (for CSS variable output)
	// This ensures CSS cascade works properly - tablet/mobile values only output if explicitly set
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

	// Build border radius string (with fallback for desktop, raw for tablet/mobile)
	const getBorderRadiusValue = (device = 'desktop', raw = false) => {
		// For raw mode (CSS output for tablet/mobile), only use the specific device value
		const br = raw ? borderRadius?.[device] : (borderRadius?.[device] || borderRadius?.desktop);
		if (!br || (!br.top && !br.right && !br.bottom && !br.left)) return undefined;
		return `${br.top || '0px'} ${br.right || '0px'} ${br.bottom || '0px'} ${br.left || '0px'}`;
	};

	// Build inline styles with CSS variables
	const containerStyles = {
		// Layout - Max Width
		'--mgb-container-width': containerWidth === 'boxed' ? getRawResponsiveValue(maxWidth) : undefined,
		'--mgb-container-width-tablet': containerWidth === 'boxed' ? getRawResponsiveValue(maxWidth, 'tablet') : undefined,
		'--mgb-container-width-mobile': containerWidth === 'boxed' ? getRawResponsiveValue(maxWidth, 'mobile') : undefined,
		
		// Min Height
		'--mgb-container-min-height': getRawResponsiveValue(minHeight) || undefined,
		'--mgb-container-min-height-tablet': getRawResponsiveValue(minHeight, 'tablet') || undefined,
		'--mgb-container-min-height-mobile': getRawResponsiveValue(minHeight, 'mobile') || undefined,
		
		// Flexbox
		'--mgb-container-direction': getRawResponsiveValue(flexDirection) || undefined,
		'--mgb-container-direction-tablet': getRawResponsiveValue(flexDirection, 'tablet') || undefined,
		'--mgb-container-direction-mobile': getRawResponsiveValue(flexDirection, 'mobile') || undefined,
		'--mgb-container-justify': getRawResponsiveValue(justifyContent) || undefined,
		'--mgb-container-justify-tablet': getRawResponsiveValue(justifyContent, 'tablet') || undefined,
		'--mgb-container-justify-mobile': getRawResponsiveValue(justifyContent, 'mobile') || undefined,
		'--mgb-container-align': getRawResponsiveValue(alignItems) || undefined,
		'--mgb-container-align-tablet': getRawResponsiveValue(alignItems, 'tablet') || undefined,
		'--mgb-container-align-mobile': getRawResponsiveValue(alignItems, 'mobile') || undefined,
		'--mgb-container-wrap': getRawResponsiveValue(flexWrap) || undefined,
		'--mgb-container-wrap-tablet': getRawResponsiveValue(flexWrap, 'tablet') || undefined,
		'--mgb-container-wrap-mobile': getRawResponsiveValue(flexWrap, 'mobile') || undefined,
		'--mgb-container-column-gap': getRawResponsiveValue(columnGap) || undefined,
		'--mgb-container-column-gap-tablet': getRawResponsiveValue(columnGap, 'tablet') || undefined,
		'--mgb-container-column-gap-mobile': getRawResponsiveValue(columnGap, 'mobile') || undefined,
		'--mgb-container-row-gap': getRawResponsiveValue(rowGap) || undefined,
		'--mgb-container-row-gap-tablet': getRawResponsiveValue(rowGap, 'tablet') || undefined,
		'--mgb-container-row-gap-mobile': getRawResponsiveValue(rowGap, 'mobile') || undefined,
		
		// Background (only set bg-color when gradient is not enabled)
		'--mgb-container-bg-color': gradientEnabled ? undefined : backgroundColor || undefined,
		'--mgb-container-bg-gradient': gradientEnabled 
			? `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`
			: backgroundGradient || undefined,
		'--mgb-container-bg-image': backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
		'--mgb-container-bg-position': backgroundPosition || undefined,
		'--mgb-container-bg-size': backgroundSize || undefined,
		'--mgb-container-bg-repeat': backgroundRepeat || undefined,
		'--mgb-container-bg-attachment': backgroundAttachment || undefined,
		
		// Overlay
		'--mgb-container-overlay-color': overlayColor || undefined,
		'--mgb-container-overlay-gradient': overlayGradientEnabled 
			? `linear-gradient(${overlayGradientAngle}deg, ${overlayGradientColor1}, ${overlayGradientColor2})`
			: overlayGradient || undefined,
		'--mgb-container-overlay-opacity': overlayOpacity !== undefined ? overlayOpacity / 100 : undefined,
		
		// Padding
		'--mgb-container-padding-top': getRawResponsiveValue(paddingTop) || undefined,
		'--mgb-container-padding-top-tablet': getRawResponsiveValue(paddingTop, 'tablet') || undefined,
		'--mgb-container-padding-top-mobile': getRawResponsiveValue(paddingTop, 'mobile') || undefined,
		'--mgb-container-padding-right': getRawResponsiveValue(paddingRight) || undefined,
		'--mgb-container-padding-right-tablet': getRawResponsiveValue(paddingRight, 'tablet') || undefined,
		'--mgb-container-padding-right-mobile': getRawResponsiveValue(paddingRight, 'mobile') || undefined,
		'--mgb-container-padding-bottom': getRawResponsiveValue(paddingBottom) || undefined,
		'--mgb-container-padding-bottom-tablet': getRawResponsiveValue(paddingBottom, 'tablet') || undefined,
		'--mgb-container-padding-bottom-mobile': getRawResponsiveValue(paddingBottom, 'mobile') || undefined,
		'--mgb-container-padding-left': getRawResponsiveValue(paddingLeft) || undefined,
		'--mgb-container-padding-left-tablet': getRawResponsiveValue(paddingLeft, 'tablet') || undefined,
		'--mgb-container-padding-left-mobile': getRawResponsiveValue(paddingLeft, 'mobile') || undefined,
		
		// Margin
		'--mgb-container-margin-top': getRawResponsiveValue(marginTop) || undefined,
		'--mgb-container-margin-top-tablet': getRawResponsiveValue(marginTop, 'tablet') || undefined,
		'--mgb-container-margin-top-mobile': getRawResponsiveValue(marginTop, 'mobile') || undefined,
		'--mgb-container-margin-right': getRawResponsiveValue(marginRight) || undefined,
		'--mgb-container-margin-right-tablet': getRawResponsiveValue(marginRight, 'tablet') || undefined,
		'--mgb-container-margin-right-mobile': getRawResponsiveValue(marginRight, 'mobile') || undefined,
		'--mgb-container-margin-bottom': getRawResponsiveValue(marginBottom) || undefined,
		'--mgb-container-margin-bottom-tablet': getRawResponsiveValue(marginBottom, 'tablet') || undefined,
		'--mgb-container-margin-bottom-mobile': getRawResponsiveValue(marginBottom, 'mobile') || undefined,
		'--mgb-container-margin-left': getRawResponsiveValue(marginLeft) || undefined,
		'--mgb-container-margin-left-tablet': getRawResponsiveValue(marginLeft, 'tablet') || undefined,
		'--mgb-container-margin-left-mobile': getRawResponsiveValue(marginLeft, 'mobile') || undefined,
		
		// Border
		'--mgb-container-border-style': borderStyle || undefined,
		'--mgb-container-border-width': borderWidth?.top || borderWidth?.right || borderWidth?.bottom || borderWidth?.left
			? `${borderWidth.top || '0px'} ${borderWidth.right || '0px'} ${borderWidth.bottom || '0px'} ${borderWidth.left || '0px'}`
			: undefined,
		'--mgb-container-border-color': borderColor || undefined,
		'--mgb-container-border-color-hover': borderColorHover || undefined,
		'--mgb-container-border-radius': getBorderRadiusValue('desktop'),
		'--mgb-container-border-radius-tablet': getBorderRadiusValue('tablet', true),
		'--mgb-container-border-radius-mobile': getBorderRadiusValue('mobile', true),
		
		// Box Shadow
		'--mgb-container-box-shadow': buildBoxShadow(boxShadow),
		'--mgb-container-box-shadow-hover': buildBoxShadow(boxShadowHover),
		
		// Advanced
		'--mgb-container-z-index': zIndex !== null && zIndex !== undefined ? zIndex : undefined,
		'--mgb-container-overflow': overflow || undefined,
		'--mgb-container-transition': transition || undefined,
	};

	const blockProps = useBlockProps({
		className: classNames(
			'mgb-container',
			blockId && `mgb-block-${blockId}`,
			`mgb-container--${containerWidth}`,
			overlayColor && 'mgb-container--has-overlay',
			backgroundImageUrl && 'mgb-container--has-bg-image',
			(gradientEnabled || backgroundGradient) && 'mgb-container--has-gradient'
		),
		style: containerStyles,
	});

	// Media upload handlers
	const onSelectImage = (media) => {
		setAttributes({
			backgroundImageUrl: media.url,
			backgroundImageId: media.id,
		});
	};

	const onRemoveImage = () => {
		setAttributes({
			backgroundImageUrl: '',
			backgroundImageId: undefined,
		});
	};

	// Linked spacing handler
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

	// Content Tab Panel
	const renderContentTab = () => (
		<>
			{/* Layout Presets - Only show when container is empty */}
			{innerBlockCount === 0 && (
				<PanelBody title={__('Structure', 'magical-blocks')} initialOpen={true}>
					<p className="components-base-control__help" style={{ marginTop: 0, marginBottom: '12px' }}>
						{__('Select a structure to start with:', 'magical-blocks')}
					</p>
					<div className="mgb-layout-presets">
						{layoutPresets.map((preset) => (
							<Tooltip key={preset.name} text={preset.label}>
								<Button
									className="mgb-layout-preset-btn"
									onClick={() => insertLayoutPreset(preset)}
								>
									{preset.icon}
								</Button>
							</Tooltip>
						))}
					</div>
				</PanelBody>
			)}

			<PanelBody title={__('Layout', 'magical-blocks')} initialOpen={innerBlockCount > 0}>
				<SelectControl
					label={__('Container Width', 'magical-blocks')}
					value={containerWidth}
					options={[
						{ label: __('Boxed', 'magical-blocks'), value: 'boxed' },
						{ label: __('Full Width', 'magical-blocks'), value: 'full' },
						{ label: __('Full Screen', 'magical-blocks'), value: 'fullscreen' },
					]}
					onChange={(value) => setAttributes({ containerWidth: value })}
				/>

				{containerWidth === 'boxed' && (
					<ResponsiveControl label={__('Max Width', 'magical-blocks')}>
						{(device) => (
							<UnitControl
								value={getResponsiveValue(maxWidth, device)}
								onChange={(value) => setResponsiveValue('maxWidth', value, device)}
								units={[
									{ value: 'px', label: 'px' },
									{ value: '%', label: '%' },
									{ value: 'vw', label: 'vw' },
								]}
							/>
						)}
					</ResponsiveControl>
				)}

				<ResponsiveControl label={__('Min Height', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(minHeight, device)}
							onChange={(value) => setResponsiveValue('minHeight', value, device)}
							units={[
								{ value: 'px', label: 'px' },
								{ value: 'vh', label: 'vh' },
								{ value: '%', label: '%' },
							]}
						/>
					)}
				</ResponsiveControl>
			</PanelBody>

			<PanelBody title={__('Flexbox', 'magical-blocks')} initialOpen={false}>
				<ResponsiveControl label={__('Direction', 'magical-blocks')}>
					{(device) => (
						<SelectControl
							value={getResponsiveValue(flexDirection, device)}
							options={[
								{ label: __('Row', 'magical-blocks'), value: 'row' },
								{ label: __('Row Reverse', 'magical-blocks'), value: 'row-reverse' },
								{ label: __('Column', 'magical-blocks'), value: 'column' },
								{ label: __('Column Reverse', 'magical-blocks'), value: 'column-reverse' },
							]}
							onChange={(value) => setResponsiveValue('flexDirection', value, device)}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Horizontal Align (Justify)', 'magical-blocks')}>
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

				<ResponsiveControl label={__('Vertical Align (Items)', 'magical-blocks')}>
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
								{ label: __('Wrap', 'magical-blocks'), value: 'wrap' },
								{ label: __('No Wrap', 'magical-blocks'), value: 'nowrap' },
								{ label: __('Wrap Reverse', 'magical-blocks'), value: 'wrap-reverse' },
							]}
							onChange={(value) => setResponsiveValue('flexWrap', value, device)}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Column Gap', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(columnGap, device)}
							onChange={(value) => setResponsiveValue('columnGap', value, device)}
							units={[
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
								{ value: 'em', label: 'em' },
							]}
						/>
					)}
				</ResponsiveControl>

				<ResponsiveControl label={__('Row Gap', 'magical-blocks')}>
					{(device) => (
						<UnitControl
							value={getResponsiveValue(rowGap, device)}
							onChange={(value) => setResponsiveValue('rowGap', value, device)}
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

	// Style Tab Panel
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
					<TabPanel
						className="mgb-bg-tab-panel"
						activeClass="is-active"
						tabs={[
							{ name: 'color', title: __('Color', 'magical-blocks') },
							{ name: 'gradient', title: __('Gradient', 'magical-blocks') },
							{ name: 'image', title: __('Image', 'magical-blocks') },
						]}
					>
						{(bgTab) => {
							if (bgTab.name === 'color') {
								return (
									<ColorControl
										label={__('Background Color', 'magical-blocks')}
										value={backgroundColor}
										onChange={(value) => setAttributes({ backgroundColor: value })}
									/>
								);
							}
							if (bgTab.name === 'gradient') {
								return (
									<TextControl
										label={__('CSS Gradient', 'magical-blocks')}
										value={backgroundGradient}
										onChange={(value) => setAttributes({ backgroundGradient: value })}
										placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
										help={__('Enter a CSS gradient value', 'magical-blocks')}
									/>
								);
							}
							return (
								<>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={onSelectImage}
											allowedTypes={['image']}
											value={backgroundImageId}
											render={({ open }) => (
												<div className="mgb-media-upload">
													{backgroundImageUrl ? (
														<div className="mgb-media-preview">
														<img src={backgroundImageUrl} alt="" />
														<div className="mgb-media-actions">
															<Button variant="secondary" onClick={open}>
																{__('Replace', 'magical-blocks')}
															</Button>
															<Button variant="secondary" isDestructive onClick={onRemoveImage}>
																{__('Remove', 'magical-blocks')}
															</Button>
														</div>
													</div>
												) : (
													<Button variant="secondary" onClick={open}>
														{__('Select Image', 'magical-blocks')}
													</Button>
												)}
											</div>
										)}
									/>
								</MediaUploadCheck>

								{backgroundImageUrl && (
									<>
										<SelectControl
											label={__('Position', 'magical-blocks')}
											value={backgroundPosition}
											options={[
												{ label: __('Center Center', 'magical-blocks'), value: 'center center' },
												{ label: __('Center Top', 'magical-blocks'), value: 'center top' },
												{ label: __('Center Bottom', 'magical-blocks'), value: 'center bottom' },
												{ label: __('Left Top', 'magical-blocks'), value: 'left top' },
												{ label: __('Left Center', 'magical-blocks'), value: 'left center' },
												{ label: __('Left Bottom', 'magical-blocks'), value: 'left bottom' },
												{ label: __('Right Top', 'magical-blocks'), value: 'right top' },
												{ label: __('Right Center', 'magical-blocks'), value: 'right center' },
												{ label: __('Right Bottom', 'magical-blocks'), value: 'right bottom' },
											]}
											onChange={(value) => setAttributes({ backgroundPosition: value })}
										/>

										<SelectControl
											label={__('Size', 'magical-blocks')}
											value={backgroundSize}
											options={[
												{ label: __('Cover', 'magical-blocks'), value: 'cover' },
												{ label: __('Contain', 'magical-blocks'), value: 'contain' },
												{ label: __('Auto', 'magical-blocks'), value: 'auto' },
											]}
											onChange={(value) => setAttributes({ backgroundSize: value })}
										/>

										<SelectControl
											label={__('Repeat', 'magical-blocks')}
											value={backgroundRepeat}
											options={[
												{ label: __('No Repeat', 'magical-blocks'), value: 'no-repeat' },
												{ label: __('Repeat', 'magical-blocks'), value: 'repeat' },
												{ label: __('Repeat X', 'magical-blocks'), value: 'repeat-x' },
												{ label: __('Repeat Y', 'magical-blocks'), value: 'repeat-y' },
											]}
											onChange={(value) => setAttributes({ backgroundRepeat: value })}
										/>

										<SelectControl
											label={__('Attachment', 'magical-blocks')}
											value={backgroundAttachment}
											options={[
												{ label: __('Scroll', 'magical-blocks'), value: 'scroll' },
												{ label: __('Fixed (Parallax)', 'magical-blocks'), value: 'fixed' },
											]}
											onChange={(value) => setAttributes({ backgroundAttachment: value })}
										/>
									</>
								)}
							</>
							);
						}}
					</TabPanel>
				)}
			</PanelBody>			<PanelBody title={__('Overlay', 'magical-blocks')} initialOpen={false}>
				<ColorControl
					label={__('Overlay Color', 'magical-blocks')}
					value={overlayColor}
					onChange={(value) => setAttributes({ overlayColor: value })}
				/>

				<ToggleControl
					label={__('Enable Overlay Gradient', 'magical-blocks')}
					checked={overlayGradientEnabled}
					onChange={(value) => setAttributes({ overlayGradientEnabled: value })}
				/>

				{overlayGradientEnabled ? (
					<>
						<ColorControl
							label={__('Gradient Color 1', 'magical-blocks')}
							value={overlayGradientColor1}
							onChange={(value) => setAttributes({ overlayGradientColor1: value })}
						/>
						<ColorControl
							label={__('Gradient Color 2', 'magical-blocks')}
							value={overlayGradientColor2}
							onChange={(value) => setAttributes({ overlayGradientColor2: value })}
						/>
						<RangeControl
							label={__('Gradient Angle', 'magical-blocks')}
							value={overlayGradientAngle}
							onChange={(value) => setAttributes({ overlayGradientAngle: value })}
							min={0}
							max={360}
						/>
					</>
				) : (
					<TextControl
						label={__('CSS Gradient', 'magical-blocks')}
						value={overlayGradient}
						onChange={(value) => setAttributes({ overlayGradient: value })}
						placeholder="linear-gradient(135deg, rgba(0,0,0,0.5), transparent)"
						help={__('Enter a CSS gradient value', 'magical-blocks')}
					/>
				)}

				{(overlayColor || overlayGradient || overlayGradientEnabled) && (
					<RangeControl
						label={__('Overlay Opacity', 'magical-blocks')}
						value={overlayOpacity}
						onChange={(value) => setAttributes({ overlayOpacity: value })}
						min={0}
						max={100}
						step={5}
					/>
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
						{ label: __('Double', 'magical-blocks'), value: 'double' },
						{ label: __('Groove', 'magical-blocks'), value: 'groove' },
						{ label: __('Ridge', 'magical-blocks'), value: 'ridge' },
					]}
					onChange={(value) => setAttributes({ borderStyle: value })}
				/>

				{borderStyle && (
					<>
						<BoxControl
							label={__('Border Width', 'magical-blocks')}
							values={borderWidth}
							onChange={(value) => setAttributes({ borderWidth: value })}
							units={[{ value: 'px', label: 'px' }]}
						/>

						<ColorControl
							label={__('Border Color', 'magical-blocks')}
							value={borderColor}
							onChange={(value) => setAttributes({ borderColor: value })}
						/>

						<ColorControl
							label={__('Border Color (Hover)', 'magical-blocks')}
							value={borderColorHover}
							onChange={(value) => setAttributes({ borderColorHover: value })}
						/>
					</>
				)}

				<ResponsiveControl label={__('Border Radius', 'magical-blocks')}>
					{(device) => (
						<BoxControl
							values={borderRadius?.[device] || { top: '', right: '', bottom: '', left: '' }}
							onChange={(value) => setAttributes({
								borderRadius: {
									...borderRadius,
									[device]: value,
								},
							})}
							units={[
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
								{ value: 'em', label: 'em' },
							]}
						/>
					)}
				</ResponsiveControl>
			</PanelBody>

			<PanelBody title={__('Box Shadow', 'magical-blocks')} initialOpen={false}>
				<TabPanel
					className="mgb-shadow-tab-panel"
					activeClass="is-active"
					tabs={[
						{ name: 'normal', title: __('Normal', 'magical-blocks') },
						{ name: 'hover', title: __('Hover', 'magical-blocks') },
					]}
				>
					{(shadowTab) => {
						const shadowAttr = shadowTab.name === 'normal' ? 'boxShadow' : 'boxShadowHover';
						const shadow = shadowTab.name === 'normal' ? boxShadow : boxShadowHover;
						
						return (
							<>
								<ToggleControl
									label={__('Enable Shadow', 'magical-blocks')}
									checked={shadow?.enabled || false}
									onChange={(value) => setAttributes({
										[shadowAttr]: { ...shadow, enabled: value },
									})}
								/>

								{shadow?.enabled && (
									<>
										<RangeControl
											label={__('Horizontal', 'magical-blocks')}
											value={shadow?.horizontal || 0}
											onChange={(value) => setAttributes({
												[shadowAttr]: { ...shadow, horizontal: value },
											})}
											min={-100}
											max={100}
										/>
										<RangeControl
											label={__('Vertical', 'magical-blocks')}
											value={shadow?.vertical || 0}
											onChange={(value) => setAttributes({
												[shadowAttr]: { ...shadow, vertical: value },
											})}
											min={-100}
											max={100}
										/>
										<RangeControl
											label={__('Blur', 'magical-blocks')}
											value={shadow?.blur || 0}
											onChange={(value) => setAttributes({
												[shadowAttr]: { ...shadow, blur: value },
											})}
											min={0}
											max={200}
										/>
										<RangeControl
											label={__('Spread', 'magical-blocks')}
											value={shadow?.spread || 0}
											onChange={(value) => setAttributes({
												[shadowAttr]: { ...shadow, spread: value },
											})}
											min={-100}
											max={100}
										/>
										<ColorControl
											label={__('Shadow Color', 'magical-blocks')}
											value={shadow?.color || 'rgba(0,0,0,0.15)'}
											onChange={(value) => setAttributes({
												[shadowAttr]: { ...shadow, color: value },
											})}
										/>
										<ToggleControl
											label={__('Inset', 'magical-blocks')}
											checked={shadow?.inset || false}
											onChange={(value) => setAttributes({
												[shadowAttr]: { ...shadow, inset: value },
											})}
										/>
									</>
								)}
							</>
						);
					}}
				</TabPanel>
			</PanelBody>
		</>
	);

	// Advanced Tab Panel
	const renderAdvancedTab = () => (
		<>
			<PanelBody title={__('HTML Tag', 'magical-blocks')} initialOpen={true}>
				<SelectControl
					label={__('HTML Tag', 'magical-blocks')}
					value={htmlTag}
					options={[
						{ label: 'div', value: 'div' },
						{ label: 'section', value: 'section' },
						{ label: 'header', value: 'header' },
						{ label: 'footer', value: 'footer' },
						{ label: 'article', value: 'article' },
						{ label: 'aside', value: 'aside' },
						{ label: 'main', value: 'main' },
						{ label: 'nav', value: 'nav' },
					]}
					onChange={(value) => setAttributes({ htmlTag: value })}
				/>
			</PanelBody>

			<PanelBody title={__('Position', 'magical-blocks')} initialOpen={false}>
				<NumberControl
					label={__('Z-Index', 'magical-blocks')}
					value={zIndex ?? ''}
					onChange={(value) => setAttributes({ zIndex: value !== '' ? parseInt(value, 10) : null })}
					min={-999}
					max={9999}
				/>
			</PanelBody>

			<PanelBody title={__('Effects', 'magical-blocks')} initialOpen={false}>
				<SelectControl
					label={__('Overflow', 'magical-blocks')}
					value={overflow}
					options={[
						{ label: __('Default', 'magical-blocks'), value: '' },
						{ label: __('Visible', 'magical-blocks'), value: 'visible' },
						{ label: __('Hidden', 'magical-blocks'), value: 'hidden' },
						{ label: __('Scroll', 'magical-blocks'), value: 'scroll' },
						{ label: __('Auto', 'magical-blocks'), value: 'auto' },
					]}
					onChange={(value) => setAttributes({ overflow: value })}
				/>

				<TextControl
					label={__('Transition', 'magical-blocks')}
					value={transition}
					onChange={(value) => setAttributes({ transition: value })}
					placeholder="all 0.3s ease"
					help={__('CSS transition property', 'magical-blocks')}
				/>
			</PanelBody>

			<PanelBody title={__('Custom CSS', 'magical-blocks')} initialOpen={false}>
				<TextControl
					label={__('Custom CSS Class', 'magical-blocks')}
					value={attributes.className || ''}
					onChange={(value) => setAttributes({ className: value })}
					help={__('Add custom CSS classes', 'magical-blocks')}
				/>
			</PanelBody>
		</>
	);

	return (
		<>
			<BlockControls>
				<ButtonGroup>
					<Tooltip text={__('Direction: Row', 'magical-blocks')}>
						<Button
							icon={arrowRight}
							isPressed={getResponsiveValue(flexDirection) === 'row'}
							onClick={() => setResponsiveValue('flexDirection', 'row', currentDevice)}
						/>
					</Tooltip>
					<Tooltip text={__('Direction: Column', 'magical-blocks')}>
						<Button
							icon={arrowDown}
							isPressed={getResponsiveValue(flexDirection) === 'column'}
							onClick={() => setResponsiveValue('flexDirection', 'column', currentDevice)}
						/>
					</Tooltip>
				</ButtonGroup>
				<ButtonGroup>
					<Tooltip text={__('Justify: Start', 'magical-blocks')}>
						<Button
							icon={justifyLeft}
							isPressed={getResponsiveValue(justifyContent) === 'flex-start'}
							onClick={() => setResponsiveValue('justifyContent', 'flex-start', currentDevice)}
						/>
					</Tooltip>
					<Tooltip text={__('Justify: Center', 'magical-blocks')}>
						<Button
							icon={justifyCenter}
							isPressed={getResponsiveValue(justifyContent) === 'center'}
							onClick={() => setResponsiveValue('justifyContent', 'center', currentDevice)}
						/>
					</Tooltip>
					<Tooltip text={__('Justify: End', 'magical-blocks')}>
						<Button
							icon={justifyRight}
							isPressed={getResponsiveValue(justifyContent) === 'flex-end'}
							onClick={() => setResponsiveValue('justifyContent', 'flex-end', currentDevice)}
						/>
					</Tooltip>
					<Tooltip text={__('Justify: Space Between', 'magical-blocks')}>
						<Button
							icon={justifySpaceBetween}
							isPressed={getResponsiveValue(justifyContent) === 'space-between'}
							onClick={() => setResponsiveValue('justifyContent', 'space-between', currentDevice)}
						/>
					</Tooltip>
				</ButtonGroup>
			</BlockControls>

			<InspectorControls>
				<TabPanel
					className="mgb-inspector-tabs"
					activeClass="is-active"
					tabs={[
						{ name: 'content', title: __('Layout', 'magical-blocks') },
						{ name: 'style', title: __('Style', 'magical-blocks') },
						{ name: 'advanced', title: __('Advanced', 'magical-blocks') },
					]}
				>
					{(tab) => {
						if (tab.name === 'content') {
							return renderContentTab();
						}
						if (tab.name === 'style') {
							return renderStyleTab();
						}
						return renderAdvancedTab();
					}}
				</TabPanel>
			</InspectorControls>

			<div {...blockProps}>
				{(overlayColor || overlayGradient || overlayGradientEnabled) && <div className="mgb-container__overlay" aria-hidden="true" />}
				<div className="mgb-container__inner">
					<InnerBlocks
						prioritizedInserterBlocks={['magical-blocks/inner-container']}
						renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
					/>
				</div>
			</div>
		</>
	);
}
