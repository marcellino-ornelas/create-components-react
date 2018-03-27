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

const filesExt = ['.js','.css'];

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


module.exports.capitalize = function(str){
  /*
   * Capitalize the first character in the string
   * @argument { str } should take a be a single word
  */

  // Get first word even if there's spaces
  str = str.trim().split(' ')[0];

  let firstCharCapitalized = str[0].toUpperCase();

  // check to see if its already a capital letter
  return firstCharCapitalized === str[0] ? str : (firstCharCapitalized + str.slice(1));
};

module.exports.makeFileNames = function( dir, componentName ){
  /*
   * Make the file names for component;
  */
  return filesExt.map((ext) => path.join(dir, componentName + ext) );
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






