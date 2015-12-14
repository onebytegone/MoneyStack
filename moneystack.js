/**
 * MoneyStack
 * v0.0.1
 *
 * Copyright (c) 2015 Ethan Smith
 */

var sprintf = require("underscore.string/sprintf"),
    _ = require("underscore");

(function() {
   var root = this;

   var MoneyStack = function(initial) {
      this.config = {
         /**
          * Sets the number of decimal places to ensure
          */
         'precision': 2,

         /**
          * Used to control the readble format.
          *
          * NOTE: if the precision here doesn't match `precision`,
          * there may be rounding.
          */
         'currencyFormat': '$%.2f'
      };

      // Set initial stored value
      this.stored = 0;
      if (initial) {
         this.set(initial);
      }
   };


   /**
    * Stores the given value.
    *
    * @param value Number|String - The value to store
    */
   MoneyStack.prototype.set = function(value) {
      if (typeof value === 'string') {
         value = value.replace(/[^\d.]/g,'');
         value = parseFloat(value);
      }

      this.stored = this.__upscaleValue(value, this.config.precision);
   };


   /**
    * Returns the stored value.
    *
    * @return Number - The stored value
    */
   MoneyStack.prototype.get = function() {
      return this.__downscaleValue(this.stored, this.config.precision);
   };


   /**
    * Returns the human reable value.
    *
    * @return String - The formatted value
    */
   MoneyStack.prototype.readable = function() {
      return sprintf(this.config.currencyFormat, this.get());
   };

   /**************************
    * MATH
    **************************/


   /**
    * Adds another MoneyStack. Creates a new MoneyStack.
    *
    * @return MoneyStack - The resulting value
    */
   MoneyStack.prototype.plus = function(otherStack) {
      if (!_.isEqual(this.config, otherStack.config)) {
         throw {
            name: 'Mismatched config',
            message: 'The configs do not match'
         }
      }

      var newStack = new MoneyStack();
      newStack.stored = this.stored + otherStack.stored;
      newStack.config = this.config;

      return newStack;
   };


   /**
    * Subtracts another MoneyStack. Creates a new MoneyStack.
    *
    * @return MoneyStack - The resulting value
    */
   MoneyStack.prototype.subtract = function(otherStack) {
      if (!_.isEqual(this.config, otherStack.config)) {
         throw {
            name: 'Mismatched config',
            message: 'The configs do not match'
         }
      }

      var newStack = new MoneyStack();
      newStack.stored = this.stored - otherStack.stored;
      newStack.config = this.config;

      return newStack;
   };


   /**************************
    * INTERNAL
    **************************/


   /**
    * INTERNAL
    * Scales the value to an interger while retaining the
    * specified number of decimal places.
    *
    * @see __downscaleValue(value, precision)
    *
    * @param value Number - The value to scale
    * @param precision Number - The number of decimal places to keep
    * @return Number - The scaled value
    */
   MoneyStack.prototype.__upscaleValue = function(value, precision) {
      var adjusted = value * this.__determineScale(precision);
      return this.__capToInterger(adjusted);
   };


   /**
    * INTERNAL
    * Undoes the scaling for the given value.
    *
    * @see __upscaleValue(value, precision)
    *
    * @param value Number - The value to scale
    * @param precision Number - The number of decimal places to keep
    * @return Number - The downscaled value
    */
   MoneyStack.prototype.__downscaleValue = function(value, precision) {
      var adjusted = value / this.__determineScale(precision);
      return this.__truncateValue(adjusted, precision);
   };


   /**
    * INTERNAL
    * Calculates the scaling factor for
    * `__upscaleValue` and `__downscaleValue`
    *
    * @param precision Number
    * @return Number - Scale factor
    */
   MoneyStack.prototype.__determineScale = function(precision) {
      return Math.pow(10, precision);
   };


   /**
    * INTERNAL
    * Trims a decimal to a given number of decimal places.
    *
    * @param value Number - The value to scale
    * @param precision Number - The number of decimal places to keep
    * @return Number - Trimmed value
    */
   MoneyStack.prototype.__truncateValue = function(value, precision) {
      var scale = this.__determineScale(precision);
      return this.__capToInterger( value * scale ) / scale;
   };


   /**
    * INTERNAL
    * Trims all decimal places on a given number
    *
    * @param value Number - The value to scale
    * @return Number - Trimmed value
    */
   MoneyStack.prototype.__capToInterger = function(value) {
      return value > 0 ? Math.floor(value) : Math.ceil(value);
   };


   // Allow support for browserify
   if (typeof exports !== 'undefined') {
      if (typeof module !== 'undefined' && module.exports) {
         exports = module.exports = MoneyStack;
      }
      exports.MoneyStack = MoneyStack;
   } else {
      root.MoneyStack = MoneyStack;
  }

}.call(this));
