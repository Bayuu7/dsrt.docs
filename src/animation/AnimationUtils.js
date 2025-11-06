/**
 * @module DSRTAnimationUtils
 * @classdesc
 * Utility functions for DSRT animation system.
 *
 * @property {boolean} dsrtIsAnimationUtils - Type guard flag for DSRT.AnimationUtils.
 * @see DSRTAnimationUtils.test.js
 */
const AnimationUtils = {

  /** @type {boolean} */
  dsrtIsAnimationUtils: true,

  /**
   * Returns a slice of an array.
   * @param {Array|TypedArray} array - The source array.
   * @param {number} from - Start index.
   * @param {number} to - End index.
   * @return {Array|TypedArray} The sliced array.
   */
  arraySlice(array, from, to) {
    return array.slice(from, to);
  },

  /**
   * Converts an array to a given typed array type.
   * @param {Array|TypedArray} array - The source array.
   * @param {Function} type - The constructor of the typed array.
   * @return {TypedArray} The converted array.
   */
  convertArray(array, type) {
    return new type(array);
  },

  /**
   * Checks if the given array is a typed array.
   * @param {any} array - The array to check.
   * @return {boolean} True if typed array.
   */
  isTypedArray(array) {
    return ArrayBuffer.isView(array) && !(array instanceof DataView);
  },

  /**
   * Linear interpolation between two values.
   * @param {Array<number>} values - Array of values.
   * @param {number} alpha - Interpolation factor [0,1].
   * @return {number} Interpolated value.
   */
  interpolateLinear(values, alpha) {
    const v0 = values[0];
    const v1 = values[1];
    return v0 * (1 - alpha) + v1 * alpha;
  },

  /**
   * Discrete interpolation (step function).
   * @param {Array<number>} values - Array of values.
   * @param {number} alpha - Interpolation factor.
   * @return {number} Interpolated value.
   */
  interpolateDiscrete(values, alpha) {
    return alpha < 1.0 ? values[0] : values[1];
  },

  /**
   * Cubic interpolation.
   * @param {Array<number>} values - Array of values [p0, p1, p2, p3].
   * @param {number} alpha - Interpolation factor [0,1].
   * @return {number} Interpolated value.
   */
  interpolateCubic(values, alpha) {
    const p0 = values[0], p1 = values[1], p2 = values[2], p3 = values[3];
    const a = -0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3;
    const b = p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3;
    const c = -0.5 * p0 + 0.5 * p2;
    const d = p1;
    return ((a * alpha + b) * alpha + c) * alpha + d;
  },

  /**
   * Quaternion interpolation (spherical linear interpolation).
   * @param {Array<number>} values - Array of quaternion components [x,y,z,w].
   * @param {number} alpha - Interpolation factor [0,1].
   * @return {Array<number>} Interpolated quaternion.
   */
  interpolateQuaternion(values, alpha) {
    const [x0, y0, z0, w0] = values[0];
    const [x1, y1, z1, w1] = values[1];

    let cosHalfTheta = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1;

    if (cosHalfTheta < 0) {
      x1 = -x1; y1 = -y1; z1 = -z1; w1 = -w1;
      cosHalfTheta = -cosHalfTheta;
    }

    if (cosHalfTheta >= 1.0) {
      return [x0, y0, z0, w0];
    }

    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
    if (Math.abs(sinHalfTheta) < 0.001) {
      return [
        (x0 * 0.5 + x1 * 0.5),
        (y0 * 0.5 + y1 * 0.5),
        (z0 * 0.5 + z1 * 0.5),
        (w0 * 0.5 + w1 * 0.5)
      ];
    }

    const halfTheta = Math.acos(cosHalfTheta);
    const ratioA = Math.sin((1 - alpha) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(alpha * halfTheta) / sinHalfTheta;

    return [
      x0 * ratioA + x1 * ratioB,
      y0 * ratioA + y1 * ratioB,
      z0 * ratioA + z1 * ratioB,
      w0 * ratioA + w1 * ratioB
    ];
  }
};

export { AnimationUtils };
