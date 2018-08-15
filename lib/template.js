/*
 * Template
*/

/*
 * modules
*/

const settings = require('./settings');
const path = require('path');
const fs = require('fs-extra');
const dot = require('dot');
const utils = require('./utils');
const async = require('async');

let test = true;
dot.templateSettings.strip = false;

const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;

// const TEMPLATE_FOLDER_PATH = path.join(settings.get('cwd'), './templates/');

const Template = function(src, packages) {
  const self = this;
  this.src = src;
  this.templates = {};
  this.packages = packages;

  packages.forEach(function(package) {
    self.templates[package] = self._retrievePackage(package);
  });
};

/*
 * Render 
 *  
 * This function will render all compiled packages that were passed into template instance at creation.
 * 
 * @arg dest {string} Path to where the compiled files save at
 * @arg data {object} This will be passed into doT for env variables in template files
 * @arg cb {function} Function to be called when all files and directories have been rendered. 
*/
Template.prototype.render = function(dest, data, cb) {
  const self = this;

  console.log('rendering has began on', dest);
  async.each(
    this.packages,
    function(packageName, done) {
      const template = self.templates[packageName];

      // make all directories for this package
      utils
        .ensureDirectories(dest, template.directories)
        .then(function() {
          return self._renderTemplateFiles(dest, data, template.files);
        })
        .then(done)
        .catch(function(err) {
          console.log('error in render: ', err);
          done();
        });
    },
    function() {
      console.log('done processing ', dest);
    }
  );
};

Template.prototype._renderTemplateFiles = function(
  destPath,
  dataForTemplates,
  files
) {
  return new Promise(function(resolve, reject) {
    async.each(
      files,
      function(fileTemplate, done) {
        const pathToComponent = path.join(
          destPath,
          fileTemplate.path,
          fileTemplate.name + fileTemplate.ext
        );
        fs.outputFile(
          pathToComponent,
          // fileTemplate.compiler({
          //   settings: settings._config,
          //   component: dataForTemplates
          // }),
          fileTemplate.compiler(dataForTemplates),
          done
        );
      },
      function(err, results) {
        err ? reject(err) : resolve();
      }
    );
  });
};

/*
 * Retrieve Package
 *
 * This function breaks down every package(aka folder) and saves all 
 * directories that are nested inside. This is so when render is called 
 * it can make all the directories that were saved. This function also pre 
 * dot files compiles all   
 *
 * @arg dest {string} Destination path to save all directories to
 * @arg dirs {string} All directories that need to be made
*/
Template.prototype._retrievePackage = function(package) {
  const PACKAGE_PATH = path.join(this.src, package);
  const self = this;

  var template = {
    directories: [],
    files: []
  };

  const compilePackageDirectory = function(srcPath, destPath) {
    destPath = destPath || '';

    try {
      var directoryContents = fs.readdirSync(srcPath);
    } catch (e) {
      console.log(e);
      return;
    }

    var files = [];

    // Filter out non directory names from list
    // Compile all directories
    directoryContents.forEach(function(directoryName) {
      const directoryPath = path.join(srcPath, directoryName);
      const newDestPath = path.join(destPath, directoryName);

      if (!utils.isDir(directoryPath)) {
        files.push(directoryName);
        return;
      }

      template.directories.push(newDestPath);
      compilePackageDirectory(directoryPath, newDestPath);
    });

    // console.log(files);
    self._compileTemplateFiles(srcPath, destPath, template, files);
  };

  compilePackageDirectory(PACKAGE_PATH);

  return template;
};

Template.prototype._compileTemplateFiles = function(
  srcPath,
  destPath,
  template,
  allFiles
) {
  let files = dot.process({
    path: srcPath
  });

  allFiles.forEach(function(fileName) {
    var fileNameWithoutDotExt = fileName.replace(DOT_EXTENTION_MATCH, '');

    var fileInfo = path.parse(fileNameWithoutDotExt);

    if (files.hasOwnProperty(fileInfo.name)) {
      template.files.push({
        compiler: files[fileInfo.name].bind(files),
        path: destPath,
        name: fileInfo.name,
        ext: fileInfo.ext || '.js'
      });
    }
  });
};

module.exports = Template;

var a = new Template(path.join(__dirname, '../templates/'), [
  'index',
  'component',
  'storage',
  'style'
]);

test && console.log(a);
// test && console.log(a.templates.index);
// test && console.log(a.templates.component);

a.render(
  __dirname + '/../examples/src/app',
  { component: { name: 'App', useCSS: true }, settings: {} },
  () => console.log('final done')
);

// var a = dot.process({ path: path.join(__dirname, '../templates/component/') });

// console.log(a);

// Template.prototype = {};
