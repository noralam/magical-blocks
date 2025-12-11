<?php
/**
 * Asset management class for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Class Magical_Blocks_Assets
 *
 * Handles asset enqueueing and management.
 */
class Magical_Blocks_Assets {

	use Magical_Blocks_Singleton_Trait;

	/**
	 * Initialize assets manager.
	 *
	 * @return void
	 */
	protected function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_common_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );
	}

	/**
	 * Enqueue block editor assets.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {
		// Enqueue common editor styles.
		$this->enqueue_common_css( 'editor' );

		// Localize script data for the editor.
		$this->localize_editor_data();
	}

	/**
	 * Enqueue common assets for both editor and frontend.
	 *
	 * @return void
	 */
	public function enqueue_common_assets() {
		// Common CSS is loaded via block.json when blocks are present.
		// This hook is kept for future common asset needs.
	}

	/**
	 * Enqueue frontend assets.
	 *
	 * @return void
	 */
	public function enqueue_frontend_assets() {
		// Only load common CSS if enabled and if we have Magical Blocks on the page.
		if ( magical_blocks_get_settings( 'common_css_enabled', true ) ) {
			// Common CSS will be conditionally loaded via block.json viewStyle.
		}
	}

	/**
	 * Enqueue common CSS.
	 *
	 * @param string $context 'editor' or 'frontend'.
	 * @return void
	 */
	private function enqueue_common_css( $context = 'frontend' ) {
		$common_css = MAGICAL_BLOCKS_PATH . 'assets/css/common.css';

		if ( file_exists( $common_css ) ) {
			wp_enqueue_style(
				'magical-blocks-common',
				MAGICAL_BLOCKS_URL . 'assets/css/common.css',
				array(),
				MAGICAL_BLOCKS_VERSION
			);
		}
	}

	/**
	 * Localize editor data.
	 *
	 * Passes essential block data to JavaScript for the block editor.
	 *
	 * @return void
	 */
	private function localize_editor_data() {
		// The data will be localized to the first block script that loads.
		// WordPress handles this automatically with block.json registration.

		// Create inline script with global data.
		$data = array(
			'hasPro'         => magical_blocks_has_pro(),
			'proBlocks'      => magical_blocks_get_pro_block_list(),
			'upgradeUrl'     => admin_url( 'admin.php?page=magical-blocks-pro' ),
			'ajaxUrl'        => admin_url( 'admin-ajax.php' ),
			'nonce'          => wp_create_nonce( 'magical_blocks_nonce' ),
			'pluginUrl'      => MAGICAL_BLOCKS_URL,
			'version'        => MAGICAL_BLOCKS_VERSION,
			'blocks'         => magical_blocks_get_block_list(),
			'enabledBlocks'  => magical_blocks_get_settings( 'enabled_blocks', array( 'all' ) ),
			'disabledBlocks' => magical_blocks_get_settings( 'disabled_blocks', array() ),
			'i18n'           => array(
				'proOnly'           => __( 'Pro Feature', 'magical-blocks' ),
				'upgradeToUnlock'   => __( 'Upgrade to unlock this block', 'magical-blocks' ),
				'learnMore'         => __( 'Learn More', 'magical-blocks' ),
				'blockDisabled'     => __( 'This block is disabled.', 'magical-blocks' ),
				'enableInSettings'  => __( 'Enable it in plugin settings.', 'magical-blocks' ),
			),
		);

		// Output inline script before any block scripts load.
		wp_add_inline_script(
			'wp-blocks',
			'window.magicalBlocksData = ' . wp_json_encode( $data ) . ';',
			'before'
		);
	}

	/**
	 * Get asset file data (for compiled assets).
	 *
	 * @param string $file Asset file path (without extension).
	 * @return array Asset data with dependencies and version.
	 */
	public function get_asset_data( $file ) {
		$asset_file = MAGICAL_BLOCKS_PATH . $file . '.asset.php';

		if ( file_exists( $asset_file ) ) {
			return require $asset_file;
		}

		return array(
			'dependencies' => array(),
			'version'      => MAGICAL_BLOCKS_VERSION,
		);
	}

	/**
	 * Enqueue a block's assets.
	 *
	 * @param string $block   Block slug.
	 * @param string $context 'editor' or 'frontend'.
	 * @return void
	 */
	public function enqueue_block_assets( $block, $context = 'frontend' ) {
		$block_dir = MAGICAL_BLOCKS_PATH . 'build/blocks/' . $block . '/';
		$block_url = MAGICAL_BLOCKS_URL . 'build/blocks/' . $block . '/';

		if ( 'editor' === $context ) {
			// Editor script.
			$script_file = $block_dir . 'index.js';
			if ( file_exists( $script_file ) ) {
				$asset_data = $this->get_asset_data( 'build/blocks/' . $block . '/index' );

				wp_enqueue_script(
					'magical-blocks-' . $block . '-editor-script',
					$block_url . 'index.js',
					$asset_data['dependencies'],
					$asset_data['version'],
					true
				);
			}

			// Editor style.
			$style_file = $block_dir . 'index.css';
			if ( file_exists( $style_file ) ) {
				wp_enqueue_style(
					'magical-blocks-' . $block . '-editor-style',
					$block_url . 'index.css',
					array(),
					MAGICAL_BLOCKS_VERSION
				);
			}
		}

		// Frontend/shared style.
		$style_file = $block_dir . 'style-index.css';
		if ( file_exists( $style_file ) ) {
			wp_enqueue_style(
				'magical-blocks-' . $block . '-style',
				$block_url . 'style-index.css',
				array(),
				MAGICAL_BLOCKS_VERSION
			);
		}
	}

	/**
	 * Check if we're in the block editor.
	 *
	 * @return bool True if in block editor.
	 */
	public function is_block_editor() {
		if ( function_exists( 'get_current_screen' ) ) {
			$screen = get_current_screen();
			if ( $screen && method_exists( $screen, 'is_block_editor' ) ) {
				return $screen->is_block_editor();
			}
		}
		return false;
	}
}
