#!/usr/bin/env node

import dotenv from 'dotenv';
import chalk from 'chalk';
import figlet from 'figlet';

import { Command } from 'commander';
import { login } from './commands/auth/login.js';

dotenv.config();

async function main() {
    console.log(
        chalk.cyan(
            figlet.textSync("Orbital CLI", {
                font: "Standard",
                horizontalLayout: "default",
            })
        )
    )
    console.log(chalk.gray("A cli based AI tool \n "))
    const program = new Command("orbital");
    program.version("0.0.1")
    .description("A cli based AI tool")
    .addCommand(login);




    program.action(()=>{
        program.help();
    });
    program.parse();
}
main().catch((err) => {
    console.log(chalk.red("Error running orbital CLI: ", err));
    process.exit(1);
});