(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlActionsController', FleetControlActionsController);

  /*@ngInject*/
  function FleetControlActionsController() {
    var vm = this;

    constructor();

    function constructor() {
      vm.filterText = '';
    }

    vm.handleClickNewVehicle = function () {
      vm.createVehicle()();
    };

    vm.handleClickEditVehicle = function () {
      vm.editVehicle()();
    };

    vm.handleClickDeleteVehicle = function () {
      vm.deleteVehicle()();
    };

    vm.onChangeFilterText = function () {
      vm.onFilter && vm.onFilter() && vm.onFilter()(vm.filterText);
    };
  }
})();