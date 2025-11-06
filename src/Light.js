import { Object3D } from '../core/Object3D.js';

/**
 * @module DSRTLight
 * @class Light
 * @classdesc
 * Base class for all lights in DSRT.
 *
 * @property {boolean} dsrtIsLight - Type guard flag for DSRT.Light.
 * @see DSRTLight.test.js
 */
class Light extends Object3D {

  constructor(color = 0xffffff, intensity = 1) {
    super();

    /** @type {boolean} */
    this.dsrtIsLight = true;

    /** @type {number} */
    this.color = color;

    /** @type {number} */
    this.intensity = intensity;
  }

  clone() {
    return new Light(this.color, this.intensity);
  }
}

export { Light };
