/*
 * Testing for Templates
*/

const chai = require('chai');
const path = require('path');
const Template = require('../lib/template');

const fs = require('fs-extra');

const settings = require('../lib/settings');
const Component = require('../lib/component');

const expect = chai.expect;

const packages = ['index', 'component', 'style'];

const TEMPLATES_PATH = path.join(__dirname, '../templates/');
const TESTING_ENV = __dirname;
const TEMPLATES_DEST_PATH = path.join(__dirname, './testing-env');

describe('Templates', function() {
  before(function() {
    template = new Template(TEMPLATES_PATH, packages);
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
      template.render(
        TEMPLATES_DEST_PATH,
        {
          settings: settings._config,
          component: new Component(TEMPLATES_DEST_PATH, 'App')
        },
        done
      );
    });

    after(function(done) {
      fs.remove(TEMPLATES_DEST_PATH, done);
    });

    // it('should should render correct number of files', function() {});
  });
}); // Templates
