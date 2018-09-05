/*
 * Node Modules
*/
const chai = require('chai');
const fs = require('fs-extra');
const path = require('path');
const Component = require('../lib/component');

const expect = chai.expect;

const TESTING_ENV = __dirname;

describe('Component', function() {
  describe('initialization', function() {
    beforeEach(function() {
      component = new Component(TESTING_ENV, 'App');
    });

    it('should create a new object', function() {
      expect(component).to.be.a('object');
    });

    it('should create a new object with propertys [ name, dir, dirWithComponentName ]', function() {
      expect(component.name).to.be.a('string');
      expect(component.dir).to.be.a('string');
      // expect(component.dirWithComponentName).to.be.a('string');
    });

    it('should capitalize the first char in component name', function() {
      var firstChar = component.name[0];
      expect(firstChar).to.equal(firstChar.toUpperCase());
    });

    it('Each name in component path should all be capitalized', function() {
      var isCapitalized = component.name.split(path.sep).every(function(item) {
        let firstCharOfComponentName = item[0];
        return (
          firstCharOfComponentName === firstCharOfComponentName.toUpperCase()
        );
      });

      expect(isCapitalized).to.be.true;
    });
  }); // initialization
}); // Component
