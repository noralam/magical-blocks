/**
 * Section Block - Edit Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
	__experimentalUnitControl as UnitControl,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { generateBlockId, classNames } from '../../common/utils';
import { ColorControl, ResponsiveControl } from '../../components';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
		contentWidth,
		maxWidth,
		minHeight,
		verticalAlignment,
		horizontalAlignment,
		backgroundColor,
		backgroundGradient,
		backgroundImageUrl,
		backgroundImageId,
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

	// Device state for responsive controls
	const [currentDevice, setCurrentDevice] = useState('desktop');

	// Generate unique block ID
	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: generateBlockId('section') });
		}
	}, [blockId, setAttributes]);

	// Build inline styles with responsive CSS variables
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
		'--mgb-section-padding-top': paddingTop?.desktop || undefined,
		'--mgb-section-padding-top-tablet': paddingTop?.tablet || undefined,
		'--mgb-section-padding-top-mobile': paddingTop?.mobile || undefined,
		'--mgb-section-padding-bottom': paddingBottom?.desktop || undefined,
		'--mgb-section-padding-bottom-tablet': paddingBottom?.tablet || undefined,
		'--mgb-section-padding-bottom-mobile': paddingBottom?.mobile || undefined,
		'--mgb-section-padding-left': paddingLeft?.desktop || undefined,
		'--mgb-section-padding-left-tablet': paddingLeft?.tablet || undefined,
		'--mgb-section-padding-left-mobile': paddingLeft?.mobile || undefined,
		'--mgb-section-padding-right': paddingRight?.desktop || undefined,
		'--mgb-section-padding-right-tablet': paddingRight?.tablet || undefined,
		'--mgb-section-padding-right-mobile': paddingRight?.mobile || undefined,
		'--mgb-section-margin-top': marginTop?.desktop || undefined,
		'--mgb-section-margin-top-tablet': marginTop?.tablet || undefined,
		'--mgb-section-margin-top-mobile': marginTop?.mobile || undefined,
		'--mgb-section-margin-bottom': marginBottom?.desktop || undefined,
		'--mgb-section-margin-bottom-tablet': marginBottom?.tablet || undefined,
		'--mgb-section-margin-bottom-mobile': marginBottom?.mobile || undefined,
		'--mgb-section-border-radius': borderRadius || undefined,
		'--mgb-section-box-shadow': boxShadow || undefined,
		'--mgb-section-max-width': contentWidth === 'boxed' ? maxWidth : undefined,
		'--mgb-section-min-height': minHeight || undefined,
	};

	const blockProps = useBlockProps({
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

	return (
		<>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					value={verticalAlignment}
					onChange={(value) => setAttributes({ verticalAlignment: value })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Layout', 'magical-blocks')}>
					<SelectControl
						label={__('Content Width', 'magical-blocks')}
						value={contentWidth}
						options={[
							{ label: __('Full Width', 'magical-blocks'), value: 'full' },
							{ label: __('Boxed', 'magical-blocks'), value: 'boxed' },
						]}
						onChange={(value) => setAttributes({ contentWidth: value })}
					/>

					{contentWidth === 'boxed' && (
						<UnitControl
							label={__('Max Width', 'magical-blocks')}
							value={maxWidth}
							onChange={(value) => setAttributes({ maxWidth: value })}
							units={[
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
								{ value: 'vw', label: 'vw' },
							]}
						/>
					)}

					<UnitControl
						label={__('Min Height', 'magical-blocks')}
						value={minHeight}
						onChange={(value) => setAttributes({ minHeight: value })}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'vh', label: 'vh' },
							{ value: '%', label: '%' },
						]}
					/>

					<SelectControl
						label={__('Vertical Alignment', 'magical-blocks')}
						value={verticalAlignment}
						options={[
							{ label: __('Top', 'magical-blocks'), value: 'top' },
							{ label: __('Center', 'magical-blocks'), value: 'center' },
							{ label: __('Bottom', 'magical-blocks'), value: 'bottom' },
						]}
						onChange={(value) => setAttributes({ verticalAlignment: value })}
					/>

					<SelectControl
						label={__('Horizontal Alignment', 'magical-blocks')}
						value={horizontalAlignment}
						options={[
							{ label: __('Left', 'magical-blocks'), value: 'left' },
							{ label: __('Center', 'magical-blocks'), value: 'center' },
							{ label: __('Right', 'magical-blocks'), value: 'right' },
						]}
						onChange={(value) => setAttributes({ horizontalAlignment: value })}
					/>

					<SelectControl
						label={__('HTML Tag', 'magical-blocks')}
						value={htmlTag}
						options={[
							{ label: 'section', value: 'section' },
							{ label: 'div', value: 'div' },
							{ label: 'header', value: 'header' },
							{ label: 'footer', value: 'footer' },
							{ label: 'article', value: 'article' },
							{ label: 'aside', value: 'aside' },
							{ label: 'main', value: 'main' },
						]}
						onChange={(value) => setAttributes({ htmlTag: value })}
					/>
				</PanelBody>

				<PanelBody title={__('Background', 'magical-blocks')} initialOpen={false}>
					<ColorControl
						label={__('Background Color', 'magical-blocks')}
						value={backgroundColor}
						onChange={(value) => setAttributes({ backgroundColor: value })}
					/>

					<div className="mgb-control-label">{__('Background Image', 'magical-blocks')}</div>
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
								label={__('Background Position', 'magical-blocks')}
								value={backgroundPosition}
								options={[
									{ label: __('Center Center', 'magical-blocks'), value: 'center center' },
									{ label: __('Center Top', 'magical-blocks'), value: 'center top' },
									{ label: __('Center Bottom', 'magical-blocks'), value: 'center bottom' },
									{ label: __('Left Center', 'magical-blocks'), value: 'left center' },
									{ label: __('Right Center', 'magical-blocks'), value: 'right center' },
								]}
								onChange={(value) => setAttributes({ backgroundPosition: value })}
							/>

							<SelectControl
								label={__('Background Size', 'magical-blocks')}
								value={backgroundSize}
								options={[
									{ label: __('Cover', 'magical-blocks'), value: 'cover' },
									{ label: __('Contain', 'magical-blocks'), value: 'contain' },
									{ label: __('Auto', 'magical-blocks'), value: 'auto' },
								]}
								onChange={(value) => setAttributes({ backgroundSize: value })}
							/>

							<SelectControl
								label={__('Background Attachment', 'magical-blocks')}
								value={backgroundAttachment}
								options={[
									{ label: __('Scroll', 'magical-blocks'), value: 'scroll' },
									{ label: __('Fixed (Parallax)', 'magical-blocks'), value: 'fixed' },
								]}
								onChange={(value) => setAttributes({ backgroundAttachment: value })}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__('Overlay', 'magical-blocks')} initialOpen={false}>
					<ColorControl
						label={__('Overlay Color', 'magical-blocks')}
						value={overlayColor}
						onChange={(value) => setAttributes({ overlayColor: value })}
					/>

					{overlayColor && (
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
					<div className="mgb-spacing-controls">
						<ResponsiveControl
							label={__('Padding Top', 'magical-blocks')}
							device={currentDevice}
							onDeviceChange={setCurrentDevice}
						>
							{(device) => (
								<UnitControl
									value={paddingTop?.[device] || ''}
									onChange={(value) => setAttributes({
										paddingTop: { ...paddingTop, [device]: value }
									})}
								/>
							)}
						</ResponsiveControl>
						<ResponsiveControl
							label={__('Padding Bottom', 'magical-blocks')}
							device={currentDevice}
							onDeviceChange={setCurrentDevice}
						>
							{(device) => (
								<UnitControl
									value={paddingBottom?.[device] || ''}
									onChange={(value) => setAttributes({
										paddingBottom: { ...paddingBottom, [device]: value }
									})}
								/>
							)}
						</ResponsiveControl>
						<ResponsiveControl
							label={__('Padding Left', 'magical-blocks')}
							device={currentDevice}
							onDeviceChange={setCurrentDevice}
						>
							{(device) => (
								<UnitControl
									value={paddingLeft?.[device] || ''}
									onChange={(value) => setAttributes({
										paddingLeft: { ...paddingLeft, [device]: value }
									})}
								/>
							)}
						</ResponsiveControl>
						<ResponsiveControl
							label={__('Padding Right', 'magical-blocks')}
							device={currentDevice}
							onDeviceChange={setCurrentDevice}
						>
							{(device) => (
								<UnitControl
									value={paddingRight?.[device] || ''}
									onChange={(value) => setAttributes({
										paddingRight: { ...paddingRight, [device]: value }
									})}
								/>
							)}
						</ResponsiveControl>
					</div>

					<div className="mgb-spacing-controls">
						<ResponsiveControl
							label={__('Margin Top', 'magical-blocks')}
							device={currentDevice}
							onDeviceChange={setCurrentDevice}
						>
							{(device) => (
								<UnitControl
									value={marginTop?.[device] || ''}
									onChange={(value) => setAttributes({
										marginTop: { ...marginTop, [device]: value }
									})}
								/>
							)}
						</ResponsiveControl>
						<ResponsiveControl
							label={__('Margin Bottom', 'magical-blocks')}
							device={currentDevice}
							onDeviceChange={setCurrentDevice}
						>
							{(device) => (
								<UnitControl
									value={marginBottom?.[device] || ''}
									onChange={(value) => setAttributes({
										marginBottom: { ...marginBottom, [device]: value }
									})}
								/>
							)}
						</ResponsiveControl>
					</div>
				</PanelBody>

				<PanelBody title={__('Border & Shadow', 'magical-blocks')} initialOpen={false}>
					<UnitControl
						label={__('Border Radius', 'magical-blocks')}
						value={borderRadius}
						onChange={(value) => setAttributes({ borderRadius: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{overlayColor && <div className="mgb-section-overlay" />}
				<div className="mgb-section-inner">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
