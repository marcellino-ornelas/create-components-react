#!/usr/bin/env node

/*
 * Create React Component
*/

const createReactComponent = require("./lib");
const name = process.argv[2];

// Create component files
createReactComponent( process.cwd(), name );

