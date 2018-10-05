/*
 * Testing for Templates
*/

const chai = require('chai');
const path = require('path');
const async = require('async');
const fs = require('fs-extra');

const Template = require('../lib/template');
const settings = require('../lib/settings');
const Component = require('../lib/component');
const reactAdapter = require('../lib/react-plugin');
const expect = chai.expect;

const test = false;
const packages = ['index', 'component', 'style'];
const testingComponents = ['App'];

const TEMPLATES_PATH = path.join(__dirname, '../templates/');
const TEMPLATES_DEST_PATH = path.join(__dirname, './testing-env');

test && console.log(reactAdapter, settings._config);

describe('Templates', function() {
  before(function() {
    template = new Template(
      TEMPLATES_PATH,
      reactAdapter(settings._config).packages
    );
    test && console.log(template);
  });

  describe('initialization', function() {
    it('should create a new object', function() {
      expect(template).to.be.a('object');
    });

    it('should create a new object with propertys [ src, templates, packages ]', function() {
      expect(template.src).to.be.a('string');
      expect(template.templates).to.be.a('object');
      expect(template.packages).to.be.a('array');
    });

    it('should load the correct number of packages', function() {
      packages.forEach(function(packageName) {
        expect(template.templates).to.have.property(packageName);
        expect(template.templates[packageName].files)
          .to.be.a('array')
          .to.have.lengthOf(1);
      });
    });
  }); // initialization

  describe('rendering', function() {
    before(function(done) {
      var component = new Component(TEMPLATES_DEST_PATH, 'App');
      template.render(
        component.dir,
        {
          settings: settings._config,
          component: component
        },
        done
      );
    });

    after(function(done) {
      fs.remove(TEMPLATES_DEST_PATH, done);
    });

    it('should render the correct number of files', function(done) {
      // Make the files with there paths for each component
      checkFilesExists(
        TEMPLATES_DEST_PATH,
        testingComponents,
        ['index.js', 'App.js', 'App.css'],
        done
      );
    });
  });
}); // Templates

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
