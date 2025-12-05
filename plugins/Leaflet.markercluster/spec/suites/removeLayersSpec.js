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

﻿describe('removeLayers', function () {
	var map, div, clock;
	beforeEach(function () {
		clock = sinon.useFakeTimers();
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
		clock.restore();
		document.body.removeChild(div);
	});

	it('removes all the layer given to it', function () {

		var group = new L.MarkerClusterGroup();
		var markers = [
			new L.Marker([1.5, 1.5]),
			new L.Marker([1.5, 1.5]),
			new L.Marker([1.5, 1.5])
		];

		map.addLayer(group);

		group.addLayers(markers);

		group.removeLayers(markers);

		expect(group.hasLayer(markers[0])).to.be(false);
		expect(group.hasLayer(markers[1])).to.be(false);
		expect(group.hasLayer(markers[2])).to.be(false);

		expect(group.getLayers().length).to.be(0);
	});


	it('doesnt break if we are spiderfied', function () {

		var group = new L.MarkerClusterGroup();
		var markers = [
			new L.Marker([1.5, 1.5]),
			new L.Marker([1.5, 1.5]),
			new L.Marker([1.5, 1.5])
		];

		map.addLayer(group);

		group.addLayers(markers);

		markers[0].__parent.spiderfy();

		// We must wait for the spiderfy animation to timeout
		clock.tick(200);

		group.removeLayers(markers);

		expect(group.hasLayer(markers[0])).to.be(false);
		expect(group.hasLayer(markers[1])).to.be(false);
		expect(group.hasLayer(markers[2])).to.be(false);

		expect(group.getLayers().length).to.be(0);

		group.on('spiderfied', function() {
			expect(group._spiderfied).to.be(null);
		});
	});
});