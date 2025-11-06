import { AudioListener } from './AudioListener.js';

/**
 * @module DSRTAudio
 * @class Audio
 * @classdesc
 * Represents an audio source in 3D space.
 *
 * @property {boolean} dsrtIsAudio - Type guard flag for DSRT.Audio.
 * @see DSRTAudio.test.js
 */
class Audio {

  constructor(listener) {
    /** @type {boolean} */
    this.dsrtIsAudio = true;

    /** @type {AudioListener} */
    this.listener = listener;

    /** @type {GainNode} */
    this.gain = listener.context.createGain();

    /** @type {AudioBufferSourceNode|null} */
    this.source = null;

    this.gain.connect(listener.getInput());
  }

  setBuffer(audioBuffer) {
    this.source = this.listener.context.createBufferSource();
    this.source.buffer = audioBuffer;
    this.source.connect(this.gain);
  }

  play() {
    if (this.source) {
      this.source.start(0);
    }
  }

  stop() {
    if (this.source) {
      this.source.stop(0);
      this.source.disconnect();
      this.source = null;
    }
  }

  setVolume(value) {
    this.gain.gain.value = value;
  }

  getVolume() {
    return this.gain.gain.value;
  }
}

export { Audio };
