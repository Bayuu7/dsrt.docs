import { BufferGeometry } from '../core/BufferGeometry.js';
import { BufferAttribute } from '../core/BufferAttribute.js';

/**
 * @module DSRTCylinderGeometry
 * @class CylinderGeometry
 * @classdesc
 * Represents a cylinder geometry with radius and height.
 *
 * @property {boolean} dsrtIsCylinderGeometry - Type guard flag for DSRT.CylinderGeometry.
 * @see DSRTCylinderGeometry.test.js
 */
class CylinderGeometry extends BufferGeometry {

  constructor(radiusTop = 1, radiusBottom = 1, height = 1, radialSegments = 8, heightSegments = 1) {
    super();

    /** @type {boolean} */
    this.dsrtIsCylinderGeometry = true;

    this.parameters = { radiusTop, radiusBottom, height, radialSegments, heightSegments };

    const vertices = [];
    for (let y = 0; y <= heightSegments; y++) {
      const v = y / heightSegments;
      const radius = v * (radiusBottom - radiusTop) + radiusTop;
      const py = -height/2 + v * height;
      for (let x = 0; x <= radialSegments; x++) {
        const u = x / radialSegments;
        const theta = u * Math.PI * 2;
        const px = radius * Math.cos(theta);
        const pz = radius * Math.sin(theta);
        vertices.push(px, py, pz);
      }
    }

    this.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3));
  }
}

export { CylinderGeometry };
