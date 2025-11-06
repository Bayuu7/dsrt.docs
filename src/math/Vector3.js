// ============================================================================
// DSRT Math Engine Core - Vector3 v1.0 (Modular Build)
// ----------------------------------------------------------------------------
// © DSRT Engine. All rights reserved.
// A high-precision 3D vector class fully compatible with Three-style syntax,
// enhanced with DSRT runtime systems: Flow tracing, Object Pooling,
// Auto-Sanitization, and UUID tracking.
// ============================================================================

import { dsrtFlow, dsrtObjectPool, dsrtSanitize, dsrtUUID } from '../core/DSRTCore.js';

/**
 * @class Vector3
 * @classdesc
 * A mutable 3-component vector used for mathematical operations in 3D space.
 * Designed to mirror Three.js syntax while embedding DSRT runtime intelligence.
 */
class Vector3 {

  /**
   * Create a new Vector3 instance.
   * @param {number} [x=0] - X component
   * @param {number} [y=0] - Y component
   * @param {number} [z=0] - Z component
   */
  constructor(x = 0, y = 0, z = 0) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this.z = z;

    /** @private @readonly */
    Object.defineProperties(this, {
      __dsrt_type: { value: 'Vector3' },
      __uuid: { value: dsrtUUID.generate() },
      __poolable: { value: true }
    });

    dsrtSanitize.check(this);
    dsrtFlow.trace('Vector3.constructor', this);
  }

  // --------------------------------------------------------------------------
  // === BASIC SETTERS / GETTERS
  // --------------------------------------------------------------------------

  /**
   * Set all three components.
   * @param {number} x - X value
   * @param {number} y - Y value
   * @param {number} z - Z value
   * @returns {Vector3} this
   */
  set(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    dsrtFlow.trace('Vector3.set', this);
    return this;
  }

  /** Set all components to a single scalar value. */
  setScalar(s) { this.x = this.y = this.z = s; dsrtFlow.trace('Vector3.setScalar', this); return this; }

  /** Copy values from another vector. */
  copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; dsrtFlow.trace('Vector3.copy', this); return this; }

  /** Create a new cloned vector. */
  clone() { const v = new Vector3(this.x, this.y, this.z); dsrtFlow.trace('Vector3.clone', v); return v; }

  // --------------------------------------------------------------------------
  // === ARITHMETIC OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Add another vector to this one.
   * @param {Vector3} v
   * @returns {Vector3} this
   */
  add(v) {
    this.x += v.x; this.y += v.y; this.z += v.z;
    dsrtFlow.trace('Vector3.add', this);
    return dsrtSanitize.check(this);
  }

  /** Add a scalar to all components. */
  addScalar(s) { this.x += s; this.y += s; this.z += s; dsrtFlow.trace('Vector3.addScalar', this); return dsrtSanitize.check(this); }

  /** Subtract another vector. */
  sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; dsrtFlow.trace('Vector3.sub', this); return dsrtSanitize.check(this); }

  /** Multiply component-wise with another vector. */
  multiply(v) { this.x *= v.x; this.y *= v.y; this.z *= v.z; dsrtFlow.trace('Vector3.multiply', this); return dsrtSanitize.check(this); }

  /** Multiply by a scalar. */
  multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; dsrtFlow.trace('Vector3.multiplyScalar', this); return dsrtSanitize.check(this); }

  /** Divide component-wise by another vector, safe for zero. */
  divide(v) {
    this.x = v.x !== 0 ? this.x / v.x : 0;
    this.y = v.y !== 0 ? this.y / v.y : 0;
    this.z = v.z !== 0 ? this.z / v.z : 0;
    dsrtFlow.trace('Vector3.divide', this);
    return dsrtSanitize.check(this);
  }

  /** Divide all components by a scalar. */
  divideScalar(s) {
    if (s !== 0) { const inv = 1 / s; this.x *= inv; this.y *= inv; this.z *= inv; }
    else { this.x = this.y = this.z = 0; }
    dsrtFlow.trace('Vector3.divideScalar', this);
    return dsrtSanitize.check(this);
  }

  // --------------------------------------------------------------------------
  // === MIN / MAX / CLAMP
  // --------------------------------------------------------------------------

  /** Set each component to the min of itself and the given vector. */
  min(v) { this.x = Math.min(this.x, v.x); this.y = Math.min(this.y, v.y); this.z = Math.min(this.z, v.z); dsrtFlow.trace('Vector3.min', this); return this; }

  /** Set each component to the max of itself and the given vector. */
  max(v) { this.x = Math.max(this.x, v.x); this.y = Math.max(this.y, v.y); this.z = Math.max(this.z, v.z); dsrtFlow.trace('Vector3.max', this); return this; }

  /** Clamp this vector within component-wise ranges. */
  clamp(minV, maxV) {
    this.x = Math.max(minV.x, Math.min(maxV.x, this.x));
    this.y = Math.max(minV.y, Math.min(maxV.y, this.y));
    this.z = Math.max(minV.z, Math.min(maxV.z, this.z));
    dsrtFlow.trace('Vector3.clamp', this);
    return dsrtSanitize.check(this);
  }

  // --------------------------------------------------------------------------
  // === LENGTH / DISTANCE
  // --------------------------------------------------------------------------

  /** Compute squared length. */
  lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z; }

  /** Compute Euclidean length. */
  length() { return Math.sqrt(this.lengthSq()); }

  /**
   * Normalize this vector to unit length.
   * @returns {Vector3} this
   */
  normalize() {
    const len = this.length() || 1;
    this.x /= len; this.y /= len; this.z /= len;
    dsrtFlow.trace('Vector3.normalize', this);
    return dsrtSanitize.check(this);
  }

  /**
   * Compute distance to another vector.
   * @param {Vector3} v
   * @returns {number} distance
   */
  distanceTo(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    dsrtFlow.trace('Vector3.distanceTo', this);
    return d;
  }

  /** Compute squared distance to another vector. */
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    dsrtFlow.trace('Vector3.distanceToSquared', this);
    return dx * dx + dy * dy + dz * dz;
  }

  // --------------------------------------------------------------------------
// === ANGLES / DOT / CROSS
// --------------------------------------------------------------------------

/** Dot product with another vector. */
dot(v) { const r = this.x * v.x + this.y * v.y + this.z * v.z; dsrtFlow.trace('Vector3.dot', this); return r; }

/** Cross product with another vector (modifies this). */
cross(v) {
  const x = this.x, y = this.y, z = this.z;
  this.x = y * v.z - z * v.y;
  this.y = z * v.x - x * v.z;
  this.z = x * v.y - y * v.x;
  dsrtFlow.trace('Vector3.cross', this);
  return dsrtSanitize.check(this);
}

/** Compute angle (in radians) between this vector and another. */
angleTo(v) {
  const denom = Math.sqrt(this.lengthSq() * v.lengthSq());
  const theta = denom === 0 ? 0 : Math.acos(Math.max(-1, Math.min(1, this.dot(v) / denom)));
  dsrtFlow.trace('Vector3.angleTo', this);
  return theta;
}

// --------------------------------------------------------------------------
// === PROJECTION / REFLECTION / TRANSFORMATIONS
// --------------------------------------------------------------------------

/** Project this vector onto another. */
projectOnVector(v) {
  const denom = v.lengthSq();
  if (denom === 0) return this.set(0, 0, 0);
  const scalar = this.dot(v) / denom;
  this.copy(v).multiplyScalar(scalar);
  dsrtFlow.trace('Vector3.projectOnVector', this);
  return dsrtSanitize.check(this);
}

/** Project this vector onto a plane defined by a normal. */
projectOnPlane(normal) {
  const tmp = Vector3.acquire().copy(this).projectOnVector(normal);
  this.sub(tmp);
  Vector3.release(tmp);
  dsrtFlow.trace('Vector3.projectOnPlane', this);
  return dsrtSanitize.check(this);
}

/** Reflect this vector off a plane with a given normal. */
reflect(normal) {
  this.sub(Vector3.acquire().copy(normal).multiplyScalar(2 * this.dot(normal)));
  dsrtFlow.trace('Vector3.reflect', this);
  return dsrtSanitize.check(this);
}

/** Apply a 3×3 matrix transformation. */
applyMatrix3(m) {
  const e = m.elements, x = this.x, y = this.y, z = this.z;
  this.x = e[0] * x + e[3] * y + e[6] * z;
  this.y = e[1] * x + e[4] * y + e[7] * z;
  this.z = e[2] * x + e[5] * y + e[8] * z;
  dsrtFlow.trace('Vector3.applyMatrix3', this);
  return dsrtSanitize.check(this);
}

/** Apply a 4×4 matrix transformation (includes translation). */
applyMatrix4(m) {
  const e = m.elements, x = this.x, y = this.y, z = this.z;
  const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
  this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
  this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
  this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
  dsrtFlow.trace('Vector3.applyMatrix4', this);
  return dsrtSanitize.check(this);
}

// --------------------------------------------------------------------------
// === INTERPOLATION
// --------------------------------------------------------------------------

/** Linear interpolation toward another vector. */
lerp(v, alpha) {
  this.x += (v.x - this.x) * alpha;
  this.y += (v.y - this.y) * alpha;
  this.z += (v.z - this.z) * alpha;
  dsrtFlow.trace('Vector3.lerp', this);
  return dsrtSanitize.check(this);
}

/** Linear interpolation between two vectors. */
lerpVectors(v1, v2, alpha) {
  this.x = v1.x + (v2.x - v1.x) * alpha;
  this.y = v1.y + (v2.y - v1.y) * alpha;
  this.z = v1.z + (v2.z - v1.z) * alpha;
  dsrtFlow.trace('Vector3.lerpVectors', this);
  return dsrtSanitize.check(this);
}

// --------------------------------------------------------------------------
// === RANDOM / UTILITY
// --------------------------------------------------------------------------

/** Fill this vector with random components in [0,1]. */
random() {
  this.x = Math.random(); this.y = Math.random(); this.z = Math.random();
  dsrtFlow.trace('Vector3.random', this);
  return dsrtSanitize.check(this);
}

/** Set this vector to a random unit direction. */
randomDirection() {
  const theta = Math.random() * Math.PI * 2;
  const u = Math.random() * 2 - 1;
  const c = Math.sqrt(1 - u * u);
  this.x = c * Math.cos(theta);
  this.y = u;
  this.z = c * Math.sin(theta);
  dsrtFlow.trace('Vector3.randomDirection', this);
  return dsrtSanitize.check(this);
}

// --------------------------------------------------------------------------
// === ARRAY CONVERSION / COMPARISON
// --------------------------------------------------------------------------

/** Assign values from an array. */
fromArray(a, o = 0) { this.x = a[o]; this.y = a[o + 1]; this.z = a[o + 2]; dsrtFlow.trace('Vector3.fromArray', this); return this; }

/** Write components to an array. */
toArray(a = [], o = 0) { a[o] = this.x; a[o + 1] = this.y; a[o + 2] = this.z; dsrtFlow.trace('Vector3.toArray', this); return a; }

/** Equality check. */
equals(v) { const e = (v.x === this.x && v.y === this.y && v.z === this.z); dsrtFlow.trace('Vector3.equals', this); return e; }

/** Iterator support. */
*[Symbol.iterator]() { yield this.x; yield this.y; yield this.z; }

// --------------------------------------------------------------------------
// === DSRT OBJECT POOL & RUNTIME REGISTRATION
// --------------------------------------------------------------------------

/**
 * Acquire a Vector3 instance from the DSRT object pool.
 * @returns {Vector3}
 */
static acquire() { return Vector3.pool.acquire(); }

/**
 * Release a Vector3 instance back to the DSRT object pool.
 * @param {Vector3} v
 */
static release(v) { Vector3.pool.release(v); }

/** Internal pool initialization. */
static pool = dsrtObjectPool.create(Vector3, 512);

// --------------------------------------------------------------------------
// === EXPORTS
// --------------------------------------------------------------------------

// Hybrid export: ES6, CommonJS, and DSRT runtime global registration
export { Vector3 };
if (typeof module !== 'undefined') module.exports = { Vector3 };

// Register to DSRT runtime namespace if available
if (globalThis.DSRT) {
  globalThis.DSRT.Math = globalThis.DSRT.Math || {};
  globalThis.DSRT.Math.Vector3 = Vector3;
  dsrtFlow.trace('Vector3 registered to DSRT runtime');
  }
