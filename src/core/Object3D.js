/**
 * @module DSRTObject3D
 * @class Object3D
 * @classdesc
 * Base class for all scene graph objects in DSRT.
 * Provides transformation, hierarchy, and update lifecycle.
 *
 * @property {boolean} dsrtIsObject3D - Type guard flag for DSRT.Object3D.
 * @see DSRTObject3D.test.js
 */
class Object3D {

  constructor() {
    /** @type {boolean} */
    this.dsrtIsObject3D = true;

    /** @type {string} */
    this.uuid = crypto.randomUUID();

    /** @type {string} */
    this.name = '';

    /** @type {Object3D|null} */
    this.parent = null;

    /** @type {Array<Object3D>} */
    this.children = [];

    /** @type {Float32Array} */
    this.position = new Float32Array([0, 0, 0]);

    /** @type {Float32Array} */
    this.rotation = new Float32Array([0, 0, 0]);

    /** @type {Float32Array} */
    this.scale = new Float32Array([1, 1, 1]);

    /** @type {Float32Array} */
    this.matrix = new Float32Array(16);

    /** @type {Float32Array} */
    this.matrixWorld = new Float32Array(16);
  }

  add(child) {
    if (child.parent) child.parent.remove(child);
    child.parent = this;
    this.children.push(child);
    return this;
  }

  remove(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }
    return this;
  }

  traverse(callback) {
    callback(this);
    for (const child of this.children) {
      child.traverse(callback);
    }
  }

  updateMatrix() {
    // simplified: identity matrix
    this.matrix.set([
      1, 0, 0, this.position[0],
      0, 1, 0, this.position[1],
      0, 0, 1, this.position[2],
      0, 0, 0, 1
    ]);
  }

  updateMatrixWorld(force = false) {
    this.updateMatrix();
    if (this.parent) {
      // simplified multiply
      this.matrixWorld.set(this.matrix);
    } else {
      this.matrixWorld.set(this.matrix);
    }
    for (const child of this.children) {
      child.updateMatrixWorld(force);
    }
  }
}

export { Object3D };
