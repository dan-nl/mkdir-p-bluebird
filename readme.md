# mkdir-p-bluebird
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][david-dm-image]][david-dm-url] [![NSP Status][nsp-image]][nsp-url]

promise wrapper for a linux like mkdir -p that ignores EEXIST by default; uses [mkdir-bluebird][mkdir-bluebird-url] to create the [`fs.mkdir()`][fs-mkdir] promises.

## table of contents
* [installation](#installation)
* [usage](#usage)
    * [mkdirp( pathp[, mode][, ignore] )](#mkdirp-pathp-mode-ignore-)
    * [default](#default)
    * [set ignore to false](#set-ignore-to-false)
    * [using node’s path module](#using-nodes-path-module)
* [license](#license)

## installation
```javascript
npm install mkdir-p-bluebird
```

## usage
### mkdirp( pathp[, mode][, ignore] )
```javascript
@param {string|buffer} pathp
@param {number} [mode = 0o777]
@param {boolean} [ignore = true] ignore `EEXIST` directory errors returned by `fs.mkdir()`
@returns {Array}
```

### default
ignores `EEXIST` directory errors returned by `fs.mkdir()`
```javascript
var mkdirp = require( 'mkdir-p-bluebird' );
var Promise = require( 'bluebird' );

Promsie.all( mkdirp( 'test-dir/sub/folder' ) )
  .then(
    /**
     * @param {Array} result
     * an array of booleans; each one representing the result of each mkdir() promise
     * created by mkdirp(). since we’re in then(), each result should be `true`
     */
    function( result ) {
      // handle success
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle error
    }
  );
```

### set ignore to `false`
acknowledges `EEXIST` directory errors returned by `fs.mkdir()`
```javascript
var mkdirp = require( 'mkdir-p-bluebird' );
var Promise = require( 'bluebird' );

Promise.all( mkdirp( 'test-dir/sub/folder', null, false ) )
  .then(
    /**
     * @param {Array} result
     * an array of booleans; each one representing the result of each mkdir() promise
     * created by mkdirp(). since we’re in then(), each result should be `true`
     */
    function( result ) {
      // handle success
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle error
    }
  );
```

### using node’s path module
```javascript
var mkdirp = require( 'mkdir-p-bluebird' );
var path = require( 'path' );
var Promise = require( 'bluebird' );
var dirpath = path.join( __dirname, 'test', 'test-dir' );

Promise.all( mkdirp( dirpath ) )
  .then(
    /**
     * @param {Array} result
     * an array of booleans; each one representing the result of each mkdir() promise
     * created by mkdirp(). since we’re in then(), each result should be `true`
     */
    function( result ) {
      // handle success
    }
  )
  .catch(
    /**
     * @param {Error} err
     */
    function( err ) {
      // handle error
    }
  );
```

## license
[MIT License][mit-license]

[bluebird]: https://www.npmjs.com/package/bluebird
[coveralls-image]: https://coveralls.io/repos/github/dan-nl/mkdir-p-bluebird/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/dan-nl/mkdir-p-bluebird?branch=master
[david-dm-image]: https://david-dm.org/dan-nl/mkdir-p-bluebird.svg
[david-dm-url]: https://david-dm.org/dan-nl/mkdir-p-bluebird
[fs-mkdir]: https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback
[mit-license]: https://raw.githubusercontent.com/dan-nl/mkdir-p-bluebird/master/license.txt
[mkdir-bluebird-url]: https://www.npmjs.com/package/mkdir-bluebird
[npm-image]: https://img.shields.io/npm/v/mkdir-p-bluebird.svg
[npm-url]: https://www.npmjs.com/package/mkdir-p-bluebird
[nsp-image]: https://nodesecurity.io/orgs/githubdan-nl/projects/6709c674-7c89-4f4a-be1e-84552c43ed81/badge
[nsp-url]: https://nodesecurity.io/orgs/githubdan-nl/projects/6709c674-7c89-4f4a-be1e-84552c43ed81
[travis-image]: https://travis-ci.org/dan-nl/mkdir-p-bluebird.svg?branch=master
[travis-url]: https://travis-ci.org/dan-nl/mkdir-p-bluebird
