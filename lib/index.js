/*
 * Node Modules
*/

const path = require('path');
const utils = require('./utils');

function createReactComponent(dir, names){
 /*
   * Add the directory of the users input, if present,
   * to the directory of there curent working directory
  */
  if( !names.length ){
    // default
    names.push("App");
  }

  let jsFiles = [];

  let componentsData = utils.makePromiseList(names, function(name){

    if(typeof name !== "string") return;

    const parsedName = path.parse(name);

    if( !parsedName.base || /\W/gi.test(parsedName.base) ) return;

    /*
     * Add the directory of the users input, if present,
     * to the directory of there current working directory
    */
    let componentDir = parsedName.dir ? path.join(dir, parsedName.dir) : "";

    // Capitalize first character of a word
    let capitalizedWord = utils.capitalize( parsedName.base );

    if( !capitalizedWord ) return;

    // make list of files that a component needs
    let filesNames = utils.makeFileNames( componentDir, capitalizedWord );

    jsFiles.push([filesNames[0], capitalizedWord ])

    return utils.createFiles(filesNames)
  });

  // Create all Files
  Promise.resolve()
    .then(function(){
      // throw a error if no component names are invalid
      return componentsData.length ? Promise.resolve() : Promise.reject( new Error( utils.INVALID_FILES_ERROR ) )
    })
    .then(function(){ return Promise.all(componentsData); })
    .then(function(){
      let componentsFiles = utils.makePromiseList(jsFiles, function(data){
        let componentFile = data[0];
        let componentContents = data[1];
        return utils.makeComponentTemplate( componentFile, componentContents )
      });
      return Promise.all( componentsFiles );
    })
    .then(function(){
      console.log('Files have been created in ' + dir);
      console.log('Happy coding...');
    })
    .catch(function(err){
      console.log('Error detected\n');
      console.log(err.message,'\n');
      console.log('shutting down process');
      process.exit(0);
    });

}

module.exports = createReactComponent;
