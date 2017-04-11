(function () {
  'use strict';

  angular.module('fleetControl').component('fleetControlTable', {
    templateUrl: 'app/fleet-control/table/fleet-control-table.html',
    controller: 'FleetControlTableController',
    bindings: {
      vehicles: '=',
      onSelect: '&'
    }
  });
})();