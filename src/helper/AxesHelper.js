import { Object3D } from '../core/Object3D.js';

/**
 * @module DSRTAxesHelper
 * @class AxesHelper
 * @classdesc
 * Helper object that visualizes the X, Y, Z axes.
 *
 * @property {boolean} dsrtIsAxesHelper - Type guard flag for DSRT.AxesHelper.
 * @see DSRTAxesHelper.test.js
 */
class AxesHelper extends Object3D {

  constructor(size = 1) {
    super();

    /** @type {boolean} */
    this.dsrtIsAxesHelper = true;

    /** @type {number} */
    this.size = size;

    /** @type {Object} */
    this.lines = {
      x: [[0,0,0],[size,0,0]],
      y: [[0,0,0],[0,size,0]],
      z: [[0,0,0],[0,0,size]]
    };
  }
}

export { AxesHelper };
