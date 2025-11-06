import { clamp } from './DSRT.MathUtils.js';
import { Quaternion } from './DSRT.Quaternion.js';

/**
 * Class representing a 3D vector. A 3D vector is an ordered triplet of numbers
 * (labeled x, y and z), which can be used to represent a number of things, such as:
 *
 * - A point in 3D space.
 * - A direction and length in 3D space. In DSRT the length will
 * always be the Euclidean distance (straight-line distance) from `(0, 0, 0)` to `(x, y, z)`
 * and the direction is also measured from `(0, 0, 0)` towards `(x, y, z)`.
 * - Any arbitrary ordered triplet of numbers.
 *
 * Iterating through a vector instance will yield its components `(x, y, z)` in
 * the corresponding order.
 * ```js
 * const a = new Vector3(0, 1, 0);
 * const b = new Vector3();
 * const d = a.distanceTo(b);
 * ```
 */
class Vector3 {

  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(x = 0, y = 0, z = 0) {
    /**
     * DSRT type guard flag.
     * @type {boolean}
     * @readonly
     * @default true
     */
    this.dsrtIsVector3 = true;

    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this.z = z;
  }

  set(x, y, z) { if (z === undefined) z = this.z; this.x = x; this.y = y; this.z = z; return this; }
  setScalar(s) { this.x = s; this.y = s; this.z = s; return this; }
  setX(x) { this.x = x; return this; }
  setY(y) { this.y = y; return this; }
  setZ(z) { this.z = z; return this; }
  setComponent(i,v){ switch(i){case 0:this.x=v;break;case 1:this.y=v;break;case 2:this.z=v;break;default:throw new Error('index out of range:'+i);} return this; }
  getComponent(i){ switch(i){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error('index out of range:'+i);} }
  clone(){ return new this.constructor(this.x,this.y,this.z); }
  copy(v){ this.x=v.x; this.y=v.y; this.z=v.z; return this; }

  add(v){ this.x+=v.x; this.y+=v.y; this.z+=v.z; return this; }
  addScalar(s){ this.x+=s; this.y+=s; this.z+=s; return this; }
  addVectors(a,b){ this.x=a.x+b.x; this.y=a.y+b.y; this.z=a.z+b.z; return this; }
  addScaledVector(v,s){ this.x+=v.x*s; this.y+=v.y*s; this.z+=v.z*s; return this; }

  sub(v){ this.x-=v.x; this.y-=v.y; this.z-=v.z; return this; }
  subScalar(s){ this.x-=s; this.y-=s; this.z-=s; return this; }
  subVectors(a,b){ this.x=a.x-b.x; this.y=a.y-b.y; this.z=a.z-b.z; return this; }

  multiply(v){ this.x*=v.x; this.y*=v.y; this.z*=v.z; return this; }
  multiplyScalar(s){ this.x*=s; this.y*=s; this.z*=s; return this; }
  multiplyVectors(a,b){ this.x=a.x*b.x; this.y=a.y*b.y; this.z=a.z*b.z; return this; }

  applyEuler(e){ return this.applyQuaternion(_quaternion.setFromEuler(e)); }
  applyAxisAngle(axis,angle){ return this.applyQuaternion(_quaternion.setFromAxisAngle(axis,angle)); }
  applyMatrix3(m){ const x=this.x,y=this.y,z=this.z,e=m.elements; this.x=e[0]*x+e[3]*y+e[6]*z; this.y=e[1]*x+e[4]*y+e[7]*z; this.z=e[2]*x+e[5]*y+e[8]*z; return this; }
  applyNormalMatrix(m){ return this.applyMatrix3(m).normalize(); }
  applyMatrix4(m){ const x=this.x,y=this.y,z=this.z,e=m.elements; const w=1/(e[3]*x+e[7]*y+e[11]*z+e[15]); this.x=(e[0]*x+e[4]*y+e[8]*z+e[12])*w; this.y=(e[1]*x+e[5]*y+e[9]*z+e[13])*w; this.z=(e[2]*x+e[6]*y+e[10]*z+e[14])*w; return this; }
  applyQuaternion(q){ const vx=this.x,vy=this.y,vz=this.z; const qx=q.x,qy=q.y,qz=q.z,qw=q.w; const tx=2*(qy*vz-qz*vy); const ty=2*(qz*vx-qx*vz); const tz=2*(qx*vy-qy*vx); this.x=vx+qw*tx+qy*tz-qz*ty; this.y=vy+qw*ty+qz*tx-qx*tz; this.z=vz+qw*tz+qx*ty-qy*tx; return this; }

  project(camera){ return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix); }
  unproject(camera){ return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld); }
  transformDirection(m){ const x=this.x,y=this.y,z=this.z,e=m.elements; this.x=e[0]*x+e[4]*y+e[8]*z; this.y=e[1]*x+e[5]*y+e[9]*z; this.z=e[2]*x+e[6]*y+e[10]*z; return this.normalize(); }

  divide(v){ this.x/=v.x; this.y/=v.y; this.z/=v.z; return this; }
  divideScalar(s){ return this.multiplyScalar(1/s); }

  min(v){ this.x=Math.min(this.x,v.x); this.y=Math.min(this.y,v.y); this.z=Math.min(this.z,v.z); return this; }
  max(v){ this.x=Math.max(this.x,v.x); this.y=Math.max(this.y,v.y); this.z=Math.max(this.z,v.z); return this; }
  clamp(min,max){ this.x=clamp(this.x,min.x,max.x); this.y=clamp(this.y,min.y,max.y); this.z=clamp(this.z,min.z,max.z); return this; }
  clampScalar(minVal,maxVal){ this.x=clamp(this.x,minVal,maxVal); this.y=clamp(this.y,minVal,maxVal); this.z=clamp(this.z,minVal,maxVal); return this; }
  clampLength(min,max){ const len=this.length(); return this.divideScalar(len||1).multiplyScalar(clamp(len,min,max)); }

  floor(){ this.x=Math.floor(this.x); this.y=Math.floor(this.y); this.z=Math.floor(this.z); return this; }
  ceil(){ this.x=Math.ceil(this.x); this.y=Math.ceil(this.y); this.z=Math.ceil(this.z); return this; }
  round(){ this.x=Math.round(this.x); this.y=Math.round(this.y); this.z=Math.round(this.z); return this; }
  roundToZero(){ this.x=Math.trunc(this.x); this.y=Math.trunc(this.y); this.z=Math.trunc(this.z); return this; }

  negate(){ this.x=-this.x; this.y=-this.y; this.z=-this.z; return this; }
  dot(v){ return this.x*v.x+this.y*v.y+this.z*v.z; }

  /**
   * Computes the square of the Euclidean length (straight-line length).
   * @return {number}
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  normalize() {
    return this.divideScalar(this.length() || 1);
  }

  setLength(l) {
    return this.normalize().multiplyScalar(l);
  }

  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  }

  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;
    this.z = v1.z + (v2.z - v1.z) * alpha;
    return this;
  }

  cross(v) {
    return this.crossVectors(this, v);
  }

  crossVectors(a, b) {
    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  }

  projectOnVector(v) {
    const denom = v.lengthSq();
    if (denom === 0) return this.set(0,0,0);
    const scalar = v.dot(this) / denom;
    return this.copy(v).multiplyScalar(scalar);
  }

  projectOnPlane(normal) {
    _vector.copy(this).projectOnVector(normal);
    return this.sub(_vector);
  }

  reflect(normal) {
    return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));
  }

  angleTo(v) {
    const denom = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (denom === 0) return Math.PI/2;
    const theta = this.dot(v) / denom;
    return Math.acos(clamp(theta, -1, 1));
  }

  distanceTo(v) { return Math.sqrt(this.distanceToSquared(v)); }
  distanceToSquared(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return dx*dx + dy*dy + dz*dz;
  }
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }

  setFromSpherical(s) { return this.setFromSphericalCoords(s.radius, s.phi, s.theta); }
  setFromSphericalCoords(r, phi, theta) {
    const sinPhiR = Math.sin(phi) * r;
    this.x = sinPhiR * Math.sin(theta);
    this.y = Math.cos(phi) * r;
    this.z = sinPhiR * Math.cos(theta);
    return this;
  }

  setFromCylindrical(c) { return this.setFromCylindricalCoords(c.radius, c.theta, c.y); }
  setFromCylindricalCoords(r, theta, y) {
    this.x = r * Math.sin(theta);
    this.y = y;
    this.z = r * Math.cos(theta);
    return this;
  }

  setFromMatrixPosition(m) {
    const e = m.elements;
    this.x = e[12]; this.y = e[13]; this.z = e[14];
    return this;
  }

  setFromMatrixScale(m) {
    const sx = this.setFromMatrixColumn(m,0).length();
    const sy = this.setFromMatrixColumn(m,1).length();
    const sz = this.setFromMatrixColumn(m,2).length();
    this.x = sx; this.y = sy; this.z = sz;
    return this;
  }

  setFromMatrixColumn(m,i) { return this.fromArray(m.elements, i*4); }
  setFromMatrix3Column(m,i) { return this.fromArray(m.elements, i*3); }

  setFromEuler(e) { this.x = e._x; this.y = e._y; this.z = e._z; return this; }
  setFromColor(c) { this.x = c.r; this.y = c.g; this.z = c.b; return this; }

  equals(v) { return (v.x===this.x && v.y===this.y && v.z===this.z); }

  fromArray(arr, offset=0) { this.x=arr[offset]; this.y=arr[offset+1]; this.z=arr[offset+2]; return this; }
  toArray(arr=[], offset=0) { arr[offset]=this.x; arr[offset+1]=this.y; arr[offset+2]=this.z; return arr; }
  fromBufferAttribute(attr,i){ this.x=attr.getX(i); this.y=attr.getY(i); this.z=attr.getZ(i); return this; }

  random(){ this.x=Math.random(); this.y=Math.random(); this.z=Math.random(); return this; }
  randomDirection(){
    const theta=Math.random()*Math.PI*2;
    const u=Math.random()*2-1;
    const c=Math.sqrt(1-u*u);
    this.x=c*Math.cos(theta);
    this.y=u;
    this.z=c*Math.sin(theta);
    return this;
  }

  *[Symbol.iterator](){ yield this.x; yield this.y; yield this.z; }
}

const _vector = /*@__PURE__*/ new Vector3();
const _quaternion = /*@__PURE__*/ new Quaternion();

export { Vector3 };
