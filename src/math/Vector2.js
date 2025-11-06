import { clamp } from './DSRT.MathUtils.js';

/**
 * @module DSRTVector2
 * @class Vector2
 * @classdesc
 * DSRT-native 2D vector class. Represents an ordered pair (x,y) with full
 * math operations, serialization, and integration into DSRT's math system.
 *
 * Integration flow:
 * - Consumed by Matrix3 for affine transforms.
 * - Used by Box2, Ray, and Frustum for geometric tests.
 * - Convertible to/from arrays and buffer attributes for geometry attributes.
 *
 * Boolean flag:
 * - dsrtIsVector2 is set to true for DSRT-native type checking.
 *
 * Notes:
 * - All methods return `this` for chaining unless otherwise specified.
 * - Includes DSRT-native `toJSON` and `fromJSON` for serialization.
 * - Includes `dispose()` for lifecycle management in DSRT.
 *
 * Example:
 * ```js
 * import { Vector2 } from './DSRT.Vector2.js';
 *
 * const a = new Vector2(1,2);
 * const b = new Vector2(3,4);
 * const c = a.clone().add(b).normalize();
 *
 * console.log(c.dsrtIsVector2); // true
 * console.log(JSON.stringify(c.toJSON())); // DSRT schema
 * ```
 */
class Vector2 {

  constructor(x = 0, y = 0) {
    /** @type {boolean} */
    this.dsrtIsVector2 = true;

    /** @type {number} */
    this.x = x;

    /** @type {number} */
    this.y = y;
  }

  // --- Core setters/getters ---
  get width() { return this.x; }
  set width(v) { this.x = v; }
  get height() { return this.y; }
  set height(v) { this.y = v; }

  set(x, y) { this.x = x; this.y = y; return this; }
  setScalar(s) { this.x = s; this.y = s; return this; }
  setX(x) { this.x = x; return this; }
  setY(y) { this.y = y; return this; }

  setComponent(i, v) {
    if (i === 0) this.x = v;
    else if (i === 1) this.y = v;
    else throw new Error(`DSRT.Vector2: index out of range ${i}`);
    return this;
  }

  getComponent(i) {
    if (i === 0) return this.x;
    if (i === 1) return this.y;
    throw new Error(`DSRT.Vector2: index out of range ${i}`);
  }

  // --- Clone/copy ---
  clone() { return new Vector2(this.x, this.y); }
  copy(v) { this.x = v.x; this.y = v.y; return this; }

  // --- Arithmetic ---
  add(v) { this.x += v.x; this.y += v.y; return this; }
  addScalar(s) { this.x += s; this.y += s; return this; }
  addVectors(a,b){ this.x=a.x+b.x; this.y=a.y+b.y; return this; }
  addScaledVector(v,s){ this.x+=v.x*s; this.y+=v.y*s; return this; }

  sub(v){ this.x-=v.x; this.y-=v.y; return this; }
  subScalar(s){ this.x-=s; this.y-=s; return this; }
  subVectors(a,b){ this.x=a.x-b.x; this.y=a.y-b.y; return this; }

  multiply(v){ this.x*=v.x; this.y*=v.y; return this; }
  multiplyScalar(s){ this.x*=s; this.y*=s; return this; }

  divide(v){ this.x/=v.x; this.y/=v.y; return this; }
  divideScalar(s){ return this.multiplyScalar(1/s); }

  negate(){ this.x=-this.x; this.y=-this.y; return this; }

  // --- Math ops ---
  dot(v){ return this.x*v.x+this.y*v.y; }
  cross(v){ return this.x*v.y - this.y*v.x; }

  lengthSq(){ return this.x*this.x+this.y*this.y; }
  length(){ return Math.sqrt(this.lengthSq()); }
  manhattanLength(){ return Math.abs(this.x)+Math.abs(this.y); }

  normalize(){ return this.divideScalar(this.length()||1); }
  setLength(l){ return this.normalize().multiplyScalar(l); }

  angle(){ return Math.atan2(-this.y,-this.x)+Math.PI; }
  angleTo(v){
    const denom=Math.sqrt(this.lengthSq()*v.lengthSq());
    if(!denom) return Math.PI/2;
    const theta=this.dot(v)/denom;
    return Math.acos(clamp(theta,-1,1));
  }

  distanceTo(v){ return Math.sqrt(this.distanceToSquared(v)); }
  distanceToSquared(v){ const dx=this.x-v.x,dy=this.y-v.y; return dx*dx+dy*dy; }
  manhattanDistanceTo(v){ return Math.abs(this.x-v.x)+Math.abs(this.y-v.y); }

  // --- Clamp/round ---
  min(v){ this.x=Math.min(this.x,v.x); this.y=Math.min(this.y,v.y); return this; }
  max(v){ this.x=Math.max(this.x,v.x); this.y=Math.max(this.y,v.y); return this; }
  clamp(min,max){ this.x=clamp(this.x,min.x,max.x); this.y=clamp(this.y,min.y,max.y); return this; }
  clampScalar(minVal,maxVal){ this.x=clamp(this.x,minVal,maxVal); this.y=clamp(this.y,minVal,maxVal); return this; }
  clampLength(min,max){
    const len=this.length();
    return this.divideScalar(len||1).multiplyScalar(clamp(len,min,max));
  }

  floor(){ this.x=Math.floor(this.x); this.y=Math.floor(this.y); return this; }
  ceil(){ this.x=Math.ceil(this.x); this.y=Math.ceil(this.y); return this; }
  round(){ this.x=Math.round(this.x); this.y=Math.round(this.y); return this; }
  roundToZero(){ this.x=Math.trunc(this.x); this.y=Math.trunc(this.y); return this; }

  // --- Interpolation ---
  lerp(v,alpha){ this.x+=(v.x-this.x)*alpha; this.y+=(v.y-this.y)*alpha; return this; }
  lerpVectors(v1,v2,alpha){ this.x=v1.x+(v2.x-v1.x)*alpha; this.y=v1.y+(v2.y-v1.y)*alpha; return this; }

  // --- Equality ---
  equals(v){ return (v.x===this.x && v.y===this.y); }

  // --- Array/buffer integration ---
  fromArray(arr,offset=0){ this.x=arr[offset]; this.y=arr[offset+1]; return this; }
  toArray(arr=[],offset=0){ arr[offset]=this.x; arr[offset+1]=this.y; return arr; }
  fromBufferAttribute(attr,i){ this.x=attr.getX(i); this.y=attr.getY(i); return this; }

  // --- Transformations ---
  applyMatrix3(m){
    const x=this.x,y=this.y,e=m.elements;
    this.x=e[0]*x+e[3]*y+e[6];
    this.y=e[1]*x+e[4]*y+e[7];
    return this;
  }

  rotateAround(center,angle){
    const c=Math.cos(angle),s=Math.sin(angle);
    const x=this.x-center.x,y=this.y-center.y;
    this.x=x*c-y*s+center.x;
    this.y=x*s+y*c+center.y;
    return this;
  }

  // --- Random ---
  random(){ this.x=Math.random(); this.y=Math.random(); return this; }

  // --- Serialization ---
  toJSON(){ return { type:'DSRT.Vector2', x:this.x, y:this.y }; }
  fromJSON(json){ this.x=json.x; this.y=json.y; return this; }

  // --- Lifecycle ---
  dispose(){ this.x=NaN; this.y=NaN; return this; }

  // --- Iterator ---
  *[Symbol.iterator](){ yield this.x; yield this.y; }
}

export { Vector2 };
