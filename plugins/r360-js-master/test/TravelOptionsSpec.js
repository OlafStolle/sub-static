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

describe("the TravelOptions object", function() {
  
    it("should return the current time including seconds", function() {

        var travelOptions = r360.travelOptions();
        travelOptions.addSource({ lat : 52.21 , lon : 13.37 });
        travelOptions.addSource({ lat : 52.21 , lon : 13.37 });
        travelOptions.addSource({ lat : 52.21 , lon : 13.37 });
        travelOptions.addTarget({ lat : 52.21 , lon : 13.37 });
        travelOptions.addTarget({ lat : 52.21 , lon : 13.37 });
        travelOptions.setTravelTimes([600, 1200, 1800, 2400, 3000, 3600, 4200]);
        travelOptions.setTravelType('transit');
        travelOptions.setDate('20140904');
        travelOptions.setTime('43200');
        travelOptions.setIntersectionMode('average');
        travelOptions.setPathSerializer('compact');
        travelOptions.setMaxRoutingTime(3600);
        travelOptions.setMaxRoutingLength(100000);
        travelOptions.setBikeSpeed(4);
        travelOptions.setBikeUphill(5);
        travelOptions.setBikeDownhill(6);
        travelOptions.setWalkSpeed(1);
        travelOptions.setWalkUphill(2);
        travelOptions.setWalkDownhill(3);

        expect(travelOptions.getSources()).toBeArrayOfSize(3);
        expect(travelOptions.getTargets()).toBeArrayOfSize(2);
        expect(travelOptions.getTravelTimes()).toEqual([600, 1200, 1800, 2400, 3000, 3600, 4200]);
        expect(travelOptions.getTravelType()).toBe('transit');
        expect(travelOptions.getDate()).toBe('20140904');
        expect(travelOptions.getTime()).toBe('43200');
        expect(travelOptions.getIntersectionMode()).toBe('average');
        expect(travelOptions.getPathSerializer()).toBe('compact');
        expect(travelOptions.getMaxRoutingTime()).toBe(3600);
        expect(travelOptions.getMaxRoutingLength()).toBe(100000);
        expect(travelOptions.getBikeSpeed()).toBe(4);
        expect(travelOptions.getBikeUphill()).toBe(5);
        expect(travelOptions.getBikeDownhill()).toBe(6);
        expect(travelOptions.getWalkSpeed()).toBe(1);
        expect(travelOptions.getWalkUphill()).toBe(2);
        expect(travelOptions.getWalkDownhill()).toBe(3);
        expect(travelOptions.isValidPolygonServiceOptions()).toBe(true);
        expect(travelOptions.isValidRouteServiceOptions()).toBe(true);
        expect(travelOptions.isValidTimeServiceOptions()).toBe(true);
        expect(travelOptions.getErrors()).toBeArrayOfSize(0);     
    });
});