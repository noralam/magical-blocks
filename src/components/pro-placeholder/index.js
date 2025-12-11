/**
 * Pro Placeholder Component
 *
 * Placeholder for Pro features in free version.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

import { __ } from '@wordpress/i18n';
import { Placeholder, Button, Icon } from '@wordpress/components';
import { lock, external } from '@wordpress/icons';

import './style.scss';

/**
 * Pro Placeholder Component.
 *
 * @param {Object} props           Component props.
 * @param {string} props.title     Feature title.
 * @param {string} props.description Feature description.
 * @param {string} props.featureId Feature identifier for tracking.
 * @param {string} props.upgradeUrl Upgrade URL (defaults to Pro page).
 * @param {string} props.variant   Display variant ('inline' | 'block' | 'overlay').
 * @return {JSX.Element} The Pro Placeholder component.
 */
const ProPlaceholder = ( {
	title = __( 'Pro Feature', 'magical-blocks' ),
	description = __( 'Upgrade to Magical Blocks Pro to unlock this feature.', 'magical-blocks' ),
	featureId = '',
	upgradeUrl = 'https://wpthemespace.com/',
	variant = 'block',
} ) => {
	/**
	 * Handle upgrade click - can be used for analytics tracking.
	 */
	const handleUpgradeClick = () => {
		// Track upgrade click if tracking is available
		if ( typeof window.MgbTracking !== 'undefined' && featureId ) {
			window.MgbTracking.trackProUpgradeClick( featureId );
		}
	};

	// Inline variant - compact for sidebar panels
	if ( variant === 'inline' ) {
		return (
			<div className="mgb-pro-placeholder mgb-pro-placeholder--inline">
				<Icon icon={ lock } className="mgb-pro-placeholder__icon" />
				<span className="mgb-pro-placeholder__text">{ title }</span>
				<Button
					href={ upgradeUrl }
					target="_blank"
					rel="noopener noreferrer"
					onClick={ handleUpgradeClick }
					className="mgb-pro-placeholder__link"
					isSmall
				>
					{ __( 'Pro', 'magical-blocks' ) }
					<Icon icon={ external } size={ 12 } />
				</Button>
			</div>
		);
	}

	// Overlay variant - for disabled block features
	if ( variant === 'overlay' ) {
		return (
			<div className="mgb-pro-placeholder mgb-pro-placeholder--overlay">
				<div className="mgb-pro-placeholder__overlay-content">
					<Icon icon={ lock } className="mgb-pro-placeholder__icon" size={ 32 } />
					<h4 className="mgb-pro-placeholder__title">{ title }</h4>
					<p className="mgb-pro-placeholder__description">{ description }</p>
					<Button
						href={ upgradeUrl }
						target="_blank"
						rel="noopener noreferrer"
						onClick={ handleUpgradeClick }
						className="mgb-pro-placeholder__button"
						variant="primary"
					>
						{ __( 'Upgrade to Pro', 'magical-blocks' ) }
						<Icon icon={ external } size={ 16 } />
					</Button>
				</div>
			</div>
		);
	}

	// Block variant - standard placeholder
	return (
		<Placeholder
			icon={ lock }
			label={ title }
			instructions={ description }
			className="mgb-pro-placeholder mgb-pro-placeholder--block"
		>
			<Button
				href={ upgradeUrl }
				target="_blank"
				rel="noopener noreferrer"
				onClick={ handleUpgradeClick }
				className="mgb-pro-placeholder__button"
				variant="primary"
			>
				{ __( 'Upgrade to Pro', 'magical-blocks' ) }
				<Icon icon={ external } size={ 16 } />
			</Button>
		</Placeholder>
	);
};

/**
 * Pro Badge Component.
 *
 * Small badge to indicate Pro features.
 *
 * @param {Object} props       Component props.
 * @param {string} props.label Badge label.
 * @return {JSX.Element} The Pro Badge component.
 */
export const ProBadge = ( { label = __( 'Pro', 'magical-blocks' ) } ) => {
	return (
		<span className="mgb-pro-badge">
			<Icon icon={ lock } size={ 12 } />
			{ label }
		</span>
	);
};

/**
 * Check if a feature is available in Pro.
 *
 * @param {string} featureId Feature identifier.
 * @return {boolean} Whether the feature is available.
 */
export const isProFeature = ( featureId ) => {
	// Check global Pro status
	if ( typeof window.MagicalBlocksPro !== 'undefined' && window.MagicalBlocksPro.isActive ) {
		return true;
	}
	return false;
};

/**
 * Higher-order component to gate Pro features.
 *
 * @param {Function} WrappedComponent Component to wrap.
 * @param {Object}   options          Options.
 * @param {string}   options.title    Feature title.
 * @param {string}   options.description Feature description.
 * @param {string}   options.featureId Feature identifier.
 * @param {string}   options.variant  Placeholder variant.
 * @return {Function} Wrapped component.
 */
export const withProGating = ( WrappedComponent, options = {} ) => {
	return ( props ) => {
		if ( ! isProFeature( options.featureId ) ) {
			return <ProPlaceholder { ...options } />;
		}
		return <WrappedComponent { ...props } />;
	};
};

export default ProPlaceholder;
