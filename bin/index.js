#!/usr/bin/env node

const path = require('path');
const pkg = require(path.join(__dirname, '../package.json'));
const program = require('commander');
const chalk = require('chalk');

program
    .version(pkg.version)
    .description(chalk.green(pkg.description));

program
    .command('organizer')
    .alias('org')
    .description('Displays information about organizers')
    .action(() => {
        console.log('BAMT Sp. z o.o. S.K.');
        console.log('ul. Płocka 5A');
        console.log('01-231 Warszawa');
    });

program
    .command('cities')
    .description('Displays the list of cities')
    .action(() => {
        console.log('List of cities:');
        console.log('Warszawa');
        console.log('Wrocław');
        console.log(chalk.blue('Łódź'));
        console.log('Katowice');
        console.log('Gdańsk');
        console.log('Kraków');
    });

program.parse(process.argv);