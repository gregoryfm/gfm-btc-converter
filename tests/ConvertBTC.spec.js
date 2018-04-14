const chai = require('chai');
const expect = chai.expect;

const convertBTC = require('../src/ConvertBTC');

describe('ConvertBTC', () => {
  it('should return BRL currency default and 1 as amount default', () => {
    expect(convertBTC()).to.equal('1 BTC to BRL = 2000.00');
  });

  it('should return USD currency and 10 as amount when defined', () => {
    expect(convertBTC('USD', 10)).to.equal('10 BTC to USD = 2000.00');
  });
});
