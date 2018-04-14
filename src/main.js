#!/usr/bin/env node
const commander = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./ConvertBTC');

commander
    .version(pkg.version)
    .description('Convert bitcoin to any currency defined.')
    .option('-c, --currency <currency>', 'Currency to be converted. (Default: BRL).')
    .option('-a, --amount <amount>', 'Value in bitcoin to convert. (Default: 1).')
    .parse(process.argv);

console.log(convertBTC(commander.currency, commander.amount));
