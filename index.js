#!/usr/bin/env node

/*
 * Create React Component
*/

const program = require('commander');
const settings = require('./lib/settings');
const fs = require('fs-extra');
const path = require('path');

const utils = require('./lib/utils');

const CWD = process.cwd();

try {
  var localSettings = fs.readJsonSync(path.join(CWD, '.ccr', 'settings.json'));

  settings.import(localSettings);
  // console.log(settings);
} catch (e) {
  settings.get('verbose') &&
    console.log(
      'Local settings were not located. Using default settings for configuration...'
    );
}

const createReactComponents = require('./lib');

program.version('2.0.3');

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
  .option('-v, --verbose', 'logs', false)
  .option('-c, --css-type <ext>', 'change extention for css file', 'css')
  .option(
    '-f, --functional',
    'Use functional component instead of a state component',
    false
  )
  .option(
    '-i, --no-index',
    "Don't include default index file for the components you create"
  )
  .option('-s, --no-css', "Don't include a css for the component(s) you create")
  .option('-d, --no-default', 'change extention for css file', 'css')
  .option(
    '-t, --test',
    'Include a testing file for the component(s) you create'
  )
  .option(
    '-r, --extend-cwd <path>',
    'A path to add on to your current working directory'
  )
  .option(
    '-p, --packages <packages>',
    'A path to add on to your current working directory'
  )
  .alias('c')
  .description('create a new component')
  .action(function(files, options) {
    console.log('css', options.css);

    deleteDefaultBoolFlags(options);

    optionsToSettings(options);
    createReactComponents(CWD, files);
  });

// program.command('* <components...>').action(function(files, options) {
//   optionsToSettings(options);
//   createReactComponents(CWD, files);
// });

program.parse(process.argv);

optionsToSettings(program);

/*
 * Helper Functions
*/

/*
 * Deletes the property from commander with flags 
 * that have: ( --no-* ) so that it doesnt override
 * settings from users style sheet
*/
function deleteDefaultBoolFlags(options) {
  options.options.forEach(function(option) {
    const prop = option.attributeName();
    const isBoolFlag = /^--no/.test(option.long) || utils.isBool(options[prop]);

    if (isBoolFlag) {
      options[prop] = undefined;
    }
  });
}

function optionsToSettings(_program) {
  _program.options.forEach(function(option) {
    var prop = option.attributeName();
    settings.set(prop, _program[prop], true);
  });
}
