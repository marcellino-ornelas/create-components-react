/*
 * Settings
*/

/*
 * Node Modules
*/
const utils = require('./utils');
const DEFAULT_SETTINGS = require('../default.config.json');

function RCSettings() {
  this._config = Object.assign(DEFAULT_SETTINGS.settings, {});
}

RCSettings.prototype.get = function(prop) {
  return this._config[prop] || null;
};

/*
 * Set
 * 
 * Change a setting value
 * will only change value if property exist on config object. 
 * It will not throw a error when trying to change a value thats not included
*/
RCSettings.prototype.set = function(prop, value, force) {
  var oldValue = this.get(prop);

  // check to see if property exist on object.
  if (utils.isValue(value) && (force || this._config.hasOwnProperty(prop))) {
    this._config[prop] = value;
  }

  return this;
};

RCSettings.prototype.import = function(config) {
  // need to validate
  for (var key in this._config) {
    this.set(key, config[key]);
  }

  return this;
};

module.exports = new RCSettings();
