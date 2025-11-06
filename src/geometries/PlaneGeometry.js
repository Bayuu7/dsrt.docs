import { BufferGeometry } from '../core/BufferGeometry.js';
import { BufferAttribute } from '../core/BufferAttribute.js';

/**
 * @module DSRTPlaneGeometry
 * @class PlaneGeometry
 * @classdesc
 * Represents a plane geometry with width and height segments.
 *
 * @property {boolean} dsrtIsPlaneGeometry - Type guard flag for DSRT.PlaneGeometry.
 * @see DSRTPlaneGeometry.test.js
 */
class PlaneGeometry extends BufferGeometry {

  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    super();

    /** @type {boolean} */
    this.dsrtIsPlaneGeometry = true;

    this.parameters = { width, height, widthSegments, heightSegments };

    const vertices = new Float32Array([
      -width/2, -height/2, 0,
       width/2, -height/2, 0,
       width/2,  height/2, 0,
      -width/2,  height/2, 0
    ]);

    this.setAttribute('position', new BufferAttribute(vertices, 3));
  }
}

export { PlaneGeometry };
