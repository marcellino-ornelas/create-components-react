/*
 * Node Modules
*/

const path = require('path');
const async = require('async');
const fs = require('fs-extra');

const settings = require('./settings');
const Component = require('./component');
const Template = require('./template');

/*
 * Helper functions
*/
const utils = require('./utils');

DEFAULT_TEMPLATES_PATH = path.join(__dirname, '../templates');

/**
 * @arg dir { String } current working directory
 * @arg names { Array } components to create
 * @return null
 *
 * Create react components for each names passed in from the command line
 */

function createReactComponents(dir, names) {
  // Templates and local settings will only be used when the user in the directory
  // with a .ccr folder inside it
  let templatePath = settings.get('templates')
    ? path.join(dir, '.ccr/templates/')
    : DEFAULT_TEMPLATES_PATH;

  const TemplateOptions = {
    verbose: settings.get('verbose')
  };

  // Connect react adapter only for packages
  const adapter = require('./react-plugin.js')(settings._config);

  let extraPackages = settings.get('packages');

  // make extra packages empty array or array of values separated by ':'
  extraPackages = !extraPackages ? [] : extraPackages.split(':');

  const packages = adapter.packages.concat(extraPackages);

  const templates = new Template(templatePath, packages, TemplateOptions);

  // Extend the destination path for the components.
  dir = path.join(dir, settings.get('extendCwd') || '');

  async.each(
    names,
    function(name, done) {
      // Make a new component
      let component = new Component(dir, name);

      templates.render(
        component.dir,
        {
          settings: settings._config,
          component: component
        },
        done
      );
    },
    function(err) {
      if (err) {
        console.log('There was a internal problem');
      }

      console.log('PROCESSS DONE');
    }
  );
}

createReactComponents.initializeLocalSettings = function(cwd) {
  const SETTINGS_PATH = path.join(cwd, '.ccr');
  const SETTINGS_FILE_PATH = path.join(SETTINGS_PATH, 'settings.json');

  const jsonOptions = {
    spaces: '\t'
  };

  return fs
    .outputJson(SETTINGS_FILE_PATH, settings._config, jsonOptions)
    .then(() => log('initialized settings in: ', SETTINGS_PATH));
};

createReactComponents.initializeTemplates = function(cwd) {
  var TEMPLATES_PATH = path.join(cwd, '.ccr/templates');
  var DEFAULT_TEMPLATES_PATH = path.join(__dirname, '../templates/');

  return fs
    .copy(DEFAULT_TEMPLATES_PATH, TEMPLATES_PATH)
    .then(() => log('initializing templates at: ', TEMPLATES_PATH));
};

module.exports = createReactComponents;

/*
 * log
 * 
 * Only logs the arguments passed if the setting verbose mode is on.
*/
function log() {
  settings.get('verbose') && console.log.apply(console, arguments);
}
