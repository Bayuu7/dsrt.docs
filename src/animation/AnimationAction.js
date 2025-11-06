import { AnimationClip } from './AnimationClip.js';
import { AnimationMixer } from './AnimationMixer.js';

/**
 * @module DSRTAnimationAction
 * @class AnimationAction
 * @classdesc
 * Represents the playback state of a single AnimationClip within an AnimationMixer.
 * Controls weight, time scale, looping, and blending.
 *
 * @property {boolean} dsrtIsAnimationAction - Type guard flag for DSRT.AnimationAction.
 * @see DSRTAnimationAction.test.js
 */
class AnimationAction {

  /**
   * Constructs a new AnimationAction.
   *
   * @param {AnimationClip} clip - The animation clip.
   * @param {AnimationMixer} mixer - The mixer controlling this action.
   * @param {Object3D} root - The root object affected by this action.
   */
  constructor(clip, mixer, root) {
    /** @type {boolean} */
    this.dsrtIsAnimationAction = true;

    /** @type {AnimationClip} */
    this.clip = clip;

    /** @type {AnimationMixer} */
    this.mixer = mixer;

    /** @type {Object3D} */
    this.root = root;

    /** @type {number} */
    this.time = 0;

    /** @type {number} */
    this.weight = 1.0;

    /** @type {number} */
    this.timeScale = 1.0;

    /** @type {boolean} */
    this.paused = false;

    /** @type {boolean} */
    this.enabled = true;

    /** @type {number} */
    this.loop = AnimationAction.LoopRepeat;

    /** @type {number} */
    this.repetitions = Infinity;
  }

  // --- Playback Control ---
  play() {
    this.paused = false;
    this.enabled = true;
    this.mixer._activateAction(this);
    return this;
  }

  stop() {
    this.enabled = false;
    this.mixer._deactivateAction(this);
    return this;
  }

  reset() {
    this.time = 0;
    this.paused = false;
    return this;
  }

  // --- Fading ---
  fadeIn(duration) {
    this.weight = 0;
    this._fadeTarget = 1.0;
    this._fadeDuration = duration;
    this._fadeTime = 0;
    return this;
  }

  fadeOut(duration) {
    this._fadeTarget = 0.0;
    this._fadeDuration = duration;
    this._fadeTime = 0;
    return this;
  }

  crossFadeTo(action, duration, warp = false) {
    this.fadeOut(duration);
    action.fadeIn(duration);
    if (warp) {
      action.timeScale = this.timeScale;
    }
    return this;
  }

  // --- Looping ---
  setLoop(mode, repetitions) {
    this.loop = mode;
    this.repetitions = repetitions;
    return this;
  }

  // --- Weight & Time Scale ---
  setEffectiveWeight(weight) {
    this.weight = weight;
    return this;
  }

  setEffectiveTimeScale(scale) {
    this.timeScale = scale;
    return this;
  }

  // --- Update ---
  update(deltaTime) {
    if (!this.enabled || this.paused) return;

    this.time += deltaTime * this.timeScale;

    // handle fading
    if (this._fadeDuration !== undefined) {
      this._fadeTime += deltaTime;
      const alpha = Math.min(this._fadeTime / this._fadeDuration, 1.0);
      this.weight += (this._fadeTarget - this.weight) * alpha;
      if (alpha >= 1.0) {
        this._fadeDuration = undefined;
      }
    }

    // looping
    if (this.loop === AnimationAction.LoopRepeat && this.time > this.clip.duration) {
      if (this.repetitions === Infinity) {
        this.time %= this.clip.duration;
      } else if (this.repetitions > 1) {
        this.repetitions--;
        this.time %= this.clip.duration;
      } else {
        this.stop();
      }
    }
  }

  // --- Static Loop Modes ---
  static get LoopOnce() { return 2200; }
  static get LoopRepeat() { return 2201; }
  static get LoopPingPong() { return 2202; }
}

export { AnimationAction };
