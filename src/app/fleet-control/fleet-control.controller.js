(function () {
  'use strict';

  angular.module('fleetControl').controller('FleetControlController', FleetControlController);

  /*@ngInject*/
  function FleetControlController(vehiclesService, paginatorFactory, growl, $translate, fleetControlModalFactory, confirmModalFactory, $q) {
    var vm = this;

    constructor();

    function constructor() {
      vm.filter = angular.merge({}, {text: ''}, paginatorFactory.create());
      vm.showEditButton = false;
      vm.showDeleteButton = false;
      vm.selectedsVehicles = [];

      queryVehicles();
    }

    function queryVehicles() {
      vehiclesService.query(vm.filter).then(function (response) {
        vm.vehicles = response.content;
        vm.filter.totalElements = response.totalElements;
      });
    }

    vm.addVehicle = function () {
      fleetControlModalFactory.open().result
        .then(function (vehicle) {
          return vehiclesService.save(vehicle);
        })
        .then(function () {
          growl.success($translate.instant('MESSAGES.VEHICLE_SAVED_SUCCESS'));
          queryVehicles();
        });
    };

    vm.updateVehicle = function () {
      var vehicleToEdit = vm.selectedsVehicles[0];

      fleetControlModalFactory.open(vehicleToEdit).result
        .then(function (vehicle) {
          vm.showEditButton = false;
          vm.selectedsVehicles = [];

          return vehiclesService.save(vehicle);
        })
        .then(function () {
          growl.success($translate.instant('MESSAGES.VEHICLE_SAVED_SUCCESS'));
          queryVehicles();
        });

    };

    vm.removeVehicle = function () {
      confirmModalFactory.open($translate.instant('MESSAGES.VEHICLE_REMOVE_CONFIRM', {size: vm.selectedsVehicles.length})).result
        .then(function () {
          var promises = vm.selectedsVehicles.map(function (vehicle) {
            return vehiclesService.delete(vehicle.id);
          });

          $q.all(promises).then(function () {
            vm.showDeleteButton = false;
            vm.selectedsVehicles = [];
            queryVehicles();
            growl.success($translate.instant('MESSAGES.VEHICLE_REMOVED_SUCCESS'));
          });


        });
    };

    vm.onSelectVehicles = function (selectedsVehicles) {
      vm.showEditButton = selectedsVehicles && selectedsVehicles.length === 1;
      vm.showDeleteButton = selectedsVehicles && selectedsVehicles.length;
      vm.selectedsVehicles = angular.copy(selectedsVehicles);
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