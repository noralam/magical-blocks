<?php
/**
 * Loader class for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Class Magical_Blocks_Loader
 *
 * Handles autoloading and hook registration.
 */
class Magical_Blocks_Loader {

	use Magical_Blocks_Singleton_Trait;

	/**
	 * Registered actions.
	 *
	 * @var array
	 */
	protected $actions = array();

	/**
	 * Registered filters.
	 *
	 * @var array
	 */
	protected $filters = array();

	/**
	 * Initialize the loader.
	 *
	 * @return void
	 */
	protected function init() {
		// Loader initializes automatically.
	}

	/**
	 * Add an action hook.
	 *
	 * @param string   $hook          Hook name.
	 * @param callable $callback      Callback function.
	 * @param int      $priority      Priority.
	 * @param int      $accepted_args Number of accepted arguments.
	 * @return void
	 */
	public function add_action( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		$this->actions = $this->add( $this->actions, $hook, $callback, $priority, $accepted_args );
	}

	/**
	 * Add a filter hook.
	 *
	 * @param string   $hook          Hook name.
	 * @param callable $callback      Callback function.
	 * @param int      $priority      Priority.
	 * @param int      $accepted_args Number of accepted arguments.
	 * @return void
	 */
	public function add_filter( $hook, $callback, $priority = 10, $accepted_args = 1 ) {
		$this->filters = $this->add( $this->filters, $hook, $callback, $priority, $accepted_args );
	}

	/**
	 * Add a hook to the collection.
	 *
	 * @param array    $hooks         Hooks collection.
	 * @param string   $hook          Hook name.
	 * @param callable $callback      Callback function.
	 * @param int      $priority      Priority.
	 * @param int      $accepted_args Number of accepted arguments.
	 * @return array Modified hooks collection.
	 */
	private function add( $hooks, $hook, $callback, $priority, $accepted_args ) {
		$hooks[] = array(
			'hook'          => $hook,
			'callback'      => $callback,
			'priority'      => $priority,
			'accepted_args' => $accepted_args,
		);

		return $hooks;
	}

	/**
	 * Run all registered hooks.
	 *
	 * @return void
	 */
	public function run() {
		foreach ( $this->filters as $hook ) {
			add_filter(
				$hook['hook'],
				$hook['callback'],
				$hook['priority'],
				$hook['accepted_args']
			);
		}

		foreach ( $this->actions as $hook ) {
			add_action(
				$hook['hook'],
				$hook['callback'],
				$hook['priority'],
				$hook['accepted_args']
			);
		}
	}
}
