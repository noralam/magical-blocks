<?php
/**
 * Main plugin class for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

// Load traits.
require_once MAGICAL_BLOCKS_PATH . 'includes/traits/trait-magical-blocks-singleton.php';

/**
 * Class Magical_Blocks
 *
 * Main plugin class that initializes all components.
 */
final class Magical_Blocks {

	use Magical_Blocks_Singleton_Trait;

	/**
	 * Initialize the plugin.
	 *
	 * @return void
	 */
	protected function init() {
		$this->load_dependencies();
		$this->init_hooks();

		/**
		 * Fires after Magical Blocks is fully loaded.
		 *
		 * @since 1.0.0
		 */
		do_action( 'magical_blocks_loaded' );
	}

	/**
	 * Load required dependencies.
	 *
	 * @return void
	 */
	private function load_dependencies() {
		// Load traits.
		require_once MAGICAL_BLOCKS_PATH . 'includes/traits/trait-magical-blocks-block-attributes.php';
		require_once MAGICAL_BLOCKS_PATH . 'includes/traits/trait-magical-blocks-responsive.php';
		require_once MAGICAL_BLOCKS_PATH . 'includes/traits/trait-magical-blocks-pro-gating.php';

		// Load core classes.
		require_once MAGICAL_BLOCKS_PATH . 'includes/class-magical-blocks-loader.php';
		require_once MAGICAL_BLOCKS_PATH . 'includes/class-magical-blocks-blocks.php';
		require_once MAGICAL_BLOCKS_PATH . 'includes/class-magical-blocks-assets.php';
		require_once MAGICAL_BLOCKS_PATH . 'patterns/class-magical-blocks-patterns.php';
	}

	/**
	 * Initialize WordPress hooks.
	 *
	 * @return void
	 */
	private function init_hooks() {
		// Initialize components - check if init already fired.
		add_action( 'init', array( $this, 'load_textdomain' ) );
		
		if ( did_action( 'init' ) ) {
			$this->init_components();
		} else {
			add_action( 'init', array( $this, 'init_components' ), 0 );
		}

		// Admin hooks.
		add_action( 'admin_init', array( $this, 'check_version' ) );
		add_filter( 'plugin_action_links_' . MAGICAL_BLOCKS_BASENAME, array( $this, 'add_plugin_links' ) );
	}

	/**
	 * Load plugin textdomain for translations.
	 *
	 * @return void
	 */
	public function load_textdomain() {
		load_plugin_textdomain(
			'magical-blocks',
			false,
			dirname( MAGICAL_BLOCKS_BASENAME ) . '/languages'
		);
	}

	/**
	 * Initialize plugin components.
	 *
	 * @return void
	 */
	public function init_components() {
		// Initialize blocks.
		Magical_Blocks_Blocks::get_instance();

		// Initialize assets.
		Magical_Blocks_Assets::get_instance();

		// Initialize patterns.
		Magical_Blocks_Patterns::get_instance();
	}

	/**
	 * Check plugin version for upgrades.
	 *
	 * @return void
	 */
	public function check_version() {
		$current_version = get_option( 'magical_blocks_version', '0.0.0' );

		if ( version_compare( $current_version, MAGICAL_BLOCKS_VERSION, '<' ) ) {
			$this->upgrade( $current_version );
			update_option( 'magical_blocks_version', MAGICAL_BLOCKS_VERSION );
		}
	}

	/**
	 * Handle plugin upgrades.
	 *
	 * @param string $from_version Previous version.
	 * @return void
	 */
	private function upgrade( $from_version ) {
		/**
		 * Fires during plugin upgrade.
		 *
		 * @since 1.0.0
		 *
		 * @param string $from_version Previous version.
		 * @param string $to_version   New version.
		 */
		do_action( 'magical_blocks_upgrade', $from_version, MAGICAL_BLOCKS_VERSION );
	}

	/**
	 * Add plugin action links.
	 *
	 * @param array $links Existing plugin links.
	 * @return array Modified links.
	 */
	public function add_plugin_links( $links ) {
		$plugin_links = array();

		// Settings link (for future admin panel).
		// $plugin_links[] = sprintf(
		// '<a href="%s">%s</a>',
		// admin_url( 'admin.php?page=magical-blocks' ),
		// esc_html__( 'Settings', 'magical-blocks' )
		// );

		// Pro upgrade link.
		if ( ! magical_blocks_has_pro() ) {
			$plugin_links[] = sprintf(
				'<a href="%s" target="_blank" style="color: #5C6BC0; font-weight: 600;">%s</a>',
				esc_url( 'https://wpthemespace.com/' ),
				esc_html__( 'Go Pro', 'magical-blocks' )
			);
		}

		return array_merge( $plugin_links, $links );
	}

	/**
	 * Get plugin URL.
	 *
	 * @param string $path Optional path to append.
	 * @return string Plugin URL.
	 */
	public function get_url( $path = '' ) {
		return MAGICAL_BLOCKS_URL . ltrim( $path, '/' );
	}

	/**
	 * Get plugin path.
	 *
	 * @param string $path Optional path to append.
	 * @return string Plugin path.
	 */
	public function get_path( $path = '' ) {
		return MAGICAL_BLOCKS_PATH . ltrim( $path, '/' );
	}
}
