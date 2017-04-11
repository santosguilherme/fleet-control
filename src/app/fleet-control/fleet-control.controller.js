(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlController', FleetControlController);

  /*@ngInject*/
  function FleetControlController(vehiclesService, paginatorFactory) {
    var vm = this;

    constructor();

    function constructor() {
      vm.filter = angular.merge({}, {text: ''}, paginatorFactory.create());

      queryVehicles();
    }

    function queryVehicles() {
      vehiclesService.query(vm.filter).then(function (response) {
        vm.vehicles = response.content;
        vm.filter.totalElements = response.totalElements;
      });
    }

    vm.addVehicle = function (vehicle) {
      vehiclesService.save(vehicle).then(queryVehicles);
    };

    vm.filterVehicles = function (text) {
      vm.filter.text = text;

      // TODO
      queryVehicles();
    };

    vm.onPageChange = function () {
      // TODO
      queryVehicles();
    };
  }
})();