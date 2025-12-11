<?php
/**
 * Block registration manager for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Class Magical_Blocks_Blocks
 *
 * Handles block registration and management.
 */
class Magical_Blocks_Blocks {

	use Magical_Blocks_Singleton_Trait;
	use Magical_Blocks_Pro_Gating_Trait;

	/**
	 * List of available blocks.
	 *
	 * @var array
	 */
	private $blocks = array(
		'heading',
		'button',
		'icon-box',
		'testimonial',
		'info-box',
		'section',
		'container',
		'inner-container',
		'image-box',
		'counter',
		'progress-bar',
		'divider',
	);

	/**
	 * Initialize the block manager.
	 *
	 * @return void
	 */
	protected function init() {
		// Register categories early.
		add_filter( 'block_categories_all', array( $this, 'register_block_categories' ), 10, 2 );
		
		// Register blocks - check if init already fired.
		if ( did_action( 'init' ) ) {
			$this->register_blocks();
		} else {
			add_action( 'init', array( $this, 'register_blocks' ) );
		}
	}

	/**
	 * Register all blocks.
	 *
	 * @return void
	 */
	public function register_blocks() {
		// Load block render callbacks.
		foreach ( $this->blocks as $block ) {
			$block_php = MAGICAL_BLOCKS_PATH . 'blocks/' . $block . '/block.php';

			if ( file_exists( $block_php ) ) {
				require_once $block_php;
			}
		}

		// Register each block.
		foreach ( $this->blocks as $block ) {
			$this->register_block( $block );
		}

		/**
		 * Fires after all blocks are registered.
		 *
		 * @since 1.0.0
		 */
		do_action( 'magical_blocks_blocks_registered' );
	}

	/**
	 * Register a single block.
	 *
	 * @param string $block Block slug.
	 * @return void
	 */
	private function register_block( $block ) {
		// Check if block is enabled.
		if ( ! magical_blocks_is_block_enabled( $block ) ) {
			return;
		}

		$block_json = MAGICAL_BLOCKS_PATH . 'build/blocks/' . $block . '/block.json';

		// Fallback to src if build doesn't exist.
		if ( ! file_exists( $block_json ) ) {
			$block_json = MAGICAL_BLOCKS_PATH . 'src/blocks/' . $block . '/block.json';
		}

		if ( ! file_exists( $block_json ) ) {
			return;
		}

		// Get render callback.
		$render_callback = 'magical_blocks_render_' . str_replace( '-', '_', $block );

		$args = array();

		// Add render callback if function exists.
		if ( function_exists( $render_callback ) ) {
			$args['render_callback'] = $render_callback;
		}

		// Register the block.
		register_block_type( dirname( $block_json ), $args );
	}

	/**
	 * Register custom block categories.
	 *
	 * @param array                   $categories Existing categories.
	 * @param WP_Block_Editor_Context $context    Block editor context.
	 * @return array Modified categories.
	 */
	public function register_block_categories( $categories, $context ) {
		$magical_categories = array(
			array(
				'slug'  => 'magical-blocks-content',
				'title' => __( 'Magical Content', 'magical-blocks' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'magical-blocks-layout',
				'title' => __( 'Magical Layout', 'magical-blocks' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'magical-blocks-interactive',
				'title' => __( 'Magical Interactive', 'magical-blocks' ),
				'icon'  => null,
			),
			array(
				'slug'  => 'magical-blocks-media',
				'title' => __( 'Magical Media', 'magical-blocks' ),
				'icon'  => null,
			),
		);

		return array_merge( $magical_categories, $categories );
	}

	/**
	 * Get list of all available blocks.
	 *
	 * @return array Block slugs.
	 */
	public function get_blocks() {
		/**
		 * Filter the list of available blocks.
		 *
		 * @param array $blocks Block slugs.
		 */
		return apply_filters( 'magical_blocks_available_blocks', $this->blocks );
	}

	/**
	 * Get block data for a specific block.
	 *
	 * @param string $block Block slug.
	 * @return array|null Block data or null if not found.
	 */
	public function get_block_data( $block ) {
		$blocks = magical_blocks_get_block_list();
		return isset( $blocks[ $block ] ) ? $blocks[ $block ] : null;
	}

	/**
	 * Get all enabled blocks.
	 *
	 * @return array Enabled block slugs.
	 */
	public function get_enabled_blocks() {
		return array_filter(
			$this->blocks,
			function ( $block ) {
				return magical_blocks_is_block_enabled( $block );
			}
		);
	}

	/**
	 * Get all Pro blocks.
	 *
	 * @return array Pro block slugs.
	 */
	public function get_pro_blocks() {
		return magical_blocks_get_pro_block_list();
	}
}
