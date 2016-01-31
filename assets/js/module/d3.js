angular.module('d3', [])
  .factory('d3Factory', [
    '$document',
    '$rootScope',
    '$window',
    '$q',
    function ($document, $rootScope, $window, $q) {
      // promise - обещание
      // defer - отложить
      var d = $q.defer();

      var scriptTag = $document[0].createElement('script');
      scriptTag.async = true;
      scriptTag.type = 'text/javascript';
      scriptTag.src = '../../vendor/d3/d3.js';

      // resolve - разрешить обещание
      // reject - отклонить
      scriptTag.onload = function () {
        $rootScope.$apply(function () {
          d.resolve($window.d3);
        })
      };

      var body = $document[0].body;

      body.appendChild(scriptTag);

      return {
        d3: function () {
          return d.promise;
        }
      }
    }
  ]);
