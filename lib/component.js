/*
 * Component
 *
 * Constructor for structure of component paths
*/

var path = require('path');
var utils = require('./utils');
var fs = require('fs-extra');
var async = require('async');
const isValidPath = require('is-valid-path');
/*const template = require('./templates');*/

const settings = require('./settings');

function Component(dir, name) {
  // make name or each path to name to have a capital letter
  name = name
    .split(path.sep)
    .map(utils.capitalize)
    .join(path.sep);

  var componentData = path.parse(path.join(dir, name));

  // strip all invalid file name characters
  this.name = utils.normalizeFileName(componentData.name);

  this.dir = path.join(componentData.dir, this.name);
  this.dirWithComponentName = path.join(this.dir, this.name);

  // this.neededFolders = [];
  this.fileStructure = [
    { type: 'component', path: this.dirWithComponentName + '.js' },
    // {
    //   type: 'style',
    //   path: this.dirWithComponentName + '.' + settings.get('css')
    // },
    { type: 'index', path: path.join(this.dir, 'index.js') }
  ];

  // this.packages = settings.get('');
}

/*
 * Create Component 
 * 
*/
// Component.prototype.makeFilePathWith = function(name, ext){
//   return path.join( this.dir, this.name + ext  );
// }

Component.prototype.createComponent = function(cb) {
  var self = this;

  // const template = new Template();

  // template.render(this);

  // template.complie();

  // async.each(
  //   self.fileStructure,
  //   function(fileData, done) {
  //     self.createFile(fileData, function(err) {
  //       if (err) {
  //         var fileInfo = path.parse(fileData.path);
  //         console.log(err);
  //         console.log('There was a problem saving one of the component files.');
  //         console.log(
  //           'Please check out your component (path or name) to make sure there valid arguments'
  //         );
  //         console.log('Error: ');
  //         console.log(' File: ', fileInfo.base);
  //         console.log(' Directory: ', fileInfo.dir);
  //         console.log('\n\n');
  //       }

  //       done();
  //     });
  //   },
  //   cb
  // );
};

// Component.prototype.createFile = function(fileData, cb) {
//   var fileContents = templates[fileData.type](this.name);

//   fs.outputFile(fileData.path, fileContents, cb);
// };

/*
 * Page templates
*/
// const templates = {};

// templates.component = function(name) {
//   return `\
// import React, { Component } from 'react';
// import './${name}.${settings.get('css')}';

// class ${name} extends Component {
//   // constructor(props){
//     // super();
//     // this.state = {};
//   // }

//   // componentWillMount(){}
//   // componentDidMount(){}
//   // componentWillUnmount(){}

//   // componentWillReceiveProps(){}
//   // shouldComponentUpdate(){}
//   // componentWillUpdate(){}
//   // componentDidUpdate(){}

//   render() {
//     return (
//       <div></div>
//     );
//   }
// }

// export default ${name};
// `;
// };

// templates.index = function(name) {
//   return `\
// export { default } from './${name}.js'
// `;
// };

// templates.css = function(name) {
//   return `\
// /*
//  * ${name} CSS Styles
// */
// `;
// };

module.exports = Component;
