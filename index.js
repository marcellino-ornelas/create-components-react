#!/usr/bin/env node

/*
 * Create React Component
*/

const program = require('commander');
const settings = require('./lib/settings');

program
  .version('2.0.3')
  .option('-c, --css <ext>', 'change extention for css file');

/*
 * future
*/
// program.command('set <prop> <value>')
//   .description('set a global setting')
//   .action(function( prop, value, options){
//     console.log('args in set: ', arguments);
//   });

const createReactComponents = require('./lib');

program
  .command('init')
  .description('create local configuration settings for a repo to use')
  .action(function(prop, value, options) {
    console.log('initialize');
  });

program
  .command('create <components...>')
  .alias('c')
  .description('create a new component')
  .action(function(files, options) {
    // console.log('args in create: ', options.args);
    createReactComponents(process.cwd(), files);
  });

program.command('* <components...>').action(function(files, options) {
  // console.log('args in *: ', options);
  createReactComponents(process.cwd(), files);
});

program.parse(process.argv);

// console.log('anything else')
// Create component files
// createReactComponent( process.cwd(), program.args);
