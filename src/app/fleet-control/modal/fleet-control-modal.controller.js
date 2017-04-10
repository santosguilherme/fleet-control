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
      vm.modalInstance.close(vm.vehicle);
    };

    vm.cancel = function () {
      vm.modalInstance.dismiss();
    };
  }
})();