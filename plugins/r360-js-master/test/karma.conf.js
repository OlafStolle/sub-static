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
// Generated on Thu Sep 04 2014 17:37:31 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-matchers'],


    // list of files / patterns to load in the browser
    files: [
        'debug/demo/lib/jquery/jquery-1.10.2.js',
        'debug/demo/lib/leaflet/leaflet.js',
        'debug/demo/js/underscore.js',
        'debug/demo/lib/proj4/proj4-compressed.js',
        'debug/demo/lib/proj4/proj4leaflet.js',
        'src/r360.js',
        'src/r360-defaults.js',
        'src/util/Util.js',
        'src/util/TravelOptions.js',
        'src/api/polygons/PolygonService.js',
        'src/api/routes/RouteService.js',
        'src/api/time/TimeService.js',
        'src/control/PlaceAutoCompleteControl.js',
        'src/control/TravelStartDateControl.js',
        'src/control/TravelStartTimeControl.js',
        'src/control/TravelTimeControl.js',
        'src/control/WaitControl.js',
        'src/control/HtmlControl.js',
        'src/control/RadioButtonControl.js',
        'src/control/CheckboxButtonControl.js',
        'src/geometry/polygon/Polygon.js',
        'src/geometry/polygon/MultiPolygon.js',
        'src/geometry/route/RouteSegment.js',
        'src/geometry/route/Route.js',
        'src/layer/Route360PolygonLayer.js',
        'spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,



    reportSlowerThan : 500
  });
};
