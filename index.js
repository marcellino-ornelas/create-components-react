#!/usr/bin/env node

/*
 * Create React Component
*/

const createReactComponent = require("./lib");
const program = require("commander");

program
  .version('0.1.0')
  // .usage('[options] <file ...>')
  .option('-i, --integer <d>', 'An integer argument', parseInt)
  // .option('-f, --float <n>', 'A float argument', parseFloat)
  // .option('-r, --range <a>..<b>', 'A range', range)
  // .option('-l, --list <items>', 'A list', list)
  // .option('-o, --optional [value]', 'An optional value')
  // .option('-c, --collect [value]', 'A repeatable value', collect, [])
  // .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .parse(process.argv);

// console.dir(program);

// Create component files
createReactComponent( process.cwd(), program.args );

