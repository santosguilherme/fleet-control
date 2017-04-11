(function () {
  'use strict';

  angular.module('fleetControl').service('vehiclesService', vehiclesService);

  /*@ngInject*/
  function vehiclesService($q, uuid, localStorageService, orderByFilter, paginatorFactory) {
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

    vm.delete = function (filter) {
      var deferred = $q.defer();

      deferred.resolve({});

      return deferred.promise;
    };

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

    function queryAll() {
      return localStorageService.get(KEY) || [];
    }

    function queryResponseObject(filter) {
      var queryFilter = filter || paginatorFactory.create();

      var ordenedList = orderByFilter(queryAll(), 'placa');

      var startAt = (queryFilter.currentPage - 1) * queryFilter.size;
      var endAt = startAt + queryFilter.size;

      return {
        totalElements: ordenedList.length,
        content: ordenedList.slice(startAt, endAt)
      };
    }

    function saveArrayVehicles(array) {
      localStorageService.set(KEY, array);
    }
  }
})();