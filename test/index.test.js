/* globals describe, after, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var fs = require( 'fs' );
var mkdirp = require( '../src' );
var path = require( 'path' );
var Promise = require( 'bluebird' );

describe( 'mkdirp( path[, mode][, ignore] )', function () {
  describe( 'mkdirp( \'test-temp/sub/folder\' ) should resolve', function () {
    var dirname = 'test-temp/sub/folder';
    var promises = mkdirp( dirname );

    it( 'with an array of 3 promises', function () {
      return Promise.all( promises )
        .then(
          function ( results ) {
            expect( results ).to.be.an( 'array' ).with.length( 3 );
          }
        );
    } );

    it( 'with each promise resolving with the value `true`', function () {
      return Promise.all( promises )
        .then(
          function ( results ) {
            results.forEach(
              function ( result ) {
                expect( result ).to.equal( true );
              }
            );
          }
        );
    } );

    it( 'and the relative directory existing', function () {
      return Promise.all( promises )
        .then(
          function () {
            var stat = fs.statSync( dirname );

            expect( stat.isDirectory() ).to.equal( true );
          }
        );
    } );
  } );

  describe( 'mkdirp( path.join( __dirname + \'test-temp/sub/folder2\' ) ) should resolve', function () {
    var dirname = path.join( __dirname, '..', 'test-temp/sub/folder2' );
    var promises = mkdirp( dirname );

    it( 'with the absolute path existing', function() {
      return Promise.all( promises )
        .then(
          function () {
            var stat = fs.statSync( dirname );

            expect( stat.isDirectory() ).to.equal( true );
          }
        );
    } );
  } );

  describe( 'should reject', function () {
    var dirname = 'test-temp/sub/folder';

    after(
      function () {
        fs.rmdirSync( 'test-temp/sub/folder' );
        fs.rmdirSync( 'test-temp/sub/folder2' );
        fs.rmdirSync( 'test-temp/sub' );
        fs.rmdirSync( 'test-temp/' );
      }
    );

    it( 'with `Error: EEXIST` when `ignore` is set to false', function () {
      return Promise.all( mkdirp( dirname, null, false ) )
        .catch(
          function ( err ) {
            expect( err ).to.be.instanceof( Error );
            expect( err.message ).to.include( 'EEXIST' );
          }
        );
    } );
  } );
} );
