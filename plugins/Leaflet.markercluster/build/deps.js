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

	Core: {
		src: ['MarkerClusterGroup.js',
		      'MarkerCluster.js',
		      'MarkerOpacity.js',
		      'DistanceGrid.js'],
		desc: 'The core of the library.'
	},

	QuickHull: {
		src: ['MarkerCluster.QuickHull.js'],
		desc: 'ConvexHull generation. Used to show the area outline of the markers within a cluster.',
		heading: 'QuickHull'
	},

	Spiderfier: {
		src: ['MarkerCluster.Spiderfier.js'],
		desc: 'Provides the ability to show all of the child markers of a cluster.',
		heading: 'Spiderfier'
	}
};

if (typeof exports !== 'undefined') {
	exports.deps = deps;
}
