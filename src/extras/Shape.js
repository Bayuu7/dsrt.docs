import { Curve } from './Curve.js';

/**
 * @module DSRTShape
 * @class Shape
 * @classdesc
 * Represents a 2D shape defined by curves.
 *
 * @property {boolean} dsrtIsShape - Type guard flag for DSRT.Shape.
 * @see DSRTShape.test.js
 */
class Shape extends Curve {

  constructor(points = []) {
    super();

    /** @type {boolean} */
    this.dsrtIsShape = true;

    /** @type {Array<Array<number>>} */
    this.points = points;
  }

  /**
   * Returns a point at parameter t.
   * @param {number} t - Normalized parameter [0,1].
   * @return {Array<number>} Point coordinates.
   */
  getPoint(t) {
    const l = this.points.length;
    const i = Math.floor(t * (l - 1));
    return this.points[i];
  }

  /**
   * Adds a point to the shape.
   * @param {number} x - X coordinate.
   * @param {number} y - Y coordinate.
   */
  addPoint(x, y) {
    this.points.push([x, y]);
    return this;
  }
}

export { Shape };
