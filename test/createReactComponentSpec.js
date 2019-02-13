/*
 * Node Modules
 */

const chai = require('chai');
const path = require('path');
const fs = require('fs-extra');
const async = require('async');
const child = require('child_process');

const testingFolder = './testing-env';
const cwd = path.join(__dirname, testingFolder);

// use App as the component being generated
const settings = [
  { flag: ['-c', 'less'], files: ['App.js', 'App.less', 'index.js'] },
  { flag: ['-i'], files: ['App.js', 'App.css'] },
  { flag: ['-f'], files: ['App.css', 'App.js'] },
  { flag: ['-s'], files: ['App.js', 'index.js'] },
  { flag: ['-d'], files: [] },
  { flag: ['-t'], files: ['App.js', 'App.less', 'index.js', 'App.test.js'] }
];

const test = false;

test && console.log(cwd);

describe('Create React Component', function() {
  before(function(done) {
    fs.ensureDir(cwd, done);
  });

  after(function(done) {
    fs.remove(cwd, done);
  });

  describe('create', function() {
    before(function(done) {
      basicComponents = ['Nav', 'App', 'Nav/NavItem'];
      fullPathBasicComponents = basicComponents.map(function(name) {
        return path.join(cwd, name);
      });

      basicComponents.unshift('create');
      spawn(basicComponents, done);
    });

    it('should create correct files for all arguments', function(done) {
      async.each(fullPathBasicComponents, fs.pathExists, function(err, exixts) {
        if (err) console.log(err);
        done(err);
      });
    });
  }); //Basic

  describe('init', function() {
    const SETTINGS_PATH = path.join(cwd, '.ccr');
    test && console.log('here: ', SETTINGS_PATH);

    before(function(done) {
      spawn(['init'], done);
    });

    after(function(done) {
      fs.remove(path.join(cwd, '.ccr'), done);
    });

    it('should create a .ccr/ folder in cwd', function(done) {
      fs.pathExists(SETTINGS_PATH, done);
    });

    it('should create a settings.json file inside .ccr/ ', function(done) {
      fs.pathExists(path.join(SETTINGS_PATH, 'settings.json'), done);
    });
  });

  describe('settings', function() {
    settings.forEach(function(setting) {
      it(`flag (${setting.flag.join(
        ' '
      )}) should render the correct files`, function(done) {
        spawn(['create'].concat(setting.flag, 'App'), function(err) {
          if (err) {
            return done(err);
          }
          checkFilesExists(cwd, ['App'], setting.files, done);
        });
      });
    });
  });
});

/*
 * Helper functions
 */

function spawn(args, done) {
  child.execFile(
    `node`,
    ['../../index.js'].concat(args),
    {
      cwd: cwd
    },
    function(err, stdout, stderr) {
      test && console.log('err:', err);
      test && console.log('stdout:', stdout);
      test && console.log('stderr:', stderr);
      done(err || stderr);
    }
  );
}

function makeComponentFiles(dest, components, files) {
  return components.map(function(component_path) {
    return files.map(function(file) {
      return path.join(dest, component_path, file);
    });
  });
}

function checkFilesExists(dest, components, files, done) {
  const renderedFiles = makeComponentFiles(dest, components, files);

  async.each(
    renderedFiles,
    function(files, next) {
      async.each(
        files,
        function(file, nextInner) {
          fs.pathExists(file, function(err, exists) {
            err =
              err || !exists
                ? new Error('File:' + file + ' Doesnt exists')
                : null;
            nextInner(err);
          });
        },
        next
      );
    },
    done
  );
}
