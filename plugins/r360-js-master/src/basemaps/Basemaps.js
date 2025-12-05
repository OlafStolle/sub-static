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
*
*/
r360.basemapsLookup = {
    'bright': 'osm-bright-gl-style',
    'light': 'positron-gl-style',
    'dark': 'dark-matter-gl-style',
    'blues': 'fiord-color-gl-style',
    'basic': 'klokantech-basic-gl-style'
};

/**
 * [r360.getBasemapList returns an array of Route360 basemap names. ]
 * @return {basemapList} Array [returns array of basemaps names]
 */
r360.getBasemapList = function () {
    return Object.keys(r360.basemapsLookup);
};

/**
 * [r360.getGLStyle returns style url for mapbox-gl style. ]
 * @param  {stylename} String [accepts string of valid Route360 style name]
 * @param  {apikey} String    [accepts string of Route360 apikey]
 * @return {styleUrl} String  [returns url for mapbox-gl style]
 */
r360.getGLStyle = function (stylename, apikey) {
    if (!stylename && !r360.basemapsLookup[stylename]) {
        throw new Error('valid style name required to access Route360 basemap');
    }
    if (!apikey) {
        throw new Error('apikey required to access Route360 basemaps');
    }

    return 'https://maps.route360.net/styles/' + r360.basemapsLookup[stylename] + '.json?key=' + apikey
};