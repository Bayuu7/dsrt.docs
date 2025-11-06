/**
 * @module DSRTLoader
 * @class Loader
 * @classdesc
 * Base class for all loaders in DSRT.
 *
 * @property {boolean} dsrtIsLoader - Type guard flag for DSRT.Loader.
 * @see DSRTLoader.test.js
 */
class Loader {

  constructor(manager = null) {
    /** @type {boolean} */
    this.dsrtIsLoader = true;

    /** @type {any} */
    this.manager = manager;
  }

  load(url, onLoad, onProgress, onError) {
    throw new Error('Loader.load() must be implemented in subclass.');
  }
}

export { Loader };
