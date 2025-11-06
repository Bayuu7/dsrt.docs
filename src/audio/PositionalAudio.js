import { Audio } from './Audio.js';

/**
 * @module DSRTPositionalAudio
 * @class PositionalAudio
 * @classdesc
 * Represents an audio source with spatial positioning in 3D space.
 *
 * @property {boolean} dsrtIsPositionalAudio - Type guard flag for DSRT.PositionalAudio.
 * @see DSRTPositionalAudio.test.js
 */
class PositionalAudio extends Audio {

  constructor(listener) {
    super(listener);

    /** @type {boolean} */
    this.dsrtIsPositionalAudio = true;

    /** @type {PannerNode} */
    this.panner = listener.context.createPanner();

    this.panner.panningModel = 'HRTF';
    this.panner.distanceModel = 'inverse';
    this.panner.connect(this.gain);
  }

  setRefDistance(value) {
    this.panner.refDistance = value;
  }

  setMaxDistance(value) {
    this.panner.maxDistance = value;
  }

  setRolloffFactor(value) {
    this.panner.rolloffFactor = value;
  }

  setPosition(x, y, z) {
    this.panner.positionX.value = x;
    this.panner.positionY.value = y;
    this.panner.positionZ.value = z;
  }

  setOrientation(x, y, z) {
    this.panner.orientationX.value = x;
    this.panner.orientationY.value = y;
    this.panner.orientationZ.value = z;
  }
}

export { PositionalAudio };
