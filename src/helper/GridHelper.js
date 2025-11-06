import { Object3D } from '../core/Object3D.js';

/**
 * @module DSRTGridHelper
 * @class GridHelper
 * @classdesc
 * Helper object that visualizes a grid on the XZ-plane.
 *
 * @property {boolean} dsrtIsGridHelper - Type guard flag for DSRT.GridHelper.
 * @see DSRTGridHelper.test.js
 */
class GridHelper extends Object3D {

  constructor(size = 10, divisions = 10) {
    super();

    /** @type {boolean} */
    this.dsrtIsGridHelper = true;

    this.size = size;
    this.divisions = divisions;

    /** @type {Array<Array<Array<number>>>} */
    this.lines = [];
    const step = size / divisions;
    const half = size / 2;

    for (let i = -half; i <= half; i += step) {
      this.lines.push([[ -half, 0, i ], [ half, 0, i ]]);
      this.lines.push([[ i, 0, -half ], [ i, 0, half ]]);
    }
  }
}

export { GridHelper };
