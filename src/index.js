/* eslint no-param-reassign: off, prefer-template: off */

'use strict';

/**
 * module dependencies
 */
var mkdir = require( 'mkdir-bluebird' );
var path = require( 'path' );

/**
 * promise wrapper for a linux like mkdir -p that ignores EEXIST by default
 *
 * @param {string|buffer} pathp
 * @param {number} [mode = 0o777]
 * @param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`
 *
 * @returns {Array}
 */
module.exports = function mkdirp( pathp, mode, ignore ) {
  var built_path = '';
  var initial_slash = false;

  if ( pathp.charAt( 0 ) === '/' ) {
    initial_slash = true;
  }

  return pathp.split( '/' ).reduce(
    function ( promises, path_piece, index ) {
      if ( path_piece === '' ) {
        return promises;
      }

      if ( index === 1 && initial_slash ) {
        path_piece = '/' + path_piece;
      }

      built_path = path.join( built_path, path_piece );
      promises.push( mkdir( built_path, mode, ignore ) );

      return promises;
    },
    []
  );
};
