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
const fs = require('fs-extra');
const validFilename = require('valid-filename');
const filenamify = require('filenamify');

var utils = (exports = module.exports);

const test = false;

utils.capitalize = function capitalize(name) {
  /*
   * Capitalize the first character in the string
   * @argument { str } should take a be a single word
  */

  if (!name) {
    throw new Error('Capitalize only accepts a non-empty string as a argument');
  }

  let firstCharCapitalized = name[0].toUpperCase();

  // check to see if its already a capital letter
  return firstCharCapitalized === name[0]
    ? name
    : firstCharCapitalized + name.slice(1);
};

utils.normalizeFileName = function normalizeReactComponentName(fileName) {
  return !validFilename(fileName)
    ? filenamify(fileName, { replacement: '-' })
    : fileName;
};

/*
 * isDir
 *
 * @arg path {string} Directory path to check
*/
utils.isDir = function(path) {
  let dir;
  try {
    dir = fs.lstatSync(path);
  } catch (e) {
    console.log('internal error: ', e);
    return false;
  }

  return dir.isDirectory();
};

/*
 * Ensure Directories
 *
 * This function creates all directories in the destination path.
 *
 * @arg dest {string} Destination path to save all directories to
 * @arg dirs {string} All directories that need to be made
*/
utils.ensureDirectories = function(dest, dirs) {
  const inProgressDirectories = dirs.map(function(dirToMake) {
    return fs.ensureDir(path.join(dest, dirToMake));
  });

  return Promise.all(inProgressDirectories);
};

utils.isFunc = function(fn) {
  return typeof fn === 'function';
};

utils.isBool = function(bool) {
  return typeof bool === 'boolean';
};

utils.isValue = function(val) {
  return val !== null && val !== undefined;
};

// utils.INVALID_FILES_ERROR = `\
// Invalid file names. Before trying to run the command again, please check the names of your components that they would like to make. Names of components should contain only letters.`;
