import { BufferGeometry } from '../core/BufferGeometry.js';
import { BufferAttribute } from '../core/BufferAttribute.js';

/**
 * @module DSRTBoxGeometry
 * @class BoxGeometry
 * @classdesc
 * Represents a box geometry with width, height, depth segments.
 *
 * @property {boolean} dsrtIsBoxGeometry - Type guard flag for DSRT.BoxGeometry.
 * @see DSRTBoxGeometry.test.js
 */
class BoxGeometry extends BufferGeometry {

  constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
    super();

    /** @type {boolean} */
    this.dsrtIsBoxGeometry = true;

    this.parameters = { width, height, depth, widthSegments, heightSegments, depthSegments };

    // simplified: just 8 vertices
    const vertices = new Float32Array([
      -width/2, -height/2, -depth/2,
       width/2, -height/2, -depth/2,
       width/2,  height/2, -depth/2,
      -width/2,  height/2, -depth/2,
      -width/2, -height/2,  depth/2,
       width/2, -height/2,  depth/2,
       width/2,  height/2,  depth/2,
      -width/2,  height/2,  depth/2
    ]);

    this.setAttribute('position', new BufferAttribute(vertices, 3));
  }
}

export { BoxGeometry };
