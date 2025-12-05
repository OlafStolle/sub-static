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
 * r360.LatLng represents a geographical point with latitude and longitude coordinates.
 */

r360.LatLng = function (lat, lng, alt) {
    if (isNaN(lat) || isNaN(lng)) {
        throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
    }

    this.lat = +lat;
    this.lng = +lng;

    if (alt !== undefined) {
        this.alt = +alt;
    }
};

r360.LatLng.prototype = {
    equals: function (obj, maxMargin) {
        if (!obj) { return false; }

        obj = r360.latLng(obj);

        var margin = Math.max(
                Math.abs(this.lat - obj.lat),
                Math.abs(this.lng - obj.lng));

        return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
    },

    toString: function (precision) {
        return 'LatLng(' +
                r360.Util.formatNum(this.lat, precision) + ', ' +
                r360.Util.formatNum(this.lng, precision) + ')';
    },

    distanceTo: function (other) {
        return r360.CRS.Earth.distance(this, r360.latLng(other));
    },

    wrap: function () {
        return r360.CRS.Earth.wrapLatLng(this);
    },

    toBounds: function (sizeInMeters) {
        var latAccuracy = 180 * sizeInMeters / 40075017,
                lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

        return r360.latLngBounds(
                [this.lat - latAccuracy, this.lng - lngAccuracy],
                [this.lat + latAccuracy, this.lng + lngAccuracy]);
    },

    clone: function () {
        return new r360.LatLng(this.lat, this.lng, this.alt);
    }
};


// constructs LatLng with different signatures
// (LatLng) or ([Number, Number]) or (Number, Number) or (Object)

r360.latLng = function (a, b, c) {
    if (a instanceof r360.LatLng) {
        return a;
    }
    if (r360.Util.isArray(a) && typeof a[0] !== 'object') {
        if (a.length === 3) {
            return new r360.LatLng(a[0], a[1], a[2]);
        }
        if (a.length === 2) {
            return new r360.LatLng(a[0], a[1]);
        }
        return null;
    }
    if (a === undefined || a === null) {
        return a;
    }
    if (typeof a === 'object' && 'lat' in a) {
        return new r360.LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
    }
    if (b === undefined) {
        return null;
    }
    return new r360.LatLng(a, b, c);
};
