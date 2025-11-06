import { Light } from './Light.js';

/**
 * @module DSRTDirectionalLight
 * @class DirectionalLight
 * @classdesc
 * Light that acts like sunlight, with parallel rays.
 *
 * @property {boolean} dsrtIsDirectionalLight - Type guard flag for DSRT.DirectionalLight.
 * @see DSRTDirectionalLight.test.js
 */
class DirectionalLight extends Light {

  constructor(color = 0xffffff, intensity = 1) {
    super(color, intensity);

    /** @type {boolean} */
    this.dsrtIsDirectionalLight = true;

    /** @type {Array<number>} */
    this.position = [0, 1, 0];

    /** @type {Array<number>} */
    this.target = [0, 0, 0];
  }

  setPosition(x, y, z) {
    this.position = [x, y, z];
  }

  setTarget(x, y, z) {
    this.target = [x, y, z];
  }
}

export { DirectionalLight };
