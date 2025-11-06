import { Object3D } from '../core/Object3D.js';

/**
 * @module DSRTBoxHelper
 * @class BoxHelper
 * @classdesc
 * Helper object that visualizes a bounding box around an object.
 *
 * @property {boolean} dsrtIsBoxHelper - Type guard flag for DSRT.BoxHelper.
 * @see DSRTBoxHelper.test.js
 */
class BoxHelper extends Object3D {

  constructor(object) {
    super();

    /** @type {boolean} */
    this.dsrtIsBoxHelper = true;

    /** @type {Object3D} */
    this.object = object;

    /** @type {Object} */
    this.box = this._computeBox(object);
  }

  _computeBox(object) {
    return {
      min: [-1,-1,-1],
      max: [1,1,1]
    };
  }
}

export { BoxHelper };
