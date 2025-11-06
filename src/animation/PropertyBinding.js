/**
 * @module DSRTPropertyBinding
 * @class PropertyBinding
 * @classdesc
 * Binds a KeyframeTrack to a property of a target object.
 * Provides methods to read and write values, and to manage binding lifecycle.
 *
 * @property {boolean} dsrtIsPropertyBinding - Type guard flag for DSRT.PropertyBinding.
 * @see DSRTPropertyBinding.test.js
 */
class PropertyBinding {

  /**
   * Constructs a new PropertyBinding.
   *
   * @param {Object} targetObject - The object whose property will be bound.
   * @param {string} propertyPath - Path to the property (e.g. 'position.x').
   */
  constructor(targetObject, propertyPath) {
    /** @type {boolean} */
    this.dsrtIsPropertyBinding = true;

    /** @type {Object} */
    this.targetObject = targetObject;

    /** @type {string} */
    this.propertyPath = propertyPath;

    /** @type {Array<string>} */
    this.parsedPath = this._parsePath(propertyPath);

    /** @type {boolean} */
    this.bound = false;
  }

  /**
   * Parses a property path into segments.
   * @param {string} path - The property path.
   * @return {Array<string>} Parsed segments.
   */
  _parsePath(path) {
    return path.split('.');
  }

  /**
   * Resolves the property reference.
   * @return {Object} The resolved property reference.
   */
  _resolveProperty() {
    let obj = this.targetObject;
    for (const segment of this.parsedPath) {
      if (obj[segment] === undefined) {
        throw new Error(`PropertyBinding: segment '${segment}' not found in target object.`);
      }
      obj = obj[segment];
    }
    return obj;
  }

  /**
   * Gets the current value of the bound property.
   * @return {any} The property value.
   */
  getValue() {
    return this._resolveProperty();
  }

  /**
   * Sets the value of the bound property.
   * @param {any} value - The value to set.
   */
  setValue(value) {
    let obj = this.targetObject;
    const last = this.parsedPath[this.parsedPath.length - 1];
    for (let i = 0; i < this.parsedPath.length - 1; i++) {
      obj = obj[this.parsedPath[i]];
    }
    obj[last] = value;
  }

  /**
   * Binds the property for animation.
   */
  bind() {
    this.bound = true;
    return this;
  }

  /**
   * Unbinds the property.
   */
  unbind() {
    this.bound = false;
    return this;
  }
}

export { PropertyBinding };
