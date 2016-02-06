var bulk = require('bulk-require');

module.exports = angular.module('appCentralink.uiModule',['ngSanitize','720kb.datepicker']);

bulk(__dirname,['./**/!(*_index).js']);