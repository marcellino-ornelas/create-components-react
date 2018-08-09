/*
 * Settings
*/

/*
 * Node Modules
*/
const utils = require('./utils');
const DEFAULT_SETTINGS = require('../default.config.json');

isValue = function(val) {
  return val !== null && val !== undefined;
};

function RCSettings() {
  this._config = DEFAULT_SETTINGS.settings;
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
RCSettings.prototype.set = function(prop, value) {
  var oldValue = this.get(prop);

  // check to see if property exist on object.
  if (isValue(oldValue)) {
    this._config[prop] = value;
  }

  return this;
};

RCSettings.prototype.import = function(config) {
  // need to validate
  for (var key in this._config) {
    if (this._config.hasOwnProperty(key) && isValue(config[key])) {
      this.set(key, config[key]);
    }
  }

  return this;
};

module.exports = new RCSettings();