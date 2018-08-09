/*
 * Templates
*/

/*
 * modules
*/

const settings = require('./settings');
const dot = require('dot');

const DEFAULTS = ['main', 'index', 'style'];

const Template = function(options) {
  this.files = [];
  this.folders = [];
};

// Template.prototype = {};
