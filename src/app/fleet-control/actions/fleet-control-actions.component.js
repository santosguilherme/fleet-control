(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlActions', {
    templateUrl: 'app/fleet-control/actions/fleet-control-actions.html',
    controller: 'FleetControlActionsController',
    bindings: {
      onFilter: '&',
      afterCreateVehicle: '&'
    }
  });
})();