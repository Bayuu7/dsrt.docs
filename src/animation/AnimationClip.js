/**
 * @module DSRTAnimationClip
 * @class AnimationClip
 * @classdesc
 * Represents a reusable set of keyframe tracks grouped under a name and duration.
 *
 * @property {boolean} dsrtIsAnimationClip - Type guard flag for DSRT.AnimationClip.
 * @see DSRTAnimationClip.test.js
 */
class AnimationClip {
  constructor(name = '', duration = -1, tracks = []) {
    /** @type {boolean} */
    this.dsrtIsAnimationClip = true;

    /** @type {string} */
    this.name = name;

    /** @type {number} */
    this.duration = duration;

    /** @type {Array<KeyframeTrack>} */
    this.tracks = tracks;

    /** @type {string} */
    this.uuid = crypto.randomUUID();
  }

  resetDuration() {
    let max = 0;
    for (const track of this.tracks) {
      if (track.times.length > 0) {
        max = Math.max(max, track.times[track.times.length - 1]);
      }
    }
    this.duration = max;
    return this;
  }

  trim() {
    for (const track of this.tracks) track.trim(0, this.duration);
    return this;
  }

  validate() {
    for (const track of this.tracks) track.validate();
    return true;
  }

  toJSON() {
    return {
      name: this.name,
      duration: this.duration,
      uuid: this.uuid,
      tracks: this.tracks.map(t => t.toJSON())
    };
  }

  static fromJSON(json) {
    const clip = new AnimationClip(json.name, json.duration, []);
    clip.uuid = json.uuid;
    // tracks reconstruction handled externally
    return clip;
  }

  clone() {
    return new AnimationClip(this.name, this.duration, this.tracks.map(t => t.clone()));
  }
}

export { AnimationClip };
