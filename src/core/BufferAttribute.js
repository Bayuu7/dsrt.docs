/**
 * @module DSRTBufferAttribute
 * @class BufferAttribute
 * @classdesc
 * Represents a generic buffer attribute for geometry.
 *
 * @property {boolean} dsrtIsBufferAttribute - Type guard flag for DSRT.BufferAttribute.
 * @see DSRTBufferAttribute.test.js
 */
class BufferAttribute {

  constructor(array, itemSize, normalized = false) {
    /** @type {boolean} */
    this.dsrtIsBufferAttribute = true;

    /** @type {TypedArray} */
    this.array = array;

    /** @type {number} */
    this.itemSize = itemSize;

    /** @type {boolean} */
    this.normalized = normalized;

    /** @type {number} */
    this.count = array.length / itemSize;
  }

  setXYZ(index, x, y, z) {
    const i = index * this.itemSize;
    this.array[i] = x;
    this.array[i + 1] = y;
    this.array[i + 2] = z;
    return this;
  }

  getX(index) {
    return this.array[index * this.itemSize];
  }

  getY(index) {
    return this.array[index * this.itemSize + 1];
  }

  getZ(index) {
    return this.array[index * this.itemSize + 2];
  }
}

export { BufferAttribute };
