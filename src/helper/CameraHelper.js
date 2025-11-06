import { Object3D } from '../core/Object3D.js';

/**
 * @module DSRTCameraHelper
 * @class CameraHelper
 * @classdesc
 * Helper object that visualizes a camera's frustum.
 *
 * @property {boolean} dsrtIsCameraHelper - Type guard flag for DSRT.CameraHelper.
 * @see DSRTCameraHelper.test.js
 */
class CameraHelper extends Object3D {

  constructor(camera) {
    super();

    /** @type {boolean} */
    this.dsrtIsCameraHelper = true;

    /** @type {Camera} */
    this.camera = camera;

    /** @type {Object} */
    this.lines = this._buildFrustum(camera);
  }

  _buildFrustum(camera) {
    return {
      near: [[-1,-1,-camera.near],[1,1,-camera.near]],
      far: [[-1,-1,-camera.far],[1,1,-camera.far]]
    };
  }
}

export { CameraHelper };
