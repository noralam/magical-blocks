<?php
/**
 * Pattern: Pricing Table
 *
 * @package Magical_Blocks
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

return array(
	'title'         => __( 'Pricing Table', 'magical-blocks' ),
	'description'   => __( 'A pricing table with three plan options.', 'magical-blocks' ),
	'categories'    => array( 'magical-blocks-patterns', 'featured' ),
	'keywords'      => array( 'pricing', 'plans', 'table', 'subscription' ),
	'viewportWidth' => 1200,
	'content'       => '<!-- wp:magical-blocks/container {"blockId":"container-pricing-main","maxWidth":{"desktop":"1200px"},"flexDirection":{"desktop":"column","tablet":"column","mobile":"column"},"alignItems":{"desktop":"center","tablet":"center","mobile":"center"},"paddingTop":{"desktop":"80px","tablet":"60px","mobile":"40px"},"paddingRight":{"desktop":"40px","tablet":"30px","mobile":"20px"},"paddingBottom":{"desktop":"80px","tablet":"60px","mobile":"40px"},"paddingLeft":{"desktop":"40px","tablet":"30px","mobile":"20px"},"metadata":{"categories":["magical-blocks-patterns"],"patternName":"magical-blocks/pricing-table","name":"Pricing Table"}} -->
<!-- wp:magical-blocks/heading {"blockId":"heading-pricing-title","content":"Simple Pricing","textAlign":"center","fontWeight":"700","textColor":"#1e293b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-pricing-subtitle","content":"Choose the plan that works best for you","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/inner-container {"blockId":"inner-pricing-cards","width":{"desktop":"100%","tablet":"","mobile":""},"flexDirection":{"desktop":"row","tablet":"column","mobile":"column"},"justifyContent":{"desktop":"center","tablet":"center","mobile":"center"},"alignItems":{"desktop":"stretch","tablet":"center","mobile":"center"},"flexWrap":{"desktop":"wrap","tablet":"wrap","mobile":"wrap"},"gap":{"desktop":"20px","tablet":"25px","mobile":"20px"},"paddingTop":{"desktop":"40px","tablet":"30px","mobile":"20px"}} -->
<!-- wp:magical-blocks/inner-container {"blockId":"inner-starter","width":{"desktop":"32%","tablet":"48%","mobile":"100%"},"minWidth":{"desktop":"200px"},"maxWidth":{"desktop":"","tablet":"400px","mobile":"100%"},"flexDirection":{"desktop":"column","tablet":"column","mobile":"column"},"alignItems":{"desktop":"center","tablet":"center","mobile":"center"},"gap":{"desktop":"15px","tablet":"15px","mobile":"12px"},"backgroundColor":"#ffffff","paddingTop":{"desktop":"40px","tablet":"35px","mobile":"30px"},"paddingRight":{"desktop":"30px","tablet":"25px","mobile":"20px"},"paddingBottom":{"desktop":"40px","tablet":"35px","mobile":"30px"},"paddingLeft":{"desktop":"30px","tablet":"25px","mobile":"20px"},"borderStyle":"solid","borderWidth":{"top":"1px","right":"1px","bottom":"1px","left":"1px"},"borderColor":"#e2e8f0","borderRadius":{"desktop":{"top":"16px","right":"16px","bottom":"16px","left":"16px"}},"boxShadow":{"enabled":true,"horizontal":0,"vertical":4,"blur":20,"spread":0,"color":"rgba(0,0,0,0.08)"}} -->
<!-- wp:magical-blocks/heading {"blockId":"heading-starter-plan","content":"Starter","headingTag":"h3","textAlign":"center","fontWeight":"600","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-starter-price","content":"\u003cstrong\u003e$9\u003c/strong\u003e/mo","headingTag":"p","textAlign":"center","fontWeight":"700","textColor":"#0f172a"} /-->

<!-- wp:magical-blocks/divider {"blockId":"divider-starter","color":"#e2e8f0"} -->
<div class="wp-block-magical-blocks-divider mgb-divider mgb-divider--style-solid mgb-divider--align-center" style="--mgb-divider-width:100%;--mgb-divider-weight:2px;--mgb-divider-color:#e2e8f0;--mgb-divider-spacing-top:[object Object];--mgb-divider-spacing-bottom:[object Object];--mgb-divider-icon-size:[object Object];--mgb-divider-icon-color:#666666;--mgb-divider-text-color:#666666;--mgb-divider-text-size:[object Object];--mgb-divider-element-bg:#ffffff" role="separator"><div class="mgb-divider-line mgb-divider-line--left" aria-hidden="true"></div><div class="mgb-divider-line mgb-divider-line--right" aria-hidden="true"></div></div>
<!-- /wp:magical-blocks/divider -->

<!-- wp:magical-blocks/heading {"blockId":"heading-starter-f1","content":"✓ 5 Projects","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-starter-f2","content":"✓ Basic Support","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-starter-f3","content":"✓ 1GB Storage","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-starter-f4","content":"✓ Email Notifications","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/button {"blockId":"button-starter-cta","text":"Get Started","buttonSize":"large","textColor":"#475569","backgroundColor":"#f1f5f9","borderRadius":{"desktop":"8px"}} -->
<div class="wp-block-magical-blocks-button mgb-button-wrapper mgb-button-wrapper--align-left mgb-block-button-starter-cta"><span class="mgb-button mgb-button--size-large" style="font-size:17px;color:#475569;background:#f1f5f9;border-radius:0px 0px 0px 0px;padding:16px 32px"><span class="mgb-button__text">Get Started</span></span></div>
<!-- /wp:magical-blocks/button -->
<!-- /wp:magical-blocks/inner-container -->

<!-- wp:magical-blocks/inner-container {"blockId":"inner-pro","width":{"desktop":"32%","tablet":"48%","mobile":"100%"},"minWidth":{"desktop":"200px"},"maxWidth":{"desktop":"","tablet":"400px","mobile":"100%"},"flexDirection":{"desktop":"column","tablet":"column","mobile":"column"},"alignItems":{"desktop":"center","tablet":"center","mobile":"center"},"gap":{"desktop":"15px","tablet":"15px","mobile":"12px"},"backgroundColor":"#6366f1","paddingTop":{"desktop":"40px","tablet":"35px","mobile":"30px"},"paddingRight":{"desktop":"30px","tablet":"25px","mobile":"20px"},"paddingBottom":{"desktop":"40px","tablet":"35px","mobile":"30px"},"paddingLeft":{"desktop":"30px","tablet":"25px","mobile":"20px"},"borderRadius":{"desktop":{"top":"16px","right":"16px","bottom":"16px","left":"16px"}},"boxShadow":{"enabled":true,"horizontal":0,"vertical":8,"blur":30,"spread":0,"color":"rgba(99,102,241,0.35)"}} -->
<!-- wp:magical-blocks/heading {"blockId":"heading-pro-badge","content":"MOST POPULAR","headingTag":"span","textAlign":"center","fontWeight":"700","textColor":"#ffffff"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-pro-plan","content":"Pro","headingTag":"h3","textAlign":"center","fontWeight":"600","textColor":"#c7d2fe"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-pro-price","content":"\u003cstrong\u003e$29\u003c/strong\u003e/mo","headingTag":"p","textAlign":"center","fontWeight":"700","textColor":"#ffffff"} /-->

<!-- wp:magical-blocks/divider {"blockId":"divider-pro","color":"rgba(255,255,255,0.2)"} -->
<div class="wp-block-magical-blocks-divider mgb-divider mgb-divider--style-solid mgb-divider--align-center" style="--mgb-divider-width:100%;--mgb-divider-weight:2px;--mgb-divider-color:rgba(255,255,255,0.2);--mgb-divider-spacing-top:[object Object];--mgb-divider-spacing-bottom:[object Object];--mgb-divider-icon-size:[object Object];--mgb-divider-icon-color:#666666;--mgb-divider-text-color:#666666;--mgb-divider-text-size:[object Object];--mgb-divider-element-bg:#ffffff" role="separator"><div class="mgb-divider-line mgb-divider-line--left" aria-hidden="true"></div><div class="mgb-divider-line mgb-divider-line--right" aria-hidden="true"></div></div>
<!-- /wp:magical-blocks/divider -->

<!-- wp:magical-blocks/heading {"blockId":"heading-pro-f1","content":"✓ Unlimited Projects","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#e0e7ff"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-pro-f2","content":"✓ Priority Support","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#e0e7ff"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-pro-f3","content":"✓ 10GB Storage","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#e0e7ff"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-pro-f4","content":"✓ Advanced Analytics","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#e0e7ff"} /-->

<!-- wp:magical-blocks/button {"blockId":"button-pro-cta","text":"Get Started","buttonSize":"large","textColor":"#6366f1","backgroundColor":"#ffffff","borderRadius":{"desktop":"8px"}} -->
<div class="wp-block-magical-blocks-button mgb-button-wrapper mgb-button-wrapper--align-left mgb-block-button-pro-cta"><span class="mgb-button mgb-button--size-large" style="font-size:17px;color:#6366f1;background:#ffffff;border-radius:0px 0px 0px 0px;padding:16px 32px"><span class="mgb-button__text">Get Started</span></span></div>
<!-- /wp:magical-blocks/button -->
<!-- /wp:magical-blocks/inner-container -->

<!-- wp:magical-blocks/inner-container {"blockId":"inner-enterprise","width":{"desktop":"32%","tablet":"48%","mobile":"100%"},"minWidth":{"desktop":"200px"},"maxWidth":{"desktop":"","tablet":"400px","mobile":"100%"},"flexDirection":{"desktop":"column","tablet":"column","mobile":"column"},"alignItems":{"desktop":"center","tablet":"center","mobile":"center"},"gap":{"desktop":"15px","tablet":"15px","mobile":"12px"},"backgroundColor":"#ffffff","paddingTop":{"desktop":"40px","tablet":"35px","mobile":"30px"},"paddingRight":{"desktop":"30px","tablet":"25px","mobile":"20px"},"paddingBottom":{"desktop":"40px","tablet":"35px","mobile":"30px"},"paddingLeft":{"desktop":"30px","tablet":"25px","mobile":"20px"},"borderStyle":"solid","borderWidth":{"top":"1px","right":"1px","bottom":"1px","left":"1px"},"borderColor":"#e2e8f0","borderRadius":{"desktop":{"top":"16px","right":"16px","bottom":"16px","left":"16px"}},"boxShadow":{"enabled":true,"horizontal":0,"vertical":4,"blur":20,"spread":0,"color":"rgba(0,0,0,0.08)"}} -->
<!-- wp:magical-blocks/heading {"blockId":"heading-enterprise-plan","content":"Enterprise","headingTag":"h3","textAlign":"center","fontWeight":"600","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-enterprise-price","content":"\u003cstrong\u003e$99\u003c/strong\u003e/mo","headingTag":"p","textAlign":"center","fontWeight":"700","textColor":"#0f172a"} /-->

<!-- wp:magical-blocks/divider {"blockId":"divider-enterprise","color":"#e2e8f0"} -->
<div class="wp-block-magical-blocks-divider mgb-divider mgb-divider--style-solid mgb-divider--align-center" style="--mgb-divider-width:100%;--mgb-divider-weight:2px;--mgb-divider-color:#e2e8f0;--mgb-divider-spacing-top:[object Object];--mgb-divider-spacing-bottom:[object Object];--mgb-divider-icon-size:[object Object];--mgb-divider-icon-color:#666666;--mgb-divider-text-color:#666666;--mgb-divider-text-size:[object Object];--mgb-divider-element-bg:#ffffff" role="separator"><div class="mgb-divider-line mgb-divider-line--left" aria-hidden="true"></div><div class="mgb-divider-line mgb-divider-line--right" aria-hidden="true"></div></div>
<!-- /wp:magical-blocks/divider -->

<!-- wp:magical-blocks/heading {"blockId":"heading-enterprise-f1","content":"✓ Everything in Pro","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-enterprise-f2","content":"✓ Dedicated Support","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-enterprise-f3","content":"✓ Unlimited Storage","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/heading {"blockId":"heading-enterprise-f4","content":"✓ Custom Integrations","headingTag":"p","textAlign":"center","fontWeight":"400","textColor":"#64748b"} /-->

<!-- wp:magical-blocks/button {"blockId":"button-enterprise-cta","text":"Contact Sales","buttonSize":"large","textColor":"#475569","backgroundColor":"#f1f5f9","borderRadius":{"desktop":"8px"}} -->
<div class="wp-block-magical-blocks-button mgb-button-wrapper mgb-button-wrapper--align-left mgb-block-button-enterprise-cta"><span class="mgb-button mgb-button--size-large" style="font-size:17px;color:#475569;background:#f1f5f9;border-radius:0px 0px 0px 0px;padding:16px 32px"><span class="mgb-button__text">Contact Sales</span></span></div>
<!-- /wp:magical-blocks/button -->
<!-- /wp:magical-blocks/inner-container -->
<!-- /wp:magical-blocks/inner-container -->
<!-- /wp:magical-blocks/container -->',
);
