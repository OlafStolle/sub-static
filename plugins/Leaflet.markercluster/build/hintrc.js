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

exports.config = {

	// environment
	"browser": true,
	"node": true,
	"predef": ['L', 'define'],
	"strict": false,

	// code style
	"bitwise": true,
	"camelcase": true,
	"curly": true,
	"eqeqeq": true,
	"forin": false,
	"immed": true,
	"latedef": true,
	"newcap": true,
	"noarg": true,
	"noempty": true,
	"nonew": true,
	"undef": true,
	"unused": true,
	//"quotmark": "single",

	// whitespace
	"indent": 4,
	"trailing": true,
	"white": true,
	"smarttabs": true,
	//"maxlen": 120

	// code simplicity - not enforced but nice to check from time to time
	// "maxstatements": 20,
	// "maxcomplexity": 5
	// "maxparams": 4,
	// "maxdepth": 4
};
