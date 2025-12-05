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

﻿describe('eachLayer', function () {
	var map, div;
	beforeEach(function () {
		div = document.createElement('div');
		div.style.width = '200px';
		div.style.height = '200px';
		document.body.appendChild(div);

		map = L.map(div, { maxZoom: 18 });

		map.fitBounds(new L.LatLngBounds([
			[1, 1],
			[2, 2]
		]));
	});
	afterEach(function () {
		document.body.removeChild(div);
	});

	it('hits polygons and markers before adding to map', function () {
		var group = new L.MarkerClusterGroup();
		var polygon = new L.Polygon([[1.5, 1.5], [2.0, 1.5], [2.0, 2.0], [1.5, 2.0]]);
		var marker = new L.Marker([1.5, 1.5]);

		group.addLayers([polygon, marker]);

		var layers = [];
		group.eachLayer(function (l) {
			layers.push(l);
		});

		expect(layers.length).to.be(2);
		expect(layers).to.contain(marker);
		expect(layers).to.contain(polygon);
	});

	it('hits polygons and markers after adding to map', function () {
		var group = new L.MarkerClusterGroup();
		var polygon = new L.Polygon([[1.5, 1.5], [2.0, 1.5], [2.0, 2.0], [1.5, 2.0]]);
		var marker = new L.Marker([1.5, 1.5]);

		group.addLayers([polygon, marker]);
		map.addLayer(group);

		var layers = [];
		group.eachLayer(function (l) {
			layers.push(l);
		});

		expect(layers.length).to.be(2);
		expect(layers).to.contain(marker);
		expect(layers).to.contain(polygon);
	});
});