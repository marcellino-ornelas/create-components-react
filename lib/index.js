/*
 * Node Modules
*/

const path = require('path');
const utils = require('./utils');
const async = require('async');
const Component = require('./component');


function createReactComponent(dir, names){
  /**
   * @arg { String } current working directory
   * @return
   *
   * Add the directory of the users input, if present,
   * to the directory of there curent working directory
  */

  async.each(names, function(name, done){

    // Make a new component
    new Component(dir, name ).createComponent( done );

  }, function(err){
    if(err){
      console.log('There was a internal problem');
    }

    console.log('PROCESSS DONE');


  });
}

module.exports = createReactComponent;