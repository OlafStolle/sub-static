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
r360.MultiPolygon = function() {

    this.travelTime;
    this.color;
    this.polygons      = new Array();

    // default min/max values
    this.topRight_3857          = new r360.Point(-20026377, -20048967);
    this.bottomLeft_3857        = new r360.Point(+20026377, +20048967);

    /**
     * [addPolygon description]
     * @param {type} polygon [description]
     */
    this.addPolygon = function(polygon){
        this.polygons.push(polygon);

        if ( polygon.getOuterBoundary().getTopRight3857().x > this.topRight_3857.x)     this.topRight_3857.x   = polygon.getOuterBoundary().getTopRight3857().x;
        if ( polygon.getOuterBoundary().getTopRight3857().y > this.topRight_3857.y)     this.topRight_3857.y   = polygon.getOuterBoundary().getTopRight3857().y;
        if ( polygon.getOuterBoundary().getBottomLeft3857().x < this.bottomLeft_3857.x) this.bottomLeft_3857.x = polygon.getOuterBoundary().getBottomLeft3857().x;
        if ( polygon.getOuterBoundary().getBottomLeft3857().y < this.bottomLeft_3857.y) this.bottomLeft_3857.y = polygon.getOuterBoundary().getBottomLeft3857().y;
    }

    /**
     * [getBoundingBox3857 description]
     * @return {type} [description]
     */
    this.getBoundingBox3857 = function() {

        return r360.bounds(this.bottomLeft_3857, this.topRight_3857);
    }

    /**
     * [getBoundingBox4326 description]
     * @return {type} [description]
     */
    this.getBoundingBox4326 = function() {

        return r360.latLngBounds(r360.Util.webMercatorToLatLng(this.bottomLeft_3857), r360.Util.webMercatorToLatLng(this.topRight_3857));
    }

    /**
     * [setOpacity description]
     * @param {type} opacity [description]
     */
    this.setOpacity = function(opacity){
        this.opacity = opacity;
    }

    /**
     * [getOpacity description]
     * @return {type} [description]
     */
    this.getOpacity = function(){
        return this.opacity;
    }

    /**
     * [getArea description]
     * @return {type} [description]
     */
    this.getArea = function(){

        var area = 0;
        this.polygons.forEach(function(polygon){ area += polygon.getArea(); });
        return area;
    }

    /**
     * [getPolygons description]
     * @return {type} [description]
     */
    this.getPolygons = function(){
        return this.polygons;
    }

    /**
     * [setColor description]
     * @param {type} color [description]
     */
    this.setColor = function(color){
        this.color = color;
    }

    /**
     * [getColor description]
     * @return {type} [description]
     */
    this.getColor = function(){
        return this.color;
    }

    /**
     * [getTravelTime description]
     * @return {type} [description]
     */
    this.getTravelTime = function(){
        return this.travelTime;
    }

    /**
     * [setTravelTime description]
     * @param {type} travelTime [description]
     */
    this.setTravelTime = function(travelTime){
        this.travelTime = travelTime;
    }
};

r360.multiPolygon = function () {
    return new r360.MultiPolygon();
};