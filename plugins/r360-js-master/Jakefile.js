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
r360 building, testing and linting scripts.

To use, install Node, then run the following commands in the project root:

    npm install -g jake
    npm install

To check the code for errors and build r360 from source, run "jake".
To run the tests, run "jake test".

For a custom build, open build/build.html in the browser and follow the instructions.
*/

var build = require('./build/build.js'),
    version = require('./src/r360.js').version;

function hint(msg, paths) {
	return function () {
		console.log(msg);
		jake.exec('node node_modules/jshint/bin/jshint -c ' + paths,
				{printStdout: true}, function () {
			console.log('\tCheck passed.\n');
			complete();
		});
	};
}

desc('Check r360 source for errors with JSHint');
task('lint', {async: true}, hint('Checking for JS errors...', 'build/hintrc.js src'));

desc('Check r360 specs source for errors with JSHint');
task('lintspec', {async: true}, hint('Checking for specs JS errors...', 'spec/spec.hintrc.js spec/suites'));

desc('Combine and compress r360 source files');
task('build', {async: true}, function (compsBase32, buildName) {
	var v;

	jake.exec('git log -1 --pretty=format:"%h"', {}, function () {
		build.build(complete, v, compsBase32, buildName);

	}).on('stdout', function (data) {
		v = version + ' (' + data.toString() + ')';
	});
});

desc('Run PhantomJS tests');
task('test', ['lint', 'lintspec'], {async: true}, function () {
	build.test(complete);
});

task('default', ['test', 'build']);

jake.addListener('complete', function () {
  process.exit();
});
