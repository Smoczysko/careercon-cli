#!/usr/bin/env node

const path = require('path');
const pkg = require(path.join(__dirname, '../package.json'));
const program = require('commander');
const chalk = require('chalk');

const CONFIG_FILE_NAME = 'careercon.json';

const loadAppConfiguration = () => {
    try {
        return require(path.resolve(process.cwd(), CONFIG_FILE_NAME));
    } catch (ex) {
        return null;
    }
};

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
        console.log('Łódź');
        console.log('Katowice');
        console.log('Gdańsk');
        console.log('Kraków');
    });

const appConfiguration = loadAppConfiguration();

if (appConfiguration !== null) {
    appConfiguration.commands.forEach(commandDefinition => {
        const command = program
            .command(commandDefinition.name)
            .description(commandDefinition.description)
            .action(require(path.resolve(process.cwd(), commandDefinition.action)));

        if (commandDefinition.alias && commandDefinition.alias !== commandDefinition.name) {
            command.alias(commandDefinition.alias);
        }
    });
}

program.on('command:*', () => {
    console.error(chalk.red('Invalid command: %s'));
    console.error(chalk.red('See --help for a list of available commands.'));

    process.exit(1);
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    console.warn(chalk.red('No command specified!'));
    console.warn('');

    program.outputHelp(help => chalk.yellow(help));

    process.exit(1);
}