(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlTableController', FleetControlTableController);

  /*@ngInject*/
  function FleetControlTableController($window) {
    var vm = this;

    vm.openNewTab = function (url) {
      $window.open(url, '_blank');
    };
  }
})();