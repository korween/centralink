var bulk = require('bulk-require');

module.exports = angular.module('appCentralink.routerModule',['ui.router','ngCookies']);

bulk(__dirname,['./**/!(*_index).js']);