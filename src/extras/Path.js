import { Curve } from './Curve.js';

/**
 * @module DSRTPath
 * @class Path
 * @classdesc
 * Represents a path composed of multiple curves.
 *
 * @property {boolean} dsrtIsPath - Type guard flag for DSRT.Path.
 * @see DSRTPath.test.js
 */
class Path extends Curve {

  constructor(curves = []) {
    super();

    /** @type {boolean} */
    this.dsrtIsPath = true;

    /** @type {Array<Curve>} */
    this.curves = curves;
  }

  /**
   * Adds a curve to the path.
   * @param {Curve} curve - The curve to add.
   */
  addCurve(curve) {
    this.curves.push(curve);
    return this;
  }

  /**
   * Returns a point at parameter t.
   * @param {number} t - Normalized parameter [0,1].
   * @return {Array<number>} Point coordinates.
   */
  getPoint(t) {
    if (this.curves.length === 0) return [0, 0];
    const curveIndex = Math.floor(t * this.curves.length);
    const curve = this.curves[curveIndex];
    const localT = (t * this.curves.length) - curveIndex;
    return curve.getPoint(localT);
  }
}

export { Path };
