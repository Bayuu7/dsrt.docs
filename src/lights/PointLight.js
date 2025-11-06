import { Light } from './Light.js';

/**
 * @module DSRTPointLight
 * @class PointLight
 * @classdesc
 * Light that radiates from a single point in all directions.
 *
 * @property {boolean} dsrtIsPointLight - Type guard flag for DSRT.PointLight.
 * @see DSRTPointLight.test.js
 */
class PointLight extends Light {

  constructor(color = 0xffffff, intensity = 1, distance = 0, decay = 1) {
    super(color, intensity);

    /** @type {boolean} */
    this.dsrtIsPointLight = true;

    /** @type {number} */
    this.distance = distance;

    /** @type {number} */
    this.decay = decay;

    /** @type {Array<number>} */
    this.position = [0, 0, 0];
  }

  setPosition(x, y, z) {
    this.position = [x, y, z];
  }
}

export { PointLight };
