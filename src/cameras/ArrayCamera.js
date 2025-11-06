import { Camera } from './Camera.js';

/**
 * @module DSRTArrayCamera
 * @class ArrayCamera
 * @classdesc
 * Camera that renders from multiple sub-cameras (used for VR/AR).
 *
 * @property {boolean} dsrtIsArrayCamera - Type guard flag for DSRT.ArrayCamera.
 * @see DSRTArrayCamera.test.js
 */
class ArrayCamera extends Camera {

  constructor(cameras = []) {
    super();

    /** @type {boolean} */
    this.dsrtIsArrayCamera = true;

    /** @type {Array<Camera>} */
    this.cameras = cameras;
  }
}

export { ArrayCamera };
