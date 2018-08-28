#!/usr/bin/env node

/*
 * Create React Component
*/

const program = require('commander');
const settings = require('./lib/settings');
const fs = require('fs-extra');
const path = require('path');

const CWD = process.cwd();

// console.log('Current working directory: ', CWD);

// settings.set('cwd', CWD, true);

function optionsToSettings(_program) {
  // console.log('optiomns to settings:', options);
  _program.options.forEach(function(option) {
    var prop = option.attributeName();
    settings.set(prop, _program[prop]);
  });
}

try {
  var localSettings = fs.readJsonSync(path.join(CWD, '.ccr', 'settings.json'));

  settings.import(localSettings);
} catch (e) {
  settings.get('verbose') &&
    console.log(
      'Local settings were not located. Using default settings for configuration...'
    );
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
      settings.set('templates', true);
      initProgress.then(createReactComponents.initializeTemplates(CWD));
    }
  });

program
  .command('create <components...>')
  // .option('-p, --include-package <packages...>')
  .option('-c, --css-type <ext>', 'change extention for css file', 'css')
  .option(
    '-f, --functional',
    'use functional component instead of a state component'
  )
  .option(
    '-i, --no-index',
    'dont include default index file for the components you create'
  )
  .option('-n, --no-css', 'dont include a css for the components you create')
  .option(
    '-t, --no-test',
    'dont include a testing file for the components you create'
  )
  .option('-d, --no-default', 'change extention for css file', 'css')
  .option(
    '-r, --extend-cwd <path>',
    'A path to add on to your current working directory'
  )
  .alias('c')
  .description('create a new component')
  .action(function(files, options) {
    optionsToSettings(options);
    console.log(settings._config);
    createReactComponents(CWD, files);
  });

// program.command('* <components...>').action(function(files, options) {
//   optionsToSettings(options);
//   createReactComponents(CWD, files);
// });

program.parse(process.argv);

optionsToSettings(program);
