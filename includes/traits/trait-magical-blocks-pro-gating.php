<?php
/**
 * Pro gating trait for Magical Blocks.
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Trait Magical_Blocks_Pro_Gating_Trait
 *
 * Provides Pro feature checks and placeholder rendering.
 */
trait Magical_Blocks_Pro_Gating_Trait {

	/**
	 * Check if current block is a Pro block.
	 *
	 * @param string $block_slug Block slug to check.
	 * @return bool True if Pro block.
	 */
	protected function magical_blocks_is_pro_block( $block_slug ) {
		return magical_blocks_is_pro_block( $block_slug );
	}

	/**
	 * Check if Pro block should be rendered.
	 *
	 * @param string $block_slug Block slug to check.
	 * @return bool True if block should render, false if placeholder should show.
	 */
	protected function magical_blocks_should_render_pro_block( $block_slug ) {
		if ( ! $this->magical_blocks_is_pro_block( $block_slug ) ) {
			return true;
		}

		return magical_blocks_has_pro();
	}

	/**
	 * Render Pro placeholder for locked blocks.
	 *
	 * @param string $block_name  Block display name.
	 * @param string $block_slug  Block slug.
	 * @param array  $attributes  Block attributes.
	 * @return string Placeholder HTML.
	 */
	protected function magical_blocks_render_pro_placeholder( $block_name, $block_slug, $attributes = array() ) {
		$upgrade_url = admin_url( 'admin.php?page=magical-blocks-pro' );

		/**
		 * Filter the Pro upgrade URL.
		 *
		 * @param string $upgrade_url Default upgrade URL.
		 * @param string $block_slug  Block slug.
		 */
		$upgrade_url = apply_filters( 'magical_blocks_upgrade_url', $upgrade_url, $block_slug );

		$block_id = ! empty( $attributes['blockId'] ) ? $attributes['blockId'] : '';

		ob_start();
		?>
		<div class="mgb-pro-placeholder <?php echo esc_attr( 'mgb-' . $block_id ); ?>">
			<div class="mgb-pro-placeholder__content">
				<span class="mgb-pro-placeholder__badge">
					<?php esc_html_e( 'PRO', 'magical-blocks' ); ?>
				</span>
				<h3 class="mgb-pro-placeholder__title">
					<?php
					printf(
						/* translators: %s: Block name */
						esc_html__( '%s is a Pro Feature', 'magical-blocks' ),
						esc_html( $block_name )
					);
					?>
				</h3>
				<p class="mgb-pro-placeholder__description">
					<?php esc_html_e( 'Upgrade to Magical Blocks Pro to unlock this block and many more premium features.', 'magical-blocks' ); ?>
				</p>
				<a href="<?php echo esc_url( $upgrade_url ); ?>" class="mgb-pro-placeholder__button" target="_blank" rel="noopener">
					<?php esc_html_e( 'Upgrade to Pro', 'magical-blocks' ); ?>
				</a>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Get Pro placeholder inline styles.
	 *
	 * @return string CSS styles.
	 */
	protected function magical_blocks_get_pro_placeholder_styles() {
		return '
			.mgb-pro-placeholder {
				background: linear-gradient(135deg, #f8f9ff 0%, #e8ebff 100%);
				border: 2px dashed #5C6BC0;
				border-radius: 8px;
				padding: 40px 20px;
				text-align: center;
			}
			.mgb-pro-placeholder__content {
				max-width: 400px;
				margin: 0 auto;
			}
			.mgb-pro-placeholder__badge {
				display: inline-block;
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				color: #fff;
				font-size: 11px;
				font-weight: 700;
				padding: 4px 12px;
				border-radius: 20px;
				text-transform: uppercase;
				letter-spacing: 1px;
				margin-bottom: 16px;
			}
			.mgb-pro-placeholder__title {
				color: #333;
				font-size: 20px;
				font-weight: 600;
				margin: 0 0 12px 0;
			}
			.mgb-pro-placeholder__description {
				color: #666;
				font-size: 14px;
				line-height: 1.6;
				margin: 0 0 20px 0;
			}
			.mgb-pro-placeholder__button {
				display: inline-block;
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				color: #fff;
				font-size: 14px;
				font-weight: 600;
				padding: 12px 24px;
				border-radius: 6px;
				text-decoration: none;
				transition: transform 0.2s, box-shadow 0.2s;
			}
			.mgb-pro-placeholder__button:hover {
				transform: translateY(-2px);
				box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
				color: #fff;
			}
		';
	}
}
