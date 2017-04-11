(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlActionsController', FleetControlActionsController);

  /*@ngInject*/
  function FleetControlActionsController(fleetControlModalFactory) {
    var vm = this;

    constructor();

    function constructor() {
      vm.filterText = '';
    }

    vm.handleClickNewVehicle = function () {
      fleetControlModalFactory.open()
        .result.then(vm.afterCreateVehicle());
    };

    vm.onChangeFilterText = function () {
      vm.onFilter && vm.onFilter() && vm.onFilter()(vm.filterText);
    };
  }
})();