import { Light } from './Light.js';

/**
 * @module DSRTAmbientLight
 * @class AmbientLight
 * @classdesc
 * Light that globally illuminates all objects equally.
 *
 * @property {boolean} dsrtIsAmbientLight - Type guard flag for DSRT.AmbientLight.
 * @see DSRTAmbientLight.test.js
 */
class AmbientLight extends Light {

  constructor(color = 0xffffff, intensity = 1) {
    super(color, intensity);

    /** @type {boolean} */
    this.dsrtIsAmbientLight = true;
  }
}

export { AmbientLight };
