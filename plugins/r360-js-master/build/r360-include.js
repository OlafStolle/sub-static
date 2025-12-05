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

(function() {
    function getFiles() {
        var memo = {},
            files = [],
            i, src;

        function addFiles(srcs) {
            for (var j = 0, len = srcs.length; j < len; j++) {
                memo[srcs[j]] = true;
            }
        }

        for (i in deps) {
            addFiles(deps[i].src);
        }

        for (src in memo) {
            files.push(src);
        }

        return files;
    }
    var scripts = getFiles();

    function getSrcUrl() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var src = scripts[i].src;
            if (src) {
                var res = src.match(/^(.*)r360-include\.js$/);
                if (res) {
                    return res[1] + '../src/';
                }
            }
        }
    }

    var path = getSrcUrl();
    for (var i = 0; i < scripts.length; i++) {
        document.writeln("<script src='" + path + scripts[i] + "'></script>");
    }
})();