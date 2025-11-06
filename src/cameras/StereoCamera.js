import { Camera } from './Camera.js';

/**
 * @module DSRTStereoCamera
 * @class StereoCamera
 * @classdesc
 * Camera for stereoscopic rendering (left/right eye).
 *
 * @property {boolean} dsrtIsStereoCamera - Type guard flag for DSRT.StereoCamera.
 * @see DSRTStereoCamera.test.js
 */
class StereoCamera extends Camera {

  constructor() {
    super();

    /** @type {boolean} */
    this.dsrtIsStereoCamera = true;

    /** @type {Camera} */
    this.cameraL = new Camera();

    /** @type {Camera} */
    this.cameraR = new Camera();

    /** @type {number} */
    this.eyeSep = 0.064; // typical human eye separation in meters
  }

  update(leftProjectionMatrix, rightProjectionMatrix) {
    this.cameraL.projectionMatrix = leftProjectionMatrix;
    this.cameraR.projectionMatrix = rightProjectionMatrix;
  }
}

export { StereoCamera };
