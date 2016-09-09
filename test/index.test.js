/* globals describe, after, it */
'use strict';

/**
 * module dependencies
 */
var expect = require( 'chai' ).expect;
var fs = require( 'fs' );
var mkdirp = require( '../src' );
var Promise = require( 'bluebird' );

/**
 * module variables
 */
var dirname = 'test-temp/sub/folder';

describe( 'mkdirp( path[, mode][, ignore] )', function () {
  describe( 'should resolve', function () {
    var promises = mkdirp( dirname );

    it( 'with an array of 3 promises when the path is `test-temp/sub/folder`', function () {
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
  } );

  describe( 'should reject', function () {
    after(
      function () {
        fs.rmdirSync( 'test-temp/sub/folder' );
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
