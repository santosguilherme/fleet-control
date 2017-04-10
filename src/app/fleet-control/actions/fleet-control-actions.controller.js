(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlActionsController', FleetControlActionsController);

  /*@ngInject*/
  function FleetControlActionsController(fleetControlModalFactory) {
    var vm = this;

    vm.handleClickNewVehicle = function () {
      fleetControlModalFactory.open(vm.afterCreateVehicle);
    };
  }
})();