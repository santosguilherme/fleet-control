(function () {
  'use strict';

  angular.module('fleetControl').service('vehiclesService', vehiclesService);

  /*@ngInject*/
  function vehiclesService($q, uuid, localStorageService, $filter, paginatorFactory) {
    var vm = this;
    var KEY = 'vehicles';

    vm.query = function (filter) {
      var deferred = $q.defer();

      deferred.resolve(queryResponseObject(filter));

      return deferred.promise;
    };

    vm.save = function (vehicle) {
      var deferred = $q.defer();

      if (!vehicle) {
        deferred.reject();
      }

      if (vehicle) {
        deferred.resolve(saveVehicle(vehicle));
      }

      return deferred.promise;
    };

    vm.delete = function (vehicleId) {
      var deferred = $q.defer();

      if (!vehicleId) {
        deferred.reject();
      }

      deferred.resolve(deleteVehicleById(vehicleId));

      return deferred.promise;
    };

    function deleteVehicleById(vehicleId) {
      var vehiclesToSave = queryAll().filter(function (vehicle) {
        return vehicle.id !== vehicleId;
      });

      return saveArrayVehicles(vehiclesToSave);
    }

    function saveVehicle(vehicle) {
      var vehicleToSave = angular.merge({}, vehicle);
      var vehiclesSaved = queryAll();

      if (vehicle.id) {
        vehiclesSaved = vehiclesSaved.filter(function (vehicle) {
          return vehicle.id !== vehicleToSave.id;
        });
      }

      vehicleToSave = angular.merge({}, vehicle, {id: uuid.v4()});
      vehiclesSaved.push(vehicleToSave);
      saveArrayVehicles(vehiclesSaved);

      return vehiclesSaved;
    }

    function queryResponseObject(filter) {
      var queryFilter = filter || paginatorFactory.create();
      var vehicles = $filter('filter')(queryAll(), queryFilter.text);
      var vehiclesTotalLength = vehicles.length;
      var startAt = (queryFilter.currentPage - 1) * queryFilter.size;
      var endAt = startAt + queryFilter.size;

      return {
        totalElements: vehiclesTotalLength,
        content: $filter('orderBy')(vehicles, 'placa').slice(startAt, endAt)
      };
    }

    function saveArrayVehicles(array) {
      return localStorageService.set(KEY, array);
    }

    function queryAll() {
      return localStorageService.get(KEY) || [];
    }
  }
})();