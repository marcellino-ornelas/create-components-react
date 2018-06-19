/*
 * Node Modules
*/
const chai = require('chai');
const fs = require('fs-extra');
const path = require('path');
const Component = require('../lib/component');


const expect = chai.expect;

const TESTING_ENV = __dirname;
const MAX_FILES_FOR_COMPONENTS = 3;

describe('Component', function() {
  
  describe('initialization', function() {

     beforeEach(function(){
      component = new Component(TESTING_ENV, 'App');
    });

    it('should create a new object', function() {
      expect( component ).to.be.a('object');
    });

    it('should create a new object with propertys [ name, dir, fileStructure ]', function() {
      expect( component.name ).to.be.a('string');
      expect( component.dir ).to.be.a('string');
      expect( component.fileStructure ).to.be.a('array');
    });

    it('Component name first charater should be capital letter', function() {
      var firstCharOfComponentName = component.name[0]
      expect( firstCharOfComponentName ).to.equal( firstCharOfComponentName.toUpperCase() );
    });

    it('Component dir should be a full path', function() {
      // expect( component.dir ).to.equal(  );
    });

    it('fileStructure should have correct number of files inside', function() {
      expect( component.fileStructure ).to.have.lengthOf( MAX_FILES_FOR_COMPONENTS );
    });

  });

  describe('Creation', function() {
    describe('normal', function() {

      before(function(done){
        component = new Component(TESTING_ENV, 'App');
        component.createComponent(done);
      });

      after(function(done){
        fs.remove( component.dir, done );
      });

      it('should create a new component structure', function(done) {
        console.log(component)
        expect( component.dir ).to.equal( path.join(__dirname, 'App') )
        fs.pathExists( component.dir, function(err, exists){

          done(err || !exists);

        })
      });

      it('should have a index.js file', function() {});
      it('should have a js file named from component name', function() {});
      it('should contain a css file named from component name', function() {});



    });
  });

});