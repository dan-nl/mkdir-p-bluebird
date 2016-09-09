'use strict';

/**
 * module dependencies
 */
var mkdir = require( 'mkdir-bluebird' );
var path = require( 'path' );

/**
 * a linux like `mkdir -p` for node.js that uses node’s `fs.writeFile()` and bluebird promises.
 *
 * @param {string|buffer} pathp
 * @param {number} [mode = 0o777]
 * @param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`
 *
 * @returns {Array}
 */
module.exports = function mkdirp( pathp, mode, ignore ) {
  var built_path = '';

  return pathp.split( '/' ).reduce(
    function( promises, path_piece ) {
      built_path = path.join( built_path, path_piece );
      promises.push( mkdir( built_path, mode, ignore ) );
      return promises;
    },
    []
  );
};
