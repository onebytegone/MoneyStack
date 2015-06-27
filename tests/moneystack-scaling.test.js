var expect = require("expect.js"),
    MoneyStack = require('../moneystack');

var stack = new MoneyStack();

describe('Value Scaling', function() {
   describe('#__upscaleValue(value, precision)', function() {
      it('should return a scaled value', function() {
         expect(stack.__upscaleValue(0, 0)).to.be(0);
         expect(stack.__upscaleValue(0, 1)).to.be(0);
         expect(stack.__upscaleValue(10, 0)).to.be(10);
         expect(stack.__upscaleValue(124, 1)).to.be(1240);
         expect(stack.__upscaleValue(12, 2)).to.be(1200);
         expect(stack.__upscaleValue(42.23, 2)).to.be(4223);
         expect(stack.__upscaleValue(42.23, 3)).to.be(42230);
      });
      it('should truncate to the given precision', function() {
         expect(stack.__upscaleValue(42.2312312424, 3)).to.be(42231);
         expect(stack.__upscaleValue(42.000000001, 0)).to.be(42);
         expect(stack.__upscaleValue(42.000000001, 2)).to.be(4200);
      });
   });
   describe('#__downscaleValue(value, precision)', function() {
      it('should return a downscaled value', function() {
         expect(stack.__downscaleValue(0, 0)).to.be(0);
         expect(stack.__downscaleValue(100, 0)).to.be(100);
         expect(stack.__downscaleValue(888, 1)).to.be(88.8);
         expect(stack.__downscaleValue(123, 2)).to.be(1.23);
         expect(stack.__downscaleValue(124, 3)).to.be(0.124);
         expect(stack.__downscaleValue(1240, 1)).to.be(124);
         expect(stack.__downscaleValue(1200, 2)).to.be(12);
         expect(stack.__downscaleValue(4223, 2)).to.be(42.23);
         expect(stack.__downscaleValue(42230, 3)).to.be(42.23);
      });
      it('should truncate to the given precision', function() {
         expect(stack.__downscaleValue(42.2312312424, 0)).to.be(42);
         expect(stack.__downscaleValue(122.000000001, 1)).to.be(12.2);
         expect(stack.__downscaleValue(4240.000000001, 2)).to.be(42.40);
      });
   });
   describe('#__determineScale(precision)', function() {
      it('should return the proper scaler for the precision', function() {
         expect(stack.__determineScale(0)).to.be(1);
         expect(stack.__determineScale(1)).to.be(10);
         expect(stack.__determineScale(2)).to.be(100);
         expect(stack.__determineScale(3)).to.be(1000);
         expect(stack.__determineScale(4)).to.be(10000);
         expect(stack.__determineScale(5)).to.be(100000);
      });
   });
});
