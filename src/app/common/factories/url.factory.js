(function () {
  'use strict';

  angular.module('fleetControl').factory('urlFactory', urlFactory);

  /*@ngInject*/
  function urlFactory($location) {
    var factory = {};

    factory.getRootURL = getRootURL;

    return factory;

    function getRootURL() {
      return $location.protocol() + '://' + $location.host() + ':' + $location.port();
    }
  }

})();