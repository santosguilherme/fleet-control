(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlTableController', FleetControlTableController);

  /*@ngInject*/
  function FleetControlTableController($window) {
    var vm = this;
    vm.allSelected = false;

    vm.openNewTab = function (url) {
      $window.open(url, '_blank');
    };

    vm.handleToggleSelectAll = function () {
      (vm.vehicles || []).forEach(function (vehicle) {
        vehicle.selected = vm.allSelected;
      });

      vm.onSelect()(getSelectedVehicles());
    };

    vm.handleToggleSelectRow = function () {
      vm.onSelect()(getSelectedVehicles());
    };

    function getSelectedVehicles() {
      return angular.copy(vm.vehicles || []).filter(function (vehicle) {
        return vehicle.selected;
      }).map(function (vehicle) {
        delete vehicle.selected;
        return vehicle;
      });
    }
  }
})();