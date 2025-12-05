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

var deps = {
    core : {
        src: ['r360.js',
              'r360-defaults.js',
              'geometry/types/bounds/Bounds.js',
              'geometry/types/bounds/LatLngBounds.js',
              'geometry/types/point/Point.js',
              'geometry/types/point/LatLng.js',
              'util/Browser.js',
              'util/Class.js',
              'util/PolygonUtil.js',
              'util/SvgUtil.js',
              'util/Util.js',
              'util/DomUtil.js',
              'util/TravelOptions.js',
              'rest/polygons/PolygonService.js',
              'rest/routes/RouteService.js',
              'rest/time/TimeService.js',
              'geometry/projection/Projection.SphericalMercator.js',
              'geometry/transformation/Transformation.js',
              'geometry/crs/CRS.js',
              'geometry/crs/CRS.Earth.js',
              'geometry/crs/CRS.EPSG3857.js',
              'geometry/types/polygon/Polygon.js',
              'geometry/types/polygon/MultiPolygon.js',
              'geometry/types/linestring/LineString.js',
              'geometry/types/route/RouteSegment.js',
              'geometry/types/route/RouteSegment.js',
              'geometry/types/route/Route.js',
              'basemaps/Basemaps.js',
              'extension/leaflet/layer/LeafletPolygonLayer.js',
              'extension/leaflet/layer/CanvasLayer.js',
              'extension/leaflet/layer/TileLayer.js',
              'extension/leaflet/util/LeafletUtil.js',
              'extension/google/layer/GoogleMapsPolygonLayer.js',
              'extension/google/util/GoogleMapsUtil.js'
        ],
        desc: 'This package contains all classes which are not dependent on any online map library like leaflet or google maps. '
    }
};

if (typeof exports !== 'undefined') {
    exports.deps = deps;
}
