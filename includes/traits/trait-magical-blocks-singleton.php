<?php
/**
 * Singleton trait for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Trait Magical_Blocks_Singleton_Trait
 *
 * Provides singleton functionality for classes.
 */
trait Magical_Blocks_Singleton_Trait {

	/**
	 * Class instance.
	 *
	 * @var static
	 */
	private static $instance = null;

	/**
	 * Get class instance.
	 *
	 * @return static Class instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new static();
		}
		return self::$instance;
	}

	/**
	 * Private constructor to prevent direct instantiation.
	 */
	private function __construct() {
		$this->init();
	}

	/**
	 * Prevent cloning.
	 *
	 * @return void
	 */
	private function __clone() {
		// Prevent cloning.
	}

	/**
	 * Prevent unserialization.
	 *
	 * @return void
	 * @throws \Exception When trying to unserialize.
	 */
	public function __wakeup() {
		throw new \Exception( 'Cannot unserialize singleton.' );
	}

	/**
	 * Initialize the class.
	 *
	 * Override this method in the using class to add initialization logic.
	 *
	 * @return void
	 */
	protected function init() {
		// Override in using class.
	}
}
