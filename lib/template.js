/*
 * Template
*/

/*
 * modules
*/
console.log('im runnings....');

const settings = require('./settings');
const path = require('path');
const fs = require('fs-extra');
const dot = require('dot');
const utils = require('./utils');
const async = require('async');

let test = true;
dot.templateSettings.strip = false;

const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;

const Template = function(src, packages) {
  const self = this;
  this.src = src;
  this.templates = {};
  this.packages = packages;
  this.queue = [];

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
      cb();
    }
  );
};

/*
 * plugin 
 *  
 * This function will render all compiled packages that were passed into template instance at creation.
 * 
 * @arg dest {string} Path to where the compiled files save at
 * @arg data {object} This will be passed into doT for env variables in template files
 * @arg cb {function} Function to be called when all files and directories have been rendered. 
*/
Template.prototype.plugin = function(options) {
  this.queue = this.queue.concat(options.process);
};

Template.prototype._renderTemplateFiles = function(
  destPath,
  dataForTemplates,
  files
) {
  const self = this;
  return new Promise(function(resolve, reject) {
    // change to promises?
    async.each(
      files,
      function(fileTemplate, done) {
        self.processPluginViews(fileTemplate, dataForTemplates);

        const pathToComponent = path.join(
          destPath,
          fileTemplate.path,
          fileTemplate.fileName()
        );
        fs.outputFile(
          pathToComponent,
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

Template.prototype.processPluginViews = function(fileTemplate, data) {
  this.queue.forEach(function(queued) {
    console.log(fileTemplate, !queued.match.test(fileTemplate.fileName));
    if (!queued.match.test(fileTemplate.fileName())) {
      return;
    }

    ['ext', 'name'].forEach(function(prop) {
      if (!utils.isValue(queued[prop])) {
        return;
      }

      fileTemplate[prop] = utils.isFunc(queued[prop])
        ? queued[prop](data)
        : queued[prop];
    });
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
      // template.files.push({
      //   compiler: files[fileInfo.name].bind(files),
      //   path: destPath,
      //   fileName: fileInfo.name + '.' + (fileInfo.ext.slice(1) || 'js'),
      //   name: fileInfo.name,
      //   ext: fileInfo.ext.slice(1) || 'js'
      // });
      template.files.push(
        new File(destPath, fileInfo, files[fileInfo.name].bind(files))
      );
    }
  });
};

module.exports = Template;

function File(destPath, fileInfo, compiler) {
  this.compiler = compiler;
  this.path = destPath;
  this.name = fileInfo.name;
  this.ext = fileInfo.ext.slice(1) || 'js';
}

File.prototype.fileName = function() {
  return this.name + '.' + this.ext;
};

// var a = new Template(path.join(__dirname, '../templates/'), [
//   'index',
//   'component',
//   'style'
// ]);

// a.plugin({
//   process: [
//     {
//       match: /\.css$/,
//       ext: settings.get('css'),
//       name: function(data) {
//         return data.component.name;
//       }
//     },
//     {
//       match: /^component/,
//       name: function(data) {
//         return data.component.name;
//       }
//     }
//   ]
// });

// test && console.log(a);
// test && console.log(a.templates.index);
// test && console.log(a.templates.component);

// test &&
//   a.render(
//     __dirname + '/../examples/src/app',
//     { component: { name: 'App', useCSS: true }, settings: {} },
//     () => console.log('final done')
//   );

// fs.removeSync(__dirname, )
