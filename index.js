#!/usr/bin/env node

/*
 * Create React Component
*/

const program = require('commander');
const settings = require('./lib/settings');
const fs = require('fs-extra');
const path = require('path');

const CWD = process.cwd();

console.log('Current working directory: ', CWD);

// settings.set('cwd', CWD, true);

function optionsToSettings(_program) {
  // console.log(_program .options);
  _program.options.forEach(function(option) {
    var prop = option.attributeName();
    settings.set(prop, _program[prop]);
  });
}

program.version('2.0.3');

/*
 * future
*/
// .option('-e, --exclude <ext>', 'change extention for css file');
// .option('-o, --only <ext>', 'change extention for css file');

// program.command('set <prop> <value>')
//   .description('set a global setting')
//   .action(function( prop, value, options){
//     console.log('args in set: ', arguments);
//   });

const createReactComponents = require('./lib');

program
  .command('init')
  .option(
    '-t, --templates',
    'Configure this repo to use template functionality'
  )
  .description('create local configuration settings for a repo to use')
  .action(function(options) {
    var initProgress = createReactComponents.initializeLocalSettings(CWD);

    if (options.templates) {
      initProgress.then(createReactComponents.initializeTemplates(CWD));
    }
  });

program
  .command('create <components...>')
  // .option('-p, --include-package <packages...>')
  .option('-c, --css-type <ext>', 'change extention for css file', 'css')
  .option('-i, --no-index')
  .option('-t, --no-test')
  .option('-n, --no-css', 'dont include a css for the components you create')
  .option('-d, --no-default <ext>', 'change extention for css file', 'css')
  .alias('c')
  .description('create a new component')
  .action(function(files, options) {
    console.log(options.css);
    // optionsToSettings(options);
    // console.log
    // createReactComponents(CWD, files);
  });

// program.command('* <components...>').action(function(files, options) {
//   // console.log('args in *: ', options);
//   createReactComponents(CWD, files);
// });

program.parse(process.argv);

// optionsToSettings(program);
