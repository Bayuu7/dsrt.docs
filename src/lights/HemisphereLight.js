import { Light } from './Light.js';

/**
 * @module DSRTHemisphereLight
 * @class HemisphereLight
 * @classdesc
 * Light that simulates ambient sky and ground lighting.
 *
 * @property {boolean} dsrtIsHemisphereLight - Type guard flag for DSRT.HemisphereLight.
 * @see DSRTHemisphereLight.test.js
 */
class HemisphereLight extends Light {

  constructor(skyColor = 0x00aaff, groundColor = 0x444444, intensity = 1) {
    super(skyColor, intensity);

    /** @type {boolean} */
    this.dsrtIsHemisphereLight = true;

    /** @type {number} */
    this.groundColor = groundColor;
  }
}

export { HemisphereLight };
