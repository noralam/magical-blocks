/**
 * Magical Button Block - Save Component
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { classNames } from '@common/utils';
import { getIconSvg } from '../../components/icon-picker/icons-data';

/**
 * Save component for the Button block.
 *
 * @param {Object} props            Component props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} The save component.
 */
const save = ( { attributes } ) => {
	const {
		blockId,
		text,
		url,
		linkTarget,
		rel,
		buttonAlign,
		buttonSize,
		buttonWidth,
		customWidth,
		customWidthUnit,
		fontFamily,
		fontSize,
		fontSizeUnit,
		fontWeight,
		textTransform,
		letterSpacing,
		textColor,
		textColorHover,
		backgroundColor,
		backgroundColorHover,
		gradientEnabled,
		gradientColor1,
		gradientColor2,
		gradientAngle,
		borderRadius,
		borderRadiusUnit,
		borderWidth,
		borderColor,
		borderColorHover,
		borderStyle,
		padding,
		paddingUnit,
		margin,
		marginUnit,
		boxShadow,
		boxShadowHorizontal,
		boxShadowVertical,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
		iconEnabled,
		icon,
		iconPosition,
		iconSize,
		iconSpacing,
		hoverEffect,
	} = attributes;

	// Size presets
	const sizePresets = {
		small: { padding: '8px 16px', fontSize: '13px' },
		medium: { padding: '12px 24px', fontSize: '15px' },
		large: { padding: '16px 32px', fontSize: '17px' },
		xlarge: { padding: '20px 40px', fontSize: '19px' },
	};

	// Build CSS variables for hover states
	const cssVars = {};
	if ( textColorHover ) {
		cssVars[ '--mgb-btn-hover-color' ] = textColorHover;
	}
	if ( backgroundColorHover ) {
		cssVars[ '--mgb-btn-hover-bg' ] = backgroundColorHover;
	}
	if ( borderColorHover ) {
		cssVars[ '--mgb-btn-hover-border' ] = borderColorHover;
	}

	// Build button styles
	const buttonStyles = {
		...cssVars,
		fontFamily: fontFamily || undefined,
		fontSize: fontSize ? `${ fontSize }${ fontSizeUnit }` : sizePresets[ buttonSize ]?.fontSize,
		fontWeight: fontWeight || undefined,
		textTransform: textTransform || undefined,
		letterSpacing: letterSpacing ? `${ letterSpacing }px` : undefined,
		color: textColor || undefined,
		background: gradientEnabled
			? `linear-gradient(${ gradientAngle }deg, ${ gradientColor1 }, ${ gradientColor2 })`
			: backgroundColor || undefined,
		borderRadius: borderRadius
			? `${ borderRadius.top || 0 }${ borderRadiusUnit } ${ borderRadius.right || 0 }${ borderRadiusUnit } ${ borderRadius.bottom || 0 }${ borderRadiusUnit } ${ borderRadius.left || 0 }${ borderRadiusUnit }`
			: undefined,
		borderWidth: borderWidth ? `${ borderWidth }px` : undefined,
		borderColor: borderColor || undefined,
		borderStyle: borderWidth ? borderStyle : undefined,
		padding: padding?.top || padding?.right || padding?.bottom || padding?.left
			? `${ padding.top || 0 }${ paddingUnit } ${ padding.right || 0 }${ paddingUnit } ${ padding.bottom || 0 }${ paddingUnit } ${ padding.left || 0 }${ paddingUnit }`
			: sizePresets[ buttonSize ]?.padding,
		boxShadow: boxShadow
			? `${ boxShadowHorizontal }px ${ boxShadowVertical }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${ boxShadowColor }`
			: undefined,
		width: buttonWidth === 'custom' && customWidth ? `${ customWidth }${ customWidthUnit }` : buttonWidth === 'full' ? '100%' : undefined,
	};

	// Clean undefined values
	Object.keys( buttonStyles ).forEach( ( key ) => {
		if ( buttonStyles[ key ] === undefined ) {
			delete buttonStyles[ key ];
		}
	} );

	const blockProps = useBlockProps.save( {
		className: classNames(
			'mgb-button-wrapper',
			`mgb-button-wrapper--align-${ buttonAlign }`,
			blockId && `mgb-block-${ blockId }`
		),
	} );

	const buttonClasses = classNames(
		'mgb-button',
		`mgb-button--size-${ buttonSize }`,
		buttonWidth === 'full' && 'mgb-button--full-width',
		hoverEffect !== 'none' && `mgb-button--hover-${ hoverEffect }`,
		iconEnabled && icon && `mgb-button--has-icon mgb-button--icon-${ iconPosition }`
	);

	const ButtonTag = url ? 'a' : 'span';
	const buttonProps = url ? {
		href: url,
		target: linkTarget !== '_self' ? linkTarget : undefined,
		rel: rel || undefined,
	} : {};

	// Get icon SVG
	const iconSvg = icon ? getIconSvg( icon ) : null;

	return (
		<div { ...blockProps }>
			<ButtonTag className={ buttonClasses } style={ buttonStyles } { ...buttonProps }>
				{ iconEnabled && icon && iconPosition === 'left' && iconSvg && (
					<span
						className="mgb-button__icon mgb-button__icon--left"
						style={ { marginRight: `${ iconSpacing }px`, width: iconSize, height: iconSize } }
						dangerouslySetInnerHTML={ { __html: iconSvg } }
					/>
				) }
				<RichText.Content
					tagName="span"
					className="mgb-button__text"
					value={ text }
				/>
				{ iconEnabled && icon && iconPosition === 'right' && iconSvg && (
					<span
						className="mgb-button__icon mgb-button__icon--right"
						style={ { marginLeft: `${ iconSpacing }px`, width: iconSize, height: iconSize } }
						dangerouslySetInnerHTML={ { __html: iconSvg } }
					/>
				) }
			</ButtonTag>
		</div>
	);
};

export default save;
