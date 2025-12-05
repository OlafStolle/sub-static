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
r360.RouteSegment = function(segment){      

    var that             = this;
    that.points          = [];
    that.type            = segment.type;
    that.travelTime      = segment.travelTime;

    /*
    * TODO don't call it length! in route length refers to the array length.
    * Call it distance instead
    */

    that.distance        = segment.length / 1000;    
    that.warning         = segment.warning;    
    that.elevationGain   = segment.elevationGain;
    that.errorMessage;   
    that.transitSegment  = false;
    that.startname      = segment.startname;
    that.endname        = segment.endname;

    // build the geometry
    segment.points.forEach(function(point){
        that.points.push(r360.Util.webMercatorToLatLng(new r360.Point(point[1], point[0]), point[2]));
    });

    // in case we have a transit route, we set a color depending
    //  on the route type (bus, subway, tram etc.)
    // and we set information which are only available 
    // for transit segments like depature station and route short sign
    if ( segment.isTransit ) {

        var colorObject     = r360.findWhere(r360.config.routeTypes, {routeType : segment.routeType});
        that.color          = typeof colorObject != 'undefined' && r360.has(colorObject, 'color')     ? colorObject.color : 'RED';
        that.haloColor      = typeof colorObject != 'undefined' && r360.has(colorObject, 'haloColor') ? colorObject.haloColor : 'WHITE';
        that.transitSegment = true;
        that.routeType      = segment.routeType;
        that.routeShortName = segment.routeShortName;
        that.startname      = segment.startname;
        that.endname        = segment.endname;
        that.departureTime  = segment.departureTime;
        that.arrivalTime    = segment.arrivalTime;
        that.tripHeadSign   = segment.tripHeadSign;
    }
    else {

        var colorObject     = r360.findWhere(r360.config.routeTypes, {routeType : segment.type});
        that.color          = typeof colorObject != 'undefined' && r360.has(colorObject, 'color')     ? colorObject.color : 'RED';
        that.haloColor      = typeof colorObject != 'undefined' && r360.has(colorObject, 'haloColor') ? colorObject.haloColor : 'WHITE';
    }

    that.getPoints = function(){
        return that.points;
    }

    that.getType = function(){
        return that.type;
    }

    that.getHaloColor = function(){
        return that.haloColor;
    }

    that.getColor = function(){
        return that.color;
    }

    that.getTravelTime = function(){
        return that.travelTime;
    }

    that.getDistance = function(){
        return that.distance;
    }

    that.getRouteType = function(){
        return that.routeType;
    }

    that.getRouteShortName = function(){
        return that.routeShortName;
    }

    that.getStartName = function(){
        return that.startname;
    }

    that.getEndName = function(){
        return that.endname;
    }

    that.getDepartureTime = function(){
        return that.departureTime;
    }

    that.getArrivalTime = function(){
        return that.arrivalTime;
    }

    that.getTripHeadSign = function(){
        return that.tripHeadSign;
    }

    that.getWarning = function(){
        return that.warning;
    }

    that.getElevationGain = function(){
        return that.elevationGain;
    }

    that.isTransit = function(){
        return that.transitSegment;
    }
};

r360.routeSegment = function (segment) { 
    return new r360.RouteSegment(segment);
};