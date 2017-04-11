(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlModalController', FleetControlModalController);

  /*@ngInject*/
  function FleetControlModalController() {
    var vm = this;

    constructor();

    function constructor() {
      vm.regexPlate = /^[A-Za-z]{3}-[0-9]{4}$/;
      vm.fuels = ['Álcool', 'Flex', 'Gasolina'];
      vm.vehicle = angular.copy(vm.resolve.vehicle);

      vm.vehicle.combustivel = vm.fuels.find(function (fuel) {
        return vm.vehicle.combustivel === fuel;
      });
    }

    vm.handleClose = function () {
      vm.vehicle = angular.merge({}, vm.vehicle, {placa: vm.vehicle.placa.toUpperCase()});

      vm.modalInstance.close(vm.vehicle);
    };

    vm.handleCancel = function () {
      vm.modalInstance.dismiss();
    };
  }
})();