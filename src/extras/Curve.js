/**
 * @module DSRTCurve
 * @class Curve
 * @classdesc
 * Base class for parametric curves in DSRT.
 *
 * @property {boolean} dsrtIsCurve - Type guard flag for DSRT.Curve.
 * @see DSRTCurve.test.js
 */
class Curve {

  constructor() {
    /** @type {boolean} */
    this.dsrtIsCurve = true;
  }

  /**
   * Returns a point on the curve at parameter t.
   * @param {number} t - Normalized parameter [0,1].
   * @return {Array<number>} Point coordinates.
   */
  getPoint(t) {
    throw new Error('Curve.getPoint() must be implemented in subclass.');
  }

  /**
   * Returns points sampled along the curve.
   * @param {number} divisions - Number of divisions.
   * @return {Array<Array<number>>} Array of points.
   */
  getPoints(divisions = 5) {
    const points = [];
    for (let i = 0; i <= divisions; i++) {
      points.push(this.getPoint(i / divisions));
    }
    return points;
  }
}

export { Curve };
