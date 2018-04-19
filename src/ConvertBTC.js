const request = require('request');
const chalk = require('chalk');

function convertBTC(currency = 'BRL', amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  request(url, (error, response, body) => {
    let apiResponse;

    try {
      apiResponse = JSON.parse(body);
    } catch (err) {
      console.log(chalk.red('Something went wrong in the API'));
      return err;
    }
    console.log(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`);
  });
}

module.exports = convertBTC;
