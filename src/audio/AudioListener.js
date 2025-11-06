/**
 * @module DSRTAudioListener
 * @class AudioListener
 * @classdesc
 * Represents the position and orientation of the audio listener in 3D space.
 * Typically attached to a camera.
 *
 * @property {boolean} dsrtIsAudioListener - Type guard flag for DSRT.AudioListener.
 * @see DSRTAudioListener.test.js
 */
class AudioListener {

  constructor() {
    /** @type {boolean} */
    this.dsrtIsAudioListener = true;

    /** @type {AudioContext} */
    this.context = new (window.AudioContext || window.webkitAudioContext)();

    /** @type {GainNode} */
    this.gain = this.context.createGain();

    this.gain.connect(this.context.destination);
  }

  getInput() {
    return this.gain;
  }

  setMasterVolume(value) {
    this.gain.gain.value = value;
  }

  getMasterVolume() {
    return this.gain.gain.value;
  }
}

export { AudioListener };
