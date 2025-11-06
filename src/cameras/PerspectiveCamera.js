import { Camera } from './Camera.js';

/**
 * @module DSRTPerspectiveCamera
 * @class PerspectiveCamera
 * @classdesc
 * Camera with perspective projection.
 *
 * @property {boolean} dsrtIsPerspectiveCamera - Type guard flag for DSRT.PerspectiveCamera.
 * @see DSRTPerspectiveCamera.test.js
 */
class PerspectiveCamera extends Camera {

  constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
    super();

    /** @type {boolean} */
    this.dsrtIsPerspectiveCamera = true;

    /** @type {number} */
    this.fov = fov;

    /** @type {number} */
    this.aspect = aspect;

    /** @type {number} */
    this.near = near;

    /** @type {number} */
    this.far = far;

    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const top = this.near * Math.tan((this.fov * Math.PI) / 360);
    const height = 2 * top;
    const width = this.aspect * height;
    const left = -0.5 * width;
    const right = left + width;
    const bottom = top - height;

    const near = this.near;
    const far = this.far;

    const te = this.projectionMatrix;

    te[0] = (2 * near) / (right - left);
    te[4] = 0;
    te[8] = (right + left) / (right - left);
    te[12] = 0;

    te[1] = 0;
    te[5] = (2 * near) / (top - bottom);
    te[9] = (top + bottom) / (top - bottom);
    te[13] = 0;

    te[2] = 0;
    te[6] = 0;
    te[10] = -(far + near) / (far - near);
    te[14] = -(2 * far * near) / (far - near);

    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
  }
}

export { PerspectiveCamera };
