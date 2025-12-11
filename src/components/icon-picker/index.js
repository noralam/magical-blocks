/**
 * Icon Picker Component
 *
 * Icon selection control for blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import {
	Button,
	Modal,
	SearchControl,
	Flex,
	FlexBlock,
	FlexItem,
	TabPanel,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useState, useMemo } from '@wordpress/element';
import { close } from '@wordpress/icons';

import { iconCategories, getIconsByCategory, searchIcons, getIconSvg } from './icons-data';
import './style.scss';

/**
 * Icon Preview Component - Renders an icon by name.
 *
 * @param {Object} props           Component props.
 * @param {string} props.icon      Icon name.
 * @param {string} props.iconType  Icon type (default: 'icon').
 * @param {number} props.size      Icon size in pixels.
 * @param {string} props.color     Icon color.
 * @return {JSX.Element|null} The icon preview or null.
 */
const IconPreview = ( { icon, iconType = 'icon', size, color } ) => {
	if ( ! icon ) {
		return null;
	}

	const iconSvg = getIconSvg( icon );
	if ( ! iconSvg ) {
		return null;
	}

	const style = {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: size ? `${ size }px` : '1em',
		height: size ? `${ size }px` : '1em',
		color: color || 'currentColor',
	};

	return (
		<span
			className="mgb-icon-preview"
			style={ style }
			dangerouslySetInnerHTML={ { __html: iconSvg } }
		/>
	);
};

/**
 * Icon Picker Component.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.label           Control label.
 * @param {string}   props.value           Current icon name.
 * @param {Function} props.onChange        Icon change handler.
 * @param {number}   props.iconSize        Icon size in pixels.
 * @param {Function} props.onIconSizeChange Icon size change handler.
 * @param {string}   props.iconColor       Icon color.
 * @return {JSX.Element} The Icon Picker component.
 */
const IconPicker = ( {
	label = __( 'Icon', 'magical-blocks' ),
	value = '',
	onChange,
	iconSize = 24,
	onIconSizeChange,
	iconColor = 'currentColor',
} ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ activeCategory, setActiveCategory ] = useState( 'all' );

	/**
	 * Get filtered icons based on search and category.
	 */
	const filteredIcons = useMemo( () => {
		if ( searchTerm ) {
			return searchIcons( searchTerm );
		}
		if ( activeCategory === 'all' ) {
			return getIconsByCategory();
		}
		return getIconsByCategory( activeCategory );
	}, [ searchTerm, activeCategory ] );

	/**
	 * Handle icon selection.
	 *
	 * @param {string} iconName The selected icon name.
	 */
	const handleSelect = ( iconName ) => {
		onChange( iconName );
		setIsOpen( false );
		setSearchTerm( '' );
	};

	/**
	 * Handle icon removal.
	 */
	const handleRemove = () => {
		onChange( '' );
	};

	/**
	 * Render selected icon preview.
	 */
	const renderPreview = () => {
		if ( ! value ) {
			return (
				<div className="mgb-icon-picker__placeholder">
					{ __( 'Select icon', 'magical-blocks' ) }
				</div>
			);
		}

		const iconSvg = getIconSvg( value );
		return (
			<div
				className="mgb-icon-picker__preview"
				style={ {
					width: iconSize,
					height: iconSize,
					color: iconColor,
				} }
				dangerouslySetInnerHTML={ { __html: iconSvg } }
			/>
		);
	};

	/**
	 * Category tabs for the icon modal.
	 */
	const categoryTabs = [
		{ name: 'all', title: __( 'All', 'magical-blocks' ) },
		...Object.entries( iconCategories ).map( ( [ key, label ] ) => ( {
			name: key,
			title: label,
		} ) ),
	];

	return (
		<div className="mgb-icon-picker">
			<div className="mgb-icon-picker__header">
				<span className="mgb-icon-picker__label">{ label }</span>
			</div>

			<Flex className="mgb-icon-picker__controls">
				<FlexBlock>
					<Button
						className="mgb-icon-picker__selector"
						onClick={ () => setIsOpen( true ) }
					>
						{ renderPreview() }
						<span className="mgb-icon-picker__button-text">
							{ value || __( 'Choose Icon', 'magical-blocks' ) }
						</span>
					</Button>
				</FlexBlock>

				{ value && (
					<FlexItem>
						<Button
							icon={ close }
							label={ __( 'Remove icon', 'magical-blocks' ) }
							onClick={ handleRemove }
							isSmall
							isDestructive
						/>
					</FlexItem>
				) }
			</Flex>

			{ onIconSizeChange && (
				<div className="mgb-icon-picker__size">
					<NumberControl
						label={ __( 'Icon Size', 'magical-blocks' ) }
						value={ iconSize }
						onChange={ ( val ) => onIconSizeChange( val ? parseInt( val, 10 ) : 24 ) }
						min={ 12 }
						max={ 200 }
						step={ 1 }
					/>
				</div>
			) }

			{ isOpen && (
				<Modal
					title={ __( 'Select Icon', 'magical-blocks' ) }
					onRequestClose={ () => setIsOpen( false ) }
					className="mgb-icon-picker__modal"
				>
					<div className="mgb-icon-picker__modal-content">
						<SearchControl
							value={ searchTerm }
							onChange={ setSearchTerm }
							placeholder={ __( 'Search icons...', 'magical-blocks' ) }
							className="mgb-icon-picker__search"
						/>

						{ ! searchTerm && (
							<TabPanel
								className="mgb-icon-picker__tabs"
								activeClass="is-active"
								tabs={ categoryTabs }
								onSelect={ ( tabName ) => setActiveCategory( tabName ) }
							>
								{ () => null }
							</TabPanel>
						) }

						<div className="mgb-icon-picker__grid">
							{ filteredIcons.length > 0 ? (
								filteredIcons.map( ( iconName ) => {
									const iconSvg = getIconSvg( iconName );
									return (
										<Button
											key={ iconName }
											className={ `mgb-icon-picker__item ${ value === iconName ? 'is-selected' : '' }` }
											onClick={ () => handleSelect( iconName ) }
											title={ iconName }
										>
											<span
												className="mgb-icon-picker__item-icon"
												dangerouslySetInnerHTML={ { __html: iconSvg } }
											/>
											<span className="mgb-icon-picker__item-name">
												{ iconName }
											</span>
										</Button>
									);
								} )
							) : (
								<div className="mgb-icon-picker__no-results">
									{ __( 'No icons found', 'magical-blocks' ) }
								</div>
							) }
						</div>
					</div>
				</Modal>
			) }
		</div>
	);
};

// Attach Preview as a static property
IconPicker.Preview = IconPreview;

export default IconPicker;
