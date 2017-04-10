(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlModal', {
    templateUrl: 'app/fleet-control/modal/fleet-control-modal.html',
    controller: 'FleetControlModalController',
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();