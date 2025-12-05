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

﻿describe('support for Circle elements', function () {
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

	it('appears when added to the group before the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);

		group.addLayer(marker);
		map.addLayer(group);

		expect(marker._container).to.not.be(undefined);
		expect(marker._container.parentNode).to.be(map._pathRoot);

		clock.tick(1000);
	});
	it('appears when added to the group after the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);

		group.addLayer(marker);
		map.addLayer(group);

		expect(marker._container).to.not.be(undefined);
		expect(marker._container.parentNode).to.be(map._pathRoot);

		clock.tick(1000);
	});
	it('appears animated when added to the group after the group is added to the map', function () {

		var group = new L.MarkerClusterGroup({ animateAddingMarkers: true });
		var marker = new L.Circle([1.5, 1.5], 200);
		var marker2 = new L.Circle([1.5, 1.5], 200);

		map.addLayer(group);
		group.addLayer(marker);
		group.addLayer(marker2);

		expect(marker._container.parentNode).to.be(map._pathRoot);
		expect(marker2._container.parentNode).to.be(map._pathRoot);

		clock.tick(1000);
	});


	it('creates a cluster when 2 overlapping markers are added before the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);
		var marker2 = new L.Circle([1.5, 1.5], 200);

		group.addLayers([marker, marker2]);
		map.addLayer(group);

		expect(marker._container).to.be(undefined);
		expect(marker2._container).to.be(undefined);

		expect(map._panes.markerPane.childNodes.length).to.be(1);

		clock.tick(1000);
	});
	it('creates a cluster when 2 overlapping markers are added after the group is added to the map', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);
		var marker2 = new L.Circle([1.5, 1.5], 200);

		map.addLayer(group);
		group.addLayer(marker);
		group.addLayer(marker2);

		expect(marker._container.parentNode).to.be(null); //Removed then re-added, so null
		expect(marker2._container).to.be(undefined);

		expect(map._panes.markerPane.childNodes.length).to.be(1);

		clock.tick(1000);
	});

	it('disappears when removed from the group', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Circle([1.5, 1.5], 200);

		group.addLayer(marker);
		map.addLayer(group);

		expect(marker._container).to.not.be(undefined);
		expect(marker._container.parentNode).to.be(map._pathRoot);

		group.removeLayer(marker);

		expect(marker._container.parentNode).to.be(null);

		clock.tick(1000);
	});

});