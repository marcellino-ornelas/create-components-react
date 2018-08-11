/*
 * Templates
*/

/*
 * modules
*/

const settings = require('./settings');
const path = require('path');
const fs = require('fs-extra');
const dot = require('dot');
// const async = require('async');

settings.set('cwd', path.join(__dirname, '../'), true);

dot.templateSettings.strip = false;

const DEFAULTS = ['main', 'index', 'style', 'test'];

const TEMPLATE_FOLDER_PATH = path.join(settings.get('cwd'), './templates/');

const Template = function(options) {
  const self = this;
  this.templates = {};

  // console.log(settings.get('cwd'));

  var templatesContents = fs.readdirSync(
    path.join(settings.get('cwd'), './templates/')
  );

  templatesContents.forEach(function(packageName, idx) {
    self.templates[packageName] = dot.process({
      path: path.join(TEMPLATE_FOLDER_PATH, packageName)
    });
  });

  // console.log(this.templates);

  // console.log(templates);
  // this.files = [];
  // this.folders = [];
};

Template.prototype.render = function(options) {};

new Template();

// Template.prototype = {};
