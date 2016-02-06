var bulk = require('bulk-require');

module.exports = angular.module('appCentralink.authModule',['ngCookies']);

bulk(__dirname,['./**/!(*_index).js']);