/*
 * Node Modules
*/

const path = require('path');
const utils = require('./utils');
const async = require('async');
const Component = require('./component');
const settings = require('./settings');
const fs = require('fs-extra');

function createReactComponents(dir, names) {
  /**
   * @arg dir { String } current working directory
   * @arg names { Array } current working directory
   * @return
   *
   * Create react components for each name in names
   */

  try {
    var localSettings = fs.readJsonSync(
      path.join(dir, '.ccr', 'settings.json')
    );

    settings.import(localSettings);
  } catch (e) {
    console.log(
      'Local settings were not located. Using default settings for configuration...'
    );
  }

  async.each(
    names,
    function(name, done) {
      // Make a new component
      new Component(dir, name).createComponent(done);
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
  var SETTINGS_PATH = path.join(cwd, '.ccr');
  return fs
    .outputJson(path.join(SETTINGS_PATH, 'settings.json'), settings._config)
    .then(() => console.log('initialized settings in: ', SETTINGS_PATH));
};

createReactComponents.initializeTemplates = function(cwd) {
  var TEMPLATES_PATH = path.join(cwd, '.ccr/templates');
  var DEFAULT_TEMPLATES_PATH = path.join(__dirname, '../templates/');

  return fs
    .copy(DEFAULT_TEMPLATES_PATH, TEMPLATES_PATH)
    .then(() => console.log('initializing templates at: ', TEMPLATES_PATH));
};

module.exports = createReactComponents;
