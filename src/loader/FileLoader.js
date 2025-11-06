import { Loader } from './Loader.js';

/**
 * @module DSRTFileLoader
 * @class FileLoader
 * @classdesc
 * Loader for generic files using Fetch API.
 *
 * @property {boolean} dsrtIsFileLoader - Type guard flag for DSRT.FileLoader.
 * @see DSRTFileLoader.test.js
 */
class FileLoader extends Loader {

  constructor(manager = null) {
    super(manager);

    /** @type {boolean} */
    this.dsrtIsFileLoader = true;

    /** @type {string} */
    this.responseType = 'text';
  }

  async load(url, onLoad, onProgress, onError) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`FileLoader: Failed to load ${url}`);
      let data;
      if (this.responseType === 'arraybuffer') {
        data = await response.arrayBuffer();
      } else if (this.responseType === 'json') {
        data = await response.json();
      } else {
        data = await response.text();
      }
      if (onLoad) onLoad(data);
    } catch (err) {
      if (onError) onError(err);
    }
  }
}

export { FileLoader };
