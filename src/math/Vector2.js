import { clamp } from './MathUtils.js';

/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers
 * (labeled x and y), which can be used to represent a number of things, such as:
 *
 * - A point in 2D space (i.e. a position on a plane).
 * - A direction and length across a plane. In DSRT the length will
 * always be the Euclidean distance (straight-line distance) from `(0, 0)` to `(x, y)`
 * and the direction is also measured from `(0, 0)` towards `(x, y)`.
 * - Any arbitrary ordered pair of numbers.
 *
 * There are other things a 2D vector can be used to represent, such as
 * momentum vectors, complex numbers and so on, however these are the most
 * common uses in DSRT.
 *
 * Iterating through a vector instance will yield its components `(x, y)` in
 * the corresponding order.
 * ```js
 * const a = new Vector2(0, 1);
 * const b = new Vector2();
 * const d = a.distanceTo(b);
 * ```
 */
class Vector2 {

  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(x = 0, y = 0) {
    /**
     * DSRT type guard flag.
     * @type {boolean}
     * @readonly
     * @default true
     */
    this.dsrtIsVector2 = true;

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;
  }

  get width() { return this.x; }
  set width(value) { this.x = value; }

  get height() { return this.y; }
  set height(value) { this.y = value; }

  set(x, y) { this.x = x; this.y = y; return this; }
  setScalar(s) { this.x = s; this.y = s; return this; }
  setX(x) { this.x = x; return this; }
  setY(y) { this.y = y; return this; }

  setComponent(i, v) {
    switch (i) {
      case 0: this.x = v; break;
      case 1: this.y = v; break;
      default: throw new Error('index is out of range: ' + i);
    }
    return this;
  }

  getComponent(i) {
    switch (i) {
      case 0: return this.x;
      case 1: return this.y;
      default: throw new Error('index is out of range: ' + i);
    }
  }

  clone() { return new this.constructor(this.x, this.y); }
  copy(v) { this.x = v.x; this.y = v.y; return this; }

  add(v) { this.x += v.x; this.y += v.y; return this; }
  addScalar(s) { this.x += s; this.y += s; return this; }
  addVectors(a, b) { this.x = a.x + b.x; this.y = a.y + b.y; return this; }
  addScaledVector(v, s) { this.x += v.x * s; this.y += v.y * s; return this; }

  sub(v) { this.x -= v.x; this.y -= v.y; return this; }
  subScalar(s) { this.x -= s; this.y -= s; return this; }
  subVectors(a, b) { this.x = a.x - b.x; this.y = a.y - b.y; return this; }

  multiply(v) { this.x *= v.x; this.y *= v.y; return this; }
  multiplyScalar(s) { this.x *= s; this.y *= s; return this; }

  divide(v) { this.x /= v.x; this.y /= v.y; return this; }
  divideScalar(s) { return this.multiplyScalar(1 / s); }

  applyMatrix3(m) {
    const x = this.x, y = this.y;
    const e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];
    return this;
  }

  min(v) { this.x = Math.min(this.x, v.x); this.y = Math.min(this.y, v.y); return this; }
  max(v) { this.x = Math.max(this.x, v.x); this.y = Math.max(this.y, v.y); return this; }
  clamp(min, max) { this.x = clamp(this.x, min.x, max.x); this.y = clamp(this.y, min.y, max.y); return this; }
  clampScalar(minVal, maxVal) { this.x = clamp(this.x, minVal, maxVal); this.y = clamp(this.y, minVal, maxVal); return this; }
  clampLength(min, max) {
    const len = this.length();
    return this.divideScalar(len || 1).multiplyScalar(clamp(len, min, max));
  }

  floor() { this.x = Math.floor(this.x); this.y = Math.floor(this.y); return this; }
  ceil() { this.x = Math.ceil(this.x); this.y = Math.ceil(this.y); return this; }
  round() { this.x = Math.round(this.x); this.y = Math.round(this.y); return this; }
  roundToZero() { this.x = Math.trunc(this.x); this.y = Math.trunc(this.y); return this; }

  negate() { this.x = -this.x; this.y = -this.y; return this; }

  dot(v) { return this.x * v.x + this.y * v.y; }
  cross(v) { return this.x * v.y - this.y * v.x; }

  lengthSq() { return this.x * this.x + this.y * this.y; }
  length() { return Math.sqrt(this.lengthSq()); }
  manhattanLength() { return Math.abs(this.x) + Math.abs(this.y); }

  normalize() { return this.divideScalar(this.length() || 1); }
  angle() { return Math.atan2(-this.y, -this.x) + Math.PI; }
  angleTo(v) {
    const denom = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denom === 0) return Math.PI / 2;
    const theta = this.dot(v) / denom;
    return Math.acos(clamp(theta, -1, 1));
  }

  distanceTo(v) { return Math.sqrt(this.distanceToSquared(v)); }
  distanceToSquared(v) { const dx = this.x - v.x, dy = this.y - v.y; return dx * dx + dy * dy; }
  manhattanDistanceTo(v) { return Math.abs(this.x - v.x) + Math.abs(this.y - v.y); }

  setLength(l) { return this.normalize().multiplyScalar(l); }

  lerp(v, alpha) { this.x += (v.x - this.x) * alpha; this.y += (v.y - this.y) * alpha; return this; }
  lerpVectors(v1, v2, alpha) { this.x = v1.x + (v2.x - v1.x) * alpha; this.y = v1.y + (v2.y - v1.y) * alpha; return this; }

  equals(v) { return (v.x === this.x && v.y === this.y); }

  fromArray(arr, offset = 0) { this.x = arr[offset]; this.y = arr[offset + 1]; return this; }
  toArray(arr = [], offset = 0) { arr[offset] = this.x; arr[offset + 1] = this.y; return arr; }
  fromBufferAttribute(attr, i) { this.x = attr.getX(i); this.y = attr.getY(i); return this; }

  rotateAround(center, angle) {
    const c = Math.cos(angle), s = Math.sin(angle);
    const x = this.x - center.x, y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }

  random() { this.x = Math.random(); this.y = Math.random(); return this; }

  *[Symbol.iterator]() { yield this.x; yield this.y; }
}

export { Vector2 };
