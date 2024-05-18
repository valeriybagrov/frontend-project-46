#!/usr/bin/env node

import { program } from "commander";
import gendiff from "../src/index.js";

program
  .name('gendiff')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2))
  })
  .parse();