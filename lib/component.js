/*
 * Component
 *
 * Constructor for structure of component paths
*/

const path = require('path');
const utils = require('./utils');

function Component(dir, name, opts) {
  // make name or each path to name to have a capital letter
  name = name
    .split(path.sep)
    .map(utils.capitalize)
    .join(path.sep);

  var componentData = path.parse(path.join(dir, name));

  // strip all invalid file name characters
  this.name = utils.normalizeFileName(componentData.name);

  this.dir = path.join(componentData.dir, this.name);
  // this.dirWithComponentName = path.join(this.dir, this.name);
}

module.exports = Component;
