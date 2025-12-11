/**
 * Image Box Block - Edit Component
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Button,
	TextControl,
	ToggleControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	Flex,
	FlexItem,
	TabPanel,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { generateBlockId, classNames } from '../../common/utils';
import { ColorControl, ResponsiveControl, TypographyControl, SpacingControl } from '../../components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		imageUrl,
		imageId,
		imageAlt,
		title,
		description,
		titleTag,
		linkUrl,
		linkText,
		linkTarget,
		layout,
		alignment,
		imageHeight,
		imageObjectFit,
		imageWidth,
		imageBorderRadius,
		titleColor,
		titleHoverColor,
		descriptionColor,
		linkColor,
		linkHoverColor,
		titleTypography,
		descriptionTypography,
		linkTypography,
		boxBackgroundColor,
		boxHoverBackgroundColor,
		boxBorderColor,
		boxHoverBorderColor,
		boxBorderWidth,
		boxBorderStyle,
		boxBorderRadius,
		boxShadow,
		boxHoverShadow,
		padding,
		margin,
		contentGap,
		titleSpacing,
		hoverEffect,
	} = attributes;

	// Generate unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: generateBlockId('image-box') });
		}
	}, [blockId, setAttributes]);

	// Helper function to build box shadow string
	const buildBoxShadow = (shadow) => {
		if (!shadow?.enable) return 'none';
		return `${shadow.horizontal || 0}px ${shadow.vertical || 0}px ${shadow.blur || 0}px ${shadow.spread || 0}px ${shadow.color || 'rgba(0,0,0,0.1)'}`;
	};

	// Helper function to build padding string
	const buildPadding = (pad, device = 'desktop') => {
		const devicePad = pad?.[device] || pad?.desktop || {};
		if (!devicePad.top && !devicePad.right && !devicePad.bottom && !devicePad.left) return undefined;
		return `${devicePad.top || 0}px ${devicePad.right || 0}px ${devicePad.bottom || 0}px ${devicePad.left || 0}px`;
	};

	// Helper function to build border radius string
	const buildBorderRadius = (br, device = 'desktop') => {
		const deviceBr = br?.[device] || br?.desktop || {};
		if (!deviceBr.top && !deviceBr.right && !deviceBr.bottom && !deviceBr.left) return undefined;
		return `${deviceBr.top || 0}px ${deviceBr.right || 0}px ${deviceBr.bottom || 0}px ${deviceBr.left || 0}px`;
	};

	// Build inline styles with CSS variables
	const boxStyles = {
		'--mgb-image-box-bg': boxBackgroundColor || 'transparent',
		'--mgb-image-box-bg-hover': boxHoverBackgroundColor || boxBackgroundColor || 'transparent',
		'--mgb-image-box-border-color': boxBorderColor || 'transparent',
		'--mgb-image-box-border-hover-color': boxHoverBorderColor || boxBorderColor || 'transparent',
		'--mgb-image-box-border-width': `${boxBorderWidth || 0}px`,
		'--mgb-image-box-border-style': boxBorderStyle || 'none',
		'--mgb-image-box-border-radius': `${boxBorderRadius || 0}px`,
		'--mgb-image-box-shadow': buildBoxShadow(boxShadow),
		'--mgb-image-box-shadow-hover': buildBoxShadow(boxHoverShadow),
		'--mgb-image-box-padding': buildPadding(padding, 'desktop'),
		'--mgb-image-box-padding-tablet': buildPadding(padding, 'tablet'),
		'--mgb-image-box-padding-mobile': buildPadding(padding, 'mobile'),
		'--mgb-image-box-margin': buildPadding(margin, 'desktop'),
		'--mgb-image-box-margin-tablet': buildPadding(margin, 'tablet'),
		'--mgb-image-box-margin-mobile': buildPadding(margin, 'mobile'),
		'--mgb-image-box-image-height': imageHeight?.desktop ? `${imageHeight.desktop}px` : undefined,
		'--mgb-image-box-image-height-tablet': imageHeight?.tablet ? `${imageHeight.tablet}px` : undefined,
		'--mgb-image-box-image-height-mobile': imageHeight?.mobile ? `${imageHeight.mobile}px` : undefined,
		'--mgb-image-box-image-fit': imageObjectFit,
		'--mgb-image-box-image-width': `${imageWidth?.desktop || 40}%`,
		'--mgb-image-box-image-width-tablet': imageWidth?.tablet ? `${imageWidth.tablet}%` : undefined,
		'--mgb-image-box-image-width-mobile': imageWidth?.mobile ? `${imageWidth.mobile}%` : undefined,
		'--mgb-image-box-image-radius': buildBorderRadius(imageBorderRadius, 'desktop'),
		'--mgb-image-box-image-radius-tablet': buildBorderRadius(imageBorderRadius, 'tablet'),
		'--mgb-image-box-image-radius-mobile': buildBorderRadius(imageBorderRadius, 'mobile'),
		'--mgb-image-box-title-color': titleColor,
		'--mgb-image-box-title-hover-color': titleHoverColor || titleColor,
		'--mgb-image-box-desc-color': descriptionColor,
		'--mgb-image-box-link-color': linkColor,
		'--mgb-image-box-link-hover-color': linkHoverColor || linkColor,
		'--mgb-image-box-title-size': `${titleTypography?.fontSize?.desktop || 20}px`,
		'--mgb-image-box-title-size-tablet': titleTypography?.fontSize?.tablet ? `${titleTypography.fontSize.tablet}px` : undefined,
		'--mgb-image-box-title-size-mobile': titleTypography?.fontSize?.mobile ? `${titleTypography.fontSize.mobile}px` : undefined,
		'--mgb-image-box-title-weight': titleTypography?.fontWeight || '600',
		'--mgb-image-box-title-line-height': titleTypography?.lineHeight || '1.4',
		'--mgb-image-box-title-spacing': `${titleTypography?.letterSpacing || 0}px`,
		'--mgb-image-box-title-transform': titleTypography?.textTransform || 'none',
		'--mgb-image-box-desc-size': `${descriptionTypography?.fontSize?.desktop || 16}px`,
		'--mgb-image-box-desc-size-tablet': descriptionTypography?.fontSize?.tablet ? `${descriptionTypography.fontSize.tablet}px` : undefined,
		'--mgb-image-box-desc-size-mobile': descriptionTypography?.fontSize?.mobile ? `${descriptionTypography.fontSize.mobile}px` : undefined,
		'--mgb-image-box-desc-weight': descriptionTypography?.fontWeight || '400',
		'--mgb-image-box-desc-line-height': descriptionTypography?.lineHeight || '1.6',
		'--mgb-image-box-desc-spacing': `${descriptionTypography?.letterSpacing || 0}px`,
		'--mgb-image-box-desc-transform': descriptionTypography?.textTransform || 'none',
		'--mgb-image-box-link-size': `${linkTypography?.fontSize?.desktop || 15}px`,
		'--mgb-image-box-link-size-tablet': linkTypography?.fontSize?.tablet ? `${linkTypography.fontSize.tablet}px` : undefined,
		'--mgb-image-box-link-size-mobile': linkTypography?.fontSize?.mobile ? `${linkTypography.fontSize.mobile}px` : undefined,
		'--mgb-image-box-link-weight': linkTypography?.fontWeight || '500',
		'--mgb-image-box-link-line-height': linkTypography?.lineHeight || '1.5',
		'--mgb-image-box-content-gap': `${contentGap?.desktop || 12}px`,
		'--mgb-image-box-content-gap-tablet': contentGap?.tablet ? `${contentGap.tablet}px` : undefined,
		'--mgb-image-box-content-gap-mobile': contentGap?.mobile ? `${contentGap.mobile}px` : undefined,
		'--mgb-image-box-title-margin': `${titleSpacing?.desktop || 12}px`,
		'--mgb-image-box-title-margin-tablet': titleSpacing?.tablet ? `${titleSpacing.tablet}px` : undefined,
		'--mgb-image-box-title-margin-mobile': titleSpacing?.mobile ? `${titleSpacing.mobile}px` : undefined,
	};

	const blockProps = useBlockProps({
		className: classNames(
			'mgb-image-box',
			`mgb-image-box-${blockId}`,
			`mgb-image-box--layout-${layout}`,
			`mgb-align-${alignment}`,
			hoverEffect !== 'none' && `mgb-image-box--hover-${hoverEffect}`
		),
		style: boxStyles,
	});

	const onSelectImage = (media) => {
		setAttributes({
			imageUrl: media.url,
			imageId: media.id,
			imageAlt: media.alt || '',
		});
	};

	const onRemoveImage = () => {
		setAttributes({
			imageUrl: '',
			imageId: undefined,
			imageAlt: '',
		});
	};

	// Helper to update nested object attributes
	const updateNestedAttribute = (attrName, key, value) => {
		setAttributes({
			[attrName]: {
				...attributes[attrName],
				[key]: value,
			},
		});
	};

	// Helper to update responsive value
	const updateResponsiveValue = (attrName, device, value) => {
		setAttributes({
			[attrName]: {
				...attributes[attrName],
				[device]: value,
			},
		});
	};

	// Helper to update typography
	const updateTypography = (attrName, key, value) => {
		setAttributes({
			[attrName]: {
				...attributes[attrName],
				[key]: value,
			},
		});
	};

	// Helper to update responsive typography font size
	const updateTypographyFontSize = (attrName, device, value) => {
		setAttributes({
			[attrName]: {
				...attributes[attrName],
				fontSize: {
					...attributes[attrName]?.fontSize,
					[device]: value,
				},
			},
		});
	};

	// Helper to update box shadow
	const updateBoxShadow = (attrName, key, value) => {
		setAttributes({
			[attrName]: {
				...attributes[attrName],
				[key]: value,
			},
		});
	};

	// Helper to update spacing (padding/margin)
	const updateSpacing = (attrName, device, side, value) => {
		setAttributes({
			[attrName]: {
				...attributes[attrName],
				[device]: {
					...attributes[attrName]?.[device],
					[side]: value,
				},
			},
		});
	};

	// Helper to update border radius
	const updateBorderRadius = (device, side, value) => {
		setAttributes({
			imageBorderRadius: {
				...imageBorderRadius,
				[device]: {
					...imageBorderRadius?.[device],
					[side]: value,
				},
			},
		});
	};

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="mgb-inspector-tabs"
					activeClass="is-active"
					tabs={[
						{ name: 'content', title: __('Content', 'magical-blocks'), className: 'mgb-tab-content' },
						{ name: 'style', title: __('Style', 'magical-blocks'), className: 'mgb-tab-style' },
						{ name: 'advanced', title: __('Advanced', 'magical-blocks'), className: 'mgb-tab-advanced' },
					]}
				>
					{(tab) => {
						if (tab.name === 'content') {
							return (
								<>
									<PanelBody title={__('Image', 'magical-blocks')}>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={onSelectImage}
												allowedTypes={['image']}
												value={imageId}
												render={({ open }) => (
													<div className="mgb-media-upload">
														{imageUrl ? (
															<div className="mgb-media-preview">
																<img src={imageUrl} alt={imageAlt} style={{ maxWidth: '100%', height: 'auto' }} />
																<div className="mgb-media-actions" style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
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

										<TextControl
											label={__('Image URL', 'magical-blocks')}
											value={imageUrl}
											onChange={(value) => setAttributes({ imageUrl: value, imageId: 0 })}
											help={__('Enter a direct image URL (ending in .jpg, .png, .webp, etc.). Do not use webpage URLs.', 'magical-blocks')}
											placeholder="https://example.com/image.jpg"
										/>

										{imageUrl && (
											<TextControl
												label={__('Alt Text', 'magical-blocks')}
												value={imageAlt}
												onChange={(value) => setAttributes({ imageAlt: value })}
												help={__('Describe the image for accessibility.', 'magical-blocks')}
											/>
										)}
									</PanelBody>

									<PanelBody title={__('Content', 'magical-blocks')} initialOpen={false}>
										<SelectControl
											label={__('Title Tag', 'magical-blocks')}
											value={titleTag}
											options={[
												{ label: 'H1', value: 'h1' },
												{ label: 'H2', value: 'h2' },
												{ label: 'H3', value: 'h3' },
												{ label: 'H4', value: 'h4' },
												{ label: 'H5', value: 'h5' },
												{ label: 'H6', value: 'h6' },
												{ label: 'p', value: 'p' },
												{ label: 'span', value: 'span' },
											]}
											onChange={(value) => setAttributes({ titleTag: value })}
										/>
									</PanelBody>

									<PanelBody title={__('Link', 'magical-blocks')} initialOpen={false}>
										<TextControl
											label={__('Link URL', 'magical-blocks')}
											value={linkUrl}
											onChange={(value) => setAttributes({ linkUrl: value })}
											type="url"
										/>

										{linkUrl && (
											<>
												<TextControl
													label={__('Link Text', 'magical-blocks')}
													value={linkText}
													onChange={(value) => setAttributes({ linkText: value })}
													help={__('Leave empty to make entire box clickable.', 'magical-blocks')}
												/>

												<ToggleControl
													label={__('Open in New Tab', 'magical-blocks')}
													checked={linkTarget}
													onChange={(value) => setAttributes({ linkTarget: value })}
												/>
											</>
										)}
									</PanelBody>

									<PanelBody title={__('Layout', 'magical-blocks')} initialOpen={false}>
										<SelectControl
											label={__('Image Position', 'magical-blocks')}
											value={layout}
											options={[
												{ label: __('Top', 'magical-blocks'), value: 'top' },
												{ label: __('Bottom', 'magical-blocks'), value: 'bottom' },
												{ label: __('Left', 'magical-blocks'), value: 'left' },
												{ label: __('Right', 'magical-blocks'), value: 'right' },
											]}
											onChange={(value) => setAttributes({ layout: value })}
										/>

										<SelectControl
											label={__('Alignment', 'magical-blocks')}
											value={alignment}
											options={[
												{ label: __('Left', 'magical-blocks'), value: 'left' },
												{ label: __('Center', 'magical-blocks'), value: 'center' },
												{ label: __('Right', 'magical-blocks'), value: 'right' },
											]}
											onChange={(value) => setAttributes({ alignment: value })}
										/>
									</PanelBody>
								</>
							);
						}

						if (tab.name === 'style') {
							return (
								<>
									<PanelBody title={__('Image', 'magical-blocks')}>
									<ResponsiveControl label={__('Image Height', 'magical-blocks')}>
										{(device) => (
											<RangeControl
												value={parseInt(imageHeight?.[device]) || ''}
												onChange={(value) => updateResponsiveValue('imageHeight', device, value?.toString() || '')}
												min={50}
												max={600}
												step={1}
												allowReset={true}
											/>
										)}
									</ResponsiveControl>										{(layout === 'left' || layout === 'right') && (
											<ResponsiveControl label={__('Image Width (%)', 'magical-blocks')}>
												{(device) => (
													<RangeControl
														value={parseInt(imageWidth?.[device]) || (device === 'desktop' ? 40 : '')}
														onChange={(value) => updateResponsiveValue('imageWidth', device, value?.toString() || '')}
														min={10}
														max={80}
														step={1}
													/>
												)}
											</ResponsiveControl>
										)}

										<SelectControl
											label={__('Image Fit', 'magical-blocks')}
											value={imageObjectFit}
											options={[
												{ label: __('Cover', 'magical-blocks'), value: 'cover' },
												{ label: __('Contain', 'magical-blocks'), value: 'contain' },
												{ label: __('Fill', 'magical-blocks'), value: 'fill' },
												{ label: __('None', 'magical-blocks'), value: 'none' },
											]}
											onChange={(value) => setAttributes({ imageObjectFit: value })}
										/>

										<ResponsiveControl label={__('Image Border Radius', 'magical-blocks')}>
											{(device) => (
												<Flex wrap>
													<FlexItem style={{ width: '48%' }}>
														<UnitControl
															label={__('Top', 'magical-blocks')}
															value={`${imageBorderRadius?.[device]?.top || 0}px`}
															onChange={(value) => updateBorderRadius(device, 'top', parseInt(value) || 0)}
														/>
													</FlexItem>
													<FlexItem style={{ width: '48%' }}>
														<UnitControl
															label={__('Right', 'magical-blocks')}
															value={`${imageBorderRadius?.[device]?.right || 0}px`}
															onChange={(value) => updateBorderRadius(device, 'right', parseInt(value) || 0)}
														/>
													</FlexItem>
													<FlexItem style={{ width: '48%' }}>
														<UnitControl
															label={__('Bottom', 'magical-blocks')}
															value={`${imageBorderRadius?.[device]?.bottom || 0}px`}
															onChange={(value) => updateBorderRadius(device, 'bottom', parseInt(value) || 0)}
														/>
													</FlexItem>
													<FlexItem style={{ width: '48%' }}>
														<UnitControl
															label={__('Left', 'magical-blocks')}
															value={`${imageBorderRadius?.[device]?.left || 0}px`}
															onChange={(value) => updateBorderRadius(device, 'left', parseInt(value) || 0)}
														/>
													</FlexItem>
												</Flex>
											)}
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={__('Title', 'magical-blocks')} initialOpen={false}>
										<ColorControl
											label={__('Color', 'magical-blocks')}
											value={titleColor}
											onChange={(value) => setAttributes({ titleColor: value })}
										/>
										<ColorControl
											label={__('Hover Color', 'magical-blocks')}
											value={titleHoverColor}
											onChange={(value) => setAttributes({ titleHoverColor: value })}
										/>
										<TypographyControl
											label={__('Typography', 'magical-blocks')}
											value={titleTypography}
											onChange={(value) => setAttributes({ titleTypography: value })}
										/>
										<ResponsiveControl label={__('Bottom Spacing', 'magical-blocks')}>
											{(device) => (
												<RangeControl
													value={parseInt(titleSpacing?.[device]) || (device === 'desktop' ? 12 : '')}
													onChange={(value) => updateResponsiveValue('titleSpacing', device, value?.toString() || '')}
													min={0}
													max={100}
													step={1}
												/>
											)}
										</ResponsiveControl>
									</PanelBody>

									<PanelBody title={__('Description', 'magical-blocks')} initialOpen={false}>
										<ColorControl
											label={__('Color', 'magical-blocks')}
											value={descriptionColor}
											onChange={(value) => setAttributes({ descriptionColor: value })}
										/>
										<TypographyControl
											label={__('Typography', 'magical-blocks')}
											value={descriptionTypography}
											onChange={(value) => setAttributes({ descriptionTypography: value })}
										/>
									</PanelBody>

									<PanelBody title={__('Link', 'magical-blocks')} initialOpen={false}>
										<ColorControl
											label={__('Color', 'magical-blocks')}
											value={linkColor}
											onChange={(value) => setAttributes({ linkColor: value })}
										/>
										<ColorControl
											label={__('Hover Color', 'magical-blocks')}
											value={linkHoverColor}
											onChange={(value) => setAttributes({ linkHoverColor: value })}
										/>
										<TypographyControl
											label={__('Typography', 'magical-blocks')}
											value={linkTypography}
											onChange={(value) => setAttributes({ linkTypography: value })}
										/>
									</PanelBody>

									<PanelBody title={__('Box Style', 'magical-blocks')} initialOpen={false}>
										<ColorControl
											label={__('Background Color', 'magical-blocks')}
											value={boxBackgroundColor}
											onChange={(value) => setAttributes({ boxBackgroundColor: value })}
										/>
										<ColorControl
											label={__('Background Hover Color', 'magical-blocks')}
											value={boxHoverBackgroundColor}
											onChange={(value) => setAttributes({ boxHoverBackgroundColor: value })}
										/>
										<ColorControl
											label={__('Border Color', 'magical-blocks')}
											value={boxBorderColor}
											onChange={(value) => setAttributes({ boxBorderColor: value })}
										/>
										<ColorControl
											label={__('Border Hover Color', 'magical-blocks')}
											value={boxHoverBorderColor}
											onChange={(value) => setAttributes({ boxHoverBorderColor: value })}
										/>
										<SelectControl
											label={__('Border Style', 'magical-blocks')}
											value={boxBorderStyle}
											options={[
												{ label: __('None', 'magical-blocks'), value: 'none' },
												{ label: __('Solid', 'magical-blocks'), value: 'solid' },
												{ label: __('Dashed', 'magical-blocks'), value: 'dashed' },
												{ label: __('Dotted', 'magical-blocks'), value: 'dotted' },
												{ label: __('Double', 'magical-blocks'), value: 'double' },
											]}
											onChange={(value) => setAttributes({ boxBorderStyle: value })}
										/>
										{boxBorderStyle !== 'none' && (
											<RangeControl
												label={__('Border Width', 'magical-blocks')}
												value={parseInt(boxBorderWidth) || 0}
												onChange={(value) => setAttributes({ boxBorderWidth: value.toString() })}
												min={0}
												max={20}
												step={1}
											/>
										)}
										<RangeControl
											label={__('Border Radius', 'magical-blocks')}
											value={parseInt(boxBorderRadius) || 0}
											onChange={(value) => setAttributes({ boxBorderRadius: value.toString() })}
											min={0}
											max={100}
											step={1}
										/>

										<SelectControl
											label={__('Hover Effect', 'magical-blocks')}
											value={hoverEffect}
											options={[
												{ label: __('None', 'magical-blocks'), value: 'none' },
												{ label: __('Lift', 'magical-blocks'), value: 'lift' },
												{ label: __('Grow', 'magical-blocks'), value: 'grow' },
												{ label: __('Zoom Image', 'magical-blocks'), value: 'zoom' },
											]}
											onChange={(value) => setAttributes({ hoverEffect: value })}
										/>
									</PanelBody>

									<PanelBody title={__('Box Shadow', 'magical-blocks')} initialOpen={false}>
										<ToggleControl
											label={__('Enable Shadow', 'magical-blocks')}
											checked={boxShadow?.enable}
											onChange={(value) => updateBoxShadow('boxShadow', 'enable', value)}
										/>
										{boxShadow?.enable && (
											<>
												<ColorControl
													label={__('Shadow Color', 'magical-blocks')}
													value={boxShadow?.color}
													onChange={(value) => updateBoxShadow('boxShadow', 'color', value)}
												/>
												<RangeControl
													label={__('Horizontal', 'magical-blocks')}
													value={parseInt(boxShadow?.horizontal) || 0}
													onChange={(value) => updateBoxShadow('boxShadow', 'horizontal', value.toString())}
													min={-50}
													max={50}
												/>
												<RangeControl
													label={__('Vertical', 'magical-blocks')}
													value={parseInt(boxShadow?.vertical) || 0}
													onChange={(value) => updateBoxShadow('boxShadow', 'vertical', value.toString())}
													min={-50}
													max={50}
												/>
												<RangeControl
													label={__('Blur', 'magical-blocks')}
													value={parseInt(boxShadow?.blur) || 0}
													onChange={(value) => updateBoxShadow('boxShadow', 'blur', value.toString())}
													min={0}
													max={100}
												/>
												<RangeControl
													label={__('Spread', 'magical-blocks')}
													value={parseInt(boxShadow?.spread) || 0}
													onChange={(value) => updateBoxShadow('boxShadow', 'spread', value.toString())}
													min={-50}
													max={50}
												/>
											</>
										)}
									</PanelBody>

									<PanelBody title={__('Hover Shadow', 'magical-blocks')} initialOpen={false}>
										<ToggleControl
											label={__('Enable Hover Shadow', 'magical-blocks')}
											checked={boxHoverShadow?.enable}
											onChange={(value) => updateBoxShadow('boxHoverShadow', 'enable', value)}
										/>
										{boxHoverShadow?.enable && (
											<>
												<ColorControl
													label={__('Shadow Color', 'magical-blocks')}
													value={boxHoverShadow?.color}
													onChange={(value) => updateBoxShadow('boxHoverShadow', 'color', value)}
												/>
												<RangeControl
													label={__('Horizontal', 'magical-blocks')}
													value={parseInt(boxHoverShadow?.horizontal) || 0}
													onChange={(value) => updateBoxShadow('boxHoverShadow', 'horizontal', value.toString())}
													min={-50}
													max={50}
												/>
												<RangeControl
													label={__('Vertical', 'magical-blocks')}
													value={parseInt(boxHoverShadow?.vertical) || 0}
													onChange={(value) => updateBoxShadow('boxHoverShadow', 'vertical', value.toString())}
													min={-50}
													max={50}
												/>
												<RangeControl
													label={__('Blur', 'magical-blocks')}
													value={parseInt(boxHoverShadow?.blur) || 0}
													onChange={(value) => updateBoxShadow('boxHoverShadow', 'blur', value.toString())}
													min={0}
													max={100}
												/>
												<RangeControl
													label={__('Spread', 'magical-blocks')}
													value={parseInt(boxHoverShadow?.spread) || 0}
													onChange={(value) => updateBoxShadow('boxHoverShadow', 'spread', value.toString())}
													min={-50}
													max={50}
												/>
											</>
										)}
									</PanelBody>
								</>
							);
						}

						if (tab.name === 'advanced') {
							return (
								<>
									<PanelBody title={__('Spacing', 'magical-blocks')}>
										<SpacingControl
											label={__('Padding', 'magical-blocks')}
											value={padding}
											onChange={(value) => setAttributes({ padding: value })}
										/>
										<SpacingControl
											label={__('Margin', 'magical-blocks')}
											value={margin}
											onChange={(value) => setAttributes({ margin: value })}
										/>
										<ResponsiveControl label={__('Content Gap', 'magical-blocks')}>
											{(device) => (
												<RangeControl
													value={parseInt(contentGap?.[device]) || (device === 'desktop' ? 12 : '')}
													onChange={(value) => updateResponsiveValue('contentGap', device, value?.toString() || '')}
													min={0}
													max={100}
													step={1}
												/>
											)}
										</ResponsiveControl>
									</PanelBody>
								</>
							);
						}
					}}
				</TabPanel>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mgb-image-box-inner">
					<div className="mgb-image-box-image">
						{imageUrl ? (
							<img src={imageUrl} alt={imageAlt} />
						) : (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={['image']}
									value={imageId}
									render={({ open }) => (
										<div className="mgb-image-box-placeholder" onClick={open}>
											<span>{__('Select Image', 'magical-blocks')}</span>
										</div>
									)}
								/>
							</MediaUploadCheck>
						)}
					</div>

					<div className="mgb-image-box-content">
						<RichText
							tagName={titleTag}
							className="mgb-image-box-title"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__('Title…', 'magical-blocks')}
						/>

						<RichText
							tagName="p"
							className="mgb-image-box-description"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							placeholder={__('Description…', 'magical-blocks')}
						/>

						{linkUrl && linkText && (
							<span className="mgb-image-box-link">
								<RichText
									tagName="span"
									value={linkText}
									onChange={(value) => setAttributes({ linkText: value })}
									placeholder={__('Read More', 'magical-blocks')}
								/>
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
