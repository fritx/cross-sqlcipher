'use strict'
module.exports = process.platform === 'win32' ?
  require('win-sqlcipher') : require('unix-sqlcipher')
