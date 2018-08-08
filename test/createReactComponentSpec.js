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

console.log(cwd);

const test = false;

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
      done(err);
    }
  );
}

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

    it('should create a .ccr/ folder in cwd', function(done) {
      fs.pathExists(SETTINGS_PATH, done);
    });

    it('should create a settings.json file inside .ccr/ ', function(done) {
      fs.pathExists(path.join(SETTINGS_PATH, 'settings.json'), done);
    });
  });
});
