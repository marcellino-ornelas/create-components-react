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
   * @arg { String } current working directory
   * @return
   *
   * create .....
   */

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

createReactComponents.initailizeLocalSettings = function() {};

module.exports = createReactComponents;
