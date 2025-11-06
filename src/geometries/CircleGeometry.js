import { BufferGeometry } from '../core/BufferGeometry.js';
import { BufferAttribute } from '../core/BufferAttribute.js';

/**
 * @module DSRTCircleGeometry
 * @class CircleGeometry
 * @classdesc
 * Represents a circle geometry with radius and segments.
 *
 * @property {boolean} dsrtIsCircleGeometry - Type guard flag for DSRT.CircleGeometry.
 * @see DSRTCircleGeometry.test.js
 */
class CircleGeometry extends BufferGeometry {

  constructor(radius = 1, segments = 8) {
    super();

    /** @type {boolean} */
    this.dsrtIsCircleGeometry = true;

    this.parameters = { radius, segments };

    const vertices = [0, 0, 0];
    for (let s = 0; s <= segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      vertices.push(radius * Math.cos(theta), radius * Math.sin(theta), 0);
    }

    this.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
  }
}

export { CircleGeometry };
