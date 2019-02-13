/*
 * Template
 */

/*
 * modules
 */
const path = require('path');
const fs = require('fs-extra');
const dot = require('dot');
const utils = require('./utils');
const async = require('async');

let test = true;
const verbose = false;

dot.templateSettings.strip = false;
dot.log = verbose;

const defaultOpts = {
  verbose: false
};

const DOT_EXTENTION_MATCH = /.(dot|jst|def)$/i;
const DOT_INTERPOLATION_MATCH = /\{\{=([\s\S]+?)\}\}/g;

const Template = function(src, packages, opts) {
  const self = this;
  this.src = src;
  this.templates = {};
  this.packages = packages;
  this.queue = [];
  this.opts = opts || defaultOpts;

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

  self.log('rendering has began on', dest);

  fs.ensureDir(dest)
    .then(function() {
      async.each(
        self.packages,
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
          self.log('done processing ', dest);
          cb();
        }
      );
    })
    .catch(err =>
      console.log(
        'Internal error: please report this error as a github issue',
        err
      )
    );
};

Template.prototype._renderTemplateFiles = function(destPath, data, files) {
  const self = this;
  return new Promise(function(resolve, reject) {
    async.each(
      files,
      function(file, done) {
        const packagesToObject = self.packages.reduce(function(acc, next) {
          acc[next] = true;
          return acc;
        }, {});

        data = Object.assign(data, { packages: packagesToObject });

        const pathToComponent = path.join(
          destPath,
          file.path,
          file.fileName(data)
        );

        fs.outputFile(pathToComponent, file.compiler(data), done);
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
 * This function breaks down every package(folder) and saves all
 * directories and files that are nested inside. This is so when render is called
 * it can make all the directories and files that were saved. This function also pre
 * compiles all dot files.
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

  this.log('compiling package', package);

  const compilePackageDirectory = function(srcPath, destPath) {
    destPath = destPath || '';

    try {
      var directoryContents = fs.readdirSync(srcPath);
    } catch (e) {
      console.log(e);
      return;
    }

    // Filter out non directory names from list
    // Compile all directories
    directoryContents.forEach(function(directoryName) {
      const directoryPath = path.join(srcPath, directoryName);
      const newDestPath = path.join(destPath, directoryName);

      if (!utils.isDir(directoryPath)) {
        // files.push(directoryName);
        const file = new File(srcPath, destPath, directoryName);
        template.files.push(file);
      } else {
        template.directories.push(newDestPath);
        compilePackageDirectory(directoryPath, newDestPath);
      }
    });
  };

  compilePackageDirectory(PACKAGE_PATH);

  return template;
};

Template.prototype.log = function() {
  return this.opts.verbose && console.log.apply(console, arguments);
};

module.exports = Template;

/*
 * File
 */
function File(src, dest, fileName) {
  const self = this;

  this.src = src;
  this.path = dest;
  this.originalFileName = fileName;

  if (DOT_EXTENTION_MATCH.test(fileName)) {
    // strip dot extention
    this.isDot = true;
    fileName = fileName.replace(DOT_EXTENTION_MATCH, '').trim();
  }

  this.name = fileName;

  // compile fileName with dot for any interpolation inside of name
  this.fileName = (() => {
    const compiledName = dot.template(this.name);
    return function(data) {
      return this._addDefaultExtention(compiledName(data));
    };
  })();

  if (this.isDot) {
    // replace the compiler
    const pathToFile = path.join(src, this.originalFileName);
    const dotFileContents = fs.readFileSync(pathToFile);
    this.compiler = dot.template(dotFileContents);
  }
}

File.prototype.compiler = function() {
  return 'this isnt right';
};

File.prototype.isDot = false;
File.prototype._addDefaultExtention = function(name) {
  if (!/\./g.test(name)) {
    name += '.js';
  }

  return name;
};
