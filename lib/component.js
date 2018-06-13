/*
 * Component
 *
 * Constructor for structure of component paths
*/

var path = require('path');
var utils = require('./utils');
var fs = require('fs-extra');
var async = require('async')

function Component( dir, name ){

  this.name = utils.capitalize( name );
  this.dir = path.join( dir, this.name );
	
  var componentFilePath = path.join(this.dir, this.name);
	
  this.neededFolders = [];
	this.fileStructure = [
		[ 'component', ( componentFilePath + '.js' ) ],
		[ 'index', path.join( this.dir, 'index.js' ) ],
		[ 'css', ( componentFilePath + '.css' ) ],
	];
}

Component.prototype.createComponentTemplate = function(){

  fs.ensureDir( this.dir )
    .then(function(){
      console.log('Creating ' + this.name + ' at ' + this.dir );
      async.parallell()
    })
    .catch(function(err){
      console.log(err);
    })
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

