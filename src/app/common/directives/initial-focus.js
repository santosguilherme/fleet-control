(function () {
  'use strict';

  angular.module('fleetControl').directive('initialFocus', solarBpmFocus);

  /*@ngInject*/
  function solarBpmFocus($timeout) {
    return {
      restrict: 'A',
      link: linkFn
    };

    function linkFn(scope, element) {
      element && element[0] && $timeout(function () {
        angular.element(element[0]).focus();
      });
    }
  }
})();