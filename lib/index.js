/*
 * Node Modules
*/

const path = require('path');
const utils = require('./utils');

function createReactComponent(dir, name){

  const parsedName = path.parse(name || 'App');

  if(parsedName.dir){
    /*
     * Add the directory of the users input, if present,
     * to the directory of there curent working directory
    */
    dir = path.join(dir, parsedName.dir);
  }

  // Capitalize first character of a word
  let capitalizedWord = utils.capitalize( parsedName.base );

  // make list of files that a component needs
  let filesNames = utils.makeFileNames( dir, capitalizedWord );

  // Create all Files
  utils.createFiles(filesNames)
    .then(function(){
      return utils.makeComponentTemplate( filesNames[0], capitalizedWord );
    })
    .then(function(){
      console.log('Files have been created in ' + dir);
      console.log('Happy coding...');
    })
    .catch(function(err){
      console.log('Error detected\n');
      console.log(err,'\n');
      console.log('shutting down process');
      process.exit(0);
    });

}

module.exports = createReactComponent;
