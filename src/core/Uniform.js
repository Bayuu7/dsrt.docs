/**
 * @module DSRTUniform
 * @class Uniform
 * @classdesc
 * Represents a shader uniform.
 *
 * @property {boolean} dsrtIsUniform - Type guard flag for DSRT.Uniform.
 * @see DSRTUniform.test.js
 */
class Uniform {

  constructor(value) {
    /** @type {boolean} */
    this.dsrtIsUniform = true;

    /** @type {any} */
    this.value = value;
  }

  clone() {
    return new Uniform(this.value);
  }
}

export { Uniform };
