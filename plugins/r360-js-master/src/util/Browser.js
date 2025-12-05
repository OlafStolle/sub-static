/*
 * ============================================================================
 * AiCrafters Platform - Proprietary and Confidential
 * ============================================================================
 *
 * Copyright (c) 2025 Olaf Stolle. All Rights Reserved.
 *
 * NOTICE: This file and its contents are proprietary and confidential.
 *
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written permission
 * from the copyright holder.
 *
 * This software contains trade secrets and confidential information including
 * but not limited to:
 * - Proprietary algorithms and calculation methods
 * - Geometric models and mathematical formulas
 * - Database structures and data models
 * - Business logic and workflows
 * - AI models and training procedures
 *
 * PENALTIES FOR UNAUTHORIZED USE:
 * - Unauthorized use: €50,000 + €5,000/day
 * - Reverse engineering: €100,000
 * - Distribution to third parties: €150,000
 * - Use in competing products: €250,000
 * - Commercial exploitation: €500,000 + 25% of revenue
 *
 * LEGAL NOTICE:
 * Violations may result in:
 * - Civil penalties as stated above
 * - Criminal prosecution under § 106 UrhG (German Copyright Act)
 * - Immediate injunction
 * - Confiscation of derived works
 *
 * For licensing inquiries, contact:
 * Olaf Stolle
 * info@aicrafters.io
 *
 * ============================================================================
 */

/*
 * r360.Browser handles different browser and feature detections for internal Leaflet use.
 */

(function () {

    var ua = navigator.userAgent.toLowerCase(),
        doc = document.documentElement,

        ie = 'ActiveXObject' in window,

        webkit    = ua.indexOf('webkit') !== -1,
        phantomjs = ua.indexOf('phantom') !== -1,
        android23 = ua.search('android [23]') !== -1,
        chrome    = ua.indexOf('chrome') !== -1,
        gecko     = ua.indexOf('gecko') !== -1  && !webkit && !window.opera && !ie,

        mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
        msPointer = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !window.PointerEvent,
        pointer = (window.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints) || msPointer,

        ie3d = ie && ('transition' in doc.style),
        webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
        gecko3d = 'MozPerspective' in doc.style,
        opera12 = 'OTransition' in doc.style;

    var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window ||
            (window.DocumentTouch && document instanceof window.DocumentTouch));

    r360.Browser = {
        ie: ie,
        ielt9: ie && !document.addEventListener,
        webkit: webkit,
        gecko: gecko,
        android: ua.indexOf('android') !== -1,
        android23: android23,
        chrome: chrome,
        safari: !chrome && ua.indexOf('safari') !== -1,

        ie3d: ie3d,
        webkit3d: webkit3d,
        gecko3d: gecko3d,
        opera12: opera12,
        any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,

        mobile: mobile,
        mobileWebkit: mobile && webkit,
        mobileWebkit3d: mobile && webkit3d,
        mobileOpera: mobile && window.opera,
        mobileGecko: mobile && gecko,

        touch: !!touch,
        msPointer: !!msPointer,
        pointer: !!pointer,

        retina: (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1
    };

}());
