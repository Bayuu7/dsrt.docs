import { BufferAttribute } from './BufferAttribute.js';

/**
 * @module DSRTInstancedBufferAttribute
 * @class InstancedBufferAttribute
 * @classdesc
 * Buffer attribute that supports instancing.
 *
 * @property {boolean} dsrtIsInstancedBufferAttribute - Type guard flag for DSRT.InstancedBufferAttribute.
 * @see DSRTInstancedBufferAttribute.test.js
 */
class InstancedBufferAttribute extends BufferAttribute {

  constructor(array, itemSize, normalized = false, meshPerAttribute = 1) {
    super(array, itemSize, normalized);

    /** @type {boolean} */
    this.dsrtIsInstancedBufferAttribute = true;

    /** @type {number} */
    this.meshPerAttribute = meshPerAttribute;
  }
}

export { InstancedBufferAttribute };
