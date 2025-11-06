import { Light } from './Light.js';

/**
 * @module DSRTSpotLight
 * @class SpotLight
 * @classdesc
 * Light that emits a cone-shaped beam.
 *
 * @property {boolean} dsrtIsSpotLight - Type guard flag for DSRT.SpotLight.
 * @see DSRTSpotLight.test.js
 */
class SpotLight extends Light {

  constructor(color = 0xffffff, intensity = 1, distance = 0, angle = Math.PI/3, penumbra = 0, decay = 1) {
    super(color, intensity);

    /** @type {boolean} */
    this.dsrtIsSpotLight = true;

    this.distance = distance;
    this.angle = angle;
    this.penumbra = penumbra;
    this.decay = decay;

    /** @type {Array<number>} */
    this.position = [0, 0, 0];

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

export { SpotLight };
