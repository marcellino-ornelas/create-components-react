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


function Component( dir, name ){

  // make name or each path to name to have a capital letter
  name = name.split( path.sep ).map( utils.capitalize ).join( path.sep );

  var componentData = path.parse( path.join(dir, name) );

  // strip all invalid file name characters
  this.name = utils.normalizeFileName( componentData.name );

  this.dir = path.join( componentData.dir, this.name );

	
  var componentFilePath = path.join(this.dir, this.name);
	
  this.neededFolders = [];
	this.fileStructure = [
		{ type: 'component', path: ( componentFilePath + '.js' ) },
		{ type: 'css', path: ( componentFilePath + '.css' ) },
    { type: 'index', path: path.join( this.dir, 'index.js' ) },
	];
}

/*
 * Create Component 
 * 
*/
// Component.prototype.makeFilePathWith = function(name, ext){
//   return path.join( this.dir, this.name + ext  );
// }

Component.prototype.createComponent = function(cb){
  var self = this;
  fs.ensureDir( self.dir )
    .then(function(){
      console.log('Creating ' + self.name + ' at ' + self.dir );

      async.each( self.fileStructure, function(fileData, done){
        self.createFile( fileData, function(err){

          if( err ){ 
            console.log('There was a problem with saving your data');
          }
          
          done();

        })
      }, cb);

    })
    .catch(function(err){
      console.log(err);
    })
}

Component.prototype.createFile = function( fileData, cb ){

  var fileContents = templates[ fileData.type ]( this.name );

  fs.writeFile( fileData.path, fileContents, cb  );
}



/*
 * Page templates
*/
const templates = {};

templates.component = function(name){
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

templates.index = function(name){
  return`\
export default './${name}.js'
`
}

templates.css = function(name){
  return`\
/*
 * ${name} CSS Styles
*/
`
}


// module.exports = Component;

new Component(__dirname, 'nav/key/bye/youSuck')
new Component(__dirname, 'nav/item')
new Component(__dirname, 'navItem')



