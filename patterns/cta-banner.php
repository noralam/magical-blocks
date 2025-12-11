<?php
/**
 * Pattern: CTA Banner
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

return array(
	'title'         => __( 'CTA Banner', 'magical-blocks' ),
	'description'   => __( 'A call-to-action banner with heading and button.', 'magical-blocks' ),
	'categories'    => array( 'magical-blocks-patterns' ),
	'keywords'      => array( 'cta', 'banner', 'call to action', 'promotion' ),
	'viewportWidth' => 1200,
	'content'       => '<!-- wp:magical-blocks/container {"blockId":"container-1vimlj39","flexDirection":{"desktop":"row","tablet":"column","mobile":"column"},"justifyContent":{"desktop":"flex-start","tablet":"center","mobile":"center"},"alignItems":{"desktop":"stretch","tablet":"center","mobile":"center"},"gradientEnabled":true,"gradientColor1":"#0124b0","gradientColor2":"#170032","gradientAngle":175,"paddingTop":{"desktop":"80px","tablet":"60px","mobile":"50px"},"paddingRight":{"desktop":"20px","tablet":"","mobile":""},"paddingBottom":{"desktop":"80px","tablet":"","mobile":""},"paddingLeft":{"desktop":"20px","tablet":"","mobile":""},"paddingLinked":false} -->
<!-- wp:magical-blocks/inner-container {"blockId":"inner-container-0af6t31h","paddingTop":{"desktop":"20px","tablet":"","mobile":""},"paddingRight":{"desktop":"20px","tablet":"","mobile":""},"paddingBottom":{"desktop":"20px","tablet":"","mobile":""},"paddingLeft":{"desktop":"20px","tablet":"","mobile":""}} -->
<!-- wp:magical-blocks/heading {"blockId":"heading-e7p9gka3","content":"Join thousands of satisfied customers today.","headingTag":"p","fontWeight":"400","textColor":"#e0e7ff"} /-->
<!-- wp:magical-blocks/heading {"blockId":"heading-xkrfqgun","content":"Ready to Get Started?","fontWeight":"700","textColor":"#ffffff"} /-->
<!-- /wp:magical-blocks/inner-container -->
<!-- wp:magical-blocks/inner-container {"blockId":"inner-container-k1ku8vfy","width":{"desktop":"33%","tablet":"","mobile":""},"flexGrow":{"desktop":"0","tablet":"","mobile":""},"justifyContent":{"desktop":"center","tablet":"","mobile":""},"alignItems":{"desktop":"center","tablet":"","mobile":""}} -->
<!-- wp:magical-blocks/button {"blockId":"button-zs8cengl","text":"Start Free Trial","buttonSize":"large","fontWeight":"700","backgroundColor":"#ffffff","gradientEnabled":true,"gradientColor1":"#ff9800","gradientColor2":"#f44336","gradientAngle":148,"borderRadius":{"desktop":{"top":"0","right":"0","bottom":"0","left":"0"}},"boxShadow":true,"iconEnabled":true,"icon":"chevron-right","iconPosition":"right"} -->
<div class="wp-block-magical-blocks-button mgb-button-wrapper mgb-button-wrapper--align-left mgb-block-button-zs8cengl"><span class="mgb-button mgb-button--size-large mgb-button--has-icon mgb-button--icon-right" style="font-size:17px;font-weight:700;color:#ffffff;background:linear-gradient(148deg, #ff9800, #f44336);border-radius:0px 0px 0px 0px;padding:16px 32px;box-shadow:0px 4px 10px 0px rgba(0,0,0,0.2)"><span class="mgb-button__text">Start Free Trial</span><span class="mgb-button__icon mgb-button__icon--right" style="margin-left:8px;width:16px;height:16px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></span></span></div>
<!-- /wp:magical-blocks/button -->
<!-- /wp:magical-blocks/inner-container -->
<!-- /wp:magical-blocks/container -->',
);
