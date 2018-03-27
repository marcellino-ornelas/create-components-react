#!/usr/bin/env node

/*
 * Create React Component
*/

const createReactComponent = require("./lib");
const program = require("commander");

program
  .version('0.1.0')
  .parse(process.argv);

// Create component files
createReactComponent( process.cwd(), program.args );

