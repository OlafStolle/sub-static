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

﻿describe('getBounds', function() {
	var map, div;
	beforeEach(function() {
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
	afterEach(function() {
		document.body.removeChild(div);
	});

	describe('polygon layer', function() {
		it('returns the correct bounds before adding to the map', function() {
			var group = new L.MarkerClusterGroup();
			var polygon = new L.Polygon([[1.5, 1.5], [2.0, 1.5], [2.0, 2.0], [1.5, 2.0]]);

			group.addLayer(polygon);

			expect(group.getBounds().equals(polygon.getBounds())).to.be(true);
		});

		it('returns the correct bounds after adding to the map after adding polygon', function() {
			var group = new L.MarkerClusterGroup();
			var polygon = new L.Polygon([[1.5, 1.5], [2.0, 1.5], [2.0, 2.0], [1.5, 2.0]]);

			group.addLayer(polygon);
			map.addLayer(group);

			expect(group.getBounds().equals(polygon.getBounds())).to.be(true);
		});

		it('returns the correct bounds after adding to the map before adding polygon', function() {
			var group = new L.MarkerClusterGroup();
			var polygon = new L.Polygon([[1.5, 1.5], [2.0, 1.5], [2.0, 2.0], [1.5, 2.0]]);

			map.addLayer(group);
			group.addLayer(polygon);

			expect(group.getBounds().equals(polygon.getBounds())).to.be(true);
		});
	});

	describe('marker layers', function () {
		it('returns the correct bounds before adding to the map', function () {
			var group = new L.MarkerClusterGroup();
			var marker = new L.Marker([1.5, 1.5]);
			var marker2 = new L.Marker([1.0, 5.0]);
			var marker3 = new L.Marker([6.0, 2.0]);

			group.addLayers([marker, marker2, marker3]);

			expect(group.getBounds().equals(L.latLngBounds([1.0, 5.0], [6.0, 1.5]))).to.be(true);
		});

		it('returns the correct bounds after adding to the map after adding markers', function () {
			var group = new L.MarkerClusterGroup();
			var marker = new L.Marker([1.5, 1.5]);
			var marker2 = new L.Marker([1.0, 5.0]);
			var marker3 = new L.Marker([6.0, 2.0]);

			group.addLayers([marker, marker2, marker3]);
			map.addLayer(group);

			expect(group.getBounds().equals(L.latLngBounds([1.0, 5.0], [6.0, 1.5]))).to.be(true);
		});

		it('returns the correct bounds after adding to the map before adding markers', function () {
			var group = new L.MarkerClusterGroup();
			var marker = new L.Marker([1.5, 1.5]);
			var marker2 = new L.Marker([1.0, 5.0]);
			var marker3 = new L.Marker([6.0, 2.0]);

			map.addLayer(group);
			group.addLayers([marker, marker2, marker3]);

			expect(group.getBounds().equals(L.latLngBounds([1.0, 5.0], [6.0, 1.5]))).to.be(true);
		});
	});

	describe('marker and polygon layers', function() {
		it('returns the correct bounds before adding to the map', function() {
			var group = new L.MarkerClusterGroup();
			var marker = new L.Marker([6.0, 3.0]);
			var polygon = new L.Polygon([[1.5, 1.5], [2.0, 1.5], [2.0, 2.0], [1.5, 2.0]]);

			group.addLayers([marker, polygon]);

			expect(group.getBounds().equals(L.latLngBounds([1.5, 1.5], [6.0, 3.0]))).to.be(true);
		});

		it('returns the correct bounds after adding to the map', function () {
			var group = new L.MarkerClusterGroup();
			var marker = new L.Marker([6.0, 3.0]);
			var polygon = new L.Polygon([[1.5, 1.5], [2.0, 1.5], [2.0, 2.0], [1.5, 2.0]]);

			map.addLayer(group);
			group.addLayers([marker, polygon]);

			expect(group.getBounds().equals(L.latLngBounds([1.5, 1.5], [6.0, 3.0]))).to.be(true);
		});
	});

	describe('blank layer', function () {
		it('returns a blank bounds', function () {
			var group = new L.MarkerClusterGroup();

			expect(group.getBounds().isValid()).to.be(false);
		});
	});
});