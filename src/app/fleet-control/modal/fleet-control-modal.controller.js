(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlModalController', FleetControlModalController);

  /*@ngInject*/
  function FleetControlModalController() {
    var vm = this;
    vm.vehicle = angular.copy(vm.resolve.vehicle || {});

    vm.handleClose = function () {
      vm.modalInstance.close(vm.vehicle);
    };

    vm.cancel = function () {
      vm.modalInstance.dismiss();
    };
  }
})();