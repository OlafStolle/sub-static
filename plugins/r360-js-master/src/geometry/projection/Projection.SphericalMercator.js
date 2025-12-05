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
 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS used by default.
 */
r360.Projection = {};

r360.Projection.SphericalMercator = {

    R: 6378137,

    project: function (latlng) {
        var d = Math.PI / 180,
            max = 1 - 1E-15,
            sin = Math.max(Math.min(Math.sin(latlng.lat * d), max), -max);

        return new r360.Point(
                this.R * latlng.lng * d,
                this.R * Math.log((1 + sin) / (1 - sin)) / 2);
    },

    unproject: function (point) {
        var d = 180 / Math.PI;

        return new r360.LatLng(
            (2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
            point.x * d / this.R);
    },

    bounds: (function () {
        var d = 6378137 * Math.PI;
        return r360.bounds([-d, -d], [d, d]);
    })()
};
