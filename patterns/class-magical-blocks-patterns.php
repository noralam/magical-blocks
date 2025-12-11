<?php
/**
 * Block patterns registration for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Class Magical_Blocks_Patterns
 *
 * Handles block pattern registration by loading patterns from individual files.
 */
class Magical_Blocks_Patterns {

	use Magical_Blocks_Singleton_Trait;

	/**
	 * Pattern category slug.
	 *
	 * @var string
	 */
	const CATEGORY_SLUG = 'magical-blocks-patterns';

	/**
	 * Patterns directory path.
	 *
	 * @var string
	 */
	private $patterns_dir;

	/**
	 * Initialize the pattern manager.
	 *
	 * @return void
	 */
	protected function init() {
		$this->patterns_dir = MAGICAL_BLOCKS_PATH . 'patterns/';
		
		add_action( 'init', array( $this, 'register_pattern_category' ) );
		add_action( 'init', array( $this, 'register_patterns' ) );
	}

	/**
	 * Register custom pattern category.
	 *
	 * @return void
	 */
	public function register_pattern_category() {
		register_block_pattern_category(
			self::CATEGORY_SLUG,
			array(
				'label'       => __( 'Magical Blocks', 'magical-blocks' ),
				'description' => __( 'Patterns built with Magical Blocks.', 'magical-blocks' ),
			)
		);
	}

	/**
	 * Register all patterns from the patterns directory.
	 *
	 * @return void
	 */
	public function register_patterns() {
		$patterns = $this->get_patterns();

		foreach ( $patterns as $pattern_name => $pattern ) {
			register_block_pattern(
				'magical-blocks/' . $pattern_name,
				$pattern
			);
		}
	}

	/**
	 * Get all pattern definitions from individual files.
	 *
	 * @return array
	 */
	private function get_patterns() {
		$patterns = array();

		// Check if patterns directory exists.
		if ( ! is_dir( $this->patterns_dir ) ) {
			return $patterns;
		}

		// Get all PHP files from the patterns directory.
		$pattern_files = glob( $this->patterns_dir . '*.php' );

		if ( empty( $pattern_files ) ) {
			return $patterns;
		}

		foreach ( $pattern_files as $pattern_file ) {
			// Get pattern name from filename (e.g., hero-section.php -> hero-section).
			$pattern_name = basename( $pattern_file, '.php' );

			// Skip class files (they are not patterns).
			if ( strpos( $pattern_name, 'class-' ) === 0 ) {
				continue;
			}

			// Skip if not a valid file.
			if ( ! is_readable( $pattern_file ) ) {
				continue;
			}

			// Include the pattern file which returns an array.
			$pattern_data = include $pattern_file;

			// Validate pattern data.
			if ( ! is_array( $pattern_data ) || empty( $pattern_data['title'] ) || empty( $pattern_data['content'] ) ) {
				continue;
			}

			// Ensure the pattern has our category.
			if ( ! isset( $pattern_data['categories'] ) ) {
				$pattern_data['categories'] = array( self::CATEGORY_SLUG );
			} elseif ( ! in_array( self::CATEGORY_SLUG, $pattern_data['categories'], true ) ) {
				$pattern_data['categories'][] = self::CATEGORY_SLUG;
			}

			$patterns[ $pattern_name ] = $pattern_data;
		}

		/**
		 * Filter the registered patterns.
		 *
		 * @param array $patterns Array of pattern data keyed by pattern name.
		 */
		return apply_filters( 'magical_blocks_patterns', $patterns );
	}

	/**
	 * Get the patterns directory path.
	 *
	 * @return string
	 */
	public function get_patterns_dir() {
		return $this->patterns_dir;
	}

	/**
	 * Get a single pattern by name.
	 *
	 * @param string $pattern_name Pattern name (filename without .php).
	 * @return array|false Pattern data or false if not found.
	 */
	public function get_pattern( $pattern_name ) {
		$pattern_file = $this->patterns_dir . $pattern_name . '.php';

		if ( ! is_readable( $pattern_file ) ) {
			return false;
		}

		$pattern_data = include $pattern_file;

		if ( ! is_array( $pattern_data ) || empty( $pattern_data['title'] ) || empty( $pattern_data['content'] ) ) {
			return false;
		}

		return $pattern_data;
	}
}
