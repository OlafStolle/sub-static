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
 * r360.Point represents a point with x and y coordinates.
 */

r360.Point = function (x, y, round) {
    this.x = (round ? Math.round(x) : x);
    this.y = (round ? Math.round(y) : y);
};

r360.Point.prototype = {

    clone: function () {
        return new r360.Point(this.x, this.y);
    },

    // non-destructive, returns a new point
    add: function (point) {
        return this.clone()._add(r360.point(point));
    },

    // destructive, used directly for performance in situations where it's safe to modify existing point
    _add: function (point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    },

    subtract: function (point) {
        return this.clone()._subtract(r360.point(point));
    },

    _subtract: function (point) {
        this.x -= point.x;
        this.y -= point.y;
        return this;
    },

    divideBy: function (num) {
        return this.clone()._divideBy(num);
    },

    _divideBy: function (num) {
        this.x /= num;
        this.y /= num;
        return this;
    },

    multiplyBy: function (num) {
        return this.clone()._multiplyBy(num);
    },

    _multiplyBy: function (num) {
        this.x *= num;
        this.y *= num;
        return this;
    },

    round: function () {
        return this.clone()._round();
    },

    _round: function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    },

    floor: function () {
        return this.clone()._floor();
    },

    _floor: function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    },

    ceil: function () {
        return this.clone()._ceil();
    },

    _ceil: function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    },

    distanceTo: function (point) {
        point = r360.point(point);

        var x = point.x - this.x,
            y = point.y - this.y;

        return Math.sqrt(x * x + y * y);
    },

    equals: function (point) {
        point = r360.point(point);

        return point.x === this.x &&
               point.y === this.y;
    },

    contains: function (point) {
        point = r360.point(point);

        return Math.abs(point.x) <= Math.abs(this.x) &&
               Math.abs(point.y) <= Math.abs(this.y);
    },

    toString: function () {
        return 'Point(' +
                r360.Util.formatNum(this.x) + ', ' +
                r360.Util.formatNum(this.y) + ')';
    }
};

r360.point = function (x, y, round) {
    if (x instanceof r360.Point) {
        return x;
    }
    if (r360.Util.isArray(x)) {
        return new r360.Point(x[0], x[1]);
    }
    if (x === undefined || x === null) {
        return x;
    }
    return new r360.Point(x, y, round);
};
