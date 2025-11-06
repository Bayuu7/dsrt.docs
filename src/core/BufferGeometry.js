import { BufferAttribute } from './BufferAttribute.js';

/**
 * @module DSRTBufferGeometry
 * @class BufferGeometry
 * @classdesc
 * Represents a geometry defined by buffer attributes.
 *
 * @property {boolean} dsrtIsBufferGeometry - Type guard flag for DSRT.BufferGeometry.
 * @see DSRTBufferGeometry.test.js
 */
class BufferGeometry {

  constructor() {
    /** @type {boolean} */
    this.dsrtIsBufferGeometry = true;

    /** @type {Object<string, BufferAttribute>} */
    this.attributes = {};

    /** @type {BufferAttribute|null} */
    this.index = null;
  }

  setAttribute(name, attribute) {
    this.attributes[name] = attribute;
    return this;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  setIndex(attribute) {
    this.index = attribute;
    return this;
  }

  toJSON() {
    return {
      attributes: Object.keys(this.attributes),
      index: this.index ? true : false
    };
  }
}

export { BufferGeometry };
