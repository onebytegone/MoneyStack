var expect = require("expect.js"),
    MoneyStack = require('../moneystack');

describe('Math', function() {
   it('should add another stack properly', function() {
      expect(new MoneyStack(0).plus(new MoneyStack(0)).get()).to.be(0);
      expect(new MoneyStack(10).plus(new MoneyStack(0)).get()).to.be(10);
      expect(new MoneyStack(10.9).plus(new MoneyStack(0)).get()).to.be(10.9);
      expect(new MoneyStack(10.99).plus(new MoneyStack(0)).get()).to.be(10.99);
      expect(new MoneyStack(10.999).plus(new MoneyStack(0)).get()).to.be(10.99);
      expect(new MoneyStack(10.000001).plus(new MoneyStack(0)).get()).to.be(10);
      expect(new MoneyStack(0).plus(new MoneyStack(1)).get()).to.be(1);
      expect(new MoneyStack(10).plus(new MoneyStack(15)).get()).to.be(25);
      expect(new MoneyStack(10.9).plus(new MoneyStack(0.1)).get()).to.be(11);
      expect(new MoneyStack(10.99).plus(new MoneyStack(0.11)).get()).to.be(11.1);
      expect(new MoneyStack(10.999).plus(new MoneyStack(0.1111)).get()).to.be(11.1);
      expect(new MoneyStack(10.000001).plus(new MoneyStack(3.0005)).get()).to.be(13);
   });
   it('should subtract another stack properly', function() {
      expect(new MoneyStack(0).subtract(new MoneyStack(0)).get()).to.be(0);
      expect(new MoneyStack(10).subtract(new MoneyStack(0)).get()).to.be(10);
      expect(new MoneyStack(10.9).subtract(new MoneyStack(0)).get()).to.be(10.9);
      expect(new MoneyStack(10.99).subtract(new MoneyStack(0)).get()).to.be(10.99);
      expect(new MoneyStack(10.999).subtract(new MoneyStack(0)).get()).to.be(10.99);
      expect(new MoneyStack(10.000001).subtract(new MoneyStack(0)).get()).to.be(10);
      expect(new MoneyStack(2).subtract(new MoneyStack(1)).get()).to.be(1);
      expect(new MoneyStack(10).subtract(new MoneyStack(15)).get()).to.be(-5);
      expect(new MoneyStack(10.9).subtract(new MoneyStack(0.1)).get()).to.be(10.8);
      expect(new MoneyStack(10.99).subtract(new MoneyStack(0.11)).get()).to.be(10.88);
      expect(new MoneyStack(10.999).subtract(new MoneyStack(0.1111)).get()).to.be(10.88);
      expect(new MoneyStack(10.000001).subtract(new MoneyStack(3.0005)).get()).to.be(7);
      expect(new MoneyStack(10.000001).subtract(new MoneyStack(0.085)).get()).to.be(9.92);
   });
});
