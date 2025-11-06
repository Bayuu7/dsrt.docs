import { Object3D } from '../core/Object3D.js';

/**
 * @module DSRTSkeletonHelper
 * @class SkeletonHelper
 * @classdesc
 * Helper object that visualizes a skeleton (bones hierarchy).
 *
 * @property {boolean} dsrtIsSkeletonHelper - Type guard flag for DSRT.SkeletonHelper.
 * @see DSRTSkeletonHelper.test.js
 */
class SkeletonHelper extends Object3D {

  constructor(root) {
    super();

    /** @type {boolean} */
    this.dsrtIsSkeletonHelper = true;

    /** @type {Object3D} */
    this.root = root;

    /** @type {Array<Object3D>} */
    this.bones = [];
    root.traverse(obj => {
      if (obj.dsrtIsBone) {
        this.bones.push(obj);
      }
    });
  }
}

export { SkeletonHelper };
