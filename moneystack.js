/**
 * MoneyStack
 * v0.0.1
 *
 * Copyright (c) 2015 Ethan Smith
 */

(function() {
   var root = this;

   var MoneyStack = function() {


   MoneyStack.prototype.__upscaleValue = function(value, precision) {
      var adjusted = value * this.__determineScale(precision);
      return this.__capToInterger(adjusted);
   };


   MoneyStack.prototype.__downscaleValue = function(value, precision) {
      var adjusted = value / this.__determineScale(precision);
      return this.__truncateValue(adjusted, precision);
   };


   MoneyStack.prototype.__determineScale = function(precision) {
      return Math.pow(10, precision);
   };


   MoneyStack.prototype.__truncateValue = function(value, precision) {
      var scale = this.__determineScale(precision);
      return this.__capToInterger( value * scale ) / scale;
   };


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
