import { Camera } from './Camera.js';

/**
 * @module DSRTOrthographicCamera
 * @class OrthographicCamera
 * @classdesc
 * Camera with orthographic projection.
 *
 * @property {boolean} dsrtIsOrthographicCamera - Type guard flag for DSRT.OrthographicCamera.
 * @see DSRTOrthographicCamera.test.js
 */
class OrthographicCamera extends Camera {

  constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2000) {
    super();

    /** @type {boolean} */
    this.dsrtIsOrthographicCamera = true;

    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.near = near;
    this.far = far;

    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const dx = this.right - this.left;
    const dy = this.top - this.bottom;
    const dz = this.far - this.near;

    const te = this.projectionMatrix;

    te[0] = 2 / dx;
    te[4] = 0;
    te[8] = -(this.right + this.left) / dx;
    te[12] = 0;

    te[1] = 0;
    te[5] = 2 / dy;
    te[9] = -(this.top + this.bottom) / dy;
    te[13] = 0;

    te[2] = 0;
    te[6] = 0;
    te[10] = -2 / dz;
    te[14] = -(this.far + this.near) / dz;

    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
  }
}

export { OrthographicCamera };
