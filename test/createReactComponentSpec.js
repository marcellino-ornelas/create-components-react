/*
 * Node Modules
*/

const chai = require('chai');
const path = require('path');
const fs = require('fs-extra');
const async = require('async');
const child = require('child_process');

const cwd = __dirname;

function spawn(args,done){
    child.execFile(`node`, ['../index.js'].concat(args), {
      cwd: cwd,
    }, function(err, stdout, stderr){
      done(err);
    });
}

describe('Create React Component', function(){

  describe('Basic',function(){
    
    before(function(done){
      basicComponents = ['Nav', 'App', 'Nav/NavItem'];
      fullPathBasicComponents = basicComponents.map(function(name){ return path.join(cwd, name ) });
      spawn( basicComponents, done);
    })

    after(function(done){
      // delete file here
      async.each(fullPathBasicComponents, fs.remove, done);
    });

    it('should create correct files for all arguments', function(done){
      async.each( 
        fullPathBasicComponents,
        fs.pathExists,
        function(err, exixts){
          if(err) console.log(err);
          done(err);
      });

    });

  }) //Basic

});



