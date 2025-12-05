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

﻿describe('support child markers changing icon', function () {
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

	it('child markers end up with the right icon after becoming unclustered', function () {

		var group = new L.MarkerClusterGroup();
		var marker = new L.Marker([1.5, 1.5], { icon: new L.DivIcon({html: 'Inner1Text' }) });
		var marker2 = new L.Marker([1.5, 1.5]);

		map.addLayer(group);
		group.addLayer(marker);

		expect(marker._icon.parentNode).to.be(map._panes.markerPane);
		expect(marker._icon.innerHTML).to.contain('Inner1Text');

		group.addLayer(marker2);

		expect(marker._icon).to.be(null); //Have been removed from the map

		marker.setIcon(new L.DivIcon({ html: 'Inner2Text' })); //Change the icon

		group.removeLayer(marker2); //Remove the other marker, so we'll become unclustered

		expect(marker._icon.innerHTML).to.contain('Inner2Text');
	});
});