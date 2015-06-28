var expect = require("expect.js"),
    MoneyStack = require('../moneystack');

describe('Value Store/Retrieve', function() {
   it('should store and return the same value', function() {
      var value = new MoneyStack();
      value.set(0);
      expect(value.get()).to.be(0);

      value.set(10);
      expect(value.get()).to.be(10);

      value.set(20.32);
      expect(value.get()).to.be(20.32);

      value.set(20.3200000001);
      expect(value.get()).to.be(20.32);

      value.set(20.00000001);
      expect(value.get()).to.be(20);

      value.set(999.99);
      expect(value.get()).to.be(999.99);

      value.set(10.9999);
      expect(value.get()).to.be(10.99);
   });
   it('should be able to return formatted value', function() {
      var value = new MoneyStack();
      value.set(0);
      expect(value.readable()).to.be('$0.00');

      value.set(10);
      expect(value.readable()).to.be('$10.00');

      value.set(20.32);
      expect(value.readable()).to.be('$20.32');

      value.set(20.3200000001);
      expect(value.readable()).to.be('$20.32');

      value.set(20.00000001);
      expect(value.readable()).to.be('$20.00');

      value.set(999.99);
      expect(value.readable()).to.be('$999.99');
   });
   describe('Config', function() {
      it('should follow precision setting', function() {
         var value = new MoneyStack();

         value.config.precision = 0;
         value.set(10.99);
         expect(value.get()).to.be(10);

         value.config.precision = 3;
         value.set(10.9994);
         expect(value.get()).to.be(10.999);
      });
      it('should follow format setting', function() {
         var value = new MoneyStack();

         value.config.currencyFormat = '?%.1f';
         value.config.precision = 1;
         value.set(10.999);
         expect(value.readable()).to.be('?10.9');

         value.config.currencyFormat = '%.0f cents';
         value.config.precision = 0;
         value.set(12345);
         expect(value.readable()).to.be('12345 cents');
      });
   });
});
