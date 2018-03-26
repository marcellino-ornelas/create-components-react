/*
 * Node Modules
*/

const fs = require("fs-extra");
const async = require("async");
const path = require("path")

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

function createReactComponent(dir, name="App"){

  // Ensure component name first letter is capital
  let fixedName = name[0].toUpperCase() + name.slice(1);

  let files = filesExt.map((ext) => path.join(dir, fixedName + ext) );

  async.each(files, fs.createFile, function(err){
    if(err){
      console.log("Error detected\n");
      console.log(err,"\n");
      console.log("shutting down process");
      process.exit(0);
    }


    // Create write stream for js file
    fs.writeFile(files[0], componentTemplate(fixedName), function(err){
      if(err){
        console.log("Error detected\n");
        console.log(err,"\n");
        console.log("shutting down process");
        process.exit(0);
      }
      console.log("Files have been created in " + dir);
      console.log("Happy coding...");
    })

  });

}

module.exports = createReactComponent;
