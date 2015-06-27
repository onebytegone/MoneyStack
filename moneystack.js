/**
 * MoneyStack
 * v0.0.1
 *
 * Copyright (c) 2015 Ethan Smith
 */

(function() {
   var root = this;

   var MoneyStack = function() {

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
