var bulk = require('bulk-require');

module.exports = angular.module('appCentralink.uiModule',[]);

bulk(__dirname,['./**/!(*_index).js']);