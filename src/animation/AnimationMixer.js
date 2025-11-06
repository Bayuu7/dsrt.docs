import { AnimationAction } from './AnimationAction.js';
import { AnimationClip } from './AnimationClip.js';

/**
 * @module DSRTAnimationMixer
 * @class AnimationMixer
 * @classdesc
 * The AnimationMixer is the central controller of the DSRT animation system.
 * It manages playback of multiple AnimationActions, updates them with time,
 * and applies results to bound objects.
 *
 * @property {boolean} dsrtIsAnimationMixer - Type guard flag for DSRT.AnimationMixer.
 * @see DSRTAnimationMixer.test.js
 */
class AnimationMixer {

  /**
   * Constructs a new AnimationMixer.
   *
   * @param {Object3D} root - The root object whose animations will be controlled.
   */
  constructor(root) {
    /** @type {boolean} */
    this.dsrtIsAnimationMixer = true;

    /** @type {Object3D} */
    this.root = root;

    /** @type {number} */
    this.time = 0;

    /** @type {Map<string, AnimationAction>} */
    this.actions = new Map();

    /** @type {Set<AnimationAction>} */
    this._activeActions = new Set();
  }

  /**
   * Creates or retrieves an AnimationAction for the given clip.
   *
   * @param {AnimationClip} clip - The animation clip.
   * @param {Object3D} [optionalRoot] - Optional root object.
   * @return {AnimationAction} The created or existing action.
   */
  clipAction(clip, optionalRoot = this.root) {
    const key = clip.uuid + ':' + optionalRoot.uuid;
    if (this.actions.has(key)) {
      return this.actions.get(key);
    }
    const action = new AnimationAction(clip, this, optionalRoot);
    this.actions.set(key, action);
    return action;
  }

  /**
   * Returns an existing action if available.
   *
   * @param {AnimationClip} clip - The animation clip.
   * @param {Object3D} [optionalRoot] - Optional root object.
   * @return {AnimationAction|undefined} The existing action.
   */
  existingAction(clip, optionalRoot = this.root) {
    const key = clip.uuid + ':' + optionalRoot.uuid;
    return this.actions.get(key);
  }

  /**
   * Stops all actions managed by this mixer.
   */
  stopAllAction() {
    for (const action of this.actions.values()) {
      action.stop();
    }
    this._activeActions.clear();
  }

  /**
   * Updates the mixer and all active actions.
   *
   * @param {number} deltaTime - The time increment in seconds.
   */
  update(deltaTime) {
    this.time += deltaTime;
    for (const action of this._activeActions) {
      action.update(deltaTime);
    }
  }

  /**
   * Marks an action as active.
   *
   * @param {AnimationAction} action - The action to activate.
   */
  _activateAction(action) {
    this._activeActions.add(action);
  }

  /**
   * Marks an action as inactive.
   *
   * @param {AnimationAction} action - The action to deactivate.
   */
  _deactivateAction(action) {
    this._activeActions.delete(action);
  }

  /**
   * Removes a clip from the mixer.
   *
   * @param {AnimationClip} clip - The clip to uncache.
   */
  uncacheClip(clip) {
    for (const [key, action] of this.actions.entries()) {
      if (action.clip === clip) {
        this.actions.delete(key);
        this._activeActions.delete(action);
      }
    }
  }

  /**
   * Removes all actions bound to a root object.
   *
   * @param {Object3D} root - The root object to uncache.
   */
  uncacheRoot(root) {
    for (const [key, action] of this.actions.entries()) {
      if (action.root === root) {
        this.actions.delete(key);
        this._activeActions.delete(action);
      }
    }
  }
}

export { AnimationMixer };
