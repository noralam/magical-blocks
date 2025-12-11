<?php
/**
 * Pattern: Hero Section
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

return array(
	'title'         => __( 'Hero Section', 'magical-blocks' ),
	'description'   => __( 'A full-width hero section with heading, subheading, and call-to-action buttons.', 'magical-blocks' ),
	'categories'    => array( 'magical-blocks-patterns', 'featured' ),
	'keywords'      => array( 'hero', 'banner', 'header', 'cta' ),
	'viewportWidth' => 1200,
	'content'       => '<!-- wp:magical-blocks/container {"blockId":"container-k2d8cj7t","containerWidth":"full","minHeight":{"desktop":"500px","tablet":"400px","mobile":"300px"},"flexDirection":{"desktop":"column","tablet":"column","mobile":"column"},"justifyContent":{"desktop":"center","tablet":"center","mobile":"center"},"alignItems":{"desktop":"center","tablet":"center","mobile":"center"},"backgroundColor":"#1e3a5f","gradientEnabled":true,"gradientColor1":"#0526b8","gradientColor2":"#000a2b","gradientAngle":180,"paddingTop":{"desktop":"80px","tablet":"60px","mobile":"40px"},"paddingRight":{"desktop":"40px","tablet":"30px","mobile":"20px"},"paddingBottom":{"desktop":"80px","tablet":"60px","mobile":"40px"},"paddingLeft":{"desktop":"40px","tablet":"30px","mobile":"20px"},"metadata":{"categories":["magical-blocks-patterns"],"patternName":"magical-blocks/hero-section","name":"Hero Section"}} -->
<!-- wp:magical-blocks/heading {"blockId":"heading-cbcv7plp","content":"Welcome to Our Platform","headingTag":"h1","textAlign":"center","fontWeight":"700","textColor":"#ffffff"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-gpcsg28s","content":"Build amazing websites with powerful blocks","headingTag":"h3","textAlign":"center","fontWeight":"400","textColor":"#b8d4e8"} /-->

<!-- wp:magical-blocks/inner-container {"blockId":"inner-container-t65jfbum","flexDirection":{"desktop":"row","tablet":"row","mobile":"column"},"justifyContent":{"desktop":"center","tablet":"center","mobile":"center"},"alignItems":{"desktop":"center","tablet":"center","mobile":"center"},"flexWrap":{"desktop":"wrap","tablet":"","mobile":""},"gap":{"desktop":"20px","tablet":"15px","mobile":"15px"},"paddingTop":{"desktop":"30px","tablet":"20px","mobile":"20px"}} -->
<!-- wp:magical-blocks/button {"blockId":"button-1ltyvepk","text":"Get Started","buttonSize":"large","textColor":"#1e3a5f","backgroundColor":"#ffffff","borderRadius":{"desktop":"8px"}} -->
<div class="wp-block-magical-blocks-button mgb-button-wrapper mgb-button-wrapper--align-left mgb-block-button-1ltyvepk"><span class="mgb-button mgb-button--size-large" style="font-size:17px;color:#1e3a5f;background:#ffffff;border-radius:0px 0px 0px 0px;padding:16px 32px"><span class="mgb-button__text">Get Started</span></span></div>
<!-- /wp:magical-blocks/button -->

<!-- wp:magical-blocks/button {"blockId":"button-t5eiul28","text":"Learn More","buttonAlign":"center","buttonSize":"large","backgroundColor":"transparent","borderRadius":{"desktop":{"top":"5","right":"5","bottom":"5","left":"5"}},"borderWidth":1,"borderColor":"#f5f5f5","hoverEffect":"grow"} -->
<div class="wp-block-magical-blocks-button mgb-button-wrapper mgb-button-wrapper--align-center mgb-block-button-t5eiul28"><span class="mgb-button mgb-button--size-large mgb-button--hover-grow" style="font-size:17px;color:#ffffff;background:transparent;border-radius:0px 0px 0px 0px;border-width:1px;border-color:#f5f5f5;border-style:solid;padding:16px 32px"><span class="mgb-button__text">Learn More</span></span></div>
<!-- /wp:magical-blocks/button -->
<!-- /wp:magical-blocks/inner-container -->
<!-- /wp:magical-blocks/container -->',
);
