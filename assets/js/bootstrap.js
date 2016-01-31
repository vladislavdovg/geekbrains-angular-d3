require('../../vendor/angular/angular');
require('./module/d3');
require('./module/directives');

angular.module('kitApp', ['d3', 'kitApp.directives'])
  .run(function ($rootScope) {
    $rootScope.value1 = 'It works!';
  });

//  .value('valueName', 123)
//  .factory('factoryName', ['valueName', function (value) {
//    console.log(value);
//  }])
//  .service('serviceName', ['valueName', SomeClass]);
//
//function SomeClass(valueName) {
//  this.value = valueName;
//};

// Module
//   Constant
//   Value <- Variable
//   Factory <- Function
//   Service <- Object
//   Provider
