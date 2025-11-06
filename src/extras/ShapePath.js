import { Path } from './Path.js';

/**
 * @module DSRTShapePath
 * @class ShapePath
 * @classdesc
 * Represents a path that defines a shape outline.
 *
 * @property {boolean} dsrtIsShapePath - Type guard flag for DSRT.ShapePath.
 * @see DSRTShapePath.test.js
 */
class ShapePath extends Path {

  constructor() {
    super();

    /** @type {boolean} */
    this.dsrtIsShapePath = true;

    /** @type {Array<Path>} */
    this.subPaths = [];
  }

  /**
   * Adds a sub-path to the shape path.
   * @param {Path} path - The sub-path to add.
   */
  addSubPath(path) {
    this.subPaths.push(path);
    return this;
  }
}

export { ShapePath };
