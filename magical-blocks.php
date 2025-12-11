<?php
/**
 * Plugin Name:       Magical Blocks
 * Plugin URI:        https://wpthemespace.com/
 * Description:       Get the Elementor vibe in Gutenberg! Flexbox containers, responsive controls, and 12+ professional blocks for building stunning websites.
 * Version:           2.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            Noor Alam
 * Author URI:        https://profiles.wordpress.org/nalam-1/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       magical-blocks
 * Domain Path:       /languages
 *
 * @package Magical_Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Main Magical Blocks Plugin Class.
 *
 * @since 2.0.0
 */
final class Magical_Blocks_Plugin {

	/**
	 * Plugin version.
	 *
	 * @var string
	 */
	const VERSION = '2.0.0';

	/**
	 * Minimum PHP version required.
	 *
	 * @var string
	 */
	const MIN_PHP = '8.0';

	/**
	 * Minimum WordPress version required.
	 *
	 * @var string
	 */
	const MIN_WP = '6.0';

	/**
	 * Single instance of the class.
	 *
	 * @var Magical_Blocks_Plugin|null
	 */
	private static ?Magical_Blocks_Plugin $instance = null;

	/**
	 * Plugin file path.
	 *
	 * @var string
	 */
	private string $file;

	/**
	 * Plugin directory path.
	 *
	 * @var string
	 */
	private string $path;

	/**
	 * Plugin directory URL.
	 *
	 * @var string
	 */
	private string $url;

	/**
	 * Get single instance of the class.
	 *
	 * @return Magical_Blocks_Plugin
	 */
	public static function instance(): Magical_Blocks_Plugin {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {
		$this->file = __FILE__;
		$this->path = plugin_dir_path( __FILE__ );
		$this->url  = plugin_dir_url( __FILE__ );

		$this->define_constants();
		$this->register_hooks();
	}

	/**
	 * Prevent cloning.
	 *
	 * @return void
	 */
	private function __clone() {}

	/**
	 * Prevent unserialization.
	 *
	 * @throws \Exception When trying to unserialize.
	 * @return void
	 */
	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize singleton.' );
	}

	/**
	 * Define plugin constants.
	 *
	 * @return void
	 */
	private function define_constants(): void {
		define( 'MAGICAL_BLOCKS_VERSION', self::VERSION );
		define( 'MAGICAL_BLOCKS_FILE', $this->file );
		define( 'MAGICAL_BLOCKS_PATH', $this->path );
		define( 'MAGICAL_BLOCKS_URL', $this->url );
		define( 'MAGICAL_BLOCKS_BASENAME', plugin_basename( $this->file ) );
		define( 'MAGICAL_BLOCKS_MIN_PHP', self::MIN_PHP );
		define( 'MAGICAL_BLOCKS_MIN_WP', self::MIN_WP );
	}

	/**
	 * Register plugin hooks.
	 *
	 * @return void
	 */
	private function register_hooks(): void {
		add_action( 'plugins_loaded', array( $this, 'init' ) );
		register_activation_hook( $this->file, array( $this, 'activate' ) );
		register_deactivation_hook( $this->file, array( $this, 'deactivate' ) );
	}

	/**
	 * Check PHP version requirement.
	 *
	 * @return bool
	 */
	private function check_php_version(): bool {
		return version_compare( PHP_VERSION, self::MIN_PHP, '>=' );
	}

	/**
	 * Check WordPress version requirement.
	 *
	 * @return bool
	 */
	private function check_wp_version(): bool {
		return version_compare( get_bloginfo( 'version' ), self::MIN_WP, '>=' );
	}

	/**
	 * Display admin notice for version requirements not met.
	 *
	 * @return void
	 */
	public function requirements_notice(): void {
		$message = '';

		if ( ! $this->check_php_version() ) {
			$message = sprintf(
				/* translators: 1: Plugin name, 2: Required PHP version, 3: Current PHP version */
				esc_html__( '%1$s requires PHP version %2$s or higher. You are running PHP %3$s.', 'magical-blocks' ),
				'<strong>Magical Blocks</strong>',
				self::MIN_PHP,
				PHP_VERSION
			);
		} elseif ( ! $this->check_wp_version() ) {
			$message = sprintf(
				/* translators: 1: Plugin name, 2: Required WordPress version */
				esc_html__( '%1$s requires WordPress version %2$s or higher.', 'magical-blocks' ),
				'<strong>Magical Blocks</strong>',
				self::MIN_WP
			);
		}

		if ( $message ) {
			printf(
				'<div class="notice notice-error"><p>%s</p></div>',
				wp_kses_post( $message )
			);
		}
	}

	/**
	 * Initialize the plugin.
	 *
	 * @return void
	 */
	public function init(): void {
		// Check requirements.
		if ( ! $this->check_php_version() || ! $this->check_wp_version() ) {
			add_action( 'admin_notices', array( $this, 'requirements_notice' ) );
			return;
		}

		// Load dependencies.
		require_once $this->path . 'includes/functions.php';
		require_once $this->path . 'includes/class-magical-blocks.php';

		// Initialize the main class.
		Magical_Blocks::get_instance();
	}

	/**
	 * Plugin activation.
	 *
	 * @return void
	 */
	public function activate(): void {
		// Check requirements before activation.
		if ( ! $this->check_php_version() || ! $this->check_wp_version() ) {
			deactivate_plugins( plugin_basename( $this->file ) );
			wp_die(
				esc_html__( 'Magical Blocks requires PHP 8.0+ and WordPress 6.0+.', 'magical-blocks' ),
				esc_html__( 'Plugin Activation Error', 'magical-blocks' ),
				array( 'back_link' => true )
			);
		}

		// Set default options.
		$default_settings = array(
			'enabled_blocks'     => array( 'all' ),
			'disabled_blocks'    => array(),
			'show_pro_blocks'    => true,
			'asset_loading'      => 'auto',
			'common_css_enabled' => true,
		);

		if ( ! get_option( 'magical_blocks_settings' ) ) {
			add_option( 'magical_blocks_settings', $default_settings );
		}

		// Set version.
		update_option( 'magical_blocks_version', self::VERSION );

		// Flush rewrite rules.
		flush_rewrite_rules();
	}

	/**
	 * Plugin deactivation.
	 *
	 * @return void
	 */
	public function deactivate(): void {
		// Flush rewrite rules.
		flush_rewrite_rules();
	}

	/**
	 * Get plugin file path.
	 *
	 * @return string
	 */
	public function get_file(): string {
		return $this->file;
	}

	/**
	 * Get plugin directory path.
	 *
	 * @return string
	 */
	public function get_path(): string {
		return $this->path;
	}

	/**
	 * Get plugin directory URL.
	 *
	 * @return string
	 */
	public function get_url(): string {
		return $this->url;
	}
}

/**
 * Returns the main instance of Magical_Blocks_Plugin.
 *
 * @since 2.0.0
 * @return Magical_Blocks_Plugin
 */
function magical_blocks(): Magical_Blocks_Plugin {
	return Magical_Blocks_Plugin::instance();
}

// Initialize the plugin.
magical_blocks();
