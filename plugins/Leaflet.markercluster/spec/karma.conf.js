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

// Karma configuration
var libSources = require(__dirname+'/../build/build.js').getFiles();
var leafletSources = require(__dirname+'/../node_modules/leaflet/build/build.js').getFiles();

// base path, that will be used to resolve files and exclude
basePath = '';

for (var i=0; i < libSources.length; i++) {
	libSources[i] = "../" + libSources[i];
}
for (var i=0; i < leafletSources.length; i++) {
	leafletSources[i] = "../node_modules/leaflet/" + leafletSources[i];
}

// list of files / patterns to load in the browser
files = [].concat([
	"../node_modules/mocha/mocha.js",
	MOCHA_ADAPTER,
	"sinon.js",
	"expect.js"
], leafletSources, libSources, [
	"after.js",
	"happen.js",
	"suites/SpecHelper.js",
	"suites/**/*.js"
]);

// list of files to exclude
exclude = [
];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['dots'];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_WARN;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;
