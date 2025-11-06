import { Audio } from './Audio.js';

/**
 * @module DSRTAudioAnalyser
 * @class AudioAnalyser
 * @classdesc
 * Provides real-time frequency and waveform analysis of an audio source.
 *
 * @property {boolean} dsrtIsAudioAnalyser - Type guard flag for DSRT.AudioAnalyser.
 * @see DSRTAudioAnalyser.test.js
 */
class AudioAnalyser {

  constructor(audio, fftSize = 2048) {
    /** @type {boolean} */
    this.dsrtIsAudioAnalyser = true;

    /** @type {AnalyserNode} */
    this.analyser = audio.listener.context.createAnalyser();
    this.analyser.fftSize = fftSize;

    audio.gain.connect(this.analyser);

    /** @type {Uint8Array} */
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.data);
    return this.data;
  }

  getWaveformData() {
    this.analyser.getByteTimeDomainData(this.data);
    return this.data;
  }
}

export { AudioAnalyser };
