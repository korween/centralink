var bulk = require('bulk-require');

module.exports = angular.module('appCentralink.uiModule',['ngSanitize']);

bulk(__dirname,['./**/!(*_index).js']);