#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();
program
  .name('gendiff')
  .version('1.0.0')
  .argument('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .parse();