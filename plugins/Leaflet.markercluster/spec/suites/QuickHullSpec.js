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

describe('quickhull', function () {
	describe('getDistant', function () {
		it('zero distance', function () {
			var bl = [
				{ lat: 0, lng: 0 },
				{ lat: 0, lng: 10 }
			];
			expect(L.QuickHull.getDistant({ lat: 0, lng: 0 }, bl)).to.eql(0);
		});
		it('non-zero distance', function () {
			var bl = [
				{ lat: 0, lng: 0 },
				{ lat: 0, lng: 10 }
			];
			expect(L.QuickHull.getDistant({ lat: 5, lng: 5 }, bl)).to.eql(-50);
		});
	});

	describe('getConvexHull', function () {
		it('creates a hull', function () {
			expect(L.QuickHull.getConvexHull([	{ lat: 0, lng: 0 },
								{ lat: 10, lng: 0 },
								{ lat: 10, lng: 10 },
								{ lat: 0, lng: 10 },
								{ lat: 5, lng: 5 }
							 ])).to.eql([
							 	{ lat: 0, lng: 10 },
							 	{ lat: 10, lng: 10 },
							 	{ lat: 10, lng: 0 },
							 	{ lat: 0, lng: 0 }
							 ]);
		});
		it('creates a hull for vertically-aligned objects', function () {
			expect(L.QuickHull.getConvexHull([	{ lat: 0, lng: 0 },
								{ lat: 5, lng: 0 },
								{ lat: 10, lng: 0 }
							 ])).to.eql([
							 	{ lat: 0, lng: 0 },
							 	{ lat: 10, lng: 0 }
							 ]);
		});
		it('creates a hull for horizontally-aligned objects', function () {
			expect(L.QuickHull.getConvexHull([	{ lat: 0, lng: 0 },
								{ lat: 0, lng: 5 },
								{ lat: 0, lng: 10 }
							 ])).to.eql([
							 	{ lat: 0, lng: 0 },
							 	{ lat: 0, lng: 10 }
							 ]);
		});
	});
});
