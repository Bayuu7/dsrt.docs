import { PropertyBinding } from './PropertyBinding.js';

/**
 * @module DSRTPropertyMixer
 * @class PropertyMixer
 * @classdesc
 * Mixes multiple animated values for a single property binding.
 * Provides accumulation, application, and state management.
 *
 * @property {boolean} dsrtIsPropertyMixer - Type guard flag for DSRT.PropertyMixer.
 * @see DSRTPropertyMixer.test.js
 */
class PropertyMixer {

  /**
   * Constructs a new PropertyMixer.
   *
   * @param {PropertyBinding} binding - The property binding.
   * @param {number} valueSize - The size of the value (e.g. 3 for Vector3).
   */
  constructor(binding, valueSize) {
    /** @type {boolean} */
    this.dsrtIsPropertyMixer = true;

    /** @type {PropertyBinding} */
    this.binding = binding;

    /** @type {number} */
    this.valueSize = valueSize;

    /** @type {Float32Array} */
    this.buffer = new Float32Array(valueSize * 4); 
    // layout: [incoming, accum, original, result]

    /** @type {boolean} */
    this._originalStateSaved = false;
  }

  /**
   * Accumulates values with a given weight.
   *
   * @param {Float32Array} value - The incoming value.
   * @param {number} weight - The weight factor.
   */
  accumulate(value, weight) {
    const accumOffset = this.valueSize;
    for (let i = 0; i < this.valueSize; i++) {
      this.buffer[accumOffset + i] += value[i] * weight;
    }
  }

  /**
   * Applies the accumulated result to the property binding.
   */
  apply() {
    const accumOffset = this.valueSize;
    const resultOffset = this.valueSize * 3;
    for (let i = 0; i < this.valueSize; i++) {
      this.buffer[resultOffset + i] = this.buffer[accumOffset + i];
      this.buffer[accumOffset + i] = 0; // reset accum
    }
    this.binding.setValue(this.buffer.slice(resultOffset, resultOffset + this.valueSize));
  }

  /**
   * Saves the original state of the property.
   */
  saveOriginalState() {
    if (this._originalStateSaved) return;
    const originalOffset = this.valueSize * 2;
    const currentValue = this.binding.getValue();
    for (let i = 0; i < this.valueSize; i++) {
      this.buffer[originalOffset + i] = currentValue[i];
    }
    this._originalStateSaved = true;
  }

  /**
   * Restores the original state of the property.
   */
  restoreOriginalState() {
    if (!this._originalStateSaved) return;
    const originalOffset = this.valueSize * 2;
    const original = this.buffer.slice(originalOffset, originalOffset + this.valueSize);
    this.binding.setValue(original);
    this._originalStateSaved = false;
  }
}

export { PropertyMixer };
