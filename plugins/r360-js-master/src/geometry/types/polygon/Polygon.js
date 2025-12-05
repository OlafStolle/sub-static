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

r360.polygon = function (traveltime, area, outerBoundary) {
    return new r360.Polygon(traveltime, area, outerBoundary);
};

/*
 *
 */
r360.Polygon = function(traveltime, area, outerBoundary) {

    this.travelTime  = traveltime;
    this.area        = area;
    this.color       = 'black';
    this.opacity     = 0.5;
    this.lineStrings = [outerBoundary];
    this.bounds      = undefined;

    /**
     * [setTravelTime description]
     * @param {type} travelTime [description]
     */
    this.setTravelTime = function(travelTime){
        this.travelTime = travelTime;
    }

    /**
     * [getTravelTime description]
     * @return {type} [description]
     */
    this.getTravelTime = function(){
        return this.travelTime;
    }

        /**
     * [getColor description]
     * @return {type} [description]
     */
    this.getColor = function(){
        return this.color;
    }

    /**
     * [setColor description]
     * @param {type} color [description]
     */
    this.setColor = function(color){
        this.color = color;
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
    this.getOpacity =function(){
        return this.opacity;
    }

    /**
     * [getArea description]
     * @return {type} [description]
     */
    this.getArea = function(){
        return this.area;
    }

    /**
     * [setArea description]
     * @param {type} area [description]
     */
    this.setArea = function(area){
        this.area = area;
    }

    /**
     * [getOuterBoundary description]
     * @return {type} [description]
     */
    this.getOuterBoundary = function() {
        return this.lineStrings[0];
    }

    /**
     * [getInnerBoundary description]
     * @return {type} [description]
     */
    this.getInnerBoundary = function() {
        return this.lineStrings.slice(1);
    }

    /**
     * [getTopRight4326 description]
     * @return {type} [description]
     */
    this.getTopRight4326 = function(){
        return this.getOuterBoundary().getTopRight4326();
    }

    /**
     * [getTopRight3857 description]
     * @return {type} [description]
     */
    this.getTopRight3857 = function(){
        return this.getOuterBoundary().getTopRight3857();
    }

    /**
     * [getTopRightDecimal description]
     * @return {type} [description]
     */
    this.getTopRightDecimal = function(){
        return this.getOuterBoundary().getTopRightDecimal();
    }

    /**
     * [getBottomLeft4326 description]
     * @return {type} [description]
     */
    this.getBottomLeft4326 = function(){
        return this.getOuterBoundary().getBottomLeft4326();
    }

    /**
     * [getBottomLeft3857 description]
     * @return {type} [description]
     */
    this.getBottomLeft3857 = function(){
        return this.getOuterBoundary().getBottomLeft3857();
    }

    /**
     * [getBottomLeftDecimal description]
     * @return {type} [description]
     */
    this.getBottomLeftDecimal = function(){
        return this.getOuterBoundary().getBottomLeftDecimal();
    }

    /**
     * [addInnerBoundary description]
     * @param {type} innerBoundary [description]
     */
    this.addInnerBoundary = function(innerBoundary){
        this.lineStrings.push(innerBoundary);
    }
}