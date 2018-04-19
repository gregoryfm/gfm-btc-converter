import chalk from 'chalk';

const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC');

describe('ConvertBTC', () => {

  let consoleStub;

  const responseMock = {
    "success": true,
    "time": "2017-07-02 18:51:29",
    "price": 2490.78
  };

  beforeEach(() =>{
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach( () => {
    console.log.restore();
  });

  it('should use currency BRL and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1})
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(2490.78)}`);
      done();
    }, 300);
  });

  it('should use currency BRL and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 10})
      .reply(200, responseMock);

    convertBTC('BRL', 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(2490.78)}`);
      done();
    }, 300);
  });

  it('should use currency BRL and 1 as amount default', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1})
      .reply(200, responseMock);

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(2490.78)}`);
      done();
    }, 300);
  });

  it('should show message to user when api reply with error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1})
      .replyWithError('error');

    convertBTC('BRL');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API'));
      done();
    }, 300);
  });

});
