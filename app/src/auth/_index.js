var bulk = require('bulk-require');

module.exports = angular.module('appCentralink.authModule',[]);

bulk(__dirname,['./**/!(*_index).js']);