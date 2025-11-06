// ============================================================================
// DSRT Math Engine Core - Vector3 v1.1 (Geometry Extended Build)
// ----------------------------------------------------------------------------
// © DSRT Engine. All rights reserved.
// A high-precision 3D vector class with full geometric utilities, mirroring
// Three.js syntax but enhanced by DSRT runtime systems: Flow tracing,
// Object Pooling, Auto-Sanitization, UUID tracking, and Geometry Extensions.
// ============================================================================

import { dsrtFlow, dsrtObjectPool, dsrtSanitize, dsrtUUID } from '../core/DSRTCore.js';

/**
 * @class Vector3
 * @classdesc
 * Represents a mutable three-component vector for 3D math operations.
 * Designed to emulate Three.js style while fully integrated with DSRT runtime.
 */
class Vector3 {

  /**
   * Create a new Vector3 instance.
   * @param {number} [x=0] - X component.
   * @param {number} [y=0] - Y component.
   * @param {number} [z=0] - Z component.
   */
  constructor(x = 0, y = 0, z = 0) {
    /** @type {number} */ this.x = x;
    /** @type {number} */ this.y = y;
    /** @type {number} */ this.z = z;

    /** @private */
    Object.defineProperties(this, {
      __dsrt_type: { value: 'Vector3' },
      __uuid: { value: dsrtUUID.generate() },
      __poolable: { value: true }
    });

    if (Vector3.runtimeSafe) dsrtSanitize.check(this);
    dsrtFlow.trace('Vector3.constructor', this);
  }

  // ==========================================================================
  // == CONFIGURATION FLAGS ==
  // ==========================================================================
  /**
   * Toggle runtime tracing and sanitization.
   * When false, DSRT tracing and checks are disabled for performance.
   * @type {boolean}
   * @default true
   */
  static runtimeSafe = true;

  // ==========================================================================
  // == BASIC SETTERS / GETTERS ==
  // ==========================================================================

  /** @description Set the vector components. */
  set(x, y, z) { this.x = x; this.y = y; this.z = z; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.set', this); return this; }

  /** @description Assign all components to a single scalar. */
  setScalar(s) { this.x = this.y = this.z = s; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.setScalar', this); return this; }

  /** @description Copy values from another Vector3. */
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.copy', this); return this; }

  /** @description Create a duplicate of this vector. */
  clone() { const v = new Vector3(this.x, this.y, this.z); if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.clone', v); return v; }

  // ==========================================================================
  // == ARITHMETIC OPERATIONS ==
  // ==========================================================================

  /** Add another vector. */
  add(v) { this.x += v.x; this.y += v.y; this.z += v.z; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.add', this); return this; }

  /** Add a scalar to each component. */
  addScalar(s) { this.x += s; this.y += s; this.z += s; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.addScalar', this); return this; }

  /** Add two vectors and store result here. */
  addVectors(a, b) { this.x = a.x + b.x; this.y = a.y + b.y; this.z = a.z + b.z; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.addVectors', this); return this; }

  /** Subtract another vector. */
  sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.sub', this); return this; }

  /** Subtract two vectors and store result here. */
  subVectors(a, b) { this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.subVectors', this); return this; }

  /** Multiply component-wise with another vector. */
  multiply(v) { this.x *= v.x; this.y *= v.y; this.z *= v.z; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.multiply', this); return this; }

  /** Multiply all components by a scalar. */
  multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.multiplyScalar', this); return this; }

  /** Divide component-wise, safe against zero. */
  divide(v) {
    this.x = v.x !== 0 ? this.x / v.x : 0;
    this.y = v.y !== 0 ? this.y / v.y : 0;
    this.z = v.z !== 0 ? this.z / v.z : 0;
    if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.divide', this);
    return this;
  }

  /** Divide all components by a scalar, safe against zero. */
  divideScalar(s) { return (s !== 0) ? this.multiplyScalar(1 / s) : this.set(0, 0, 0); }

  // ==========================================================================
  // == MIN / MAX / CLAMP / ROUNDING ==
  // ==========================================================================

  /** Set each component to the min of itself and the given vector. */
  min(v) { this.x = Math.min(this.x, v.x); this.y = Math.min(this.y, v.y); this.z = Math.min(this.z, v.z); return this; }

  /** Set each component to the max of itself and the given vector. */
  max(v) { this.x = Math.max(this.x, v.x); this.y = Math.max(this.y, v.y); this.z = Math.max(this.z, v.z); return this; }

  /** Clamp each component between the given range. */
  clamp(minV, maxV) {
    this.x = Math.max(minV.x, Math.min(maxV.x, this.x));
    this.y = Math.max(minV.y, Math.min(maxV.y, this.y));
    this.z = Math.max(minV.z, Math.min(maxV.z, this.z));
    return this;
  }

  /** Clamp the vector’s length between min and max. */
  clampLength(min, max) {
    const len = this.length();
    return this.divideScalar(len || 1).multiplyScalar(Math.max(min, Math.min(max, len)));
  }

  /** Floor each component. */
  floor() { this.x = Math.floor(this.x); this.y = Math.floor(this.y); this.z = Math.floor(this.z); return this; }

  /** Ceil each component. */
  ceil() { this.x = Math.ceil(this.x); this.y = Math.ceil(this.y); this.z = Math.ceil(this.z); return this; }

  /** Round each component to nearest integer. */
  round() { this.x = Math.round(this.x); this.y = Math.round(this.y); this.z = Math.round(this.z); return this; }

  /** Round each component toward zero. */
  roundToZero() {
    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
    return this;
  }

  /** Negate each component. */
  negate() { this.x = -this.x; this.y = -this.y; this.z = -this.z; return this; }

  // ==========================================================================
  // == LENGTH / DISTANCE ==
  // ==========================================================================

  /** @returns {number} Squared length of the vector. */
  lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z; }

  /** @returns {number} Euclidean length of the vector. */
  length() { return Math.sqrt(this.lengthSq()); }

  /** Normalize this vector to unit length. */
  normalize() { return this.divideScalar(this.length() || 1); }

  /** Set the vector’s length. */
  setLength(l) { return this.normalize().multiplyScalar(l); }

  /** @returns {number} Manhattan (L1) length. */
  manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z); }

  /** Distance to another vector. */
  distanceTo(v) { return Math.sqrt(this.distanceToSquared(v)); }

  /** Squared distance to another vector. */
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }

  /** @returns {number} Manhattan distance to another vector. */
  manhattanDistanceTo(v) { return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z); }

  // ==========================================================================
  // == ANGLES / DOT / CROSS ==
  // ==========================================================================

  /** Dot product with another vector. */
  dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }

  /** Cross product with another vector (modifies this). */
  cross(v) {
    const x = this.x, y = this.y, z = this.z;
    this.x = y * v.z - z * v.y;
    this.y = z * v.x - x * v.z;
    this.z = x * v.y - y * v.x;
    return this;
  }

  /** Compute the angle (radians) between this vector and another. */
  angleTo(v) {
    const denom = Math.sqrt(this.lengthSq() * v.lengthSq());
    const theta = denom === 0 ? Math.PI / 2 : Math.acos(Math.max(-1, Math.min(1, this.dot(v) / denom)));
    return theta;
  }

  // ==========================================================================
  // == GEOMETRIC CONSTRUCTORS ==
  // ==========================================================================

  /**
   * Set components from a spherical coordinate object.
   * @param {object} s - Object with radius, phi, theta.
   * @example v.setFromSpherical({ radius: 1, phi: Math.PI/2, theta: 0 });
   */
  setFromSpherical(s) { return this.setFromSphericalCoords(s.radius, s.phi, s.theta); }

  /**
   * Set from spherical coordinates.
   * @param {number} radius
   * @param {number} phi - polar angle.
   * @param {number} theta - azimuthal angle.
   */
  setFromSphericalCoords(radius, phi, theta) {
    const sinPhiRadius = Math.sin(phi) * radius;
    this.x = sinPhiRadius * Math.sin(theta);
    this.y = Math.cos(phi) * radius;
    this.z = sinPhiRadius * Math.cos(theta);
    return this;
  }

  /**
   * Set components from a cylindrical coordinate object.
   * @param {object} c - Object with radius, theta, y.
   */
  setFromCylindrical(c) { return this.setFromCylindricalCoords(c.radius, c.theta, c.y); }

  /**
   * Set from cylindrical coordinates.
   * @param {number} radius
   * @param {number} theta
   * @param {number} y
   */
  setFromCylindricalCoords(radius, theta, y) {
    this.x = radius * Math.sin(theta);
    this.y = y;
    this.z = radius * Math.cos(theta);
    return this;
  }

} // ============================================================================
// CONTINUED: DSRT Math Engine Core - Vector3 v1.1 (Geometry Extended Build)
// ============================================================================

Object.assign(Vector3.prototype, {

  // ==========================================================================
  // == MATRIX & TRANSFORM OPERATIONS ==
  // ==========================================================================

  /**
   * Apply a 3×3 matrix transformation to this vector.
   * @param {Matrix3} m
   * @returns {Vector3} this
   */
  applyMatrix3(m) {
    const e = m.elements, x = this.x, y = this.y, z = this.z;
    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;
    if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.applyMatrix3', this);
    return this;
  },

  /**
   * Apply a 4×4 matrix transformation (includes translation).
   * @param {Matrix4} m
   * @returns {Vector3} this
   */
  applyMatrix4(m) {
    const e = m.elements, x = this.x, y = this.y, z = this.z;
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    if (Vector3.runtimeSafe) dsrtFlow.trace('Vector3.applyMatrix4', this);
    return this;
  },

  /**
   * Extract this vector from a column of a matrix.
   * @param {Matrix4} m
   * @param {number} index - Column index.
   */
  setFromMatrixColumn(m, index) { return this.fromArray(m.elements, index * 4); },

  /** Extract position from a matrix. */
  setFromMatrixPosition(m) { const e = m.elements; return this.set(e[12], e[13], e[14]); },

  /** Extract scale from a matrix. */
  setFromMatrixScale(m) {
    const sx = new Vector3(e[0], e[1], e[2]).length();
    const sy = new Vector3(e[4], e[5], e[6]).length();
    const sz = new Vector3(e[8], e[9], e[10]).length();
    return this.set(sx, sy, sz);
  },

  /**
   * Apply an Euler rotation.
   * @param {Euler} euler - Rotation in radians.
   */
  applyEuler(euler) {
    const { x, y, z, order = 'XYZ' } = euler;
    const c1 = Math.cos(x), c2 = Math.cos(y), c3 = Math.cos(z);
    const s1 = Math.sin(x), s2 = Math.sin(y), s3 = Math.sin(z);

    let vx = this.x, vy = this.y, vz = this.z;

    switch (order) {
      case 'XYZ':
        this.x = c2 * c3 * vx - c2 * s3 * vy + s2 * vz;
        this.y = (s1 * s2 * c3 + c1 * s3) * vx + (-s1 * s2 * s3 + c1 * c3) * vy - s1 * c2 * vz;
        this.z = (-c1 * s2 * c3 + s1 * s3) * vx + (c1 * s2 * s3 + s1 * c3) * vy + c1 * c2 * vz;
        break;
      default: break;
    }
    return this;
  },

  /**
   * Apply a rotation defined by an axis and angle.
   * @param {Vector3} axis
   * @param {number} angle
   */
  applyAxisAngle(axis, angle) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const v = Vector3.acquire().copy(this);
    const cross = Vector3.acquire().copy(axis).cross(v).multiplyScalar(sin);
    const term = axis.clone().multiplyScalar(axis.dot(v) * (1 - cos));
    this.multiplyScalar(cos).add(cross).add(term);
    Vector3.release(v); Vector3.release(cross);
    return this;
  },

  /** Transform this direction vector by a 4×4 matrix (ignore translation). */
  transformDirection(m) {
    const e = m.elements, x = this.x, y = this.y, z = this.z;
    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;
    return this.normalize();
  },

  // ==========================================================================
  // == PROJECTION / REFLECTION ==
  // ==========================================================================

  /** Project onto another vector. */
  projectOnVector(v) {
    const denom = v.lengthSq();
    if (denom === 0) return this.set(0, 0, 0);
    const scalar = this.dot(v) / denom;
    return this.copy(v).multiplyScalar(scalar);
  },

  /** Project this vector onto a plane defined by a normal. */
  projectOnPlane(normal) {
    const tmp = Vector3.acquire().copy(this).projectOnVector(normal);
    this.sub(tmp);
    Vector3.release(tmp);
    return this;
  },

  /** Reflect this vector off a plane defined by a normal. */
  reflect(normal) {
    const tmp = Vector3.acquire().copy(normal).multiplyScalar(2 * this.dot(normal));
    this.sub(tmp);
    Vector3.release(tmp);
    return this;
  },

  /**
   * Project this vector using a camera’s projection matrix.
   * @param {Camera} camera
   */
  project(camera) {
    this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    return this;
  },

  /**
   * Unproject this vector using a camera’s inverse projection.
   * @param {Camera} camera
   */
  unproject(camera) {
    this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    return this;
  },

  // ==========================================================================
  // == INTERPOLATION ==
  // ==========================================================================

  /** Linear interpolation toward another vector. */
  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  },

  /** Linear interpolation between two vectors. */
  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    return this;
  },

  // ==========================================================================
  // == RANDOM / UTILITY ==
  // ==========================================================================

  /** Fill with random [0,1] values. */
  random() { this.x = Math.random(); this.y = Math.random(); this.z = Math.random(); return this; },

  /** Fill with a random unit direction. */
  randomDirection() {
    const theta = Math.random() * Math.PI * 2;
    const u = Math.random() * 2 - 1;
    const c = Math.sqrt(1 - u * u);
    this.x = c * Math.cos(theta);
    this.y = u;
    this.z = c * Math.sin(theta);
    return this;
  },

  // ==========================================================================
  // == ARRAY / COMPARISON ==
  // ==========================================================================

  /** Assign components from an array. */
  fromArray(a, o = 0) { this.x = a[o]; this.y = a[o + 1]; this.z = a[o + 2]; return this; },

  /** Write components into an array. */
  toArray(a = [], o = 0) { a[o] = this.x; a[o + 1] = this.y; a[o + 2] = this.z; return a; },

  /** Equality check. */
  equals(v) { return (v.x === this.x && v.y === this.y && v.z === this.z); },

  /** Iterable protocol. */
  *[Symbol.iterator]() { yield this.x; yield this.y; yield this.z; }

});

// ============================================================================
// == DSRT OBJECT POOLING ==
// ============================================================================
Vector3.pool = dsrtObjectPool.create(Vector3, 1024);

/** Acquire a pooled instance. */
Vector3.acquire = function () { return Vector3.pool.acquire(); };

/** Release an instance back to pool. */
Vector3.release = function (v) { Vector3.pool.release(v); };

// ============================================================================
// == EXPORTS & RUNTIME REGISTRATION ==
// ============================================================================
export { Vector3 };
if (typeof module !== 'undefined') module.exports = { Vector3 };

if (globalThis.DSRT) {
  globalThis.DSRT.Math = globalThis.DSRT.Math || {};
  globalThis.DSRT.Math.Vector3 = Vector3;
  dsrtFlow.trace('Vector3 v1.1 registered to DSRT runtime');
}
