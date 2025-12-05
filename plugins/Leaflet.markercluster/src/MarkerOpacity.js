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


/*
* Extends L.Marker to include two extra methods: clusterHide and clusterShow.
* 
* They work as setOpacity(0) and setOpacity(1) respectively, but
* they will remember the marker's opacity when hiding and showing it again.
* 
*/


L.Marker.include({
	
	clusterHide: function () {
		this.options.opacityWhenUnclustered = this.options.opacity || 1;
		return this.setOpacity(0);
	},
	
	clusterShow: function () {
		var ret = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered);
		delete this.options.opacityWhenUnclustered;
		return ret;
	}
	
});


