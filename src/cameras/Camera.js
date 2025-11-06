/**
 * @module DSRTCamera
 * @class Camera
 * @classdesc
 * Base class for all cameras in DSRT.
 * Extends Object3D and provides projection matrix handling.
 *
 * @property {boolean} dsrtIsCamera - Type guard flag for DSRT.Camera.
 * @see DSRTCamera.test.js
 */
class Camera {

  constructor() {
    /** @type {boolean} */
    this.dsrtIsCamera = true;

    /** @type {Matrix4} */
    this.projectionMatrix = new Float32Array(16);

    /** @type {Matrix4} */
    this.projectionMatrixInverse = new Float32Array(16);
  }

  updateProjectionMatrix() {
    throw new Error('Camera.updateProjectionMatrix() must be implemented in subclass.');
  }
}

export { Camera };
