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

var geojsonSample = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [102.0, 0.5]
			},
			"properties": {
				"prop0": "value0",
				"color": "blue"
			}
		},

		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]]
			},
			"properties": {
				"color": "red",
				"prop1": 0.0
			}
		},

		{
			"type": "Feature",
			"geometry": {
				"type": "Polygon",
				"coordinates": [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]]
			},
			"properties": {
				"color": "green",
				"prop1": {
					"this": "that"
				}
			}
		},

		{
			"type": "Feature",
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [[[[100.0, 1.5], [100.5, 1.5], [100.5, 2.0], [100.0, 2.0], [100.0, 1.5]]], [[[100.5, 2.0], [100.5, 2.5], [101.0, 2.5], [101.0, 2.0], [100.5, 2.0]]]]
			},
			"properties": {
				"color": "purple"
			}
		}
	]
};
