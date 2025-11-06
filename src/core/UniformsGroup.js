import { Uniform } from './Uniform.js';

/**
 * @module DSRTUniformsGroup
 * @class UniformsGroup
 * @classdesc
 * Represents a group of uniforms for efficient binding.
 *
 * @property {boolean} dsrtIsUniformsGroup - Type guard flag for DSRT.UniformsGroup.
 * @see DSRTUniformsGroup.test.js
 */
class UniformsGroup {

  constructor() {
    /** @type {boolean} */
    this.dsrtIsUniformsGroup = true;

    /** @type {Array<Uniform>} */
    this.uniforms = [];
  }

  add(uniform) {
    this.uniforms.push(uniform);
    return this;
  }

  remove(uniform) {
    const index = this.uniforms.indexOf(uniform);
    if (index !== -1) {
      this.uniforms.splice(index, 1);
    }
    return this;
  }

  clone() {
    const group = new UniformsGroup();
    for (const u of this.uniforms) {
      group.add(u.clone());
    }
    return group;
  }
}

export { UniformsGroup };
