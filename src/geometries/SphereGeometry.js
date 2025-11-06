import { BufferGeometry } from '../core/BufferGeometry.js';
import { BufferAttribute } from '../core/BufferAttribute.js';

/**
 * @module DSRTSphereGeometry
 * @class SphereGeometry
 * @classdesc
 * Represents a sphere geometry with radius and segments.
 *
 * @property {boolean} dsrtIsSphereGeometry - Type guard flag for DSRT.SphereGeometry.
 * @see DSRTSphereGeometry.test.js
 */
class SphereGeometry extends BufferGeometry {

  constructor(radius = 1, widthSegments = 8, heightSegments = 6) {
    super();

    /** @type {boolean} */
    this.dsrtIsSphereGeometry = true;

    this.parameters = { radius, widthSegments, heightSegments };

    const vertices = [];
    for (let y = 0; y <= heightSegments; y++) {
      const v = y / heightSegments;
      const phi = v * Math.PI;
      for (let x = 0; x <= widthSegments; x++) {
        const u = x / widthSegments;
        const theta = u * Math.PI * 2;
        const px = -radius * Math.cos(theta) * Math.sin(phi);
        const py = radius * Math.cos(phi);
        const pz = radius * Math.sin(theta) * Math.sin(phi);
        vertices.push(px, py, pz);
      }
    }

    this.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
  }
}

export { SphereGeometry };
