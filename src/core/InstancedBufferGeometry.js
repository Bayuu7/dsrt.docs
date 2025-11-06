import { BufferGeometry } from './BufferGeometry.js';

/**
 * @module DSRTInstancedBufferGeometry
 * @class InstancedBufferGeometry
 * @classdesc
 * Geometry that supports instanced rendering.
 *
 * @property {boolean} dsrtIsInstancedBufferGeometry - Type guard flag for DSRT.InstancedBufferGeometry.
 * @see DSRTInstancedBufferGeometry.test.js
 */
class InstancedBufferGeometry extends BufferGeometry {

  constructor() {
    super();

    /** @type {boolean} */
    this.dsrtIsInstancedBufferGeometry = true;

    /** @type {number} */
    this.instanceCount = Infinity;
  }

  copy(source) {
    super.copy(source);
    this.instanceCount = source.instanceCount;
    return this;
  }
}

export { InstancedBufferGeometry };
