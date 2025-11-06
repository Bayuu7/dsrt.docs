import { NodeBuilder } from './core/NodeBuilder.js';
import { NodeFunction } from './functions/NodeFunction.js';
import { NodeUniform } from './core/NodeUniform.js';

/**
 * DSRT TSL (Three Shading Language)
 * Entry point for DSRT-native shading helpers
 *
 * Provides syntax sugar for building node-based materials.
 * All exported helpers carry dsrtIsTSL flag for DSRT identity.
 *
 * @example
 * import { TSL } from './nodes/TSL.js';
 *
 * const colorNode = TSL.vec3(1.0, 0.0, 0.0); // red
 * const material = new NodeMaterial();
 * material.colorNode = colorNode;
 */
export class TSL {

  constructor() {
    this.dsrtIsTSL = true;
  }

  /**
   * Create a float node
   * @param {number} value - numeric value
   * @returns {NodeUniform}
   */
  static float(value) {
    return new NodeUniform('float', value);
  }

  /**
   * Create a vec2 node
   * @param {number} x
   * @param {number} y
   * @returns {NodeUniform}
   */
  static vec2(x, y) {
    return new NodeUniform('vec2', [x, y]);
  }

  /**
   * Create a vec3 node
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {NodeUniform}
   */
  static vec3(x, y, z) {
    return new NodeUniform('vec3', [x, y, z]);
  }

  /**
   * Create a vec4 node
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {NodeUniform}
   */
  static vec4(x, y, z, w) {
    return new NodeUniform('vec4', [x, y, z, w]);
  }

  /**
   * Define a custom node function
   * @param {string} type - return type (e.g. 'float', 'vec3')
   * @param {string} name - function name
   * @param {Array} params - parameter list
   * @param {string} body - GLSL body
   * @returns {NodeFunction}
   */
  static func(type, name, params, body) {
    return new NodeFunction(type, name, params, body);
  }

  /**
   * Build a node material
   * @param {Node} rootNode - root node graph
   * @returns {NodeBuilder}
   */
  static build(rootNode) {
    const builder = new NodeBuilder();
    builder.build(rootNode);
    return builder;
  }
}
