(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlController', FleetControlController);

  /*@ngInject*/
  function FleetControlController(vehiclesService, paginatorFactory, growl, $translate) {
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
      vehiclesService.save(vehicle).then(function () {
        growl.success($translate.instant('MESSAGES.VEHICLE_SAVED_SUCCESS'));
        queryVehicles();
      });
    };

    vm.filterVehicles = function (text) {
      vm.filter.text = text;
      vm.filter.currentPage = 1;

      queryVehicles();
    };

    vm.onPageChange = function () {
      queryVehicles();
    };
  }
})();