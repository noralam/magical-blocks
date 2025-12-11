/**
 * Magical Heading Block - Edit Component
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	RangeControl,
	__experimentalNumberControl as NumberControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

import { generateBlockId, classNames } from '@common/utils';
import { BREAKPOINTS } from '@common/constants';
import ColorControl from '../../components/color-control';
import TypographyControl from '../../components/typography-control';
import SpacingControl from '../../components/spacing-control';
import ResponsiveControl from '../../components/responsive-control';

/**
 * Edit component for the Heading block.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Set attributes function.
 * @param {string}   props.clientId      Block client ID.
 * @return {JSX.Element} The edit component.
 */
const Edit = ( { attributes, setAttributes, clientId } ) => {
	const {
		blockId,
		content,
		headingTag,
		textAlign,
		fontFamily,
		fontSize,
		fontSizeTablet,
		fontSizeMobile,
		fontSizeUnit,
		fontWeight,
		textTransform,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		letterSpacing,
		textColor,
		textColorHover,
		backgroundColor,
		highlightColor,
		highlightText,
		padding,
		paddingUnit,
		margin,
		marginUnit,
		separatorEnabled,
		separatorPosition,
		separatorStyle,
		separatorWidth,
		separatorWidthUnit,
		separatorHeight,
		separatorColor,
		separatorSpacing,
	} = attributes;

	// Generate unique block ID
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: generateBlockId( 'heading' ) } );
		}
	}, [ blockId ] );

	// Build inline styles
	const headingStyles = {
		fontFamily: fontFamily || undefined,
		fontSize: fontSize ? `${ fontSize }${ fontSizeUnit }` : undefined,
		fontWeight: fontWeight || undefined,
		textTransform: textTransform || undefined,
		lineHeight: lineHeight || undefined,
		letterSpacing: letterSpacing ? `${ letterSpacing }px` : undefined,
		color: textColor || undefined,
		backgroundColor: backgroundColor || undefined,
		textAlign: textAlign || undefined,
		paddingTop: padding?.top ? `${ padding.top }${ paddingUnit }` : undefined,
		paddingRight: padding?.right ? `${ padding.right }${ paddingUnit }` : undefined,
		paddingBottom: padding?.bottom ? `${ padding.bottom }${ paddingUnit }` : undefined,
		paddingLeft: padding?.left ? `${ padding.left }${ paddingUnit }` : undefined,
		marginTop: margin?.top ? `${ margin.top }${ marginUnit }` : undefined,
		marginRight: margin?.right ? `${ margin.right }${ marginUnit }` : undefined,
		marginBottom: margin?.bottom ? `${ margin.bottom }${ marginUnit }` : undefined,
		marginLeft: margin?.left ? `${ margin.left }${ marginUnit }` : undefined,
	};

	// Build separator styles
	const separatorStyles = separatorEnabled ? {
		width: `${ separatorWidth }${ separatorWidthUnit }`,
		height: `${ separatorHeight }px`,
		backgroundColor: separatorColor || 'currentColor',
		borderStyle: separatorStyle !== 'solid' ? separatorStyle : undefined,
		marginTop: separatorPosition === 'bottom' ? `${ separatorSpacing }px` : undefined,
		marginBottom: separatorPosition === 'top' ? `${ separatorSpacing }px` : undefined,
	} : {};

	// Block props
	const blockProps = useBlockProps( {
		className: classNames(
			'mgb-heading',
			`mgb-heading--${ headingTag }`,
			textAlign && `mgb-heading--align-${ textAlign }`,
			separatorEnabled && `mgb-heading--has-separator mgb-heading--separator-${ separatorPosition }`,
			blockId && `mgb-block-${ blockId }`
		),
	} );

	// Heading tag options
	const headingTagOptions = [
		{ label: 'H1', value: 'h1' },
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
		{ label: 'H4', value: 'h4' },
		{ label: 'H5', value: 'h5' },
		{ label: 'H6', value: 'h6' },
		{ label: 'P', value: 'p' },
		{ label: 'Span', value: 'span' },
	];

	const HeadingTag = headingTag;

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( value ) => setAttributes( { textAlign: value } ) }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Heading Settings', 'magical-blocks' ) } initialOpen={ true }>
					<div className="mgb-heading-tag-selector">
						<span className="components-base-control__label">
							{ __( 'Heading Tag', 'magical-blocks' ) }
						</span>
						<ButtonGroup>
							{ headingTagOptions.map( ( option ) => (
								<Button
									key={ option.value }
									isPrimary={ headingTag === option.value }
									onClick={ () => setAttributes( { headingTag: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'magical-blocks' ) } initialOpen={ false }>
					<TypographyControl
						fontFamily={ fontFamily }
						onFontFamilyChange={ ( value ) => setAttributes( { fontFamily: value } ) }
						fontSize={ fontSize }
						onFontSizeChange={ ( value ) => setAttributes( { fontSize: value } ) }
						fontSizeTablet={ fontSizeTablet }
						onFontSizeTabletChange={ ( value ) => setAttributes( { fontSizeTablet: value } ) }
						fontSizeMobile={ fontSizeMobile }
						onFontSizeMobileChange={ ( value ) => setAttributes( { fontSizeMobile: value } ) }
						fontSizeUnit={ fontSizeUnit }
						onFontSizeUnitChange={ ( value ) => setAttributes( { fontSizeUnit: value } ) }
						fontWeight={ fontWeight }
						onFontWeightChange={ ( value ) => setAttributes( { fontWeight: value } ) }
						textTransform={ textTransform }
						onTextTransformChange={ ( value ) => setAttributes( { textTransform: value } ) }
						lineHeight={ lineHeight }
						onLineHeightChange={ ( value ) => setAttributes( { lineHeight: value } ) }
						lineHeightTablet={ lineHeightTablet }
						onLineHeightTabletChange={ ( value ) => setAttributes( { lineHeightTablet: value } ) }
						lineHeightMobile={ lineHeightMobile }
						onLineHeightMobileChange={ ( value ) => setAttributes( { lineHeightMobile: value } ) }
						letterSpacing={ letterSpacing }
						onLetterSpacingChange={ ( value ) => setAttributes( { letterSpacing: value } ) }
						onReset={ () => setAttributes( {
							fontFamily: '',
							fontSize: undefined,
							fontSizeTablet: undefined,
							fontSizeMobile: undefined,
							fontSizeUnit: 'px',
							fontWeight: '',
							textTransform: '',
							lineHeight: undefined,
							lineHeightTablet: undefined,
							lineHeightMobile: undefined,
							letterSpacing: undefined,
						} ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'magical-blocks' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Text Color', 'magical-blocks' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Text Hover Color', 'magical-blocks' ) }
						value={ textColorHover }
						onChange={ ( value ) => setAttributes( { textColorHover: value } ) }
					/>
					<ColorControl
						label={ __( 'Background Color', 'magical-blocks' ) }
						value={ backgroundColor }
						onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Highlight Color', 'magical-blocks' ) }
						value={ highlightColor }
						onChange={ ( value ) => setAttributes( { highlightColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Spacing', 'magical-blocks' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'magical-blocks' ) }
						value={ padding }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						unit={ paddingUnit }
						onUnitChange={ ( value ) => setAttributes( { paddingUnit: value } ) }
					/>
					<SpacingControl
						label={ __( 'Margin', 'magical-blocks' ) }
						value={ margin }
						onChange={ ( value ) => setAttributes( { margin: value } ) }
						unit={ marginUnit }
						onUnitChange={ ( value ) => setAttributes( { marginUnit: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Separator', 'magical-blocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Separator', 'magical-blocks' ) }
						checked={ separatorEnabled }
						onChange={ ( value ) => setAttributes( { separatorEnabled: value } ) }
					/>
					{ separatorEnabled && (
						<>
							<SelectControl
								label={ __( 'Position', 'magical-blocks' ) }
								value={ separatorPosition }
								options={ [
									{ label: __( 'Top', 'magical-blocks' ), value: 'top' },
									{ label: __( 'Bottom', 'magical-blocks' ), value: 'bottom' },
								] }
								onChange={ ( value ) => setAttributes( { separatorPosition: value } ) }
							/>
							<SelectControl
								label={ __( 'Style', 'magical-blocks' ) }
								value={ separatorStyle }
								options={ [
									{ label: __( 'Solid', 'magical-blocks' ), value: 'solid' },
									{ label: __( 'Dashed', 'magical-blocks' ), value: 'dashed' },
									{ label: __( 'Dotted', 'magical-blocks' ), value: 'dotted' },
									{ label: __( 'Double', 'magical-blocks' ), value: 'double' },
								] }
								onChange={ ( value ) => setAttributes( { separatorStyle: value } ) }
							/>
							<RangeControl
								label={ __( 'Width', 'magical-blocks' ) }
								value={ separatorWidth }
								onChange={ ( value ) => setAttributes( { separatorWidth: value } ) }
								min={ 0 }
								max={ separatorWidthUnit === '%' ? 100 : 500 }
							/>
							<RangeControl
								label={ __( 'Height', 'magical-blocks' ) }
								value={ separatorHeight }
								onChange={ ( value ) => setAttributes( { separatorHeight: value } ) }
								min={ 1 }
								max={ 20 }
							/>
							<ColorControl
								label={ __( 'Color', 'magical-blocks' ) }
								value={ separatorColor }
								onChange={ ( value ) => setAttributes( { separatorColor: value } ) }
							/>
							<RangeControl
								label={ __( 'Spacing', 'magical-blocks' ) }
								value={ separatorSpacing }
								onChange={ ( value ) => setAttributes( { separatorSpacing: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ separatorEnabled && separatorPosition === 'top' && (
					<span className="mgb-heading__separator" style={ separatorStyles } />
				) }
				<RichText
					tagName={ HeadingTag }
					className="mgb-heading__text"
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					placeholder={ __( 'Write heading...', 'magical-blocks' ) }
					style={ headingStyles }
				/>
				{ separatorEnabled && separatorPosition === 'bottom' && (
					<span className="mgb-heading__separator" style={ separatorStyles } />
				) }
			</div>
		</>
	);
};

export default Edit;
