/*
 * Settings
*/



/*
 * Node Modules
*/
const utils = require('./utils');
const DEFAULT_SETTINGS = require('../default.config.json');

var PROGRAM_SETTINGS = DEFAULT_SETTINGS.settings;
var HAS_BEEN_INITIALIZED = false;

const settings = module.exports = {};

/*
 * Initailize settings
*/
settings.init = function(options) {
  if( HAS_BEEN_INITIALIZED ){ return; }
  HAS_BEEN_INITIALIZED = true;
  
  utils.extend( PROGRAM_SETTINGS );
};


/*
 * load set settings
*/
settings.load = function() {
  return PROGRAM_SETTINGS;
};

