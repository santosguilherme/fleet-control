(function () {
  'use strict';

  angular.module('fleetControl').factory('fleetControlModalFactory', fleetControlModalFactory);

  /*@ngInject*/
  function fleetControlModalFactory($uibModal) {
    return {
      open: function (vehicle) {
        var modalConfig = {
          animation: true,
          size: 'md',
          backdrop: 'static',
          component: 'fleetControlModal',
          resolve: {
            vehicle: function () {
              return angular.copy(vehicle || {});
            }
          }
        };
        return $uibModal.open(modalConfig);
      }
    };
  }
})();