(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlModalController', FleetControlModalController);

  /*@ngInject*/
  function FleetControlModalController() {
    var vm = this;

    constructor();

    function constructor(){
      vm.fuels = ['Álcool', 'Flex', 'Gasolina'];
      vm.vehicle = angular.copy(vm.resolve.vehicle);
      vm.regexPlate = /^[A-Za-z]{3}-[0-9]{4}$/;
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