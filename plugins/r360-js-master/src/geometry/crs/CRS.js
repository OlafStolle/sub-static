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
 * r360.CRS is the base object for all defined CRS (Coordinate Reference Systems) in Leaflet.
 */

r360.CRS = {
    // converts geo coords to pixel ones
    latLngToPoint: function (latlng, zoom) {
        var projectedPoint = this.projection.project(latlng),
            scale = this.scale(zoom);

        return this.transformation._transform(projectedPoint, scale);
    },

    // converts pixel coords to geo coords
    pointToLatLng: function (point, zoom) {
        var scale = this.scale(zoom),
            untransformedPoint = this.transformation.untransform(point, scale);

        return this.projection.unproject(untransformedPoint);
    },

    // converts geo coords to projection-specific coords (e.g. in meters)
    project: function (latlng) {
        return this.projection.project(latlng);
    },

    // converts projected coords to geo coords
    unproject: function (point) {
        return this.projection.unproject(point);
    },

    // defines how the world scales with zoom
    scale: function (zoom) {
        return 256 * Math.pow(2, zoom);
    },

    // returns the bounds of the world in projected coords if applicable
    getProjectedBounds: function (zoom) {
        if (this.infinite) { return null; }

        var b = this.projection.bounds,
            s = this.scale(zoom),
            min = this.transformation.transform(b.min, s),
            max = this.transformation.transform(b.max, s);

        return r360.bounds(min, max);
    },

    // whether a coordinate axis wraps in a given range (e.g. longitude from -180 to 180); depends on CRS
    // wrapLng: [min, max],
    // wrapLat: [min, max],

    // if true, the coordinate space will be unbounded (infinite in all directions)
    // infinite: false,

    // wraps geo coords in certain ranges if applicable
    wrapLatLng: function (latlng) {
        var lng = this.wrapLng ? r360.Util.wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
            lat = this.wrapLat ? r360.Util.wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
            alt = latlng.alt;

        return r360.latLng(lat, lng, alt);
    }
};
