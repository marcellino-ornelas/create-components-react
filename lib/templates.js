/*
 * Templates
*/

/*
 * modules
*/

// const settings = require('./settings');
const path = require('path');
const fs = require('fs-extra');
const dot = require('dot');
const async = require('async');

// settings.set('cwd', path.join(__dirname, '../'), true);

dot.templateSettings.strip = false;

// const DEFAULTS = ['main', 'index', 'style', 'test'];

// const TEMPLATE_FOLDER_PATH = path.join(settings.get('cwd'), './templates/');

const Template = function(src, packages) {
  const self = this;
  this.src = src;
  this.templates = {};
  this.packages = packages;
  // console.log(settings.get('cwd'));

  // var templatesContents = fs.readdirSync(
  //   path.join(settings.get('cwd'), './templates/')
  // )

  packages.forEach(function(package) {
    self.templates[package] = self.retrievePackage(package);
  });

  // templatesContents.forEach(function(packageName, idx) {
  //   self.templates[packageName] = dot.process({
  //     path: path.join(TEMPLATE_FOLDER_PATH, packageName)
  //   });
  // });

  // console.log(this.templates);
};

Template.prototype.retrievePackage = function(package) {
  const PACKAGE_PATH = path.join(this.src, package);

  var template = {
    directorys: [],
    files: []
  };

  var scan = function(templatePath, context) {
    context = context || '';
    try {
      var packageContents = fs.readdirSync(templatePath);
    } catch (e) {
      console.log(e);
      return;
    }

    packageContents.forEach(function(content) {
      const contentPath = path.join(templatePath, content);

      if (fs.lstatSync(contentPath).isDirectory()) {
        let newContext = path.join(context, content);
        template.directorys.push(newContext);
        scan(contentPath, newContext);
      }
    });

    let files = dot.process({
      path: templatePath
    });

    for (let key in files) {
      if (files.hasOwnProperty(key)) {
        template.files.push({
          compiler: files[key],
          path: context,
          name: key
        });
      }
    }
  };

  scan(PACKAGE_PATH);

  return template;
};
// retrive
// Template.prototype._renderFiles = function() {
//   if (!settings.get('defaults')) {
//     // var defaults = ['index', 'component'];
//     // this.packages.push('defaults');

//     defaults.forEach(function(defaultItem) {
//       if (settings.get(defaultItem)) {
//         self.templates[defaultItem];
//       }
//     });
//   }
// };

Template.prototype.render = function(dest, data, cb) {
  const self = this;
  const queue = [];

  // options.dest
  // options.packages

  // async.each(
  //   // component.fileStructure,
  //   function(file, done) {
  //     let fileProcess; // = file.type === 'package' ? this.renderPackage( file ) :
  //     if (file.type === 'package') {
  //       fileProcess = this._renderPackage(file);
  //     } else {
  //     }
  //   },
  //   function() {}
  // );

  // for (let key in this.packages) {
  //   if (this.templates[key]) {
  //   }
  // }
};

console.log(new Template('../templates/', ['defaults']).templates.defaults);

// Template.prototype = {};
