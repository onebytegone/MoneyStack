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
         expect(stack.__downscaleValue(10.99, 0)).to.be(10);
         expect(stack.__downscaleValue(109.3, 1)).to.be(10.9);
         expect(stack.__downscaleValue(1099, 2)).to.be(10.99);
         expect(stack.__downscaleValue(1099.33, 2)).to.be(10.99);
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
   describe('#__truncateValue(value, precision)', function() {
      it('should trim decimal to given length', function() {
         expect(stack.__truncateValue(0, 0)).to.be(0);
         expect(stack.__truncateValue(5, 0)).to.be(5);
         expect(stack.__truncateValue(5.4, 0)).to.be(5);
         expect(stack.__truncateValue(5.4, 1)).to.be(5.4);
         expect(stack.__truncateValue(5.4, 2)).to.be(5.4);
         expect(stack.__truncateValue(5.40003, 2)).to.be(5.4);
         expect(stack.__truncateValue(5.99, 2)).to.be(5.99);
         expect(stack.__truncateValue(5.9999, 2)).to.be(5.99);
         expect(stack.__truncateValue(10.99, 1)).to.be(10.9);
         expect(stack.__truncateValue(10.99, 2)).to.be(10.99);
      });
   });
   describe('#__capToInterger(value)', function() {
      it('should cap positive numbers to lower bound', function() {
         expect(stack.__capToInterger(0)).to.be(0);
         expect(stack.__capToInterger(0.005)).to.be(0);
         expect(stack.__capToInterger(1)).to.be(1);
         expect(stack.__capToInterger(5)).to.be(5);
         expect(stack.__capToInterger(5.0000000001)).to.be(5);
         expect(stack.__capToInterger(5.1)).to.be(5);
         expect(stack.__capToInterger(5.5)).to.be(5);
         expect(stack.__capToInterger(5.9)).to.be(5);
         expect(stack.__capToInterger(5.9999999999)).to.be(5);
      });
      it('should cap negative numbers to upper bound', function() {
         expect(stack.__capToInterger(-1)).to.be(-1);
         expect(stack.__capToInterger(-0.005)).to.be(0);
         expect(stack.__capToInterger(-5)).to.be(-5);
         expect(stack.__capToInterger(-5.0000000001)).to.be(-5);
         expect(stack.__capToInterger(-5.1)).to.be(-5);
         expect(stack.__capToInterger(-5.5)).to.be(-5);
         expect(stack.__capToInterger(-5.9)).to.be(-5);
         expect(stack.__capToInterger(-5.9999999999)).to.be(-5);
      });
   });
});
