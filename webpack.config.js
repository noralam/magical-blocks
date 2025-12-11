/**
 * Custom webpack configuration for Magical Blocks.
 *
 * Extends @wordpress/scripts default configuration with multi-block entry points.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const glob = require( 'glob' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

/**
 * Get all block entry points from src/blocks directory.
 *
 * @return {Object} Entry points object for webpack.
 */
function getBlockEntryPoints() {
	const entries = {};

	// Find all block directories with index.js
	const blockDirs = glob.sync( 'src/blocks/*/index.js' );

	blockDirs.forEach( ( file ) => {
		// Extract block name from path (e.g., 'src/blocks/heading/index.js' -> 'heading')
		const match = file.match( /src\/blocks\/([^/]+)\/index\.js$/ );
		if ( match ) {
			const blockName = match[ 1 ];
			entries[ `blocks/${ blockName }/index` ] = path.resolve(
				__dirname,
				file
			);
		}
	} );

	// Find all view.js files for frontend scripts
	const viewScripts = glob.sync( 'src/blocks/*/view.js' );

	viewScripts.forEach( ( file ) => {
		// Extract block name from path (e.g., 'src/blocks/counter/view.js' -> 'counter')
		const match = file.match( /src\/blocks\/([^/]+)\/view\.js$/ );
		if ( match ) {
			const blockName = match[ 1 ];
			entries[ `blocks/${ blockName }/view` ] = path.resolve(
				__dirname,
				file
			);
		}
	} );

	return entries;
}

module.exports = {
	...defaultConfig,
	entry: {
		// Block entry points - auto-discovered from src/blocks/*/index.js
		...getBlockEntryPoints(),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...( defaultConfig.resolve?.alias || {} ),
			'@components': path.resolve( __dirname, 'src/components' ),
			'@common': path.resolve( __dirname, 'src/common' ),
			'@blocks': path.resolve( __dirname, 'src/blocks' ),
		},
	},
	plugins: [
		// Filter out the default MiniCssExtractPlugin and replace with one that ignores order warnings
		...( defaultConfig.plugins || [] ).filter(
			( plugin ) => ! ( plugin.constructor.name === 'MiniCssExtractPlugin' )
		),
		new MiniCssExtractPlugin( {
			ignoreOrder: true,
		} ),
		new CopyPlugin( {
			patterns: [
				// Copy block.json files to build directory
				{
					from: 'src/blocks/*/block.json',
					to: ( { absoluteFilename } ) => {
						const blockName = absoluteFilename.match( /src[/\\]blocks[/\\]([^/\\]+)[/\\]block\.json$/ )[ 1 ];
						return `blocks/${ blockName }/block.json`;
					},
				},
			],
		} ),
	],
};
