// /*
//  * Node Modules
// */

// const chai = require('chai');
// const path = require('path');
// const fs = require('fs-extra');
// const async = require('async');
// const child = require('child_process');

// const cwd = __dirname;


// function spawn(args,done){
//     child_process.execFile('node', args, {
//       cwd: cwd,

//     },function(err, stdout, stderr){
//       done(err);
//     });
// }

// function deleteFile( name, done ){
//   fs.remove( path.join( cwd, name), done);
// }

// describe('Create React Component', function(){

//   // it('Should not throw any errors',function( done ){
//   //   spawn(['App'], done);
//   // });

//   describe('Basic',function(){
//     basicCompnents = ['Nav', 'App'];
//     before(function(done){
//       spawn( basicCompnents, done);
//     })

//     it('should create correct files for all arguments', function(done){
//       async.each( basicCompnents, fs.pathExists, function(err, exixts){
//         if( err ) done(err);
//       });
//     });



//     after(function(done){
//       // delete file here
//       deleteFile('App', done);
//     });

//   }) //Basic

  // describe('Arguments',function(){

  //   before(function(done){
  //     spawn(['Nav', 'App'], done);
  //   })



  //   after(function(done){
  //     // delete file here
  //     deleteFile('App', done);
  //   });
  // })


  
  // it('Should make a component with provided argument',function( done ){
  //   spawn(['App'], function(){

  //   });
  // });

});



