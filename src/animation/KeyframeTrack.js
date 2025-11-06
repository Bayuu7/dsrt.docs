/**
 * @module DSRTKeyframeTrack
 * @class KeyframeTrack
 * @classdesc
 * Represents a sequence of keyframes for a single property.
 * Stores time-value pairs and provides interpolation and validation.
 *
 * @property {boolean} dsrtIsKeyframeTrack - Type guard flag for DSRT.KeyframeTrack.
 * @see DSRTKeyframeTrack.test.js
 */
class KeyframeTrack {

  /**
   * Constructs a new KeyframeTrack.
   *
   * @param {string} name - The property path (e.g. 'position[x]').
   * @param {Array<number>} times - Array of keyframe times.
   * @param {Array<number>} values - Array of keyframe values.
   * @param {string} [ValueTypeName='number'] - Type of values.
   */
  constructor(name, times, values, ValueTypeName = 'number') {
    /** @type {boolean} */
    this.dsrtIsKeyframeTrack = true;

    /** @type {string} */
    this.name = name;

    /** @type {Float32Array} */
    this.times = new Float32Array(times);

    /** @type {Float32Array} */
    this.values = new Float32Array(values);

    /** @type {string} */
    this.ValueTypeName = ValueTypeName;

    /** @type {string} */
    this.TimeBufferType = 'Float32Array';

    /** @type {string} */
    this.ValueBufferType = 'Float32Array';
  }

  /**
   * Sets interpolation mode.
   * @param {string} interpolation - Interpolation type.
   */
  setInterpolation(interpolation) {
    this.interpolation = interpolation;
    return this;
  }

  /**
   * Returns interpolation mode.
   * @return {string} Interpolation type.
   */
  getInterpolation() {
    return this.interpolation;
  }

  /**
   * Shifts all times by a given offset.
   * @param {number} timeOffset - Offset in seconds.
   */
  shift(timeOffset) {
    for (let i = 0; i < this.times.length; i++) {
      this.times[i] += timeOffset;
    }
    return this;
  }

  /**
   * Scales all times by a factor.
   * @param {number} timeScale - Scale factor.
   */
  scale(timeScale) {
    for (let i = 0; i < this.times.length; i++) {
      this.times[i] *= timeScale;
    }
    return this;
  }

  /**
   * Trims keyframes to a given time range.
   * @param {number} start - Start time.
   * @param {number} end - End time.
   */
  trim(start, end) {
    const newTimes = [];
    const newValues = [];
    const stride = this.values.length / this.times.length;

    for (let i = 0; i < this.times.length; i++) {
      const t = this.times[i];
      if (t >= start && t <= end) {
        newTimes.push(t);
        for (let j = 0; j < stride; j++) {
          newValues.push(this.values[i * stride + j]);
        }
      }
    }

    this.times = new Float32Array(newTimes);
    this.values = new Float32Array(newValues);
    return this;
  }

  /**
   * Validates track data.
   */
  validate() {
    if (this.times.length === 0) throw new Error('KeyframeTrack has no times.');
    if (this.values.length === 0) throw new Error('KeyframeTrack has no values.');
    if (this.values.length % this.times.length !== 0) {
      throw new Error('KeyframeTrack values length mismatch.');
    }
    return true;
  }

  /**
   * Clones this track.
   * @return {KeyframeTrack} A clone of this track.
   */
  clone() {
    return new KeyframeTrack(this.name, Array.from(this.times), Array.from(this.values), this.ValueTypeName);
  }

  /**
   * Serializes to JSON.
   */
  toJSON() {
    return {
      name: this.name,
      times: Array.from(this.times),
      values: Array.from(this.values),
      ValueTypeName: this.ValueTypeName,
      interpolation: this.interpolation
    };
  }

  /**
   * Deserializes from JSON.
   * @param {object} json - JSON data.
   */
  static fromJSON(json) {
    const track = new KeyframeTrack(json.name, json.times, json.values, json.ValueTypeName);
    track.interpolation = json.interpolation;
    return track;
  }
}

export { KeyframeTrack };
