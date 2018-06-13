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
const isPromise = require("ispromise");

const filesExt = ['.js','.css'];

const templates = {};

const componentTemplate = function(name){
  return`\
import React, { Component } from 'react';
import './${name}.css';

class ${name} extends Component {
  // constructor(props){
    // super();
    // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div></div>
    );
  }
}

export default ${name};
`
}

const indexTemplate = function(name){
  return`\
export default ./${name}.js
`
}

module.exports.capitalize = function(str){
  /*
   * Capitalize the first character in the string
   * @argument { str } should take a be a single word
  */

  // Get first word even if there's spaces
  str = str.trim().split(' ')[0];

  if(!str){ return; }

  let firstCharCapitalized = str[0].toUpperCase();

  // check to see if its already a capital letter
  return firstCharCapitalized === str[0] ? str : (firstCharCapitalized + str.slice(1));
};


module.exports.makeFileNames = function( dir, componentName ){
  /*
   * Make the file names for component;
  */
  var fileNames = filesExt.map((ext) => path.join(dir, componentName + ext) );
  fileNames.push( path.join(dir, 'index.js') );
  return fileNames;
};


module.exports.createFiles = function( fileNames ){
  /*
   * Make the files for component
  */
  return new Promise(function( resolve, reject ){
    async.each(fileNames, fs.createFile, function( err ){
      err ? reject(err) : resolve();
    });
  });
};


module.exports.makeComponentTemplate = function( fileName, componentName ){
  /*
   * Make the files for component
  */
  return new Promise(function( resolve, reject ){
    fs.writeFile( fileName, componentTemplate( componentName ), function(err){
      err ? reject(err) : resolve();
    })
  });
};

module.exports.makePromiseList = function(arr, cb){
  /*
   * Make a Promise filled List
   * cb must return a promise
   * any other value will be ignored
  */ 
  let PromiseArray = [];

  for(let i = 0; i < arr.length; i++){
    let result = cb( arr[i], i );

    if( isPromise(result) ) PromiseArray.push( result );
  }

  return PromiseArray;
};

module.exports.INVALID_FILES_ERROR = `\
Invalid file names. Before trying to run the command again, please check the names of your components that they would like to make. Names of components should contain only letters.`







