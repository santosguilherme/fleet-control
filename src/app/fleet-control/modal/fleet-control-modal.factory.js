(function () {
  'use strict';

  angular.module('fleetControl').factory('fleetControlModalFactory', fleetControlModalFactory);

  /*@ngInject*/
  function fleetControlModalFactory($uibModal) {
    return {
      open: function (vehicle, callback) {
        var modalConfig = {
          animation: true,
          size: 'md',
          backdrop: 'static',
          component: 'fleetControlModal',
          resolve: {
            vehicle: function () {
              return vehicle;
            }
          }
        };
        var modalInstance = $uibModal.open(modalConfig);

        modalInstance.result.then(callback);
      }
    };
  }
})();