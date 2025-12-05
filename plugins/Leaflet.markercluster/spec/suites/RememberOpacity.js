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

describe('Remember opacity', function () {
	var map, div, clock, markers;

	var markerDefs = [
		{latLng: [ 0, 0], opts: {opacity: 0.9}},
		{latLng: [ 0, 1], opts: {opacity: 0.5}},
		{latLng: [ 0,-1], opts: {opacity: 0.5}},
		{latLng: [ 1, 0], opts: {opacity: 0.5}},
		{latLng: [-1, 0], opts: {opacity: 0.5}},
		{latLng: [ 1, 1], opts: {opacity: 0.2}},
		{latLng: [ 1,-1], opts: {opacity: 0.2}},
		{latLng: [-1, 1], opts: {opacity: 0.2}},
		{latLng: [-1,-1], opts: {opacity: 0.2}}
	];

	var bounds = L.latLngBounds( L.latLng( -1.1, -1.1),
	                             L.latLng(  1.1,  1.1) );

	beforeEach(function () {
		clock = sinon.useFakeTimers();

		div = document.createElement('div');
		div.style.width = '200px';
		div.style.height = '200px';
		document.body.appendChild(div);

		map = L.map(div, { maxZoom: 18 });

		markers = [];
		for (var i=0; i<markerDefs.length; i++) {
			markers.push( L.marker(markerDefs[i].latLng, markerDefs[i].opts ) );
		}
	});
	afterEach(function () {
		clock.restore();

		document.body.removeChild(div);
	});

	it('clusters semitransparent markers into an opaque one', function () {
		map.setView(new L.LatLng(0,0), 1);

		var clusterLayer = new L.MarkerClusterGroup({
			maxClusterRadius: 20
		});
		clusterLayer.addLayers(markers);
		map.addLayer(clusterLayer);

		var visibleClusters = clusterLayer._featureGroup.getLayers();
		expect(visibleClusters.length).to.be(1);
		expect(visibleClusters[0].options.opacity).to.be(1);
	});


	it('unclusters an opaque marker into semitransparent ones', function () {
		map.setView(new L.LatLng(0,0), 1);
		var visibleClusters;

		var clusterLayer = new L.MarkerClusterGroup({
			maxClusterRadius: 20
		});
		clusterLayer.addLayers(markers);
		map.addLayer(clusterLayer);

		map.fitBounds(bounds);
		clock.tick(1000);

		visibleClusters = clusterLayer._featureGroup.getLayers();
		expect(visibleClusters.length).to.be(9);
		for (var i=0; i<9; i++) {
			expect(visibleClusters[i].options.opacity).to.be.within(0.2,0.9);
		}

		// It shall also work after zooming in/out a second time.
		map.setView(new L.LatLng(0,0), 1);
		clock.tick(1000);

		map.fitBounds(bounds);
		clock.tick(1000);

		visibleClusters = clusterLayer._featureGroup.getLayers();
		expect(visibleClusters.length).to.be(9);
		for (var i=0; i<9; i++) {
			expect(visibleClusters[i].options.opacity).to.be.within(0.2,0.9);
		}
	});


	it('has no problems zooming in and out several times', function () {
		var visibleClusters;

		var clusterLayer = new L.MarkerClusterGroup({
			maxClusterRadius: 20
		});
		clusterLayer.addLayers(markers);
		map.addLayer(clusterLayer);

		// Zoom in and out a couple times
		for (var i=0; i<10; i++) {
			map.fitBounds(bounds);
			clock.tick(1000);

			visibleClusters = clusterLayer._featureGroup.getLayers();
			expect(visibleClusters.length).to.be(9);
			for (var i=0; i<9; i++) {
				expect(visibleClusters[i].options.opacity).to.be.within(0.2,0.9);
			}

			map.setView(new L.LatLng(0,0), 1);
			clock.tick(1000);

			visibleClusters = clusterLayer._featureGroup.getLayers();
			expect(visibleClusters.length).to.be(1);
			expect(visibleClusters[0].options.opacity).to.be(1);
		}

	});

	it('retains the opacity of each individual marker', function () {
		map.setView(new L.LatLng(0,0), 1);

		var visibleClusters;
		var clusterLayer = new L.MarkerClusterGroup({
			maxClusterRadius: 20
		});
		clusterLayer.addLayers(markers);
		map.addLayer(clusterLayer);


		// Zoom in and out a couple times
		for (var i=0; i<5; i++) {
			map.fitBounds(bounds);
			clock.tick(1000);

			map.setView(new L.LatLng(0,0), 1);
			clock.tick(1000);
		}

		for (var i=0; i<markerDefs.length; i++) {

// 			console.log(markerDefs[i].latLng, markerDefs[i].opts.opacity);

			map.setView(L.latLng(markerDefs[i].latLng), 18);
			clock.tick(1000);
			visibleClusters = clusterLayer._featureGroup.getLayers();
			expect(visibleClusters.length).to.be(1);
			expect(visibleClusters[0].options.opacity).to.be(markerDefs[i].opts.opacity);
		}
	});

});