/*
 * Utils.js
 *
 * Helper functions
*/

/*
 * Modules
*/
const async = require('async');
const path = require('path');

const validFilename = require('valid-filename');
const filenamify = require('filenamify');
// const isValidPath = require('is-valid-path');

var utils = exports = module.exports;

utils.capitalize = function capitalize( name ){
  /*
   * Capitalize the first character in the string
   * @argument { str } should take a be a single word
  */

  // Get first word even if there's spaces
  if(!name){ throw new Error('Capitalize only accepts a string as a argument') }

  let firstCharCapitalized = name[0].toUpperCase();

  // check to see if its already a capital letter
  return firstCharCapitalized === name[0] ? name : (firstCharCapitalized + name.slice(1));
};

utils.normalizeFileName = function normalizeReactComponentName( fileName ){

  return !validFilename( fileName ) ? filenamify(fileName,{ replacement: '-'}) : fileName;

}


utils.INVALID_FILES_ERROR = `\
Invalid file names. Before trying to run the command again, please check the names of your components that they would like to make. Names of components should contain only letters.`







